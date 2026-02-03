# =====================
# Builder stage
# =====================
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 2. Copy all source code
COPY . .

# 3. Build Next.js app (Tailwind CSS compiled here)
RUN npm run build

# =====================
# Production stage
# =====================
FROM node:20-alpine

WORKDIR /app

# 1. Copy only production dependencies
COPY package*.json ./
RUN npm install --production

# 2. Copy the built Next.js app from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

# 3. Expose port
EXPOSE 3000

# 4. Start app in production
CMD ["npm", "start"]
