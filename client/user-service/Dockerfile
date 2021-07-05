# Stage 1
FROM node:14-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build --prod

WORKDIR /usr/src/app
COPY ./common/ ./common
COPY client/    /usr/src/app/client/
COPY database/  /usr/src/app/database/

RUN cd database && npm install
RUN cd client/user-service && npm install @angular/cli && npm install && npm run build


# Stage 2

FROM nginx:1.17.1-alpine
COPY client/user-service/default.conf /etc/nginx/conf.d/default.conf
RUN apk update && apk add bash
EXPOSE 80

COPY --from=build-step /usr/src/app/client/user-service/dist/user-service /usr/share/nginx/html

