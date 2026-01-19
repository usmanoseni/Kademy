# Kademy Platform

An interactive e-learning platform designed for secondary school students preparing for WAEC, NECO, and JAMB examinations. The platform offers video lessons, digital resources, mock tests, and progress tracking tools.

## Overview

**KADEMY** provides:

- Video Tutorials from verified and experienced tutors
- Practice Questions covering WAEC, NECO, and JAMB syllabuses
- Resource Library with notes, past questions, and downloadable materials
- Performance Analytics with personalized dashboards

---

## Project Structure

```
Kademy/
├── Backend/
│   ├── server/
│   │   ├── server.js (main Express app entry point)
│   │   ├── config/
│   │   │   └── db.js (MongoDB connection configuration)
│   │   ├── middleware/
│   │   │   └── utlis/
│   │   │       └── hashPassword.js (bcrypt password hashing utilities)
│   │   ├── models/
│   │   │   ├── Student.js (student profile schema)
│   │   │   ├── Tutor.js (tutor profile schema)
│   │   │   ├── Subject.js (subject schema)
│   │   │   ├── Qualification.js (tutor qualifications schema)
│   │   │   ├── Content.js (learning content schema)
│   │   │   ├── contentHistory.js (content modification history)
│   │   │   └── comment.js (comments schema)
│   │   └── router/
│   │       ├── authRouter.js (authentication endpoints)
│   │       ├── studentsRouther.js (student management endpoints)
│   │       ├── tutorRouter.js (tutor management endpoints)
│   │       ├── subjectRouter.js (subject management endpoints)
│   │       ├── contentRouter.js (content management endpoints)
│   │       ├── commentRouter.js (comments endpoints)
│   │       ├── qualificationRouter.js (qualification endpoints)
│   │       └── historyRouter.js (content history endpoints)
│   ├── .env (environment variables)
│   ├── package.json
│   └── node_modules/
└── README.md
```

---

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (Atlas or local instance)
- Postman or similar API testing tool (optional)

---

## How to Run

### Backend Setup

1. **Navigate to the Backend directory:**

   ```bash
   cd Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the `Backend` directory with the following:

   ```
   PORT=5000
   DB_URI=<your-mongodb-uri>
   NODE_ENV=development
   SESSION_SECRET=<your-session-secret>
   ```

4. **Start the server:**

   For development (with nodemon auto-reload):

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

   The server should now be running on `http://localhost:5000`

---

## How to Test

### Backend Testing

1. **Unit Tests:**

   ```bash
   npm test
   ```

2. **API Testing with Postman:**

   - Import the API endpoints from the `router/` directory
   - Test each endpoint with sample data

3. **Database Connection:**
   ```bash
   npm run test:db
   ```

---

## Key Features

- **Secure Authentication:** User registration and login with bcrypt password hashing
- **User Management:** Separate profiles for students and tutors
- **Content Management:** Structured learning materials with version history tracking
- **Interactive Comments:** Discussion system on content materials
- **Qualifications Tracking:** Tutor qualification verification
- **Subject Organization:** Organized by academic subjects and syllabi
- **CORS Enabled:** Secure cross-origin requests
- **Session Management:** Express session configuration for user sessions
- **Performance Analytics:** Track student progress with content history
- **Simple and intuitive user interface**
- **Focused on local curricula (WAEC, NECO, JAMB)**
- **Affordable subscription plans**
- **Offline access support for low-connectivity areas**

---

## API Endpoints Overview

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Students

- `GET /students` - Get all students
- `GET /students/:id` - Get student profile
- `PUT /students/:id` - Update student profile

### Tutors

- `GET /tutors` - Get all tutors
- `GET /tutors/:id` - Get tutor profile
- `PUT /tutors/:id` - Update tutor profile

### Content

- `GET /content` - Get all content
- `POST /content` - Create new content
- `PUT /content/:id` - Update content
- `DELETE /content/:id` - Delete content

### Subjects

- `GET /subjects` - Get all subjects
- `POST /subjects` - Create subject

### Comments

- `POST /comments` - Add comment
- `GET /comments/:contentId` - Get comments for content

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** bcrypt for password hashing
- **Session Management:** express-session
- **Validation:** express-validator
- **Development:** nodemon for auto-reload
- **CORS:** Enabled for cross-origin requests

---

## Contact

**Founder & CEO:** Oseni Usman Rotimi (Hustech)

- Tel: 09078059440
- Email: oseniusmanrotimi@gmail.com
