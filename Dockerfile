FROM node:18.17.0-alpine

ENV CHROME_BIN="/usr/bin/chromium-browser"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

USER node
WORKDIR /app

USER root
RUN apk add --update \
  libstdc++ \
  libgcc \
  curl \
  cmake \
  python3 \
  git \
  build-base \
  chromium \
  && rm -rf /var/cache/apk/*
USER node

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --production

COPY --chown=node:node index.js .

CMD [ "node", "index.js" ]
