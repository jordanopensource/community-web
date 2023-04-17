# set global args
ARG HOST=0.0.0.0 PORT=3000 USER=node TARGET_ENV DRONE_COMMIT_SHA=${DRONE_COMMIT_SHA} DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER} DRONE_BUILD_LINK=${DRONE_BUILD_LINK} DRONE_COMMIT_LINK=${DRONE_COMMIT_LINK} DRONE_REPO_LINK=${DRONE_REPO_LINK} DRONE_BUILD_FINISHED=${DRONE_BUILD_FINISHED} DEBUG='false' SESSION_COOKIE_NAME='connect.sid'

###########
# BUILDER #
###########
FROM node:18.14.0 AS builder

# pass the global args
ARG HOST
ARG PORT
ARG TARGET_ENV
ARG DRONE_COMMIT_SHA
ARG DRONE_BUILD_NUMBER
ARG DRONE_BUILD_LINK
ARG DRONE_COMMIT_LINK
ARG DRONE_REPO_LINK
ARG DRONE_BUILD_FINISHED
ARG DEBUG
ARG SESSION_COOKIE_NAME

# copy build context and install dependencinpm res
WORKDIR /workspace
COPY . .
RUN npm install

# inject build args as enviroment variables
ENV HOST=${HOST} PORT=${PORT} TARGET_ENV=${TARGET_ENV} DRONE_COMMIT_SHA=$DRONE_COMMIT_SHA DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER} DRONE_BUILD_LINK=${DRONE_BUILD_LINK} DRONE_COMMIT_LINK=${DRONE_COMMIT_LINK} DRONE_REPO_LINK=${DRONE_REPO_LINK} DRONE_BUILD_FINISHED=${DRONE_BUILD_FINISHED} DEBUG=${DEBUG} SESSION_COOKIE_NAME=${SESSION_COOKIE_NAME}
# build NuxtJS project
RUN npm run build

###########
# PROJECT #
###########
FROM node:18-slim

# pass the global args
ARG HOST
ARG PORT
ARG USER
ARG TARGET_ENV
ARG DRONE_COMMIT_SHA
ARG DRONE_BUILD_NUMBER
ARG DRONE_BUILD_LINK
ARG DRONE_COMMIT_LINK
ARG DRONE_REPO_LINK
ARG DRONE_BUILD_FINISHED
ARG DEBUG
ARG SESSION_COOKIE_NAME

# copy builder output to project workdir
WORKDIR /app
COPY --from=builder --chown=${USER}:${USER} /workspace/.nuxt /app/.nuxt
COPY --from=builder --chown=${USER}:${USER} /workspace/.output /app/.output
COPY --from=builder --chown=${USER}:${USER} /workspace/node_modules /app/node_modules
COPY --from=builder --chown=${USER}:${USER} /workspace/package.json /app/

# inject build args as enviroment variables
ENV HOST=${HOST} PORT=${PORT} TARGET_ENV=${TARGET_ENV} DRONE_COMMIT_SHA=${DRONE_COMMIT_SHA} DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER} DRONE_BUILD_LINK=${DRONE_BUILD_LINK} DRONE_COMMIT_LINK=${DRONE_COMMIT_LINK} DRONE_REPO_LINK=${DRONE_REPO_LINK} DRONE_BUILD_FINISHED=${DRONE_BUILD_FINISHED} DEBUG=${DEBUG} SESSION_COOKIE_NAME=${SESSION_COOKIE_NAME}

# set user context
USER ${USER}

# expose port
EXPOSE ${PORT}

# run for production
CMD [ "npm", "run", "start"]
