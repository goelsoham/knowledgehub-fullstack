# API Documentation & Examples

## Auth APIs

### Register
**POST** `/api/auth/register`
- **Description**: Registers a new user.
- **Request Payload**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "reader"
}
```
- **Response Payload (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "reader",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

### Login
**POST** `/api/auth/login`
- **Request Payload**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response Payload (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "reader",
    "token": "eyJhbGciOiJIUzI1NiIsInR5c..."
  }
}
```

## Article APIs

### Create Article
**POST** `/api/articles`
- **Headers**: `Authorization: Bearer <token>` (Role: author, admin)
- **Request Payload**:
```json
{
  "title": "Understanding Node.js",
  "summary": "A brief intro to Node.js",
  "content": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
  "slug": "understanding-node-js",
  "categoryId": "60d0fe4f5311236168a109cb",
  "tags": ["nodejs", "javascript", "backend"]
}
```

### Get Trending Articles
**GET** `/api/articles/trending`
- **Response Payload (200 OK)**:
```json
{
  "success": true,
  "message": "Trending articles retrieved",
  "data": [
    {
      "_id": "60d0fe4f5311236168a109cc",
      "title": "Understanding Node.js",
      "views": 1500,
      "likes": 300
    }
  ]
}
```

## Admin APIs

### Approve Article
**PUT** `/api/admin/approve/:id`
- **Headers**: `Authorization: Bearer <token>` (Role: admin)
- **Response Payload (200 OK)**:
```json
{
  "success": true,
  "message": "Article approved successfully",
  "data": {
    "_id": "60d0fe4f5311236168a109cc",
    "status": "approved"
  }
}
```
