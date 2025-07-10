import React, { useState, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const { user } = useUserStore();
  const [frontId, setFrontId] = useState(null);
  const [backId, setBackId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Redirect logic
  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      return navigate("/login");
    }
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  // ✅ Upload to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gcash-app"); // Replace with your Cloudinary unsigned preset
    formData.append("folder", "user-verifications");

    const res = await fetch("https://api.cloudinary.com/v1_1/dytkbjmys/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.secure_url) {
      throw new Error("Upload failed");
    }

    return data.secure_url;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!frontId || !backId) {
      return toast.error("Both ID images are required");
    }

    if (!user || !user._id) {
      return toast.error("User info missing");
    }

    try {
      setLoading(true);

      // Upload files to Cloudinary
      const frontIdUrl = await uploadToCloudinary(frontId);
      const backIdUrl = await uploadToCloudinary(backId);

      // Send to backend
      await axios.post("/verification", {
  frontId: frontIdUrl,
  backId: backIdUrl,
});


      toast.success("Verification submitted!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Confirmation Screen
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="bg-white shadow-md rounded px-6 py-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4 text-green-500">✅</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your verification request has been submitted. You’ll be notified via email once it’s reviewed.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main Form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">G</div>
            <h2 className="text-xl font-bold text-blue-600">Verification</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload ID Card (Front)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFrontId(e.target.files[0])}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload ID Card (Back)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackId(e.target.files[0])}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            {loading ? "Uploading..." : "Submit Verification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
