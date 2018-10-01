FROM node:10.11.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
