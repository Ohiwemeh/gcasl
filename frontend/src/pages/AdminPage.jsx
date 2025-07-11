// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import AdminVerification from "../components/AdminVerification";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
   try {
    const { data } = await axiosInstance.get("/verification");
    console.log("🧪 Admin verification data:", data);
    setRequests(data.data); // 👈 Fix: Use data.data because the response is { success, data }
  } catch (err) {
    toast.error("Failed to fetch verification requests");
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div>Loading admin dashboard...</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Admin Verification Dashboard</h2>
      {requests.length === 0 ? (
        <p>No verification requests found.</p>
      ) : (
        requests.map((req) => (
          <AdminVerification
            key={req._id}
            request={req}
            onUpdate={fetchRequests}
          />
        ))
      )}
    </div>
  );
};

export default AdminPage;
