// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">GCASH</div>
        <nav className="hidden md:flex gap-6 font-semibold">
          <a href="#" className="hover:underline">Personal</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Support</a>
        </nav>
        <div className="flex gap-4">
          <Link to="/login"><button className="border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-600 transition">Sign In</button></Link>
          <Link to="/signup"><button className="font-semibold">Sign Up</button></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
