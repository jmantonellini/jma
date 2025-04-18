# ─────────────────────────────
# 🚧 1. Build Stage
# ─────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copiamos los archivos base
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY vite.config.ts ./
COPY . .

# Instalamos dependencias y construimos
RUN npm i -g pnpm
RUN pnpm install

# Generamos el cliente de Prisma
RUN pnpm run postinstall

# 🔍 Verificamos que Prisma haya generado el cliente
RUN ls -la node_modules/.pnpm/@prisma+client*/node_modules/@prisma/client

# Build y limpieza
RUN pnpx svelte-kit sync
RUN pnpm run build
RUN pnpm prune --production

# ─────────────────────────────
# 🚀 2. Production Stage
# ─────────────────────────────
FROM node:22-alpine

WORKDIR /app

# Copiamos lo necesario del builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# (Opcional pero recomendado) Generamos Prisma client por seguridad
RUN npx prisma generate

# Variables de entorno y puerto
ENV NODE_ENV=production
EXPOSE 3000

# Comando final
CMD ["node", "build"]
