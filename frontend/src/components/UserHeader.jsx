// import React from 'react'
import { useUserStore } from '../stores/useUserStore';
import { useEffect } from "react";

const UserHeader = () => {
  const { user, checkAuth } = useUserStore();


  useEffect(() => {
    if (!user) {
      checkAuth(); // in case user is reloading the page
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  
  return (
     <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">G</div>
      
    <h2 className="font-semibold text-lg">Welcome, {user.name}</h2>
    </div>
    <div className="w-8 h-8 rounded-full border flex items-center justify-center">
      <img src="/avatar.png" alt="Profile" className="w-6 h-6" />
    </div>
  </div>
  )
}

export default UserHeader;
