FROM debian:bullseye-20220527

RUN apt update && apt install vim sudo curl wget git python3 python3-pip -y

RUN useradd -s /bin/bash -G sudo -m dev

RUN echo 'dev:dev' |chpasswd

RUN sed -i 's/%sudo	ALL=(ALL:ALL) ALL/%sudo	ALL=(ALL:ALL) NOPASSWD:ALL/g' /etc/sudoers

USER dev

RUN mkdir -p /home/dev/.vscode-server/extensions

ENV PATH=$PATH:/home/dev/.local/bin

RUN pip3 install httpserver
