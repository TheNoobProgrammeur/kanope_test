FROM node:lts-alpine

WORKDIR /home/node/app
COPY package*.json ./
RUN npm i typescript ts-node -g
RUN npm install

COPY . .
EXPOSE 3030
CMD ["npm", "run", "serve"]