# Recruitment Management API

A backend REST API for resume screening and recruitment management.  
Recruiters can manage candidates, upload resumes, score profiles, shortlist applicants, and view hiring pipeline analytics.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file upload)
- Cloudinary (resume storage)
- Render (deployment)

---

## 📌 Features

### 🔐 Authentication
- Recruiter registration & login
- JWT-based authentication
- Protected routes

### 👤 Candidate Management
- Create, update, and list candidates
- Recruiter-based data ownership
- Search by name or skills
- Pagination & filtering

### 📄 Resume Upload & Scoring
- Resume upload (PDF/DOC/DOCX)
- Cloudinary integration
- Automated candidate scoring
- Auto-shortlisting based on score

### 🧠 Screening & Shortlisting
- Manual candidate scoring
- Shortlisted candidates API
- Paginated shortlist results

### 📊 Reports & Analytics
- Hiring pipeline analytics
- Status-wise candidate counts
- MongoDB aggregation-based reports

---

## 📂 Project Structure

src/
├── config/
│ ├── db.js
│ └── cloudinary.js
├── controllers/
│ ├── authController.js
│ ├── candidateController.js
│ ├── screeningController.js
│ └── reportController.js
├── middlewares/
│ ├── authMiddleware.js
│ ├── errorHandler.js
│ └── uploadMiddleware.js
├── models/
│ ├── User.js
│ └── Candidate.js
├── routes/
│ ├── authRoutes.js
│ ├── candidateRoutes.js
│ ├── screeningRoutes.js
│ └── reportRoutes.js
└── app.js
server.js

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/register` | Register recruiter |
| POST | `/api/auth/login` | Login recruiter |
| GET | `/api/auth/profile` | Get logged-in profile |

### Candidates
| Method | Endpoint |
|------|---------|
| POST | `/api/candidates` |
| GET | `/api/candidates?search=&page=&limit=` |
| PUT | `/api/candidates/:id` |
| POST | `/api/candidates/:id/resume` |

### Screening
| Method | Endpoint |
|------|---------|
| POST | `/api/screening/:candidateId/score` |
| GET | `/api/screening/shortlist` |

### Reports
| Method | Endpoint |
|------|---------|
| GET | `/api/reports/hiring-pipeline` |

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

⚠️ Do not commit .env to GitHub.

▶️ Run Locally
npm install
npm run dev

The server will start on:
http://localhost:5000

🌍 Live Deployment

The backend is deployed on Render.

🔗 Live API URL:
https://your-render-app.onrender.com

🧪 API Testing

Postman collection included (or can be generated)

JWT token required in headers for protected routes:

Authorization: Bearer <token>

📌 Key Highlights

Secure JWT authentication

Recruiter-based data isolation

Cloudinary resume storage

MongoDB aggregation for analytics

Production-ready architecture

👩‍💻 Author

Jayavarshini JV
Backend Developer