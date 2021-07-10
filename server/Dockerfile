FROM node:14-alpine
WORKDIR /usr/src/app/server

COPY common/ /usr/src/app/common/

COPY database/  /usr/src/app/database/
RUN cd /usr/src/app/database/ && npm install

COPY server/ /usr/src/app/server
RUN npm install

ENV INTERNAL_PORT=8080
ENV EXTERNAL_PORT=8081
ENV standardpassword="123456"
EXPOSE 8080
EXPOSE 8181
CMD ["npm","run", "start"]