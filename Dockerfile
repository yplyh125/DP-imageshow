# Node.js {사용할 node 버전} 이미지를 기반으로 빌드 단계를 설정
FROM node:16.20.2 as BUILD

# 컨테이너 내 작업 디렉토리를 /app으로 설정
WORKDIR /app

# package.json과 yarn.lock 파일을 컨테이너로 복사
COPY package.json /

# 의존성을 설치 (frozen-lockfile로 버전을 고정하고, 네트워크 타임아웃 설정)
RUN npm i

# 프로젝트의 모든 파일을 컨테이너로 복사
COPY . .

# 애플리케이션을 빌드
RUN npm run build

# Nginx {사용할 nginx 버전} (Alpine Linux 기반) 이미지를 최종 실행 단계로 설정
FROM nginx:1.26-alpine

# 빌드 단계에서 생성된 빌드 결과물을 /app 디렉토리에 복사
COPY --from=BUILD /app/dist /app

# 환경 설정 스크립트를 Nginx의 엔트리포인트 디렉토리에 복사
# COPY env.sh /docker-entrypoint.d/40-env.sh

# 환경 설정 스크립트에 실행 권한 부여
# RUN chmod +x /docker-entrypoint.d/40-env.sh

# Nginx 설정 파일을 복사하여 기본 설정 파일로 사용
COPY default.conf /etc/nginx/conf.d/default.conf
