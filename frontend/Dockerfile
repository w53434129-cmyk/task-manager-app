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

# Build Next.js
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built app and static files
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
