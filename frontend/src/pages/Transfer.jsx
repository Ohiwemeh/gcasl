import { Link } from "react-router-dom";
import { User } from "lucide-react"; // Adjust if you're using another icon
import { useState } from "react";

const Transfer = () => {
  const [accountFrom] = useState("GCash Account - ₱0.00");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-20">
      {/* Top Nav */}
      <div className="bg-white w-full max-w-md flex justify-between items-center px-4 py-3 shadow">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">G</div>
          <h2 className="text-blue-700 font-semibold text-lg">Send Money</h2>
        </div>
        <div>
          <User className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {/* Form Section */}
      <form className="bg-white shadow rounded-lg p-5 w-full max-w-md mt-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">From</p>
          <select className="w-full border rounded px-3 py-2 text-gray-700 bg-gray-50">
            <option>{accountFrom}</option>
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

        <Link to="/verification">
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Send Money
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Transfer;