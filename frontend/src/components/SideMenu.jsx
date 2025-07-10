import {
  Home,
  CreditCard,
  Send,
  History,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { label: "Home", icon: <Home size={18} /> },
  { label: "My Account", icon: <CreditCard size={18} /> },
  { label: "Send Money", icon: <Send size={18} /> },
  { label: "Transactions", icon: <History size={18} /> },
  { label: "Settings", icon: <Settings size={18} /> },
  { label: "Sign Out", icon: <LogOut size={18} /> },
];

export default function SideMenu() {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
        Hello, User
      </div>
      <ul className="divide-y">
        {menuItems.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
