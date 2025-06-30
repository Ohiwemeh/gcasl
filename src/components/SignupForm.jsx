// components/SignupForm.jsx
import React from 'react';

const SignupForm = () => {
  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-blue-600 text-xl font-bold">
          G
        </div>
        <h1 className="text-white font-bold text-xl mt-2">GCASH</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-center text-blue-700 font-bold text-xl mb-6">Create Account</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">First Name</label>
            <input type="text" placeholder="Enter your first name" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Last Name</label>
            <input type="text" placeholder="Enter your last name" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Password</label>
            <input type="password" placeholder="Create a password" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Confirm Password</label>
            <input type="password" placeholder="Confirm your password" className="w-full px-4 py-2 border rounded outline-none" />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">I agree to the Terms & Conditions</label>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <a href="#" className="text-blue-700 font-semibold">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
