FROM nginx:alpine
WORKDIR /app/dist
COPY ./dist/ /app/dist/