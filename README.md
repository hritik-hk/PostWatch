# Alerting System for Monitoring Failed POST Requests

## Overview

This project implements a backend system to monitor failed POST requests and trigger alerts when specific threshold is exceeded. It logs and tracks metrics for failed requests, sends alert email notifications

---

## Features

1. **Request Monitoring**:

   - Monitors POST requests to `/api/submit`.
   - Tracks failed attempts due to invalid or missing access tokens in header.

2. **Threshold-Based Alerts**:

   - Sends Alert email notifications via Google’s SMTP server when failed requests from the same IP exceed a configurable threshold (e.g., 5 attempts within 10 minutes).

3. **Metrics Collection**:

   - Logs failed requests with details such as IP address, timestamp, and failure reason.
   - Exposes a `api/metrics` endpoint for querying failure statistics.

4. **Redis and Task-Queues for Scalability**:

   - **`Redis`**: used tracking failed request, rate limiting ensuring scalabiltiy
   - **`mailTaskQueue`**: Handles email notification tasks.
   - **`monitorTaskQueue`**: Processes request monitoring tasks.

5. **Logging**:

   - **Winston**: For structured logging.
   - **Morgan**: For HTTP request logging.

6. **Scalability**:
   - Uses task queues (BullMQ) for handling heavy workloads and time-consuming tasks efficiently.
   - Designed to handle approximately 500 requests per second.

---

## Tech Stack

- **Backend**: Node.js (TypeScript)
- **Framework**: Express.js
- **Database**: MongoDB
- **In-Memory-Database**: Redis
- **Task Queues**: BullMQ(Redis as message broker)
- **Email**: Google’s SMTP server
- **Logging**: Winston and Morgan

---

---

## Installation and Setup

### Prerequisites

- Node.js
- Docker

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <https://github.com/hritik-hk/PostWatch>
   cd <PostWatch>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run MongoDB and Redis:** Use Docker to start MongoDB and Redis containers:
   ```bash
   docker run --name mongodb -p 27017:27017 -d mongo
   docker run --name redis -p 6379:6379 -d redis
   ```
4. **Set Up Environment Variables:** Create a .env file in the root directory and configure the following variables:
   ```bash
   PORT=
   DB_URL="mongodb://<user>:<password>@<host>:<port>/<database>>?authSource=admin&retryWrites=true&w=majority"
   REDIS_URL="redis://<host>:<port>/<db>"
   MAIL_USER="<mail_user>"
   MAIL_FROM_EMAIL="<mail_from>"
   MAIL_PASSWORD="<password>"
   MAIL_PORT="<mail_port>"
   MAIL_SERVER="<mail_server>"
   REDIS_PORT="<port>"
   REDIS_HOST="<host>"
   ```
5. **Start the Application:**
   ```bash
   npm run dev
   ```
6. **Run Workers**
   ```bash
   npm run worker:mail
   npm run worker:monitor
   ```

---

## Usage

### Endpoints

1. **Monitor POST Requests**:

```http
POST /api/submit
```

- Request body: Any valid JSON.
- Tracks failed attempts due to invalid headers or access tokens.

2. **Metrics**:
   ```http
   GET /metrics
   ```
   - Returns metrics for failed POST requests.

---

## Task Queues & BullMq Workers

### **`mailTaskQueue`**

- Job: Sending Alert email for threshold breaches.
- Worker: `src/workers/mail.worker.ts`.

### **`monitorTaskQueue`**

- Job: Monitor and process request data asynchronously.
- Worker: `src/workers/monitor.worker.ts`.

---

## Logging

- **HTTP Request Logs**: Handled by Morgan (combined with winston).
- **Application Logs**: Handled by Winston

---
