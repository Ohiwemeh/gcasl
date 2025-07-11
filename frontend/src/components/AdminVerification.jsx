import React, { useState, useEffect } from "react";
import axios from "../lib/axios"
import { toast } from "react-hot-toast";

const AdminVerification = ({ request = null, onUpdate = () => {} }) => {
  // State initialization with better defaults
  const [newBalance, setNewBalance] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [localRequest, setLocalRequest] = useState(null);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  // Initialize data when request prop changes
  useEffect(() => {
    if (request) {
      //setLocalRequest(request);
      setNewBalance(request.user?.balance || 0);
    }
  }, [request]);

  // Show loading state if request isn't loaded yet
  if (!request) {
    return (
      <div className="card" style={{ 
        border: "1px solid #ccc", 
        padding: "1rem",
        maxWidth: "100%",
        overflow: "hidden"
      }}>
        <p>Loading verification data...</p>
      </div>
    );
  }

  // Show error if user data is missing
  if (!request.user) {
    return (
      <div className="card" style={{ 
        border: "1px solid #ffcccc", 
        padding: "1rem",
        maxWidth: "100%",
        overflow: "hidden"
      }}>
        <h3>Data Loading Issue</h3>
        <p>Debug information:</p>
        <ul>
          <li>Request ID: {request._id}</li>
          <li>User data: Missing</li>
        </ul>
        <button 
          onClick={onUpdate}
          style={{
            padding: "0.5rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            minHeight: "44px", // Better touch target
            minWidth: "44px"
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
      console.log('🔍 Environment variable:', import.meta.env.VITE_API_BASE_URL);
      console.log('🔍 User ID:', request.user._id);
      console.log('🔍 Request path:', `/users/${request.user._id}/balance`);
      console.log('🔍 Expected full URL:', `${import.meta.env.VITE_API_BASE_URL}/users/${request.user._id}/balance`);
      
      const res = await axios.patch(
        `/users/${request.user._id}/balance`,
        { balance: Number(newBalance) }
      );
      console.log('✅ Balance update response:', res.data);
      toast.success("Balance updated successfully");
      setEditing(false);
      onUpdate(); // Refresh parent data
    } catch (err) {
      console.error('Full error details:', err);
      console.error('Error response:', err.response);
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
      const res = await axios.patch(
        `/verification/${request._id}`,
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

  const handleImageError = (imageType) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  const cardStyle = {
    border: "1px solid #ccc",
    marginBottom: "1rem",
    padding: "1rem",
    maxWidth: "100%",
    overflow: "hidden",
    // Mobile-specific styles
    '@media (max-width: 768px)': {
      padding: "0.5rem",
      fontSize: "14px"
    }
  };

  return (
    <div className="card" style={cardStyle}>
      <h3 style={{ 
        fontSize: "1.2rem",
        wordBreak: "break-word",
        marginBottom: "1rem"
      }}>
        {request.user.name} ({request.user.email})
      </h3>
      
      <p style={{ marginBottom: "1rem" }}>
        Status:{" "}
        <strong style={{ color: 
          request.status === "approved" ? "green" :
          request.status === "declined" ? "red" : "orange"
        }}>
          {request.status?.toUpperCase()}
        </strong>
      </p>

      <div style={{ margin: "1rem 0" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>Balance:</label>
        {editing ? (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "0.5rem",
            alignItems: "flex-start"
          }}>
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              style={{ 
                padding: "0.5rem", 
                width: "100%",
                maxWidth: "200px",
                minHeight: "44px", // Better touch target
                fontSize: "16px" // Prevents zoom on iOS
              }}
            />
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button 
                onClick={handleBalanceUpdate}
                disabled={loading}
                style={{ 
                  padding: "0.5rem 1rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  minHeight: "44px",
                  minWidth: "80px"
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button 
                onClick={() => setEditing(false)}
                style={{ 
                  padding: "0.5rem 1rem",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  minHeight: "44px",
                  minWidth: "80px"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem",
            flexWrap: "wrap"
          }}>
            <span style={{ fontSize: "1.1rem" }}>
              ₱{Number(request.user.balance).toLocaleString()}
            </span>
            <button 
              onClick={() => setEditing(true)}
              style={{ 
                padding: "0.25rem 0.5rem",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                minHeight: "36px",
                minWidth: "60px"
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "1rem", 
        margin: "1rem 0"
      }}>
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Front ID:</p>
          {imageLoadErrors.frontId ? (
            <div style={{ 
              width: "100%", 
              maxWidth: "300px",
              height: "200px",
              border: "1px solid #aaa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              marginBottom: "0.5rem"
            }}>
              <p>Image failed to load</p>
            </div>
          ) : (
            <img 
              src={request.frontId} 
              alt="Front ID" 
              onError={() => handleImageError('frontId')}
              style={{ 
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                border: "1px solid #aaa", 
                marginBottom: "0.5rem",
                objectFit: "contain"
              }} 
            />
          )}
          <br />
          <a 
            href={request.frontId} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#2196F3",
              textDecoration: "underline",
              fontSize: "14px"
            }}
          >
            Download Front ID
          </a>
        </div>
        
        <div style={{ width: "100%" }}>
          <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Back ID:</p>
          {imageLoadErrors.backId ? (
            <div style={{ 
              width: "100%", 
              maxWidth: "300px",
              height: "200px",
              border: "1px solid #aaa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              marginBottom: "0.5rem"
            }}>
              <p>Image failed to load</p>
            </div>
          ) : (
            <img 
              src={request.backId} 
              alt="Back ID"
              onError={() => handleImageError('backId')}
              style={{ 
                width: "100%",
                maxWidth: "300px",
                height: "auto",
                border: "1px solid #aaa", 
                marginBottom: "0.5rem",
                objectFit: "contain"
              }} 
            />
          )}
          <br />
          <a 
            href={request.backId} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: "#2196F3",
              textDecoration: "underline",
              fontSize: "14px"
            }}
          >
            Download Back ID
          </a>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        gap: "1rem",
        flexDirection: "column"
      }}>
        <button
          onClick={() => handleStatusUpdate("approved")}
          disabled={loading}
          style={{ 
            padding: "0.75rem",
            backgroundColor: "#d1ffd1",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            minHeight: "48px",
            fontSize: "16px",
            borderRadius: "4px"
          }}
        >
          ✅ Approve
        </button>
        <button
          onClick={() => handleStatusUpdate("declined")}
          disabled={loading}
          style={{ 
            padding: "0.75rem",
            backgroundColor: "#ffd1d1",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            minHeight: "48px",
            fontSize: "16px",
            borderRadius: "4px"
          }}
        >
          ❌ Decline
        </button>
      </div>
    </div>
  );
};

export default AdminVerification;