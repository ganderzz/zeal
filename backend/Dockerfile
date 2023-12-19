FROM node:alpine as build

WORKDIR /app/

COPY package.json yarn.lock .yarnrc.yml .pnp.cjs tsconfig.json ./
COPY .yarn/releases/ .yarn/releases/
COPY .yarn/plugins/ .yarn/plugins/
COPY .yarn/cache/ .yarn/cache/
COPY backend/package.json backend/

# Update and get new security patches
RUN apk update
RUN apk upgrade

# Install dependencies
RUN yarn

# Build project
WORKDIR /app/backend/
COPY backend/ .
RUN yarn build

FROM node:bullseye as app
ENV NODE_ENV=production

# Update and get new security patches
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/
# Create new user to prevent running under root
RUN adduser nodeuser --disabled-password

COPY --chown=nodeuser:nodeuser --from=build \
        /app/backend/dist/ backend/dist/
COPY --chown=nodeuser:nodeuser --from=build \
        /app/package.json /app/.yarnrc.yml /app/.pnp.cjs ./
COPY --chown=nodeuser:nodeuser --from=build \
        /app/.yarn/ .yarn/
COPY --chown=nodeuser:nodeuser --from=build \
        /app/backend/package.json backend/

USER nodeuser
EXPOSE 4000
CMD ["yarn", "node", "backend/dist/index.js"]