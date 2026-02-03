# =====================
# Builder stage
# =====================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code AND ensure public exists in same step
COPY . .

# Ensure public folder exists before build
RUN mkdir -p public

# Build Next.js
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
COPY --from=builder /app/public ./public       # now guaranteed to exist
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
