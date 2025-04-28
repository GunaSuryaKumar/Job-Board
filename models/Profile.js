// models/Profile.js
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['jobseeker', 'employer'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  place: {
    type: String,
  },
  // Job Seeker-specific fields
  college: {
    type: String,
  },
  jobsLookingFor: {
    type: [String], // e.g., ["Frontend Developer", "Data Analyst"]
  },
  // Employer-specific fields
  companyName: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  companyDescription: {
    type: String,
  },
  contactEmail: {
    type: String,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId, // Reference to GridFS file
    ref: 'fs.files',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;