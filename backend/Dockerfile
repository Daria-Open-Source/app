# Stage 1: Build
FROM node:24-alpine AS builder 

# Defines a directory to work from
WORKDIR /app

# Used to clean install dependencies
COPY package*.json ./

# Installs dependencies
RUN npm ci

# Copy everything into the container
COPY . .

# Stage 2: Final Runtime
FROM node:24-alpine

# Defines a work directory
WORKDIR /app

# package.json indicates the project is a module
COPY --from=builder /app/package.json ./

# Copies the node modules from the previous container
COPY --from=builder /app/node_modules ./node_modules

# Copies the code
COPY --from=builder /app/src ./src

# Port the container exposes for connections
EXPOSE 8000

# Run the node command pointing to the src folder
CMD ["node", "src/index.js"]