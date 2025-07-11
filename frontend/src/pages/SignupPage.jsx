// SignupPage.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '../stores/useUserStore.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showModal, setShowModal] = useState(false);

  const { signup, loading } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signup(formData);
      toast.success('Signup successful');
      setShowModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  const handleVerify = () => {
    navigate('/verification');
  };

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-blue-600 text-xl font-bold">
          G
        </div>
        <h1 className="text-white font-bold text-xl mt-2">GCASH</h1>
      </div>

      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-center text-blue-700 font-bold text-xl mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Full Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 border rounded outline-none" />
          </div>
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Confirm Password</label>
            <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-4 py-2 border rounded outline-none" />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" required />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-lg font-semibold mb-4">Please verify your account</h2>
            <button
              onClick={handleVerify}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
