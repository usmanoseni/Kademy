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
│   │   │   └── db.js (MongoDB connection)
│   │   ├── models/
│   │   │   ├── Tutor.js (tutor profile schema with validation)
│   │   │   ├── Student.js (student profile schema with validation)
│   │   │   ├── Subject.js (subject schema with validation)
│   │   │   ├── Qualification.js (qualifications with validation)
│   │   │   ├── Content.js
│   │   │   └── Post.js
│   │   └── router/
│   │       ├── authRouter.js
│   │       ├── tutorRouter.js
│   │       ├── studentsRouter.js
│   │       └── contentRouter.js
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
   DB_URI=<your-database-uri>
   NODE_ENV=development
   ```

4. **Start the server:**

   ```bash
   npm run dev
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

- Simple and intuitive user interface
- Focused on local curricula (WAEC, NECO, JAMB)
- Affordable subscription plans
- Offline access support for low-connectivity areas

---

## Contact

**Founder & CEO:** Oseni Usman Rotimi (Hustech)

- Tel: 09078059440
- Email: oseniusmanrotimi@gmail.com
