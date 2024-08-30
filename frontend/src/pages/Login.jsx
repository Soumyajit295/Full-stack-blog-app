import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/Slices/UserSlice';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLoginData(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await dispatch(loginUser(loginData));
    if (res?.payload?.success) {
      setLoginData({
        email: '',
        password: '',
      });
      navigate('/');
    }
  }

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen z-10">
      <div className="w-full max-w-md bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Log In</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-lg mb-2 font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginData}
              placeholder="Enter a registered email address"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg mb-2 font-semibold text-gray-300">
              Password
            </label>
            {/* Use a flex container to align the input and button */}
            <div className="flex items-center mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginData}
                placeholder="Enter your password"
                className="block w-full px-3 py-2 border border-gray-600 rounded-l-md bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 py-2.5 border border-l-0 border-gray-600 rounded-r-md bg-gray-700 text-gray-200 hover:text-gray-400 focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md transition-all duration-300 ease-out shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Log In
          </button>

          <div className="text-center mt-4">
            <Link to="/forget-password" className="text-md text-gray-400 hover:text-orange-500">
              Forgot Password?
            </Link>
          </div>

          <div className="text-center mt-4">
            <p className="text-md text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-400 hover:text-orange-500">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
