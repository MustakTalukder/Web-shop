FROM python:3.10

# Set work directory
WORKDIR /code

# Set environment variables
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip 

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt -v

# Copy project
COPY . /code/