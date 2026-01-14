# Task Manager API 🚀

Backend API for managing tasks and projects. Includes user registration, secure JWT authentication, and MongoDB integration. Built with NestJS and Prisma.

> 🐳 **Docker Note:** Want to run the entire stack (NestJS + MongoDB) in containers without installing Node.js?  
> Check out the **[full-docker branch](https://github.com/rsukhanov/task-manager-api/tree/docker)** for a fully containerized setup.

## 🛠 Tech Stack

* **Framework:** [NestJS] (Node.js/TypeScript)
* **Database:** MongoDB
* **ORM:** Prisma
* **Authentication:** Passport.js & JWT
* **Documentation:** Swagger (OpenAPI)
* **Testing:** Jest & Supertest 
* **Containerization:** Docker (for Database)

---

## ⚡️ Getting Started

Follow these steps to set up the environment and run the project locally.

### 1. Set up .env file with required fields:
DATABASE_URL

JWT_SECRET

optional: MONGO_PASSWORD


### 2. Set up your MongoDB server or start MongoDB in Docker (needed MONGO_PASSWORD in .env)
```bash
npm run docker:up
```


### 3. Install, init database and start

```bash
npm install

npm run db:init

npm run start:dev
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