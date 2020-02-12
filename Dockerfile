#stage 1 building the code
FROM node:12
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .

CMD ["node", 'index.js']