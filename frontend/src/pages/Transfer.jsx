import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const Transfer = () => {
  const { user, checkAuth } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) checkAuth();
  }, []);

  const handleSendMoney = () => {
    setShowModal(true);
  };

  const handleVerify = () => {
    setShowModal(false);
    navigate("/verification");
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-20">
      {/* Top Nav */}
      <div className="bg-white w-full max-w-md flex justify-between items-center px-4 py-3 shadow">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">G</div>
          <h2 className="text-blue-700 font-semibold text-lg">Send Money</h2>
        </div>
        <User className="w-6 h-6 text-gray-700" />
      </div>

      {/* Form Section */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white shadow rounded-lg p-5 w-full max-w-md mt-5 space-y-4"
      >
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">From</p>
          <select className="w-full border rounded px-3 py-2 text-gray-700 bg-gray-50">
            <option>{`GCash Account - ₱${user.balance ?? 0}`}</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">To (Account Number)</p>
          <input
            type="text"
            placeholder="Enter recipient's account number"
            className="w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Amount</p>
          <div className="flex items-center border rounded px-3 py-2 bg-gray-50 text-gray-700">
            <span className="text-sm mr-1">₱</span>
            <input
              type="text"
              placeholder="0.00"
              className="flex-1 outline-none bg-transparent"
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Note (Optional)</p>
          <input
            type="text"
            placeholder="What's this for?"
            className="w-full border rounded px-3 py-2 text-gray-700"
          />
        </div>

        <button
          type="button"
          onClick={handleSendMoney}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Send Money
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Withdrawal Pending</h2>
            <p className="text-gray-600 mb-4">
              You will receive an email shortly with confirmation details.
            </p>
            <button
              onClick={handleVerify}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
