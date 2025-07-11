import React, { useState, useEffect, lazy, Suspense } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";
import UserInfo from "./UserInfo";
import BalanceEditor from "./BalanceEditor";
import VerifyActions from "./VerifyActions";
import CardSkeleton from "./CardSkeleton";

const FrontID = lazy(() => import("./FrontID"));
const BackID = lazy(() => import("./BackID"));

const AdminVerification = ({ request = null, onUpdate = () => {}, delay = 0 }) => {
  const [localRequest, setLocalRequest] = useState(null);
  const [newBalance, setNewBalance] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (request) {
      setLocalRequest(request);
      setNewBalance(request.user?.balance || 0);
    }
  }, [request]);

  const handleBalanceUpdate = async () => {
    try {
      setLoading(true);
      await axios.patch(`/users/${localRequest.user._id}/balance`, {
        balance: Number(newBalance),
      });
      toast.success("Balance updated");
      setEditing(false);
      onUpdate();
    } catch (err) {
      toast.error("Balance update failed");
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
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (type) =>
    setImageLoadErrors((prev) => ({ ...prev, [type]: true }));

  if (!showDetails || !localRequest) return <CardSkeleton />;

  return (
    <div className="p-4 border border-gray-300 max-w-full overflow-hidden text-sm sm:text-base mb-4">
      <UserInfo user={localRequest.user} status={localRequest.status} />

      <BalanceEditor
        editing={editing}
        setEditing={setEditing}
        newBalance={newBalance}
        setNewBalance={setNewBalance}
        handleBalanceUpdate={handleBalanceUpdate}
        loading={loading}
        userBalance={localRequest.user.balance}
      />

      <div className="flex flex-col gap-4 mt-4">
        <Suspense fallback={<div>Loading front ID...</div>}>
          <FrontID
            src={localRequest.frontId}
            onError={() => handleImageError("frontId")}
            error={imageLoadErrors.frontId}
          />
        </Suspense>

        <Suspense fallback={<div>Loading back ID...</div>}>
          <BackID
            src={localRequest.backId}
            onError={() => handleImageError("backId")}
            error={imageLoadErrors.backId}
          />
        </Suspense>
      </div>

      <VerifyActions
        onApprove={() => handleStatusUpdate("approved")}
        onDecline={() => handleStatusUpdate("declined")}
        loading={loading}
      />
    </div>
  );
};

export default AdminVerification;
