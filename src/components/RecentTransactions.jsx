import React from 'react'



const RecentTransactions = () => {
  return (
   <div className="mx-4 mb-16">
    <h3 className="font-semibold text-blue-800 text-lg flex items-center gap-2 mb-2">
      <span className="rotate-[-30deg]">🔄</span> Recent Transactions
    </h3>
    <p className="text-sm text-gray-500 mb-2">No recent transactions</p>
    <a href="#" className="text-blue-600 font-semibold text-sm">View All Transactions →</a>
  </div>
  )
}

export default RecentTransactions
