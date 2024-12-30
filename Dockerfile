#Need Node for base
FROM node:20-alpine AS build
#Set workdir
WORKDIR /app

#Copy package*.json
COPY package*.json .

#Install dependecies
RUN npm install

#Copy remaining files
COPY . .

#Build the project
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]