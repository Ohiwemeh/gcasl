import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import AdminVerification from "../components/AdminVerification";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState({});
  const [apiError, setApiError] = useState(null);

  const fetchRequests = async () => {
    try {
      console.log("🔍 AdminPage - Starting API call...");
      setApiError(null);
      
      const response = await axiosInstance.get("/verification");
      console.log("🔍 AdminPage - Full API response:", response);
      console.log("🔍 AdminPage - Response data:", response.data);
      console.log("🔍 AdminPage - Response structure:", {
        hasSuccess: 'success' in response.data,
        hasData: 'data' in response.data,
        dataType: Array.isArray(response.data?.data) ? 'array' : typeof response.data?.data,
        dataLength: response.data?.data?.length || 0
      });

      // Handle different response structures
      let requestsData = [];
      if (response.data?.data) {
        requestsData = response.data.data;
      } else if (Array.isArray(response.data)) {
        requestsData = response.data;
      } else {
        console.warn("⚠️ Unexpected response structure");
        requestsData = [];
      }

      console.log("🔍 AdminPage - Processed requests:", requestsData);
      setRequests(requestsData);
      
      // Set debug info
      setDebugInfo({
        apiCallSuccess: true,
        requestsCount: requestsData.length,
        firstRequest: requestsData[0] || null,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        screenWidth: window.innerWidth,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      console.error("❌ AdminPage - API error:", err);
      console.error("❌ AdminPage - Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code
      });
      
      setApiError({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      
      toast.error(err.response?.data?.message || "Failed to fetch verification requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔍 AdminPage - Component mounted, fetching requests...");
    fetchRequests();
  }, []);

  // Debug loading state
  if (loading) {
    return (
      <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", border: "2px solid blue" }}>
        <h2>Loading admin dashboard...</h2>
        <p>Mobile: {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Yes' : 'No'}</p>
        <p>Screen: {window.innerWidth}x{window.innerHeight}</p>
      </div>
    );
  }

  // Debug error state
  if (apiError) {
    return (
      <div style={{ padding: "1rem", backgroundColor: "#ffcccc", border: "2px solid red" }}>
        <h2>API Error</h2>
        <p><strong>Message:</strong> {apiError.message}</p>
        <p><strong>Status:</strong> {apiError.status}</p>
        <p><strong>Mobile:</strong> {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Yes' : 'No'}</p>
        <button onClick={fetchRequests} style={{ padding: "0.5rem", marginTop: "1rem" }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      {/* Debug panel */}
      <div style={{ 
        backgroundColor: "#e8f4f8", 
        border: "1px solid #ccc", 
        padding: "1rem", 
        marginBottom: "1rem",
        fontSize: "14px"
      }}>
        <h3>Debug Info</h3>
        <p><strong>Mobile:</strong> {debugInfo.isMobile ? 'Yes' : 'No'}</p>
        <p><strong>Screen:</strong> {debugInfo.screenWidth}x{window.innerHeight}</p>
        <p><strong>Requests Count:</strong> {debugInfo.requestsCount}</p>
        <p><strong>API Success:</strong> {debugInfo.apiCallSuccess ? 'Yes' : 'No'}</p>
        <p><strong>First Request ID:</strong> {debugInfo.firstRequest?._id || 'N/A'}</p>
        <p><strong>First Request User:</strong> {debugInfo.firstRequest?.user?.name || 'N/A'}</p>
        <button onClick={fetchRequests} style={{ padding: "0.5rem", marginTop: "0.5rem" }}>
          Refresh Data
        </button>
      </div>

      <h2>Admin Verification Dashboard</h2>
      
      {requests.length === 0 ? (
        <div style={{ padding: "1rem", backgroundColor: "#fff3cd", border: "1px solid #ffeaa7" }}>
          <p><strong>No verification requests found.</strong></p>
          <p>This could mean:</p>
          <ul>
            <li>No users have submitted verification requests yet</li>
            <li>The API returned empty data</li>
            <li>There's a data filtering issue</li>
          </ul>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: "1rem", color: "#666" }}>
            Showing {requests.length} verification request{requests.length !== 1 ? 's' : ''}
          </p>
          {requests.map((req, index) => {
            console.log(`🔍 Rendering AdminVerification ${index + 1}:`, req);
            return (
              <AdminVerification
                key={req._id}
                request={req}
                onUpdate={fetchRequests}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPage;