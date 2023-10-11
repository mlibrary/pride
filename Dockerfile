FROM node:20.8.0

ARG UID
ARG GID
ARG UNAME=app
ENV APP_HOME /app

#Create the group for the user
RUN if [ x"${GID}" != x"" ] ; \
    then groupadd ${UNAME} -g ${GID} -o ; \
    else groupadd ${UNAME} ; \
    fi

#Create the User and assign ${APP_HOME} as its home directory
RUN if [ x"${UID}" != x"" ] ; \
    then  useradd -m -d ${APP_HOME} -u ${UID} -o -g ${UNAME} -s /bin/bash ${UNAME} ; \
    else useradd -m -d ${APP_HOME} -g ${UNAME} -s /bin/bash ${UNAME} ; \
    fi

WORKDIR $APP_HOME
USER $UNAME

COPY --chown=${UNAME}:${UNAME} ./package.json ./package-lock.json /app/
RUN npm install && npm cache clean --force

COPY . /app

CMD tail -f /dev/null
