FROM node:latest 

LABEL author="sakuy"

COPY . /web

WORKDIR /web

RUN yarn install
RUN yarn build

ENV NODE_ENV production

CMD ["sh", "-c", "yarn start -p $PORT"]
