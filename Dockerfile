# ─────────────────────────────
# 🚧 Build Stage
# ─────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY . .

RUN npm i -g pnpm

# Skip automatic client generate during install
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

RUN pnpm install
RUN pnpm exec svelte-kit sync
RUN pnpm run build

# Generate Prisma Client here, BEFORE pruning
RUN pnpm exec prisma generate

# Prune devDependencies after generate
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
EXPOSE 3000

CMD ["node", "build"]
