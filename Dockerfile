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

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

RUN pnpm install
RUN pnpm exec svelte-kit sync
RUN pnpm run build
RUN pnpm prune --production

# Debug: Verificamos que la build se haya generado
RUN echo "🔍 Archivos en /app después del build:" && ls -la /app
RUN echo "🔍 Contenido de /app/build:" && ls -la /app/build

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
COPY --from=builder /app/build ./build

# Generamos Prisma Client en producción
RUN npm i -g prisma
RUN npx prisma generate

# Puerto y entorno
ENV NODE_ENV=production
EXPOSE 3000

# Debug: Verificamos que el build esté disponible en esta etapa
RUN echo "🧪 Archivos finales:" && ls -la /app && ls -la /app/build

# 🟢 Entrada correcta para SvelteKit 2 + adapter-node
CMD ["node", "build"]
