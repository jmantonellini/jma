# ─────────────────────────────
# 🚧 Build Stage
# ─────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app
RUN npm i -g pnpm

# Copy only essentials first (for better caching)
COPY package.json pnpm-lock.yaml ./

# 👇 Ensure correct engine target (linux-musl for Alpine)
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=binary
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV PRISMA_CLI_BINARY_TARGETS="linux-musl"

# 👇 Skip automatic generation for now
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

RUN pnpm install

# Copy source
COPY . .

RUN pnpm exec svelte-kit sync
RUN pnpm run build

# 👇 Generate Prisma Client — must happen before pruning
ENV PRISMA_CLIENT_SKIP_DATABASE_CONNECT=1
RUN pnpm exec prisma generate --no-engine-validation

# 👇 Check output exists (optional debugging)
RUN ls -la node_modules/.prisma/client || echo "⚠️ Prisma client folder missing"

RUN pnpm prune --production

# ─────────────────────────────
# 🚀 Production Stage
# ─────────────────────────────
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/static ./static
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/build ./build

ENV NODE_ENV=production
ENV PRISMA_CLIENT_ENGINE_TYPE=binary
ENV PRISMA_GENERATE_SKIP_POSTINSTALL=true

EXPOSE 3000
CMD ["node", "build"]
