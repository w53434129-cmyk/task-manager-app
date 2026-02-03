# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy all source code including src
COPY . .

# Build app (Tailwind CSS compiled here)
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Copy build output
COPY --from=builder /app/.next .next
COPY --from=builder /app/src/public ./public   # if public exists
COPY --from=builder /app/next.config.js ./     # if next.config.js exists at root
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
