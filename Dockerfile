FROM nginx:stable
RUN apt-get -y update
RUN apt-get -y install git
WORKDIR /usr/src
RUN git clone https://github.com/Ada18980/KinkyDungeonStandalone.git /usr/src/html
WORKDIR /usr/src
COPY . /usr/share/nginx/

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]