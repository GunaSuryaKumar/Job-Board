import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import Profile from '../models/Profile.js';

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
});

// Create or update profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    // Extract fields from req.body
    const {
      name,
      age,
      place,
      college,
      jobsLookingFor,
      companyName,
      companyLocation,
      companyDescription,
      contactEmail,
    } = req.body;

    // Prepare profile data based on role
    let profileData = { user: userId, role, name };

    if (role === 'jobseeker') {
      profileData = {
        ...profileData,
        age: age ? parseInt(age) : undefined,
        place,
        college,
        jobsLookingFor: jobsLookingFor ? JSON.parse(jobsLookingFor) : undefined,
      };
    } else {
      profileData = {
        ...profileData,
        companyName,
        companyLocation,
        companyDescription,
        contactEmail,
      };
    }

    // Update or create profile
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error in createOrUpdateProfile:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const userId = req.user.id;

    // Delete existing resume if present
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile?.resume) {
      const existingFile = await gfs.find({ _id: new mongoose.Types.ObjectId(existingProfile.resume) }).toArray();
      if (existingFile.length > 0) {
        gfs.delete(new mongoose.Types.ObjectId(existingProfile.resume));
      }
    }

    // Upload new resume
    const uploadStream = gfs.openUploadStream(`${userId}_resume.pdf`, {
      contentType: 'application/pdf',
    });
    uploadStream.end(req.file.buffer);
    uploadStream.on('finish', async () => {
      await Profile.findOneAndUpdate(
        { user: userId },
        { resume: uploadStream.id },
        { upsert: true }
      );
      res.status(200).json({ message: 'Resume uploaded successfully', fileId: uploadStream.id });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Download resume
const getResume = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile?.resume) {
      return res.status(404).json({ message: 'No resume found' });
    }

    const file = await gfs.find({ _id: new mongoose.Types.ObjectId(profile.resume) }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'Resume file not found' });
    }

    res.set('Content-Type', file[0].contentType);
    res.set('Content-Disposition', `attachment; filename="${req.user.id}_resume.pdf"`);

    const downloadStream = gfs.openDownloadStream(new mongoose.Types.ObjectId(profile.resume));
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOrUpdateProfile, getProfile, uploadResume, getResume };