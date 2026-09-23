#!/usr/bin/env bash
# Deploy del sitio en el VPS: trae el último código de main, reinstala
# dependencias, compila el frontend y reinicia el proceso de PM2.
#
# Uso: bash scripts/deploy.sh
# (se ejecuta con el directorio del proyecto como working directory,
# o desde cualquier lado ya que se ubica solo con `dirname "$0"`)

set -euo pipefail

cd "$(dirname "$0")/.."

APP_NAME="web-publi-seguros"

echo "==> Actualizando código desde origin/main"
git fetch origin
git reset --hard origin/main

echo "==> Instalando dependencias"
npm ci

echo "==> Compilando frontend"
rm -rf dist.new
npx vite build --outDir dist.new
rm -rf dist
mv dist.new dist

echo "==> Reiniciando $APP_NAME"
pm2 restart "$APP_NAME"

echo "==> Deploy completo: $(git rev-parse --short HEAD)"
