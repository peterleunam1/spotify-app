FROM node:20 AS builder

WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar la caché de Docker
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular SSR
RUN npm run build

# Segunda etapa para ejecutar la aplicación de manera eficiente
FROM node:20 AS runner

WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

# Instalar solo dependencias de producción
RUN npm ci --omit=dev --legacy-peer-deps

# Exponer el puerto en el que se ejecutará la aplicación (ajústalo si es necesario)
EXPOSE 4000

# Comando para ejecutar la aplicación en modo SSR
CMD ["node", "/app/dist/spotify-app/server/server.mjs"]
