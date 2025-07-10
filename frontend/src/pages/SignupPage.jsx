// components/SignupForm.jsx
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore.js";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData).then(() => {
      toast.success("Signup successful");
      navigate('/dashboard')
    }).catch((error) => {
      toast.error(error.response?.data?.message || "Signup failed");
    });
  };

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

        <form  onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Full Name</label>
            <input
              id='name'
              type='text'
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your first name" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Email</label>
            <input id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
              <label className="block font-semibold text-sm text-blue-700 mb-1">Password</label>
                  <input id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Create a password" className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Confirm Password</label>
            <input id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Confirm your password" className="w-full px-4 py-2 border rounded outline-none" />
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
          Already have an account? <Link to="/login" className="text-blue-700 font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
