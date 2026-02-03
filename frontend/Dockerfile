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

# Ensure /public exists for Docker build, add .gitkeep if empty
RUN mkdir -p public && touch public/.gitkeep

# Build Next.js (Tailwind CSS compiled here)
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine
WORKDIR /app

# Production dependencies only
COPY package*.json ./
RUN npm install --production

# Copy compiled app from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

# Note: /public is already handled in .next, copying is optional
# If you want static files, uncomment:
# COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
