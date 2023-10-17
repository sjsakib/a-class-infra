FROM node:20.8-alpine

WORKDIR /usr/src/app

COPY . .

RUN corepack enable

RUN pnpm i

EXPOSE 3001

CMD ["pnpm", "start"]
