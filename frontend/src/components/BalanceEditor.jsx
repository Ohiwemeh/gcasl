const BalanceEditor = ({
  editing,
  setEditing,
  newBalance,
  setNewBalance,
  handleBalanceUpdate,
  loading,
  userBalance,
}) =>
  editing ? (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Balance:</label>
      <input
        type="number"
        value={newBalance}
        onChange={(e) => setNewBalance(e.target.value)}
        className="p-2 w-full max-w-xs border border-gray-300 rounded"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleBalanceUpdate}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => setEditing(false)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-semibold text-base">
        ₱{Number(userBalance).toLocaleString()}
      </span>
      <button
        onClick={() => setEditing(true)}
        className="px-2 py-1 bg-blue-600 text-white rounded"
      >
        Edit
      </button>
    </div>
  );

export default BalanceEditor;
