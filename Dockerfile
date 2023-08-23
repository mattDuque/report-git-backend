FROM node:lts-alpine AS builder

# Update the system
RUN apk --no-cache -U upgrade

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .                

EXPOSE 80

ENTRYPOINT ["npm", "start"]