# =====================
# Builder stage
# =====================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js (Tailwind compiled automatically)
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine
WORKDIR /app

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built app from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/src ./src

EXPOSE 3000

# Start Next.js server
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]

