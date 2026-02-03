# Stage 1: Build frontend
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Upgrade npm to latest stable version to avoid package resolution issues
RUN npm install -g npm@11.8.0

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build Next.js app (produces .next folder)
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built Next.js static files from builder
COPY --from=builder /app/.next /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
