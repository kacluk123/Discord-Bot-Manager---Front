FROM node:latest 

LABEL author="sakuy"

COPY ./src /web
COPY ./package.json /web
COPY ./tsconfig.json /web
COPY ./.babelrc /web
COPY ./entrypoint.sh /web

WORKDIR /web

RUN yarn install
RUN yarn build

ENV NODE_ENV production

CMD ["sh", "-c", "yarn start -p $PORT"]
