#!/bin/bash

# 현재 사용자 확인
USER=$(whoami)

# Docker 그룹이 존재하는지 확인하고, 없으면 생성
if ! getent group docker > /dev/null; then
    echo "🔨 Creating 'docker' group..."
    sudo groupadd docker
else
    echo "✅ 'docker' group already exists."
fi

# 현재 사용자를 docker 그룹에 추가
echo "➕ Adding $USER to the 'docker' group..."
sudo usermod -aG docker $USER

# 변경사항 적용 안내
echo "🔄 Changes applied. Please log out and log back in to complete the process."
echo "   After logging back in, you should be able to run 'docker' and 'docker-compose' commands without 'sudo'."

newgrp docker
# 확인 메시지
echo "🚀 Run 'docker ps' to confirm if sudo is no longer needed after logging back in."