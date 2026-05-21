FROM node:25-alpine

WORKDIR /road1job_next

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["npm","run","dev"]

EXPOSE 3000

