# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json vite.config.* ./
COPY . .

RUN npm ci
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for React Router SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
