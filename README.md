# Job Board Application
The Job Board Application is a full-stack web platform designed to connect job seekers and employers. Job seekers can browse and apply for jobs, manage their profiles, and upload resumes, while employers can post job listings, review applications, and manage their company profiles. Built with modern web technologies, the application provides a seamless user experience with role-based functionality, secure authentication, and efficient data management.
# Features
User Authentication

Registration: Users can sign up as either a job seeker or employer with name, email, password, and role.

Login: Secure login using email and password, with JWT-based authentication.

Password Security: Passwords are hashed using bcryptjs.

Role-Based Access: Different dashboards and permissions for job seekers and employers.

# Job Management

Job Listings: Employers can post jobs with title, company, location, and description.

Search and Pagination: Job seekers can search jobs by keywords (title, company, location) with paginated results (10 jobs per page).

Job Applications: Job seekers can apply to jobs, and applications are tracked.

Employer Controls: Employers can edit or delete their posted jobs and view applications.

# Profile Management

Job Seeker Profile: Includes name, age, place, college, jobs looking for, and resume (PDF, max 5MB).

Employer Profile: Includes name, company name, company location, company description, and contact email.

Resume Upload/Download: Users can upload PDF resumes, stored in MongoDB GridFS, and download them via a secure link.

Dynamic Contact Section: Displays profile details (name, place/email) in a contact form powered by Web3Forms.


# Contact Form

Integrated with Web3Forms to allow users to send messages directly from the profile page.

Responsive design with fields for name, email, subject, and message.


# Additional Features

Responsive UI: Built with Tailwind CSS for a mobile-friendly interface.

Error Handling: Comprehensive error messages for invalid inputs, server issues, and file uploads.

MongoDB Atlas: Cloud-hosted database for scalability and reliability.

Secure API: JWT-protected endpoints ensure only authorized users access sensitive data.


# Technologies Used

# Frontend:
HTML5, JavaScript (ES6)
Tailwind CSS (via CDN)
Font Awesome (for contact section icons)
Web3Forms (contact form integration)


# Backend:
Node.js (v20.14.0)
Express.js
MongoDB Atlas (with Mongoose)
Multer (for file uploads)
GridFS (for resume storage)
JWT (jsonwebtoken) for authentication
bcryptjs for password hashing


# Development Tools:
Nodemon (for development)
Postman (for API testing)
MongoDB Atlas (cloud database)
Python HTTP server (for serving frontend)



# Project Structure
job-board/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── jobController.js        # Job posting and retrieval
│   │   ├── applicationController.js # Job application handling
│   │   ├── profileController.js    # Profile and resume management
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Job.js                 # Job schema
│   │   ├── Application.js         # Application schema
│   │   ├── Profile.js             # Profile schema
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication endpoints
│   │   ├── jobRoutes.js           # Job endpoints
│   │   ├── applicationRoutes.js   # Application endpoints
│   │   ├── profileRoutes.js       # Profile and resume endpoints
│   ├── .env                       # Environment variables (not in Git)
│   ├── server.js                 # Main server file
│   ├── package.json              # Dependencies and scripts
│   ├── package-lock.json         # Dependency lock file
├── frontend/
│   ├── index.html                # Single-page application
├── README.md                     # Project documentation

I had more view on it I will continue implementing connect with me if you want to know 

# Prerequisites

Node.js: v20.14.0 or higher
MongoDB Atlas: Free tier account for cloud database
Postman: For testing API endpoints
Web3Forms: Account for contact form integration
Git: For version control
Python: For serving the frontend (optional)

# Setup Instructions
1. Clone the Repository
git clone https://github.com/<your-username>/job-board.git
cd job-board

2. Set Up the Backend

Navigate to the backend directory:cd backend


Install dependencies:npm install


Create a .env file in the backend/ directory with the following:MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/jobboard?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000


Replace <username>, <password>, and cluster0.mongodb.net with your MongoDB Atlas credentials.
Generate a secure JWT_SECRET (e.g., a random 32-character string).


Start the backend:npm run dev


The server should run on http://localhost:5000 and connect to MongoDB Atlas.



3. Set Up the Frontend

Navigate to the frontend directory:cd frontend


Serve the frontend using Python’s HTTP server:python -m http.server 8000


