FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache openssl openssl-dev

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY tsconfig.json ./

COPY src ./src

RUN npm run build

EXPOSE 8080

CMD ["yarn", "dev"]