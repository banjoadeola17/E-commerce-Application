FROM node:12

MAINTAINER banjoadeola17@gmail.com

WORKDIR /usr/src/app

COPY package*.json ./

#copy all project files into image
COPY . ./

RUN npm install

RUN npm run build

# Bundle app source
COPY . .

EXPOSE 1203
CMD [ "node", "lib/index.js" ]
