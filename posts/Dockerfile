FROM node:alpine

WORKDIR /usr/src/app

# Install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy files over
COPY . ./

# Start the server
CMD ["npm", "start"]
