FROM node:14.0.0 As demo

WORKDIR ./app

COPY package*.json ./

RUN npm install -g @angular/cli@10.2.4
COPY . .
RUN npm install --legacy-peer-deps

RUN npm run build



FROM nginx
RUN apt-get -y update && apt-get -y install nginx
COPY --from=demo app/dist/pangaeax-admin-panel/.  usr/share/nginx/html
EXPOSE  80
CMD ["nginx","-g","daemon off;"]

