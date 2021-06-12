FROM node:alpine

WORKDIR /usr/src/app

ENV CI=true

# Install deps
RUN npm install -g serve
COPY package.json yarn.lock ./
RUN yarn install 

# Copy files over
COPY . ./

# Build
RUN yarn run build

# Start the server
CMD ["serve", "-s", "build", "-l", "3000"]
