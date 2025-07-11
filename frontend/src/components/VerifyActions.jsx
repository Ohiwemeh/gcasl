const VerifyActions = ({ onApprove, onDecline, loading }) => (
  <div className="flex flex-col gap-2 mt-4">
    <button
      onClick={onApprove}
      disabled={loading}
      className="p-3 bg-green-100 text-green-800 rounded"
    >
      ✅ Approve
    </button>
    <button
      onClick={onDecline}
      disabled={loading}
      className="p-3 bg-red-100 text-red-800 rounded"
    >
      ❌ Decline
    </button>
  </div>
);

export default VerifyActions;
