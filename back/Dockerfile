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

ENV GOOGLE_APPLICATION_CREDENTIALS="/app/gcloud/application_default_credentials.json"

# Install dockerize
ENV DOCKERIZE_VERSION v0.7.0
RUN apk add --no-cache openssl
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Expose the port
EXPOSE 3000

# Start the app
ENTRYPOINT [ "dockerize", "-wait", "tcp://db:3306", "-timeout", "60s", "yarn", "start" ]