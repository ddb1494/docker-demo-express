### Dockerfile

👉 `FROM` 이란 Docker image를 생성할 때 기본으로 사용할 base image를 적는 부분입니다.
👉 `COPY src dst` 호스트 머신에 있는 파일이나 폴더를, dst라는 위치에 저장합니다.
👉 `RUN script` 는 script를 실행합니다
👉 `CMD` 는 생성된 docker image를 실행할 때 자동으로 실행되는 커맨드 입니다.

### Build image

```
docker build -t my-express-docker-demo-app:v-1 .
```

👉 -t 옵션을 사용하면 image에 원하는 이름을 붙일 수 있습니다. `{image_name}:{tag}` 의 형태로 사용하며, `{tag}`를 붙이지 않을경우 자동으로 `latest`가 됩니다.
👉 `.` 는 docker build를 어느 위치에서 실행할 것인지 정의합니다. 이 위치에 따라 `COPY` 커맨드에서 호스트의 파일 위치를 사용하는게 바뀔 수 있습니다.

### Run image

```
docker run -d -p 3000:3000 my-express-docker-demo-app:v-1 >> CID
```
