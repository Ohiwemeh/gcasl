// components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-600 text-white text-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Banking Made Simple</h1>
      <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">
        Secure, convenient banking with tools to help you manage your finances and reach your goals.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded font-semibold">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
