FROM python:3.8
COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y \
    apt-utils \
    libgl1-mesa-glx \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*
RUN python3 -m venv venv
ENV PATH="/app/venv/bin:$PATH"
RUN python3 -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
EXPOSE 8000
HEALTHCHECK CMD curl --fail http://localhost:8000/_stcore/health
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
