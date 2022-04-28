FROM nginx:stable
RUN apt-get -y update
RUN apt-get -y install git
WORKDIR /usr/src
RUN git clone https://github.com/Ada18980/KinkyDungeonStandalone.git /usr/src/html
COPY ./usr/src/. /usr/share/nginx/html/

EXPOSE 8000