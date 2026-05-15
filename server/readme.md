# Backend API Documentation

## Overview

This backend is a REST API built with Node.js, Express, and MongoDB (Mongoose).
It supports authentication, user profiles, blogs, projects, search, and file uploads.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)
- multer (file uploads)
- CORS


## Core Features
- User authentication (register, login, logout, refresh token)
- Profile management
- Follow / unfollow system
- Blog CRUD with slug generation
- Project CRUD with slug generation
- Global search (users, blogs, projects)
- File uploads (profile images, blog covers, project thumbnails)
- Text search indexing (MongoDB text index)

## Project Structure
- config/
- controllers/
- middlewares/
- models/
- routes/
- services/
- utils/
- validators/

## Environment Variables
```
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
```

## Authentication Flow
- Passwords are hashed using bcrypt before saving.
- Login returns access + refresh tokens.
- Refresh endpoint issues a new access token.
- Protected routes use authMiddleware.

# Models

## User

### Key fields:
- name, email, password
- username (auto-generated)
- bio, skills, social links
- followers / following (ObjectId refs)
- refreshToken

### Password hashing:
- bcrypt.hashSync(password, 10) on save

## Username generation:
- Based on name → slugified + random 4-digit number
- Ensures uniqueness with DB check


## Blog

### Key fields:
- title, slug, content
- author (User ref)
- category, tags
- coverImage

### Slug generation:
-Auto-generated on title change
- Ensures uniqueness


## Project
- title, slug
- description
- author (User ref)
- techStack
- githubUrl, liveUrl
- thumbnail

### Slug generation:
- Similar to blog but numeric suffix on conflict


# API Routes

## User Routes
base: /api/user

| Method | Route              | Description          |
| ------ | ------------------ | -------------------- |
| POST   | /register          | Register user        |
| POST   | /login             | Login user           |
| GET    | /refresh           | Refresh access token |
| GET    | /logout            | Logout user          |
| GET    | /me                | Get current user     |
| GET    | /profile/:username | Get public profile   |
| PATCH  | /me                | Update profile       |
| POST   | /:userId/follow    | Follow user          |
| DELETE | /:userId/unfollow  | Unfollow user        |


## Blog Routes
base: /api/blog

| Method | Route  | Description     |
| ------ | ------ | --------------- |
| POST   | /      | Create blog     |
| GET    | /      | Get all blogs   |
| GET    | /:slug | Get single blog |
| PATCH  | /:id   | Update blog     |
| DELETE | /:id   | Delete blog     |

Upload:
- coverImage via multer


## Project Routes
Base: /api/project

| Method | Route  | Description      |
| ------ | ------ | ---------------- |
| POST   | /      | Create project   |
| GET    | /      | Get all projects |
| GET    | /:slug | Get project      |
| PATCH  | /:id   | Update project   |
| DELETE | /:id   | Delete project   |

Upload:
- thumbnail via multer

## Search Routes
Base: /api/search

| Method | Route     | Description     |
| ------ | --------- | --------------- |
| GET    | /users    | Search users    |
| GET    | /blogs    | Search blogs    |
| GET    | /projects | Search projects |

Uses MongoDB text indexes.


## File Upload System
- Handled using multer
- Supports:
  - profilePicture
  - banner
  - blog coverImage
  - project thumbnail

Files are attached in multipart/form-data requests.


# Middleware
## authMiddleware
- Validates JWT token
- Attaches user to request
## upload middleware
- Handles file parsing via multer


# Security Notes
- Password hashing with bcrypt
- JWT-based authentication
- CORS enabled for frontend origin
- Protected routes require authentication


# Error Handling
- Centralized controller try/catch pattern
- Standard HTTP status codes used
- Validation handled in controllers/validators
