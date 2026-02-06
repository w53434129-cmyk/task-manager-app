FROM 732716521491.dkr.ecr.us-east-1.amazonaws.com/node-base:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
