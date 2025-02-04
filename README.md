# Chest X-Ray Diagnosis Web Application

## Introduction

This web application is a diagnostic support system through chest X-ray images, using artificial intelligence to analyze and give suggestions about possible pathologies. The application includes both a user interface (frontend) and a processing system (backend), allowing users to upload X-ray images and receive quick diagnosis results.

## Key Features

* **Upload X-ray images:** Allows users to upload multiple chest X-ray images.
* **Image processing:** Preprocess images to optimize for analysis (e.g. normalize, resize...).
* **AI diagnosis:** Use AI models to analyze images and make predictions about pathology.
* **Result display:** Present diagnosis results clearly.
* **User management:** Allows users to register, log in and manage personal information.
* **History storage:** Stores the user's diagnosis history.

## Technologies Used

*   **Frontend:**
    *   **ReactJs**
*   **Backend:**
    *   **Django**
    *   **Database: MongoDB**
    *   **Reverse proxy: Nginx**
*   **Deployment:**
    *   **Docker**
    *   **Docker Compose**


## Usage

1. **Clone repository:**

```bash
git clone <repository_url>
cd ChestXRay_Diagnosis
```

2. **Run Backend and Fontend with Docker Compose:**

* Make sure you have Docker and Docker Compose installed.
* Navigate to the directory containing the `docker-compose.yml` file:

```bash
cd ChestXRay_Diagnosis
```

* Run the following command to build the images and start the containers:

```bash
docker-compose up --build -d
```

3. **Check the container status:**

```bash
docker-compose ps
```

4. **View logs (if needed):**

```bash
docker-compose logs api_database
```

5. **Access the application:**

* Open a browser and access the application's address.
  `http://localhost:3000` (or the server's IP address)

