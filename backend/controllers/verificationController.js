import VerificationRequest from '../models/VerificationRequest.js';
// import { sendVerificationStatusEmail } from '../lib/mailer.js';
 import User from '../models/user.model.js'; // Make sure to import User model // optional if you're using email

// ✅ Submit Verification (called after frontend uploads to Cloudinary)
export const submitVerification = async (req, res) => {
  try {
    const { frontId, backId } = req.body;

    if (!frontId || !backId) {
      return res.status(400).json({   
        success: false,
        message: 'Missing front or back ID URL',
      });
    }

    // Check for existing pending verification
    const existing = await VerificationRequest.findOne({
      user: req.user._id,
      status: 'pending',
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending verification',
      });
    }

    const verification = await VerificationRequest.create({
      user: req.user._id,
      frontId,
      backId,
    });

    res.status(201).json({
      success: true,
      message: 'Verification submitted successfully',
      verification,
    });
  } catch (error) {
    console.error('❌ Verification submission error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Verification submission failed',
    });
  }
};

// ✅ Get All Verifications (admin only) - UPDATED
export const getAllVerifications = async (req, res) => {
  try {
    const requests = await VerificationRequest.find()
      .populate({
        path: 'user',
        select: 'name email balance role', // Explicitly include needed fields
        model: 'User' // Explicitly reference the model
      })
      .lean(); // Convert to plain JavaScript objects

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (err) {
    console.error('Error fetching verifications:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch verification requests'
    });
  }
};

// ✅ Admin: Approve or Decline Verification
export const updateVerificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'declined'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const request = await VerificationRequest.findById(id).populate('user');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Verification request not found',
      });
    }

    request.status = status;
    await request.save();

    // Optional: Email notification
    // await sendVerificationStatusEmail(request.user.email, request.user.name, status);

    res.status(200).json({
      success: true,
      message: `Verification ${status}`,
      request,
    });
  } catch (err) {
    console.error('❌ Error updating verification status:', err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update verification status',
    });
  }
};

// ✅ Export all
export {
//   submitVerification,
//   getAllVerifications,
//  updateVerificationStatus,
};
