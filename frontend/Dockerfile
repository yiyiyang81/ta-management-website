FROM node:12

WORKDIR /usr/src/app

COPY . .
RUN npm install &&\
    npm run build --legacy-peer-deps

CMD [ "npm", "start" ]
