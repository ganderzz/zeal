FROM node:alpine AS build

WORKDIR /app/

COPY package.json yarn.lock .yarnrc.yml .pnp.cjs ./
COPY .yarn/releases/ .yarn/releases/
COPY .yarn/plugins/ .yarn/plugins/
COPY .yarn/cache/ .yarn/cache/
COPY frontend/package.json frontend/

# Update and get new security patches
RUN apk update
RUN apk upgrade

# Install dependencies
RUN yarn

# Build project
WORKDIR /app/frontend/
COPY frontend/ .
RUN yarn build

FROM nginxinc/nginx-unprivileged:latest as app
COPY --from=build --chown=nginx:nginx /app/frontend/dist /usr/share/nginx/html
USER nginx