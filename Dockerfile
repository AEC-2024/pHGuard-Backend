# Dockerfile
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

VOLUME ["/usr/src/app/uploads"]

CMD [ "node", "app.js" ]
