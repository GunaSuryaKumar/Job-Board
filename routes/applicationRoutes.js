// routes/applicationRoutes.js
import express from 'express';
import { applyToJob, getUserApplications } from '../controllers/applicationController.js'; // Add getUserApplications
import auth from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/:jobId', auth(['jobseeker']), applyToJob);
router.get('/', auth(['jobseeker']), getUserApplications); // New route for fetching applications

export default router;