import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgetPassword } from '../Redux/Slices/UserSlice';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const {isLoggedin} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  async function onForgotPassword(e){
    e.preventDefault()
    if(!isLoggedin){
      await dispatch(forgetPassword({email}))
    }
    else{
      toast.error("You are all ready loggedin")
    }
  }

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Forgot Password</h2>
        <form className="space-y-6" onSubmit={onForgotPassword}>
          <div>
            <label htmlFor="email" className="block text-lg mb-2 font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder='Enter your registered email address'
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

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Remembered your password?{' '}
              <Link to="/login" className="text-orange-400 hover:text-orange-500">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
