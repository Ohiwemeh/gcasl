// components/CallToActionFooter.jsx
import React from 'react';

const CallToActionFooter = () => {
  return (
    <>
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          Ready to take control of your finances?
        </h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Join millions of customers who trust GCash for their banking needs.
          Open an account today and experience banking designed for you.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded">
          Open an Account
        </button>
      </section>

      <footer className="bg-blue-700 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">Products</h4>
            <ul className="space-y-1">
              <li>GCash Account</li>
              <li>GSave</li>
              <li>GCredit</li>
              <li>GInvest</li>
              <li>GInsure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Financial Education</li>
              <li>Money Management</li>
              <li>Security Center</li>
              <li>Mobile Banking</li>
              <li>Online Banking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Support</h4>
            <ul className="space-y-1">
              <li>Contact Us</li>
              <li>Find a Branch</li>
              <li>Schedule an Appointment</li>
              <li>Help & Support</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">About</h4>
            <ul className="space-y-1">
              <li>About GCash</li>
              <li>Careers</li>
              <li>Investor Relations</li>
              <li>Newsroom</li>
              <li>Corporate Social Responsibility</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CallToActionFooter;
