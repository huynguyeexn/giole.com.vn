FROM node:lts-alpine

WORKDIR /usr/src/app
COPY ./package*.json .
COPY ./yarn*.lock .
COPY . .

CMD [ "yarn", "install" ]
