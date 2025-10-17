# Stage 1: Build

FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Ensure vite binary is executable
RUN chmod +x node_modules/.bin/vite

COPY . .
RUN npm run build

# Stage 2: Serve production with custom nginx config

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
