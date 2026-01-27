# Stage 1: Build
FROM node:20-alpine AS builder 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Final Runtime
FROM node:20-alpine 
WORKDIR /app

# 1. Copy the production dependencies from the builder
COPY --from=builder /app/node_modules ./node_modules
# 2. Copy your actual code (from the src folder based on your file tree)
COPY --from=builder /app/src/index.js . 

EXPOSE 3000
CMD ["node", "index.js"]