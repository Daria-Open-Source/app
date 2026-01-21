#Node 24 for best compatability with latest packages in typescript/react 
FROM node:24-alpine AS builder

#Run updates and install dependencies
RUN apk update 
RUN apk add --no-cache libc6-compat

#Set working directory
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#For running the application
FROM node:24-alpine AS runner
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl

#Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

WORKDIR /app

#Copy files with proper ownership
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/vite.config.ts ./vite.config.ts


#Create .vite directory with proper permissions
RUN mkdir -p /app/.vite && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000
CMD ["npm", "run", "docker-start"]

