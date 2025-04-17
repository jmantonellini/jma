FROM node:22-alpine AS builder
WORKDIR /src
COPY package*.json ./
COPY prisma ./prisma
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm run postinstall
RUN pnpm run build
RUN pnpm prune --production

FROM node:22-alpine
WORKDIR /src
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]