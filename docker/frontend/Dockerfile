FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-dev


# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/book-network-ui/browser /usr/share/nginx/html
COPY --from=build-stage /app/dist/book-network-ui/server /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


FROM node:20-alpine as ssr-server
COPY --from=build-stage /app/dist/ /app/dist/
COPY ./package.json /app/package.json
WORKDIR /app
CMD npm run serve:ssr:book-network-ui