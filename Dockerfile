# set global args
ARG COMMUNITY_API_URL=https://community.api.dev.josa.ngo/v1 HOST=0.0.0.0 PORT=3000 USER=node

###########
# BUILDER #
###########
FROM node:16-alpine3.14 AS builder

# pass the global args
ARG COMMUNITY_API_URL
ARG HOST
ARG PORT

# copy build context and install dependencies
WORKDIR /workspace
COPY . .
RUN npm install

# inject build args as enviroment variables
ENV COMMUNITY_API_URL=${COMMUNITY_API_URL} HOST=${HOST} PORT=${PORT}

# build NuxtJS project
RUN npm run build

###########
# PROJECT #
###########
FROM node:16-slim

# pass the global args
ARG COMMUNITY_API_URL
ARG HOST
ARG PORT
ARG USER

# copy builder output to project workdir
WORKDIR /app
COPY --from=builder --chown=${USER}:${USER} /workspace/.nuxt /app/.nuxt
COPY --from=builder --chown=${USER}:${USER} /workspace/.output /app/.output
COPY --from=builder --chown=${USER}:${USER} /workspace/node_modules /app/node_modules
COPY --from=builder --chown=${USER}:${USER} /workspace/package.json /app/

# inject build args as enviroment variables
ENV COMMUNITY_API_URL=${COMMUNITY_API_URL} HOST=${HOST} PORT=${PORT}

# set user context
USER ${USER}

# expose port
EXPOSE ${PORT}

# run for production
CMD [ "npm", "run", "start"]
