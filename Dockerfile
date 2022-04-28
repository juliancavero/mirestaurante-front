FROM node:16-alpine

ENV PORT 3000

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci && ls

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]