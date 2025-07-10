import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const AdminVerification = ({ request = null, onUpdate = () => {} }) => {
  // State initialization with better defaults
  const [newBalance, setNewBalance] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localRequest, setLocalRequest] = useState(null);

  // Initialize data when request prop changes
  useEffect(() => {
    if (request) {
      setLocalRequest(request);
      setNewBalance(request.user?.balance || 0);
    }
  }, [request]);

  // Show loading state if request isn't loaded yet
  if (!localRequest) {
    return (
      <div className="card" style={{ border: "1px solid #ccc", padding: "1rem" }}>
        <p>Loading verification data...</p>
      </div>
    );
  }

  // Show error if user data is missing
  if (!localRequest.user) {
    return (
      <div className="card" style={{ border: "1px solid #ffcccc", padding: "1rem" }}>
        <h3>Data Loading Issue</h3>
        <p>Debug information:</p>
        <ul>
          <li>Request ID: {localRequest._id}</li>
          <li>User data: Missing</li>
        </ul>
        <button 
          onClick={onUpdate}
          style={{
            padding: "0.5rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none"
          }}
        >
          Refresh Data
        </button>
      </div>
    );
  }

  const handleBalanceUpdate = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.patch(
  `/users/${localRequest.user._id}/balance`, // ✅ CORRECT: no duplicate /api
  { balance: Number(newBalance) }
);

      toast.success("Balance updated successfully");
      setEditing(false);
      onUpdate(); // Refresh parent data
    } catch (err) {
      console.error('Balance update error:', err);
      toast.error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Failed to update balance"
      );
    } finally {
      setLoading(false);
    }
  };
  // 686fb9045283a199d7ee7b99

  const handleStatusUpdate = async (status) => {
    try {
      setLoading(true);
      const res = await axiosInstance.patch(
        `/verification/${localRequest._id}`,
        { status }
      );
      toast.success(`Request ${status}`);
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
      <h3>
        {localRequest.user.name} ({localRequest.user.email})
      </h3>
      
      <p>
        Status:{" "}
        <strong style={{ color: 
          localRequest.status === "approved" ? "green" :
          localRequest.status === "declined" ? "red" : "orange"
        }}>
          {localRequest.status?.toUpperCase()}
        </strong>
      </p>

      <div style={{ margin: "1rem 0" }}>
        <label>Balance:</label>
        {editing ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              style={{ padding: "0.5rem", width: "150px" }}
            />
            <button 
              onClick={handleBalanceUpdate}
              disabled={loading}
              style={{ 
                padding: "0.5rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button 
              onClick={() => setEditing(false)}
              style={{ 
                padding: "0.5rem",
                backgroundColor: "#f44336",
                color: "white",
                border: "none"
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <span>₦{Number(localRequest.user.balance).toLocaleString()}</span>
            <button 
              onClick={() => setEditing(true)}
              style={{ 
                padding: "0.25rem 0.5rem",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none"
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <div>
          <p>Front ID:</p>
          <img 
            src={localRequest.frontId} 
            width="200" 
            alt="Front ID" 
            style={{ border: "1px solid #aaa", marginBottom: "0.5rem" }} 
          />
          <br />
          <a href={localRequest.frontId} download target="_blank" rel="noopener noreferrer">
            Download Front ID
          </a>
        </div>
        <div>
          <p>Back ID:</p>
          <img 
            src={localRequest.backId} 
            width="200" 
            alt="Back ID" 
            style={{ border: "1px solid #aaa", marginBottom: "0.5rem" }} 
          />
          <br />
          <a href={localRequest.backId} download target="_blank" rel="noopener noreferrer">
            Download Back ID
          </a>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => handleStatusUpdate("approved")}
          disabled={loading}
          style={{ 
            padding: "0.5rem",
            backgroundColor: "#d1ffd1",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          ✅ Approve
        </button>
        <button
          onClick={() => handleStatusUpdate("declined")}
          disabled={loading}
          style={{ 
            padding: "0.5rem",
            backgroundColor: "#ffd1d1",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          ❌ Decline
        </button>
      </div>
    </div>
  );
};

export default AdminVerification;
