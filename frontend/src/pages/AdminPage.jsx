// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get("/verification");
        setRequests(data.data);
      } catch (err) {
        setError("Failed to fetch data");
        toast.error("Failed to fetch verification requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <div className="p-4">Loading admin dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Verification Dashboard</h2>
      {requests.length === 0 ? (
        <p>No verification requests found.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((req) => (
            <div key={req._id} className="p-4 border rounded">
              <h3 className="font-bold">{req.user.name}</h3>
              <p>Email: {req.user.email}</p>
              <p>Status: {req.status}</p>
              <p>Balance: ₦{req.user.balance}</p>
              <div className="flex flex-col gap-2 mt-4">
                <img
                  src={req.frontId}
                  alt="Front ID"
                  className="w-full max-w-xs rounded border"
                />
                <img
                  src={req.backId}
                  alt="Back ID"
                  className="w-full max-w-xs rounded border"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      await axios.patch(`/verification/${req._id}`, {
                        status: "approved",
                      });
                      toast.success("Approved");
                      setRequests((prev) =>
                        prev.map((r) =>
                          r._id === req._id ? { ...r, status: "approved" } : r
                        )
                      );
                    } catch (err) {
                      toast.error("Failed to approve");
                    }
                  }}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={async () => {
                    try {
                      await axios.patch(`/verification/${req._id}`, {
                        status: "declined",
                      });
                      toast.success("Declined");
                      setRequests((prev) =>
                        prev.map((r) =>
                          r._id === req._id ? { ...r, status: "declined" } : r
                        )
                      );
                    } catch (err) {
                      toast.error("Failed to decline");
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
