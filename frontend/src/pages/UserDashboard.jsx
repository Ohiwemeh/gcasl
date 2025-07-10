// // pages/UserDashboard.jsx
// import { useEffect } from "react";
// import { useUserStore } from "../stores/useUserStore";

// const UserDashboard = () => {
//   const { user, checkAuth } = useUserStore();

//   useEffect(() => {
//     if (!user) {
//       checkAuth(); // in case user is reloading the page
//     }
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="bg-blue-600 text-white rounded-lg p-4 mx-4 shadow mb-4">
//      <h2>Welcome, {user.name}</h2>
//     <p className="text-sm">AVAILABLE BALANCE</p>
//     <div className="flex items-center justify-between mt-2">
//       <div>
//          <p className="text-3xl font-bold"><strong>Balance:</strong> ₦{user.balance ?? 0}</p>
       
//       </div>
//       <button className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold text-sm">
//         + Cash In
//       </button>
//     </div>
//   </div>
//   );
// };

// export default UserDashboard;

