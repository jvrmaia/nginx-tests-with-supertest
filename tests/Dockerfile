FROM node:latest

ADD . .

RUN apt update \
    && apt install curl \
    && npm install

CMD ["./wait-for-it.sh", "http://gateway:80", "--", "npm", "test"]
