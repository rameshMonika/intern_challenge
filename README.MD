# 2025_RameshMonika - Oracle Internship Technical Challenge

This repository contains the full solution for the Oracle Java Management Service internship technical challenge. The goal is to develop a REST API and optional frontend UI that calculates the minimum number of coins needed to reach a target amount, and deploy it using Docker and a cloud provider.

---

## 🔧 Technologies Used

- **Backend**: Node.js with Express
- **Frontend**: React
- **Containerization**: Docker + Docker Compose
- **Deployment**: Google Cloud Compute Engine (GCE)
- **Optional**: NGINX as a frontend reverse proxy

---

## 📌 Features

### ✅ Challenge 1: REST API (Logic & Problem Solving)
- `POST /api/coins`: Accepts a target amount and coin denominations, and returns the minimum number of coins needed.
- `GET /api`: Health check route (returns `"Hello World!"`)
- Input validation and error handling included.
- Unit test coverage for main backend logic.

### ✅ Challenge 2: Docker Containerization
- Separate Dockerfiles for both React frontend and Node.js backend
- Docker Compose orchestrates the multi-container setup
- NGINX serves the React app and proxies API calls to backend

### ✅ Challenge 3: Cloud Deployment
- App deployed on a Google Cloud VM
- Backend exposed on port `5000`, frontend via NGINX on port `80`
- Public IP available and HTTP traffic allowed
- Verified deployment of full stack in cloud environment

---

## 🖥️ How to Run Locally

### ⚙️ Prerequisite

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) on your machine.
- Ensure Docker Compose is enabled and working (`docker compose version`).

### 🚀 Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rameshMonika/intern_challenge.git
   cd intern_challenge

2. **Build and run using Docker Compose**:
 
    docker compose up --build -d

3. **Run Backend Unit Tests**

    cd server
    npm install
    npm test



## Deployment Notes

1.  nginx.conf Configuration (client/nginx.conf)
This file controls how frontend requests are proxied to the backend API.

```bash 
location /api/ {
    # For local development (e.g. Docker Compose on local machine)
    proxy_pass http://localhost:5000;

    # For production deployment (Docker Compose on cloud VM)
    # proxy_pass http://server:5000;
}
```
2. React App.js Backend URL

```bash
// For local development
const backendUrl = "http://localhost:5000";

// For cloud deployment (public IP of VM)
const backendUrl = "http://34.126.137.168"; // Replace with your actual VM IP
```

3. Rebuild frontend

```bash
cd client
npm run build
```

4. Rebuil and redploy container

``` bash
docker compose up --build -d

```
