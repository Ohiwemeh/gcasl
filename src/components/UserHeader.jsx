import React from 'react'

const UserHeader = () => {
  return (
     <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">G</div>
      <h2 className="font-semibold text-lg">Hello, joseph</h2>
    </div>
    <div className="w-8 h-8 rounded-full border flex items-center justify-center">
      <img src="/avatar.png" alt="Profile" className="w-6 h-6" />
    </div>
  </div>
  )
}

export default UserHeader
