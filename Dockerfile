# Dockerfile optimizado para COMUNICA DIGITAL GAM El Alto (Coolify)
FROM node:20-alpine

# Instalar curl para healthchecks de Docker y Coolify
RUN apk add --no-cache curl

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --omit=dev

# Copiar código fuente y assets
COPY server.js ./
COPY public ./public
COPY docs ./docs
COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Healthcheck interno
HEALTHCHECK --interval=20s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
