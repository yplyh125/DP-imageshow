#!/bin/bash

# 설정
IMAGE_NAME="dogugonggan/exhibition-default"
IMAGE_TAG="DPImageShow"
PLATFORMS="linux/amd64,linux/arm64" # 멀티 플랫폼 설정

# 빌더 설정 확인 및 생성
BUILDER_NAME="multiarch_builder"

echo "��� Checking if builder $BUILDER_NAME exists..."
if ! docker buildx inspect "$BUILDER_NAME" &>/dev/null; then
    echo "��� Builder $BUILDER_NAME does not exist. Creating..."
    docker buildx create --name "$BUILDER_NAME" --use
    docker buildx inspect --bootstrap
else
    echo "✅ Builder $BUILDER_NAME already exists. Using existing builder."
    docker buildx use "$BUILDER_NAME"
fi

# Docker 이미지 빌드 및 푸시
echo "��� Building and pushing Docker image $IMAGE_NAME:$IMAGE_TAG for platforms: $PLATFORMS"
docker buildx build --platform "$PLATFORMS" -t "$IMAGE_NAME:$IMAGE_TAG" --push .

# 빌드 및 푸시 완료 메시지
if [ $? -eq 0 ]; then
    echo "��� Successfully built and pushed $IMAGE_NAME:$IMAGE_TAG to Docker Hub!"
else
    echo "❌ Build or push failed. Please check the logs for details."
    exit 1
fi

