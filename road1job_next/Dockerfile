FROM node:25-alpine

WORKDIR /road1job_next

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["npm","run","dev","--","-p","5111"]

EXPOSE 5111

