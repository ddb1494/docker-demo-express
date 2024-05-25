# Docker

다양한 개발환경에도 걱정없이 응용프로그램을 설치하고 배포할 수 있는 2013년 출시 갓툴.

## 기본사용

npm 프로젝트에 `Dockerfile`을 만들고 아래와 같이 작성한다.

### Dockerfile

```bash
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "src/app.js" ]
```

#### 설명

1. FROM node:latest `# 최신 node.js 이미지를 기반하기`
2. WORKDIR /app `# 이미지 ~ 위치 지정`
3. COPY . . `# COPY src dst`
4. RUN npm install `# work_dir에서 실행`
5. EXPOSE 3000 `# 3000 port 개방`
6. CMD [ "node", "src/app.js" ] `# work_dir에서 실행`

### 이미지 빌드하기

마치 응용프로그램을 압축한 zip파일과 같이 신기하다.

```bash
docker build -t docker-demo-express .
# docker build -t docker-demo-express:latest .
# 위 명령행과 같은 효력이다.
```

```bash
docker build -t docker-demo-express:v1 .
```

-t 옵션을 사용하면 image에 원하는 이름을 붙일 수 있다. `{image_name}:{tag}` 의 형태로 사용하며, `{tag}`를 붙이지 않을경우 자동으로 `latest`가 된다.

`.` 는 현재 work_dir에서 실행한다는 의미다. 이 위치에서 `COPY` 커맨드가 실행된다.

### 컨테이너 실행하기

컨테이너는 이미지의 인스턴스다.

```
docker run -d -p 3000:3000 docker-demo-express:v-1 >> CID
```

### 컨테이너 터미널 열기

```bash
docker ps
docker exec -it <container_id_or_name> /bin/bash
docker exec -it <container_id_or_name> /bin/bash -c "ls /"
docker exec -it <container_id_or_name> /bin/bash -c "ls / && exec /bin/bash"
```

## Network

- Docker사이에는 사설 Network로 통신 가능하다.

```bash
docker network ps  # 네트워크 리스트 조회
docker network create <network_name>  # 네트워크 생성
docker network remove <network_name>  # 네트워크 삭제
```

- Network가 존재하면 해당 네트워크에서 컨테이너를 실행할 수 있다.

```bash
docker run --name mdb --network dden -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=my_db -d mariadb:latest
docker run --name dde --network <network_name> -d -p 3000:3000 docker-demo--express:v1 >> CID
```

## 여러 서비스를 묶어서 실행하기

### docker-compose.yml

```yml
version: '3.8'

name: docker-demo

services:
  web:
    image: docker-demo-express:v1
    ports:
      - '80:3000'
    volumes:
      - ./public:/app/public
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
    networks:
      - docker_demo_network

  db:
    image: mariadb:latest
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: my_db
      MYSQL_PASSWORD: root
    volumes:
      - ./mysql:/var/lib/mysql
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

    networks:
      - docker_demo_network

networks:
  docker_demo_network:
    driver: bridge
```

특정 서비스들을 모아서 실행.

```bash
docker-compose up -d
```

- 셋팅 파일을 참고하여 여러 컨테이너 실행.

```bash
docker-compose down
```

- 셋팅 파일을 바탕으로 여러 컨테이너와 네트워크를 중지하고 삭제하기.

```bash
docker-compose logs -f
```

```bash
docker-compose restart      # 모든 서비스 재실행
docker-compose restart web  # web 서비스만 재실행
docker-compose restart db   # db 서비스만 재실행
```

## hub.docker.com 에 이미지 배포하기

이미지를 정상적으로 배포할려면 우선 웹에서 `계정`을 로그인하고 `Repository`를 만들어야 한다.

### 터미널에서 로그인하기

```bash
docker login
```

전제는 웹에서 계정을 만들어야 한다.

- Username: 계정 입력.
- Password: 암호 입력.

### 이미지 빌드 (docker_image_name과 repository)

```bash
docker build -t ddb1494/docker-demo-express:v1 .
```

`ddb1494`는 `<user_id>` 이다.

도커 허브의 계정은 웹에서 만들어야 한다.

### 이미지 푸시(docker_image_name과 repository)

```bash
docker push -t ddb1494/docker-demo-express:v1
```

### 이미지 가져오기

```bash
docker pull ddb1494/docker-demo-express:v1
```

### 이미지 삭제

```bash
docker rmi ddb1494/docker-demo-express:v1
```

### 이미지 실행

```bash
docker run -p 80:3000 carrykim/docker-memo-express:v1
```
