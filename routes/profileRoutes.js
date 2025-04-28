import express from 'express';
import {
  createOrUpdateProfile,
  getProfile,
  uploadResume,
  getResume,
} from '../controllers/profileController.js';
import auth from '../middleware/authMiddleware.js';
import multer from 'multer';

// Configure multer for file uploads with memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

const router = express.Router();

// Create or update profile
router.post('/', auth(['jobseeker', 'employer']), createOrUpdateProfile);
// Get profile
router.get('/', auth(['jobseeker', 'employer']), getProfile);

// Upload resume
router.post('/resume', auth(['jobseeker', 'employer']), upload.single('resume'), uploadResume);
// Download resume
router.get('/resume', auth(['jobseeker', 'employer']), getResume);

export default router;