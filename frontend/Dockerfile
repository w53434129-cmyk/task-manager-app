# =====================
# Builder stage
# =====================
#FROM node:20-alpine AS builder
FROM 732716521491.dkr.ecr.us-east-1.amazonaws.com/node-base:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
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

# Copy built app and static files from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
