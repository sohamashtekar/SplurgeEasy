# Stage 1 frontend app
# FROM node:21-alpine3.17 as frontendbuilder

# WORKDIR /src/front-end

# COPY /front-end/package*.json .

# COPY /front-end/public /src/front-end/public

# COPY /front-end/src /src/front-end/src

# RUN npm install

# RUN npm run build


# Stage 2 backend app
FROM python:3.8-slim as backendbuilder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT=8000

# Update apt
RUN \
    apt-get -q -y update; \
    apt-get -q -y install nginx; \
    apt-get -q -y install postgresql;

# Set work directory
WORKDIR /src/back-end

# Install dependencies
COPY /back-end/requirements.txt /src/back-end

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY /back-end /src/back-end/

CMD ["sh", "-c", "cd /src/back-end && python manage.py collectstatic && python manage.py migrate && python manage.py runserver 0.0.0.0:$PORT"]


