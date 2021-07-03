FROM node:lts AS ui-build
WORKDIR /usr/src/app
COPY common/ ./common
COPY client/ /usr/src/app/client/

RUN ls
COPY common/ .
COPY database/ .
RUN cd database && npm install
RUN cd client/user-service && npm install @angular/cli && npm install && npm run build


FROM node:lts AS server-build
WORKDIR /usr/src/app/server
COPY --from=ui-build /usr/src/app/client/user-service/dist ./client
#COPY package*.json ./
COPY server/ .
COPY database/prisma /usr/src/app/database/prisma
RUN npm install
ENV PORT=8080

EXPOSE 8080
EXPOSE 8181
CMD ["npm","run", "start"]

#/usr/src/app/common
#             client
#             server