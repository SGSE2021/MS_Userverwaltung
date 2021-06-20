FROM node:lts AS ui-build
WORKDIR /usr/src/app
COPY client/user-service ./client/user-service
RUN cd client/user-service && npm install @angular/cli && npm install && npm run build

FROM node:lts AS server-build
WORKDIR /usr/src/app/server
COPY --from=ui-build /usr/src/app/client/user-service/dist ./client
#COPY package*.json ./
COPY server/ .
RUN npm install
ENV PORT=8080
EXPOSE 8080
CMD ["npm","run", "start"]