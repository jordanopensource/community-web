FROM node:16-alpine3.14

# install node_modules
COPY package*.json /tmp/
RUN cd /tmp && npm install

# copy application into image
WORKDIR /app
COPY . .

# move node_modules into application root
RUN mv /tmp/node_modules .

# declare environment variables
ENV BASE_API_URL https://community.api.dev.josa.ngo
ENV HOST 0.0.0.0
ENV PORT 3000

# build NuxtJS project
RUN npm run build

# run for production
CMD [ "npm", "run", "start"]
