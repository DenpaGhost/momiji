FROM node

# locale & timezone (Asia/Tokyo)
# https://github.com/moby/moby/issues/12084
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

# アプデとvim
RUN apt-get update && \
    apt-get install -y vim

# アプリのディレクトリ作成
RUN mkdir -p /src