# These edits add a test build to the container,
# and will run unit tests inside the container
# If the tests pass, it is built again w/ out the tests.

# Stage 1: Build Image
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Unit Tests
FROM builder AS tester
COPY . .
RUN npm run test:unit

# Stage 3: Production Image
FROM node:24-alpine

WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=tester /app/src ./src

EXPOSE 8000

# Run the node command pointing to the src folder
CMD ["node", "src/index.js"]