
import React from 'react';
import { Link } from 'react-router-dom';

const  SignInForm = () => {
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
        <h2 className="text-center text-blue-700 font-bold text-xl mb-6">Sign In</h2>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded outline-none"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline block mb-1">
            Forgot Password?
          </a>
          <span>
            Don’t have an account?{' '}
            <Link to="/login">
              <a className="text-blue-600 font-semibold hover:underline">Sign Up</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;