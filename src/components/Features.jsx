// components/Features.jsx
import React from 'react';
import { ShieldCheck, Smartphone, LineChart } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
    title: 'Secure Banking',
    desc: 'Advanced security features to protect your accounts and personal information 24/7.',
  },
  {
    icon: <Smartphone className="w-10 h-10 text-blue-600" />,
    title: 'Mobile Banking',
    desc: 'Manage your accounts, deposit checks, and send money from anywhere with our mobile app.',
  },
  {
    icon: <LineChart className="w-10 h-10 text-blue-600" />,
    title: 'Financial Tools',
    desc: 'Budgeting tools, spending analysis, and personalized insights to help you manage your money.',
  },
];

const Features = () => {
  return (
    <section className="bg-gray-100 py-16 text-center">
      <h2 className="text-xl font-semibold mb-10 text-blue-800">Why Choose GCash</h2>
      <div className="max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-3">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="font-bold text-lg text-blue-700">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
