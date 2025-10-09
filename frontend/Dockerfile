# frontend/Dockerfile
FROM node:22 AS build

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x node_modules/.bin/* 

ENV VITE_API_URL=/api

RUN npm run build

FROM nginx

COPY --from=build /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

