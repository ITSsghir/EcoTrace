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

# Install dockerize
ENV DOCKERIZE_VERSION v0.7.0
ENV DOCKERIZE_ARCH dockerize-linux-amd64

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/${DOCKERIZE_ARCH}-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

# Expose the port
EXPOSE 3000

# Start the app
ENTRYPOINT [ "dockerize", "-wait", "tcp://db:3306", "-timeout", "60s", "yarn", "start" ]