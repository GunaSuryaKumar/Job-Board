// routes/jobRoutes.js
import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
  updateJob,
  getEmployerJobs, // Add getEmployerJobs
} from '../controllers/jobController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth(['employer']), createJob); // Protect createJob
router.get('/', getJobs);
router.get('/employer', auth(['employer']), getEmployerJobs); // New route for employer jobs
router.get('/:id', getJobById);
router.delete('/:id', auth(['employer']), deleteJob); // Protect deleteJob
router.put('/:id', auth(['employer']), updateJob); // Protect updateJob

export default router;