FROM nginx:stable
RUN apt-get -y update && apt-get -y install git
WORKDIR /usr/src
RUN git clone -b main https://github.com/Ada18980/KinkyDungeonStandalone.git .

ARG USER=Ada18980
ARG REPO=Bondage-College
ARG BRANCH=master
ARG COMMIT=318f6068d2514c7986cfa08afc7a1c6c05fd4563

RUN printf "// Strategy:\n"\
"// 1. If commit= is specified, use that commit (using user/repo if specified)\n"\
"// 2. If v=latest, or any of user/repo/branch are specified, query github API for the latest commit from said branch\n"\
"// 3. Use the default commmit (stable) specified here\n"\
"const USER = %s'$USER';\n"\
"const REPO = %s'$REPO';\n"\
"const BRANCH = %s'$BRANCH';\n"\
"const COMMIT = %s'$COMMIT'; // Stable\n" > ./src/sourceBranch.js

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]