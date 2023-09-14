FROM node:18

USER node
WORKDIR /app

USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    libnss3 \
    libgconf-2-4 \
    libfreetype6 \
    libharfbuzz0b \
    ca-certificates \
    fonts-freefont-ttf \
    libnotify-bin \
    && rm -rf /var/lib/apt/lists/*
USER node

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --production

COPY --chown=node:node index.js .

CMD [ "node", "index.js" ]
