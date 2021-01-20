FROM node:lts as builder
ARG APP
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-all-libs
RUN npm run build:$APP

FROM nginx
ARG APP
COPY --from=builder /app/dist/$APP /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
