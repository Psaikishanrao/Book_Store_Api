# 📚 Book Store API

A RESTful **Book Store API** built using **Node.js**, **Express**, **MongoDB**, and **Redis** for efficient book management with caching and rate-limiting features. The API also includes **Role-Based Access Control (RBAC)** for secure endpoint access and **Mock Redis** for testing environments.

---

## 📖 Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Getting Started](#getting-started)  
   - [Forking and Cloning](#forking-and-cloning)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
5. [Environment Variables](#environment-variables)  
6. [API Endpoints](#api-endpoints)  
7. [Redis & Mock Redis Integration](#redis--mock-redis-integration)  
8. [Testing](#testing)  
9. [Example Responses](#example-responses)  
10. [Rate Limiting Demonstration](#rate-limiting-demonstration)  
11. [Postman Documentation](#postman-documentation)  
12. [Project Structure](#project-structure)  
13. [License](#license)  

---

## 🧩 Overview
The **Book Store API** allows users to manage book records with the following features:  
- ✅ Perform **CRUD** operations (Create, Read, Update, Delete) for books.  
- ✅ **Redis Caching** for faster responses.  
- ✅ **Rate Limiting** to prevent API abuse.  
- ✅ **Role-Based Access Control (RBAC)** for Admin and User roles.  
- ✅ **Mock Redis Integration** for testing without a live Redis server.  

---

## 🎯 Features
- 📌 **CRUD Operations**: Manage books with Create, Read, Update, and Delete functionality.  
- 🚀 **Redis Caching**: Speeds up data retrieval and reduces database load.  
- 📊 **MongoDB Integration**: Persistent data storage for books.  
- 🔒 **RBAC**: Secure API endpoints with Admin/User role access.  
- ⚡ **Rate Limiting**: Limits the number of requests per minute for each user.  
- 🧪 **Mock Redis**: Simulate Redis in testing environments.  

---

## 💡 Technologies Used
- **Node.js**  
- **Express.js**  
- **MongoDB & Mongoose**  
- **Redis & Mock Redis**  
- **JWT for Authentication**  
- **Jest for Testing**  

---

## 🚀 Getting Started

### 📥 Forking and Cloning
1. Go to the [GitHub Repository](https://github.com/Psaikishanrao/Book_Store_Api.git).  
2. **Fork** the repository to your GitHub account.  
3. Clone the forked repository:  
   ```bash
   git clone https://github.com/your-username/Book_Store_Api.git
   cd Book_Store_Api
   ```  

### 📦 Prerequisites
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)  
- [Redis Server](https://redis.io/)  

### 📦 Installation
1. Install project dependencies:  
   ```bash
   npm install
   ```  
2. Ensure **MongoDB** and **Redis** servers are running.  
3. Start the application:  
   ```bash
   npm start
   ```  
4. The server will run at: `http://localhost:3000`  

---

## 📑 Environment Variables
Create a `.env` file in the root directory with the following:  
```plaintext
PORT=3000
MONGODB_URL=mongodb://localhost:27017/bookstore
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

---

## 📡 API Endpoints

### 🚪 Public Endpoints
- **Welcome Endpoint:**  
   - `GET /`  
   - Response:  
     ```json
     { "status": 200, "message": "Welcome to the Book Store API" }
     ```  

### 📚 Book Endpoints (Protected)
| **Method** | **Endpoint**       | **Description**             | **Role Required** |
|------------|--------------------|-----------------------------|-------------------|
| `GET`      | `/books`           | Retrieve all books          | Admin/User       |
| `POST`     | `/books`           | Create a new book           | Admin            |
| `PUT`      | `/books/:id`       | Update a book by ID         | Admin            |
| `DELETE`   | `/books/:id`       | Delete a book by ID         | Admin            |

---

## 🗃️ Redis & Mock Redis Integration

### **Redis Caching**
- **Purpose:** Speeds up response time and reduces database queries.  
- **Configuration:** Handled using `redis` npm package.  

### **Mock Redis for Testing**
- **Purpose:** Simulates Redis behavior during testing without an actual Redis server.  
- **Use Case:** Useful for CI/CD pipelines and local tests.  
- **Library:** `ioredis-mock`  

---

## ✅ Testing
### 📦 Running Tests
```bash
npm test
```  
- **Unit Tests:** Check individual functions.  
- **Integration Tests:** Validate endpoint responses and caching behavior.  
- **Mock Redis:** Used during tests for simulating cache operations.  

---

## 📊 Example Responses

### ✅ Fetch Books (Database)
```json
{
  "status": 200,
  "source": "database",
  "data": [
    {
      "_id": "677e906f1204f66cee7861da",
      "title": "Harry Potter and the Chamber of Secrets",
      "author": "J.K. Rowling",
      "createdAt": "2025-01-08T14:49:19.714Z"
    }
  ]
}
```

### ✅ Fetch Books (Cache)
```json
{
  "status": 200,
  "source": "cache",
  "data": [
    {
      "_id": "677e906f1204f66cee7861da",
      "title": "Harry Potter and the Chamber of Secrets",
      "author": "J.K. Rowling",
      "createdAt": "2025-01-08T14:49:19.714Z"
    }
  ]
}
```

---

## 🚦 Rate Limiting Demonstration
- **Limit:** 10 requests per minute per user.  
- **How to Test:**  
   ```bash
   curl -H "x-user-id: user1" -H "x-role: Admin" http://localhost:3000/books
   ```  
- **Expected Response (after exceeding limit):**  
```json
{
  "status": 429,
  "error": "Too many requests. Please try again later."
}
```

---

## 📬 Postman Documentation
Explore the complete API using **Postman**:  
👉 [Postman Documentation Link](https://documenter.getpostman.com/view/37128992/2sAYJAfxvR)  

---

## 📂 Project Structure
```plaintext
📦 Book_Store_Api
├── 📂 src
│   ├── 📂 controllers   # Route Handlers
│   ├── 📂 models        # Mongoose Models
│   ├── 📂 routes        # API Route Definitions
│   ├── 📂 services      # Business Logic & Redis Caching
│   └── 📂 tests         # Unit & Integration Tests
├── 📄 index.js          # Main Entry Point
├── 📄 db.js             #Database Connection
├── 📄 package.json      # Dependencies & Scripts
├── 📄 README.md         # Project Documentation
└── 📄 .env              # Environment Variables
```

---

## 📜 License
This project is licensed under the **MIT License**.  

---

🎯 **Contributions Welcome!**  
Feel free to open issues or submit pull requests. 😊  

---