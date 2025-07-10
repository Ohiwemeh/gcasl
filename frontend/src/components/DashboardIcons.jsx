import React from 'react'
import {
  Send,
  Download,
  Banknote,
  Receipt,
  HandCoins,
  PiggyBank,
  ShieldCheck,
  BarChart2,
  Heart,
  Gift,
  Leaf,
  Clock,
} from "lucide-react";
import { Link } from 'react-router-dom';

const dashboardItems = [
  
  { label: "Send", icon: <Send size={20} />,path:"/transfer" },
  { label: "Load", icon: <Download size={20} /> },
  { label: "Transfer", icon: <Banknote size={20} /> },
  { label: "Bills", icon: <Receipt size={20} /> },
  { label: "Borrow", icon: <HandCoins size={20} /> },
  { label: "GSave", icon: <PiggyBank size={20} /> },
  { label: "GInsure", icon: <ShieldCheck size={20} /> },
  { label: "GInvest", icon: <BarChart2 size={20} /> },
  { label: "GLife", icon: <Heart size={20} /> },
  { label: "A+ Rewards", icon: <Gift size={20} /> },
  { label: "GForest", icon: <Leaf size={20} /> },
  { label: "Transactions", icon: <Clock size={20} /> },
];
const DashboardIcons = () => {
  return (
   <div className="grid grid-cols-4 gap-y-6 gap-x-2 mt-6">
  {dashboardItems.map((item, index) => (
    <Link key={index} to={item.path} className="flex flex-col items-center text-sm text-gray-700">
      <div className="bg-gray-100 p-3 rounded-full shadow-sm text-blue-600">
        {item.icon}
      </div>
      <span className="text-xs mt-1 text-center">{item.label}</span>
    </Link>
  ))}
</div>
  )
}

export default DashboardIcons
