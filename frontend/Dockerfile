# =====================
# Builder stage
# =====================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (dev + prod)
COPY package*.json ./
RUN npm install

# Copy all source code (including styles)
COPY . .

# Build Tailwind CSS + Next.js
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built app from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist        # Tailwind output
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Start Next.js server
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
