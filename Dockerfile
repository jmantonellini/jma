# ─────────────────────────────
# 🚧 1. Build Stage
# ─────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY vite.config.ts ./
COPY . .

RUN npm i -g pnpm
RUN pnpm install
RUN pnpm run postinstall
RUN pnpm exec svelte-kit sync
RUN pnpm run build
RUN pnpm prune --production

# ─────────────────────────────
# 🚀 2. Production Stage
# ─────────────────────────────
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/static ./static

RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", ".svelte-kit/output/server/index.js"]
