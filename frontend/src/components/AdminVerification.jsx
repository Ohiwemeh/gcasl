import React, { useState, useEffect } from "react";
import axios from "../lib/axios"
import { toast } from "react-hot-toast";

const AdminVerification = ({ request = null, onUpdate = () => {} }) => {
  // State initialization with better defaults
  const [newBalance, setNewBalance] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localRequest, setLocalRequest] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  // Debug mobile environment
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const debugData = {
      isMobile,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      connection: navigator.connection?.effectiveType || 'unknown',
      timestamp: new Date().toISOString()
    };
    setDebugInfo(debugData);
    console.log('🔍 AdminVerification Debug Info:', debugData);
  }, []);

  // Initialize data when request prop changes
  useEffect(() => {
    console.log('🔍 Request prop changed:', { request, hasUser: !!request?.user });
    if (request) {
      setLocalRequest(request);
      setNewBalance(request.user?.balance || 0);
      console.log('✅ Local request set:', { 
        id: request._id, 
        userId: request.user?._id,
        balance: request.user?.balance 
      });
    }
  }, [request]);

  // Show loading state if request isn't loaded yet
  if (!localRequest) {
    return (
      <div className="card" style={{ 
        border: "1px solid #ccc", 
        padding: "1rem",
        maxWidth: "100%",
        backgroundColor: "#f9f9f9"
      }}>
        <h3>Loading verification data...</h3>
        <div style={{ fontSize: "12px", color: "#666", marginTop: "1rem" }}>
          <p><strong>Debug Info:</strong></p>
          <p>Mobile: {debugInfo.isMobile ? 'Yes' : 'No'}</p>
          <p>Screen: {debugInfo.screenWidth}x{debugInfo.screenHeight}</p>
          <p>Connection: {debugInfo.connection}</p>
          <p>Request prop: {request ? 'Received' : 'Missing'}</p>
        </div>
      </div>
    );
  }

  // Show error if user data is missing
  if (!localRequest.user) {
    return (
      <div className="card" style={{ 
        border: "1px solid #ffcccc", 
        padding: "1rem",
        maxWidth: "100%",
        backgroundColor: "#fff5f5"
      }}>
        <h3>Data Loading Issue</h3>
        <p>Debug information:</p>
        <ul>
          <li>Request ID: {localRequest._id}</li>
          <li>User data: Missing</li>
          <li>Mobile: {debugInfo.isMobile ? 'Yes' : 'No'}</li>
          <li>Screen: {debugInfo.screenWidth}x{debugInfo.screenHeight}</li>
        </ul>
        <button 
          onClick={() => {
            console.log('🔄 Refresh button clicked');
            onUpdate();
          }}
          style={{
            padding: "0.5rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            minHeight: "44px",
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
      console.log('💰 Starting balance update...');
      console.log('🔍 Environment variable:', import.meta.env.VITE_API_BASE_URL);
      console.log('🔍 User ID:', localRequest.user._id);
      console.log('🔍 Request path:', `/users/${localRequest.user._id}/balance`);
      console.log('🔍 Expected full URL:', `${import.meta.env.VITE_API_BASE_URL}/users/${localRequest.user._id}/balance`);
      console.log('🔍 New balance value:', newBalance);
      
      const res = await axios.patch(
        `/users/${localRequest.user._id}/balance`,
        { balance: Number(newBalance) }
      );
      console.log('✅ Balance update response:', res.data);
      toast.success("Balance updated successfully");
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error('❌ Balance update failed:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code
      });
      toast.error(
        err.response?.data?.error || 
        err.response?.data?.message || 
        err.message ||
        "Failed to update balance"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      setLoading(true);
      console.log('📝 Updating status to:', status);
      
      const res = await axios.patch(
        `/verification/${localRequest._id}`,
        { status }
      );
      console.log('✅ Status update response:', res.data);
      toast.success(`Request ${status}`);
      onUpdate();
    } catch (err) {
      console.error('❌ Status update failed:', err);
      toast.error(err.response?.data?.error || err.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ 
      border: "1px solid #ccc",
      marginBottom: "1rem",
      padding: "1rem",
      maxWidth: "100%",
      overflow: "hidden"
    }}>
      {/* Debug panel - remove this in production */}
      <div style={{ 
        backgroundColor: "#f0f0f0", 
        padding: "0.5rem", 
        marginBottom: "1rem",
        fontSize: "12px",
        border: "1px solid #ddd"
      }}>
        <strong>Debug Panel:</strong> Mobile: {debugInfo.isMobile ? 'Yes' : 'No'} | 
        Screen: {debugInfo.screenWidth}x{debugInfo.screenHeight} | 
        Connection: {debugInfo.connection}
      </div>

      <h3 style={{ 
        fontSize: "1.2rem",
        wordBreak: "break-word",
        marginBottom: "1rem"
      }}>
        {localRequest.user.name} ({localRequest.user.email})
      </h3>
      
      <p style={{ marginBottom: "1rem" }}>
        Status:{" "}
        <strong style={{ color: 
          localRequest.status === "approved" ? "green" :
          localRequest.status === "declined" ? "red" : "orange"
        }}>
          {localRequest.status?.toUpperCase()}
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
              onChange={(e) => {
                console.log('💰 Balance input changed:', e.target.value);
                setNewBalance(e.target.value);
              }}
              style={{ 
                padding: "0.5rem", 
                width: "100%",
                maxWidth: "200px",
                minHeight: "44px",
                fontSize: "16px"
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
                onClick={() => {
                  console.log('❌ Edit cancelled');
                  setEditing(false);
                }}
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
              ₱{Number(localRequest.user.balance).toLocaleString()}
            </span>
            <button 
              onClick={() => {
                console.log('✏️ Edit balance clicked');
                setEditing(true);
              }}
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

      {/* Simplified image section for mobile testing */}
      <div style={{ margin: "1rem 0" }}>
        <p><strong>ID Images:</strong></p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Front ID: {localRequest.frontId ? 'Available' : 'Missing'}<br/>
          Back ID: {localRequest.backId ? 'Available' : 'Missing'}
        </p>
        
        {/* Only show images if not on mobile or if user specifically wants to see them */}
        {!debugInfo.isMobile && (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <img 
                src={localRequest.frontId} 
                alt="Front ID" 
                style={{ 
                  width: "200px",
                  height: "auto",
                  border: "1px solid #aaa"
                }} 
              />
            </div>
            <div>
              <img 
                src={localRequest.backId} 
                alt="Back ID" 
                style={{ 
                  width: "200px",
                  height: "auto",
                  border: "1px solid #aaa"
                }} 
              />
            </div>
          </div>
        )}
        
        <div style={{ marginTop: "0.5rem" }}>
          <a href={localRequest.frontId} target="_blank" rel="noopener noreferrer">
            View Front ID
          </a>
          {" | "}
          <a href={localRequest.backId} target="_blank" rel="noopener noreferrer">
            View Back ID
          </a>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        gap: "1rem",
        flexDirection: debugInfo.isMobile ? "column" : "row"
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