# KnowledgeHub Backend

This is the completely functional, production-ready backend for KnowledgeHub, a Wikipedia-style knowledge-sharing platform. Built using Node.js, Express.js, and MongoDB.

## Features
- **Authentication**: JWT-based secure authentication.
- **Role-Based Access**: Distinguishes between `reader`, `author`, and `admin`.
- **Articles**: CRUD operations, rich text support, category linkage, and state management (draft, pending, approved, rejected).
- **Interactions**: Users can comment on and bookmark articles.
- **Admin Panel**: Capabilities for administrators to review users and moderate pending articles.

## API Endpoints Overview

### Auth APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Article APIs
- `POST /api/articles` (Requires Author/Admin)
- `GET /api/articles` (Public)
- `GET /api/articles/search?q=keyword`
- `GET /api/articles/trending`
- `GET /api/articles/category/:categoryId`
- `GET /api/articles/:id`
- `PUT /api/articles/:id` (Requires Author/Admin)
- `DELETE /api/articles/:id` (Requires Author/Admin)

### Comment APIs
- `POST /api/comments`
- `GET /api/comments/:articleId`
- `DELETE /api/comments/:id`

### Bookmark APIs
- `POST /api/bookmarks`
- `DELETE /api/bookmarks/:id`
- `GET /api/bookmarks/user/:userId`

### Admin APIs
- `GET /api/admin/users`
- `GET /api/admin/pending-articles`
- `PUT /api/admin/approve/:id`
- `PUT /api/admin/reject/:id`
- `DELETE /api/admin/user/:id`

## Setup and Run
1. Copy `backend/.env.example` to `backend/.env` and update the variables if necessary.
2. Run `npm install` inside the `backend` directory.
3. Run `npm run dev` to start the development server using nodemon, or `npm start` for production.