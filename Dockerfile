FROM node:18

# 빌드를 위한 임시 폴더 생성
RUN mkdir -p /var/app

# 실행 위치 설정
WORKDIR /var/app

# COPY [현재 실행 폴더] [WORKDIR]
COPY . .

# 빌드
RUN npm install
RUN npm run build

# 실행 포트 설정
EXPOSE 3000

# 실행시킬 명령어
CMD [ "node", "dist/main.js" ]
