import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../Redux/Slices/UserSlice';
import { toast } from 'react-hot-toast';

function ResetPassword() {
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, newJwt } = useParams();

  function onValueChange(e) {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { password, confirmPassword } = passwordData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await dispatch(resetPassword({ password, confirmPassword, _id, newJwt }));
      if (res?.payload?.success) {
        toast.success("Password reset successfully");
        navigate('/login');
      } else {
        toast.error(res.payload.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error("An error occurred");
      console.error("Submit error:", err);
    }
  }

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-lg mb-2 font-semibold text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={passwordData.password}
              onChange={onValueChange}
              placeholder='Enter your new password'
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg mb-2 font-semibold text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={onValueChange}
              placeholder='Confirm your new password'
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md transition-all duration-300 ease-out shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
