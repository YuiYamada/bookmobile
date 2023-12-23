FROM arm64v8/ubuntu:focal

ARG pakege="curl wget vim unzip zip git"

RUN mkdir /root/projects
WORKDIR /root/projects

RUN apt -y update && apt -y upgrade \
    && apt -y install $pakege

RUN curl -s https://gist.githubusercontent.com/LukeChannings/09d53f5c364391042186518c8598b85e/raw/ac8cd8c675b985edd4b3e16df63ffef14d1f0e24/deno_install.sh | sh

RUN echo "DENO_INSTALL=\"/root/.deno\"" >> /root/.bashrc
RUN echo "PATH=\"\$DENO_INSTALL/bin:\$PATH\""  >> /root/.bashrc

ENV PATH DENO_INSTALL="/root/.deno"
ENV PATH $PATH:$DENO_INSTALL/bin

