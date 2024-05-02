FROM node:alpine

WORKDIR /app

# Upgrade yarn to the latest version
RUN yarn set version stable

# Copy package.json and yarn.lock
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies
RUN yarn install

# Copy the rest of the files except the ones in .dockerignore
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
ENTRYPOINT [ "yarn", "start" ]