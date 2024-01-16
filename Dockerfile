FROM alpine:3.19.0

RUN apk update && \
    apk upgrade --no-cache && \
    apk add yarn --no-cache

COPY ../ /app

WORKDIR /app

RUN yarn install
CMD ["yarn", "start"]
