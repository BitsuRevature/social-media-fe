#Need Node for base
FROM node:20-alpine AS build
#Set workdir
WORKDIR /src

#Copy package*.json
COPY package*.json ./

#Install dependecies
RUN npm install

#Copy remaining files
COPY . .

#Build the project
RUN npm run build

EXPOSE 80

# Start the application using a lightweight server
CMD ["npx", "serve", "-s", "dist" , "-l", "80"]
