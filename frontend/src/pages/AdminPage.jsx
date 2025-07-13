// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [balanceUpdating, setBalanceUpdating] = useState(null);
  const [editBalanceId, setEditBalanceId] = useState(null);
  const [balances, setBalances] = useState({});

  const fetchRequests = async () => {
    try {
      const { data } = await axiosInstance.get("/verification");
      setRequests(data.data);
    } catch (err) {
      toast.error("Failed to fetch verification requests");
    } finally {
      setLoading(false);
    }
  };

  const handleBalanceChange = (userId, value) => {
    setBalances((prev) => ({ ...prev, [userId]: value }));
  };

  const updateBalance = async (userId) => {
    try {
      setBalanceUpdating(userId);
      await axiosInstance.patch(`/users/${userId}/balance`, {
        balance: Number(balances[userId]),
      });
      toast.success("Balance updated");
      fetchRequests();
      setEditBalanceId(null);
    } catch {
      toast.error("Failed to update balance");
    } finally {
      setBalanceUpdating(null);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setStatusUpdating(id);
      await axiosInstance.patch(`/verification/${id}`, { status });
      toast.success(`Marked as ${status}`);
      fetchRequests();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setStatusUpdating(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div className="p-4">Loading admin dashboard...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Verification Dashboard</h1>
      {requests.length === 0 ? (
        <p>No verification requests found.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="border p-4 mb-4 rounded-md">
            <div className="flex flex-col gap-2">
              <strong>{req.user.name}</strong>
              <span>{req.user.email}</span>
              <span>Status: {req.status}</span>

              <div>
                Balance:
                {editBalanceId === req.user._id ? (
                  <>
                    <input
                      type="number"
                      value={balances[req.user._id] || req.user.balance}
                      onChange={(e) => handleBalanceChange(req.user._id, e.target.value)}
                      className="border p-1 mx-2"
                    />
                    <button
                      onClick={() => updateBalance(req.user._id)}
                      disabled={balanceUpdating === req.user._id}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      {balanceUpdating === req.user._id ? "Updating..." : "Save"}
                    </button>
                  </>
                ) : (
                  <>
                    <span className="mx-2">₦{req.user.balance}</span>
                    <button
                      onClick={() => setEditBalanceId(req.user._id)}
                      className="text-blue-600 underline"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => updateStatus(req._id, "approved")}
                  disabled={statusUpdating === req._id}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  {statusUpdating === req._id ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={() => updateStatus(req._id, "declined")}
                  disabled={statusUpdating === req._id}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  {statusUpdating === req._id ? "Processing..." : "Decline"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
