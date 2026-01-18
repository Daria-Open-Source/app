#Node 24 for best compatability with latest packages in typescript/react 
FROM node:24-alpine AS builder

#Run updates and install dependencies
RUN apk update 
RUN apk add --no-cache libc6-compat

#Set working directory
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#Install only production dependencies and copy built files
FROM node:24-alpine as installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
RUN npm ci --omit=dev
RUN npm run prisma:generate

#Final stage for running the application
FROM node:24-alpine AS runner
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl
WORKDIR /app
#Dont run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD ["npm", "run", "docker-start"]



