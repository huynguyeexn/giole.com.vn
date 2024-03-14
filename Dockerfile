# Development environment
FROM node:20-alpine as development
WORKDIR /usr/src/app
COPY ./package*.json .
COPY ./yarn*.lock .
COPY . .
CMD [ "yarn", "install" ]

# Production environment
FROM node:20-alpine as production

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn --production=true --frozen-lockfile
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]