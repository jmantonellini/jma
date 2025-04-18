# ─────────────────────────────
# 🚧 Build Stage
# ─────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copiamos dependencias y archivos del proyecto
COPY package.json pnpm-lock.yaml ./
COPY . .

# Instalamos y construimos
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm exec svelte-kit sync
RUN pnpm run build
RUN pnpm prune --production

# ─────────────────────────────
# 🚀 Production Stage
# ─────────────────────────────
FROM node:22-alpine

WORKDIR /app

# Copiamos lo necesario
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/static ./static
COPY --from=builder /app/.svelte-kit ./.svelte-kit

# Generamos Prisma Client en producción
RUN npx prisma generate

# Puerto y entorno
ENV NODE_ENV=production
EXPOSE 3000

# 🟢 Entrada correcta para SvelteKit 2 + adapter-node
CMD ["node", ".svelte-kit/output/server/index.js"]
