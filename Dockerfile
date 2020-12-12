FROM node:15.3.0-alpine3.10

WORKDIR usr/app

COPY package.json /usr/app
RUN npm install

CMD ["npm","start"]