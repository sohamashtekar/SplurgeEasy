FROM python:3.8-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Update apt
RUN \
    apt-get -q -y update; \
    apt-get -q -y install nginx

# Set work directory
WORKDIR /code

# Install dependencies
COPY requirements.txt /code/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . /code/

EXPOSE 8000