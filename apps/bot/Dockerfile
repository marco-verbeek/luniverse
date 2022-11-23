FROM node:alpine As development
WORKDIR /usr/src/app

COPY ./apps/bot/package*.json ./

RUN npm install

COPY ./apps/bot .

CMD ["npm", "run", "start"]
