# Development environment
FROM node:20-alpine as development
WORKDIR /app
COPY . .

# Production environment
FROM node:20-alpine as production
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production=true --frozen-lockfile
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]