// pages/UserDashboard.jsx
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";

const BalanceCard = () => {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
      if (!user) {
        checkAuth(); // in case user is reloading the page
      }
    }, []);
  
    if (!user) return <p>Loading...</p>;


  return (
    <div className="bg-blue-600 text-white rounded-lg p-4 mx-4 shadow mb-4">
    <p className="text-sm">AVAILABLE BALANCE</p>
    <div className="flex items-center justify-between mt-2">
      <div>
         <p className="text-3xl font-bold">₱{user.balance ?? 0}</p>
         <p className="text-xs mt-1">Account #: 8275167933</p>
       
      </div>
      <button className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold text-sm">
        + Cash In
      </button>
    </div>
  </div>
  );
};

export default BalanceCard;

