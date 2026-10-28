# Employee App Backend Integration

This repository contains the completed backend integration for the **Employee Management App** Case Study.

The application connects an Express.js backend with MongoDB Atlas and serves the pre-built Angular frontend from `dist/Frontend/`.

---

## 📌 Requirements Fulfilled

- **Server Initiation**: Express app running on port `3000` (configurable via `PORT` in `.env`).
- **MongoDB Atlas Integration**: Connected via Mongoose with full CRUD capability.
- **RESTful APIs**:
  - `GET /api/employeelist` - Retrieves all employee records from the database.
  - `GET /api/employeelist/:id` - Retrieves a single employee record by ID.
  - `POST /api/employeelist` - Adds a new employee record to the database.
  - `PUT /api/employeelist` - Updates an existing employee record.
  - `DELETE /api/employeelist/:id` - Deletes an employee record from the database.
- **Static Hosting**: Serves the frontend build from `dist/` without altering frontend files.
- **Single File Implementation**: All backend logic is contained cleanly in `app.js`.

---

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **MongoDB Atlas** with **Mongoose**
- **CORS**, **Morgan**, and **Dotenv**

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (.env)
```env
PORT=3000
MONGODB_URI=mongodb+srv://joyal225759_db_user:Joyal123**@cluster0.bqgou07.mongodb.net/EmployeeDB?retryWrites=true&w=majority
```

### 3. Start the Server
```bash
node app.js
```
Or with nodemon:
```bash
npx nodemon app.js
```

### 4. View Application
Open your browser at:
```
http://localhost:3000
```
