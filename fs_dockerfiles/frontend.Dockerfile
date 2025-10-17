# Stage 1: Buildad
FROM node:20-alpine AS build
WORKDIR /app

# Install build tools (python, make, g++)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies (ignore peer conflicts)
RUN npm install --legacy-peer-deps

# Make vite executable
RUN chmod +x node_modules/.bin/vite

# Copy all source files
COPY . .

# Build React app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
