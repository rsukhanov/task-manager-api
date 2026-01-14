# Task Manager API 🚀

Backend API for managing tasks and projects. Includes user registration, secure JWT authentication, and MongoDB integration. Built with NestJS and Prisma.

## 🛠 Tech Stack

* **Framework:** [NestJS] (Node.js/TypeScript)
* **Database:** MongoDB
* **ORM:** Prisma
* **Authentication:** Passport.js & JWT
* **Documentation:** Swagger (OpenAPI)
* **Testing:** Jest & Supertest 
* **Containerization:** Docker (for Database)

---

## ⚡️ Getting Started with Docker

Follow these steps to set up the environment and run the project locally with Docker.

### 1. Set up .env file with required fields:

JWT_SECRET

MONGO_PASSWORD

### 2. Start the Docker Container:

```bash
docker compose up --build
```

See your server online on http://localhost:4100

## 📚 API Documentation

The API is fully documented using Swagger. Once the server is running, visit:

👉 http://localhost:4100/api

## 🧪 Testing

The project supports End-to-End testing. You can run tests in two modes depending on your setup.

You can create .env.test with DATABASE_URL for testing and run:

```bash
npm run test:separate-db
```

or run test with the main database:

```bash
npm run test
```