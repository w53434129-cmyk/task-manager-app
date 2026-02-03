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

# Build Next.js (Tailwind CSS compiled automatically)
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
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

# Optional: copy minimal source (only if needed for server-side code)
# COPY --from=builder /app/src ./src

# Expose port for Kubernetes NodePort
EXPOSE 3000

# Start Next.js server bound to 0.0.0.0 so it's accessible externally
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]

