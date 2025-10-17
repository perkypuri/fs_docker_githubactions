# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files from context
COPY package*.json ./

# Install dependencies
RUN npm install

# Make vite binary executable
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
