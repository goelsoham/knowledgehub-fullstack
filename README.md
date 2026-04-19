# KnowledgeHub Backend

A fully functional, production-ready backend for a Wikipedia-style knowledge-sharing platform built with Node.js, Express.js, and MongoDB.

KnowledgeHub is designed to support article publishing, user interaction, moderation workflows, and secure role-based access. The backend provides scalable REST APIs for authentication, content management, comments, bookmarks, and administration.

---

## Disclaimer

This project was developed for academic submission purposes under the SESD subject. While the backend is fully functional and follows industry-standard practices, it is intended primarily for learning, demonstration, and evaluation purposes.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js
* Nodemon
* dotenv

---

## Core Features

### Authentication & Security

* Secure JWT-based authentication
* Password hashing using bcrypt
* Protected routes using middleware
* Role-based access control for different user types

### User Roles

The platform supports three major user roles:

* `reader`

  * Can view articles
  * Can comment and bookmark articles

* `author`

  * Can create, edit, and delete their own articles
  * Can submit articles for review

* `admin`

  * Can manage users
  * Can approve or reject articles
  * Can moderate platform activity

### Article Management

* Create, edit, delete, and fetch articles
* Rich text article support
* Draft, pending, approved, and rejected article states
* Category-wise article filtering
* Trending articles section
* Search functionality using keywords
* Author-specific article management

### Comments & Bookmarks

* Add comments to articles
* Delete comments
* Bookmark articles for later access
* Retrieve user bookmarks

### Admin Dashboard Features

* Review all registered users
* Approve or reject pending articles
* Delete users if necessary
* Moderate platform content

---

## Project Structure

```text
backend/
│
├── config/              # Database connection and environment setup
├── controllers/         # Route logic and business logic
├── middleware/          # Authentication and role middleware
├── models/              # Mongoose schemas and models
├── routes/              # API route definitions
├── utils/               # Utility/helper functions
├── .env                 # Environment variables
├── .env.example         # Sample environment variables
├── server.js            # Main application entry point
├── package.json
└── README.md
```

---

## API Endpoints

### Authentication APIs

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| POST   | `/api/auth/register` | Register a new user               |
| POST   | `/api/auth/login`    | Login user and generate JWT token |
| GET    | `/api/auth/profile`  | Fetch logged-in user profile      |

### Article APIs

| Method | Endpoint                             | Description                |
| ------ | ------------------------------------ | -------------------------- |
| POST   | `/api/articles`                      | Create a new article       |
| GET    | `/api/articles`                      | Fetch all public articles  |
| GET    | `/api/articles/search?q=keyword`     | Search articles by keyword |
| GET    | `/api/articles/trending`             | Fetch trending articles    |
| GET    | `/api/articles/category/:categoryId` | Fetch articles by category |
| GET    | `/api/articles/:id`                  | Fetch single article by ID |
| PUT    | `/api/articles/:id`                  | Update article             |
| DELETE | `/api/articles/:id`                  | Delete article             |

### Comment APIs

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| POST   | `/api/comments`            | Add a comment                 |
| GET    | `/api/comments/:articleId` | Fetch comments for an article |
| DELETE | `/api/comments/:id`        | Delete a comment              |

### Bookmark APIs

| Method | Endpoint                      | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| POST   | `/api/bookmarks`              | Add article to bookmarks     |
| DELETE | `/api/bookmarks/:id`          | Remove bookmark              |
| GET    | `/api/bookmarks/user/:userId` | Get all bookmarks for a user |

### Admin APIs

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/api/admin/users`            | Fetch all users            |
| GET    | `/api/admin/pending-articles` | Fetch all pending articles |
| PUT    | `/api/admin/approve/:id`      | Approve an article         |
| PUT    | `/api/admin/reject/:id`       | Reject an article          |
| DELETE | `/api/admin/user/:id`         | Delete a user              |

---

## Authentication Flow

1. User registers using the register endpoint.
2. Password is hashed before storing in the database.
3. User logs in using valid credentials.
4. JWT token is generated and returned.
5. Protected APIs require the token in the Authorization header.

Example:

```http
Authorization: Bearer your_jwt_token
```

---

## Environment Variables

Create a `.env` file inside the backend directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/knowledgehub-backend.git
cd knowledgehub-backend/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then update the values in the `.env` file.

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Run in Production Mode

```bash
npm start
```

---

## Future Enhancements

* Image upload support for articles
* Email verification and password reset
* Article likes and reactions
* Notification system
* Article version history
* Analytics dashboard for admins
* API rate limiting and enhanced security
* Deployment using Docker and cloud platforms

---

## Testing Suggestions

You can test the APIs using:

* Postman
* Thunder Client
* Insomnia

Make sure to test:

* Authentication flows
* Role-based access
* CRUD operations
* Admin moderation features
* Bookmark and comment functionalities

---

## Contribution

Contributions, suggestions, and improvements are always welcome.

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your code
5. Push to your branch
6. Create a pull request

---

## License

This project is intended for educational and academic use only.
