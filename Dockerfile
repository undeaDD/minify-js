FROM node:20.10.0-alpine3.18
LABEL maintainer="devatherock@gmail.com"

COPY node_modules /app/node_modules/
COPY bin/cli.mjs /app/bin/cli.mjs
COPY lib /app/lib/

ENTRYPOINT ["node", "/app/bin/cli.mjs"]