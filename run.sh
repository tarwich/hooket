#!/bin/bash

NAME=foo
REPO=github.com/tarwich/hooket

# Get the hash of the current version
CURRENT_HASH=$(git rev-parse HEAD)
# Get any new data
git pull
# Get the hash of the new version
NEW_HASH=$(git rev-parse HEAD)

# If the hashes have changed then we're going to need to redeploy
if [ "$CURRENT_HASH" != "$NEW_HASH" ] ; then
  ID=$(docker ps -q --filter name=$NAME)
  if [ -n "$ID" ] ; then
    docker kill $ID
  fi
fi

# Run hooket
ID=$(docker ps -aq --filter name=$NAME)

if [ -z "$ID" ] ; then
  docker build --rm -t $NAME $REPO
  docker run -d --name $NAME $NAME start
fi
