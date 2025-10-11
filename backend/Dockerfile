# backend/Dockerfile
FROM node:22

RUN mkdir -p /app/backend

WORKDIR /app/backend

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

RUN chmod +x node_modules/.bin/* || true

EXPOSE 3000

CMD ["npm", "run", "dev"]
