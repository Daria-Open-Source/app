# Stage 1: Build
FROM node:24-alpine AS builder 
WORKDIR /app
COPY src/package*.json ./
RUN npm ci
COPY . .

# Stage 2: Final Runtime
FROM node:24-alpine
WORKDIR /app
# 2. Copy the entire src folder from the builder stage
COPY --from=builder /app/node_modules ./node_modules
# Copy the src folder itself, not just its contents
COPY --from=builder /app/src ./src
EXPOSE 8000
# Run the node command pointing to the src folder
CMD ["node", "src/index.js"]