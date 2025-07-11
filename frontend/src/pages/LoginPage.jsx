
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";


const LoginPage = () => {
  const { login } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const success = await login(email, password);
    console.log("Login success:", success);

    if (success) {
      const { user } = useUserStore.getState(); // Access user from store
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (error) {
    console.error("Login error:", error);
  } finally {
    setLoading(false);
  }
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
        <h2 className="text-center text-blue-700 font-bold text-xl mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Email</label>
            <input
             id='email'
								  required
								  value={email}
								  onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-blue-700 mb-1">Password</label>
            <input
             id='password'
								  type='password'
								  required
								  value={password}
								  onChange={(e) => setPassword(e.target.value)}
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
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-md text-base sm:text-lg min-h-[48px] transition-all flex items-center justify-center"
>
  {loading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 mr-2 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
        ></path>
      </svg>
      Signing In...
    </>
  ) : (
    "Sign In"
  )}
</button>

        </form>

        <div className="text-center mt-4 text-sm">
          {/* <a href="#" className="text-blue-600 hover:underline block mb-1">
            Forgot Password?
          </a> */}
          <span>
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;