# KnowledgeHub Backend

This is a backend system for a Wikipedia-style knowledge-sharing platform built using Node.js, Express, and MongoDB.

The goal of KnowledgeHub is to provide a space where users can create, share, and explore articles, while also supporting moderation, user roles, and secure access. The backend exposes a set of REST APIs that handle everything from authentication to content management and admin controls.

## About the Project

This project was created as part of an academic submission for the SESD subject. While it follows good development practices and is fully functional, its primary purpose is learning, experimentation, and demonstration.

---

## Tech Stack

The backend is built using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (for authentication)
* bcrypt.js (for password security)
* dotenv
* Nodemon

---

## Key Features

### Authentication & Security

* Secure login and signup using JWT
* Passwords are hashed using bcrypt
* Middleware-based route protection
* Role-based access control

---

### User Roles

There are three types of users in the system:

* **Reader**

  * Can browse articles
  * Can comment and bookmark content

* **Author**

  * Can create, edit, and delete their own articles
  * Can submit articles for review

* **Admin**

  * Can manage users
  * Can approve or reject articles
  * Can monitor and moderate platform activity

---

### Article Management

* Create, edit, delete, and fetch articles
* Support for rich text content
* Multiple article states: draft, pending, approved, rejected
* Category-based filtering
* Trending articles section
* Keyword-based search
* Author-specific article control

---

### Comments & Bookmarks

* Add and delete comments on articles
* Save articles as bookmarks
* Retrieve saved articles for each user

---

### Admin Capabilities

* View all registered users
* Review and moderate submitted articles
* Approve or reject content
* Remove users if required

---

## Project Structure

```
backend/
│
├── config/          # Database and environment configuration
├── controllers/     # Business logic for routes
├── middleware/      # Authentication and role checks
├── models/          # Database schemas
├── routes/          # API route definitions
├── utils/           # Helper functions
├── .env             # Environment variables
├── .env.example     # Sample env file
├── server.js        # Entry point
├── package.json
└── README.md
```

---

## API Overview

### Authentication

* `POST /api/auth/register` → Register a user
* `POST /api/auth/login` → Login and get token
* `GET /api/auth/profile` → Get user profile

---

### Articles

* `POST /api/articles` → Create article
* `GET /api/articles` → Get all articles
* `GET /api/articles/search?q=keyword` → Search articles
* `GET /api/articles/trending` → Trending content
* `GET /api/articles/category/:categoryId` → Filter by category
* `GET /api/articles/:id` → Get single article
* `PUT /api/articles/:id` → Update article
* `DELETE /api/articles/:id` → Delete article

---

### Comments

* `POST /api/comments` → Add comment
* `GET /api/comments/:articleId` → Get comments
* `DELETE /api/comments/:id` → Delete comment

---

### Bookmarks

* `POST /api/bookmarks` → Save article
* `DELETE /api/bookmarks/:id` → Remove bookmark
* `GET /api/bookmarks/user/:userId` → Get user bookmarks

---

### Admin

* `GET /api/admin/users` → Get all users
* `GET /api/admin/pending-articles` → View pending articles
* `PUT /api/admin/approve/:id` → Approve article
* `PUT /api/admin/reject/:id` → Reject article
* `DELETE /api/admin/user/:id` → Delete user

---

## How Authentication Works

1. User signs up through the register API
2. Password is securely hashed before storage
3. User logs in and receives a JWT token
4. This token is used to access protected routes

Example header:

```
Authorization: Bearer your_jwt_token
```

---

## Environment Setup

Create a `.env` file inside the backend folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```


