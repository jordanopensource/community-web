# set global args
ARG USER=node DRONE_COMMIT_SHA=${DRONE_COMMIT_SHA} DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER} DRONE_BUILD_LINK=${DRONE_BUILD_LINK} DRONE_COMMIT_LINK=${DRONE_COMMIT_LINK} DRONE_REPO_LINK=${DRONE_REPO_LINK} DRONE_BUILD_FINISHED=${DRONE_BUILD_FINISHED}

###########
# BUILDER #
###########
FROM node:18.14.0 AS builder

# pass the global args
ARG DRONE_COMMIT_SHA
ARG DRONE_BUILD_NUMBER
ARG DRONE_BUILD_LINK
ARG DRONE_COMMIT_LINK
ARG DRONE_REPO_LINK
ARG DRONE_BUILD_FINISHED

# copy build context and install dependencinpm res
WORKDIR /workspace
COPY . .
RUN npm install

# inject build args as enviroment variables
ENV DRONE_COMMIT_SHA=$DRONE_COMMIT_SHA DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER} DRONE_BUILD_LINK=${DRONE_BUILD_LINK} DRONE_COMMIT_LINK=${DRONE_COMMIT_LINK} DRONE_REPO_LINK=${DRONE_REPO_LINK} DRONE_BUILD_FINISHED=${DRONE_BUILD_FINISHED}
# build NuxtJS project
RUN npm run build

###########
# PROJECT #
###########
FROM node:18-slim

# pass the global args
ARG USER

# copy builder output to project workdir
WORKDIR /app
COPY --from=builder --chown=${USER}:${USER} /workspace/package.json /app/
COPY --from=builder --chown=${USER}:${USER} /workspace/.output /app/.output

# set user context
USER ${USER}

# expose port
EXPOSE ${PORT}

# run for production
CMD [ "node", "/app/.output/server/index.mjs"]