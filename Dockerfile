FROM nginx:1.13.5-alpine

MAINTAINER liuyuan <405653510@qq.com>

COPY  ./dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf


