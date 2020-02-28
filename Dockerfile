FROM node:10.16.3-alpine
MAINTAINER Greg Taschuk
WORKDIR /usr/src/app
RUN apk add --no-cache git python make g++
COPY truffle-config.js truffle-config.js

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY contracts contracts
COPY migrations migrations 
COPY build build

CMD ["npm", "run", "deploy-contracts-from-docker"]