Open http://localhost:8000 in a browser.



4. Configure Web3Forms

Sign up at Web3Forms.
Get your access key and update the contact form in index.html:<input type="hidden" name="access_key" value="your_web3forms_access_key">


Test the contact form to ensure submissions appear in your Web3Forms dashboard.

5. Test the Application

Use Postman to test backend endpoints (see API Endpoints).
Register as a job seeker and employer to test role-based features.
Verify MongoDB Atlas for data storage (users, jobs, applications, profiles, uploads.files, uploads.chunks).

# Usage
For Job Seekers

Register/Login: Sign up as a job seeker and log in.

Complete Profile: Add your name, age, place, college, jobs looking for, and upload a resume (PDF, max 5MB).

Browse Jobs: Use the search bar and pagination to find jobs.

Apply: Click "Apply" on a job listing to submit an application.

View Applications: Check “My Applications” to see applied jobs.

Contact: Use the contact form to send messages.


# For Employers

Register/Login: Sign up as an employer and log in.

Complete Profile: Add your name, company details, and contact email.

Post Jobs: Use the “Post a New Job” form to create listings.

Manage Jobs: Edit or delete jobs in “My Posted Jobs”.

View Applications: (Future feature) Review applications for posted jobs.

Contact: Use the contact form to communicate with users.


# API Endpoints

Authentication:

POST /api/auth/register: Register a new user.

POST /api/auth/login: Log in and receive a JWT.



# Jobs:
GET /api/jobs: List jobs (supports search, page, limit query params).

POST /api/jobs: Create a job (employer only).

PUT /api/jobs/:id: Update a job (employer only).

DELETE /api/jobs/:id: Delete a job (employer only).



# Applications:
POST /api/applications/:jobId: Apply to a job (job seeker only).
GET /api/applications: List user applications (job seeker only).


# Profile:
POST /api/profile: Create/update profile (job seeker/employer).
GET /api/profile: Get user profile.
POST /api/profile/resume: Upload resume (PDF, max 5MB).
GET /api/profile/resume: Download resume.



# Testing

Backend: Use Postman to test API endpoints. Example:
Register: POST http://localhost:5000/api/auth/register with {"name": "Test User", "email": "test@example.com", "password": "Password123!", "role": "jobseeker"}.
Login: POST http://localhost:5000/api/auth/login to get a token.


Frontend: Test all features (register, login, job posting, applications, profile, resume, contact form) in the browser.
Database: Verify data in MongoDB Atlas (jobboard database).

# Troubleshooting

Backend Errors:
Check terminal logs for MongoDB connection or JWT issues.
Ensure .env variables are correct.


Frontend Errors:
Open browser console (F12 → Console) for JavaScript errors.
Verify API requests (F12 → Network) return 200 OK.


Resume Upload:
Ensure PDFs are < 5MB.
Check uploads.files and uploads.chunks in MongoDB.


Contact Form:
Confirm Web3Forms access key is valid.
Check submissions in the Web3Forms dashboard.



# Future Enhancements

Profile Picture Upload: Allow users to upload profile images.
Job Categories and Filters: Add job categories (e.g., Technology, Finance) and filters (e.g., job type, salary).
Candidate Search: Enable employers to search job seekers by skills or location.
Notifications: Add real-time alerts for new jobs or application updates.
Premium Features: Implement subscriptions for enhanced features (e.g., unlimited job postings).
Deployment: Host on Render (backend) and Netlify (frontend).

Contributing
Contributions are welcome! To contribute please contact me if had ideas I will help figure it out:

Fork the repository.
Create a feature branch (git checkout -b feature/new-feature).
Commit changes (git commit -m "Add new feature").
Push to the branch (git push origin feature/new-feature).
Open a pull request.

License
This project is licensed under the MIT License.

Contact
For questions or feedback, use the contact form in the application or email kgunakatakam614@gmail.com . You can also open an issue on GitHub.
Linkedin : https://www.linkedin.com/in/guna-surya-kumar-katakam-0b4358275
Portfolio : https://codepen.io/KATAKAM-GUNA-SURYA-KUMAR/full/raBEBaO
Leetcode : https://leetcode.com/u/22PA5A5704/

Built with 🖤 by Guna Surya Kumar Katakam
