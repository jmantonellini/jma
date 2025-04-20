#!/bin/bash

# Configuración
REMOTE_HOST="144.126.210.241"
REMOTE_PORT="5432"
LOCAL_PORT="6543"
SSH_USER="root"

# Verificar si el túnel ya está activo
if lsof -i TCP:$LOCAL_PORT &>/dev/null; then
  echo "🔁 El túnel ya está activo en el puerto $LOCAL_PORT"
else
  echo "🚀 Levantando túnel SSH a $REMOTE_HOST..."
  ssh -f -N -L ${LOCAL_PORT}:127.0.0.1:${REMOTE_PORT} ${SSH_USER}@${REMOTE_HOST}
  echo "✅ Túnel SSH levantado en localhost:$LOCAL_PORT"
fi

# Esperar un poco por si el túnel tarda
sleep 1

# Iniciar la app
echo "🟢 Ejecutando pnpm run dev..."
pnpm run dev