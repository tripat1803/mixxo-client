FROM node:latest
COPY . .
RUN npm install
RUN npm run build
RUN npm i -g serve
EXPOSE 3000
CMD serve -s build