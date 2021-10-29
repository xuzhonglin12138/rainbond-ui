#!/bin/bash
if [ -z "$VERSION" ]; then
	if [ -z "$TRAVIS_TAG" ]; then
		VERSION=$TRAVIS_BRANCH-dev
	else
		VERSION=$TRAVIS_TAG
	fi
fi

BASE_VERSION=V5.3
IMAGE_NAME="image.goodrain.com/rainbond-ui:$VERSION"
DOMESTIC_NAMESPACE=${DOMESTIC_NAMESPACE:-'goodrain'}
BASE_VERSION=V5.3

echo "$DOCKER_PASSWORD" | docker login ${IMAGE_DOMAIN} -u "$DOCKER_USERNAME" --password-stdin
docker build --build-arg VERSION="${BASE_VERSION}" --build-arg IMAGE_DOMAIN="${IMAGE_DOMAIN}" --build-arg IMAGE_NAMESPACE="${IMAGE_NAMESPACE}" -t ${IMAGE_NAME} .
docker push ${IMAGE_NAME}
