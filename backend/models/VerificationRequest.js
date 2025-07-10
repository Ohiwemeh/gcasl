import mongoose from "mongoose";

const verificationRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    frontId: {
      type: String,
      required: true, // Cloudinary URL (front side of ID)
    },
    backId: {
      type: String,
      required: true, // Cloudinary URL (back side of ID)
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default mongoose.model("VerificationRequest", verificationRequestSchema);
