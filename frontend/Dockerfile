FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm install
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/default.conf && \
    printf 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  include /etc/nginx/mime.types;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /tmp/dist/
RUN sh -c 'set -e; d=$(ls -1 /tmp/dist | head -n1); \
  if [ -d "/tmp/dist/$d/browser" ]; then cp -r "/tmp/dist/$d/browser"/* /usr/share/nginx/html/; \
  else cp -r "/tmp/dist/$d"/* /usr/share/nginx/html/; fi'

EXPOSE 80
