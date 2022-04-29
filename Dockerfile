FROM nginx:stable
RUN apt-get -y update && apt-get -y install git
WORKDIR /usr/src
RUN git clone -b main https://github.com/Ada18980/KinkyDungeonStandalone.git .

ADD ./script.sh .
RUN chmod 755 script.sh && ./script.sh

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]