FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/book-network-ui /usr/share/nginx/html
EXPOSE 80

FROM node:20-alpine as ssr-server
COPY --from=build-stage /app/dist/ /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
CMD npm run serve:ssr:book-network-ui