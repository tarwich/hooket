#!/bin/bash

set -x

NAME=foo
REPO=github.com/tarwich/hooket

# Get any new data
git pull
# Get the hash of the new version
NEW_HASH=$(git rev-parse HEAD)

# If the hashes have changed then we're going to need to redeploy
if [ -z $(docker ps -qa --filter label=rev=$NEW_HASH) ] ; then
  # Kill the current image
  ID=$(docker ps -qa --filter name=$NAME)
  if [ -n "$ID" ] ; then
    docker stop $ID
    docker rm $ID
  fi
fi

# Run hooket
ID=$(docker ps -qa --filter name=$NAME)

if [ -z "$ID" ] ; then
  docker build --rm -t $NAME $REPO
  docker run -d --label rev=$NEW_HASH --name $NAME $NAME start
fi
