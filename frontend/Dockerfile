# =====================
# Builder stage
# =====================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Tailwind + Next.js
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine AS production
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built Next.js app
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
