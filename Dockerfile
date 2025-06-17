FROM node:18-alpine

WORKDIR /app

# Копируем зависимости и устанавливаем
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Копируем всё остальное
COPY . .

# Собираем приложение
RUN pnpm build

# Запускаем сервер
CMD ["pnpm", "start"]