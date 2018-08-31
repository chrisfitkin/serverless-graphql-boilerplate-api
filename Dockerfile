FROM node:8.10

WORKDIR /usr/app

# Add Java for dynamodb-local
RUN echo "deb http://http.debian.net/debian jessie-backports main" | \
      tee --append /etc/apt/sources.list.d/jessie-backports.list > /dev/null && \
     apt-get update -y && \
     apt-get install -t jessie-backports openjdk-8-jdk -y && \
     update-java-alternatives -s java-1.8.0-openjdk-amd64

COPY package.json .
RUN npm install # --quiet
RUN npm install -g serverless --ignore-scripts spawn-sync


COPY . .