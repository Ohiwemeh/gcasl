import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AdminVerification = ({ request = null, onUpdate = () => {} }) => {
  const [newBalance, setNewBalance] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localRequest, setLocalRequest] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  useEffect(() => {
    if (request) {
      setLocalRequest(request);
      setNewBalance(request.user?.balance || 0);
    }
  }, [request]);

  if (!localRequest) {
    return (
      <div className="p-4 border border-gray-300 max-w-full overflow-hidden">
        <p>Loading verification data...</p>
        <div className="animate-pulse h-6 w-48 bg-gray-200 rounded my-2"></div>
        <div className="animate-pulse h-48 w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!localRequest.user) {
    return (
      <div className="p-4 border border-red-200 max-w-full overflow-hidden">
        <h3>Data Loading Issue</h3>
        <ul>
          <li>Request ID: {localRequest._id}</li>
          <li>User data: Missing</li>
        </ul>
        <button
          onClick={onUpdate}
          className="mt-2 p-2 bg-green-600 text-white min-w-[44px] min-h-[44px]"
        >
          Refresh Data
        </button>
      </div>
    );
  }

  const optimizeImage = (url) => {
    return url?.includes("/upload/")
      ? url.replace("/upload/", "/upload/w_600,q_auto,f_auto/")
      : url;
  };

  const handleBalanceUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `/users/${localRequest.user._id}/balance`,
        { balance: Number(newBalance) }
      );
      toast.success("Balance updated successfully");
      setEditing(false);
      onUpdate();
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to update balance"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      setLoading(true);
      await axios.patch(`/verification/${localRequest._id}`, { status });
      toast.success(`Request ${status}`);
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (imageType) => {
    setImageLoadErrors((prev) => ({ ...prev, [imageType]: true }));
  };

  return (
    <div className="p-4 border border-gray-300 max-w-full overflow-hidden text-sm sm:text-base">
      <h3 className="text-lg font-semibold break-words mb-2">
        {localRequest.user.name} ({localRequest.user.email})
      </h3>

      <p className="mb-2">
        Status:{" "}
        <strong
          className={`${
            localRequest.status === "approved"
              ? "text-green-600"
              : localRequest.status === "declined"
              ? "text-red-600"
              : "text-orange-500"
          }`}
        >
          {localRequest.status?.toUpperCase()}
        </strong>
      </p>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Balance:</label>
        {editing ? (
          <div className="flex flex-col gap-2 items-start">
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              className="p-2 w-full max-w-xs border border-gray-300 rounded"
            />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleBalanceUpdate}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded min-w-[80px] min-h-[44px]"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-red-500 text-white rounded min-w-[80px] min-h-[44px]"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-semibold">
              ₱{Number(localRequest.user.balance).toLocaleString()}
            </span>
            <button
              onClick={() => setEditing(true)}
              className="px-2 py-1 bg-blue-600 text-white rounded min-w-[60px] min-h-[36px]"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* FRONT ID */}
        <div>
          <p className="font-semibold mb-1">Front ID:</p>
          {imageLoadErrors.frontId ? (
            <div className="w-full max-w-xs h-48 border border-gray-400 bg-gray-100 flex items-center justify-center">
              <p>Image failed to load</p>
            </div>
          ) : (
            <img
              src={optimizeImage(localRequest.frontId)}
              alt="Front ID"
              loading="lazy"
              onError={() => handleImageError("frontId")}
              className="w-full max-w-xs h-auto border border-gray-400 object-contain"
            />
          )}
          <a
            href={localRequest.frontId}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Download Front ID
          </a>
        </div>

        {/* BACK ID */}
        <div>
          <p className="font-semibold mb-1">Back ID:</p>
          {imageLoadErrors.backId ? (
            <div className="w-full max-w-xs h-48 border border-gray-400 bg-gray-100 flex items-center justify-center">
              <p>Image failed to load</p>
            </div>
          ) : (
            <img
              src={optimizeImage(localRequest.backId)}
              alt="Back ID"
              loading="lazy"
              onError={() => handleImageError("backId")}
              className="w-full max-w-xs h-auto border border-gray-400 object-contain"
            />
          )}
          <a
            href={localRequest.backId}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Download Back ID
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => handleStatusUpdate("approved")}
          disabled={loading}
          className="p-3 bg-green-100 text-green-800 rounded min-h-[48px] text-base"
        >
          ✅ Approve
        </button>
        <button
          onClick={() => handleStatusUpdate("declined")}
          disabled={loading}
          className="p-3 bg-red-100 text-red-800 rounded min-h-[48px] text-base"
        >
          ❌ Decline
        </button>
      </div>
    </div>
  );
};

export default AdminVerification;
