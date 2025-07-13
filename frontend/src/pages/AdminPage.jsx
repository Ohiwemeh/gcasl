import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import UserInfo from "../components/UserInfo";
import BalanceEditor from "../components/BalanceEditor";
import VerifyActions from "../components/VerifyActions";

const FrontID = lazy(() => import("../components/FrontID"));
const BackID = lazy(() => import("../components/BackID"));

const AdminRequestCard = ({ req, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(req.user?.balance || 0);

  const handleBalanceUpdate = async () => {
    try {
      await axios.patch(`/users/${req.user._id}/balance`, {
        balance: Number(newBalance),
      });
      toast.success("Balance updated");
      setEditing(false);
      onUpdate();
    } catch (err) {
      toast.error("Balance update failed");
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await axios.patch(`/verification/${req._id}`, { status });
      toast.success(`Request ${status}`);
      onUpdate();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-4 border border-gray-300 max-w-full overflow-hidden text-sm sm:text-base mb-4">
      <UserInfo user={req.user} status={req.status} />

      <BalanceEditor
        editing={editing}
        setEditing={setEditing}
        newBalance={newBalance}
        setNewBalance={setNewBalance}
        handleBalanceUpdate={handleBalanceUpdate}
        loading={false}
        userBalance={req.user.balance}
      />

      <div className="flex flex-col gap-4 mt-4">
        <Suspense fallback={<div>Loading front ID...</div>}>
          <FrontID src={req.frontId} />
        </Suspense>

        <Suspense fallback={<div>Loading back ID...</div>}>
          <BackID src={req.backId} />
        </Suspense>
      </div>

      <VerifyActions
        onApprove={() => handleStatusUpdate("approved")}
        onDecline={() => handleStatusUpdate("declined")}
        loading={false}
      />
    </div>
  );
};

const AdminPage = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get("/verification");
      setRequests(data.data);
    } catch (err) {
      toast.error("Failed to fetch verification requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2 className="text-lg font-bold mb-4">Admin Verification Dashboard</h2>

      {requests.length === 0 ? (
        <p>No verification requests found.</p>
      ) : (
        requests.map((req) => (
          <AdminRequestCard key={req._id} req={req} onUpdate={fetchRequests} />
        ))
      )}
    </div>
  );
};

export default AdminPage;
