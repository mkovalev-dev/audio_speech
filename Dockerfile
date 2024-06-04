FROM node:20.0.0-alpine as build

WORKDIR /app/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./
RUN npm run build
RUN npx browserslist@latest --update-db

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/
COPY --from=build /app/frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]