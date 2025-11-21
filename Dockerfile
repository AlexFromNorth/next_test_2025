FROM ubuntu:24.04

RUN apt-get update && apt-get install -y curl ca-certificates
RUN curl -fsSL https://bun.sh/install | bash -s -- --prefix /usr/local

ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app
COPY . /app

RUN bun install
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
