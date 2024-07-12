FROM node:alpine3.19 as build

WORKDIR /frontend

COPY ./frontend/.eslintrc.cjs ./
COPY ./frontend/index.html ./
COPY ./frontend/jsconfig.json ./
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
COPY ./frontend/vercel.json ./
COPY ./frontend/vite.config.js ./

RUN npm install
COPY ./frontend/ ./

RUN npm run build

FROM nginx:alpine3.19

COPY ./webserver/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist /usr/share/nginx/html