FROM node:20.9.0

RUN npm install -global nodemon

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4001

CMD ["npm", "run", "start"]
