import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/Slices/UserSlice';

function Signup() {
  const [previewImage, setPreviewImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  function handleSignupData(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  }

  function handleImage(e) {
    const uploadedImage = e.target.files[0];
    setSignupData({
      ...signupData,
      avatar: uploadedImage
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.onload = () => {
      setPreviewImage(fileReader.result);
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', signupData.name);
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('avatar', signupData.avatar);

    const res = await dispatch(registerUser(formData));
    if (res?.payload?.success) {
      setSignupData({
        name: '',
        email: '',
        password: '',
        avatar: ''
      });
      navigate('/login');
    }
  }

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="w-full max-w-sm bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-white text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <label className="flex flex-col items-center cursor-pointer">
              <span className="text-gray-400 mb-1 text-sm font-semibold">Upload Avatar</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
              <img
                src={previewImage || 'https://via.placeholder.com/100'}
                alt="Avatar"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-600"
              />
            </label>
          </div>

          <div>
            <label htmlFor="name" className="block text-lg mb-1 font-semibold text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={signupData.name}
              onChange={handleSignupData}
              placeholder='Enter a unique username'
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg mb-1 font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              onChange={handleSignupData}
              placeholder='Enter a valid email address'
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg mb-1 font-semibold text-gray-300">
              Password
            </label>
            <div className="flex items-center bg-gray-700 rounded-md border border-gray-600 mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupData}
                placeholder='Enter a strong password'
                className="flex-grow px-3 py-2 bg-gray-700 text-gray-200 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center px-3 py-2 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-4 w-4" />
                ) : (
                  <AiOutlineEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-1.5 px-3 bg-orange-500 text-white font-semibold rounded-md transition-all duration-300 ease-out shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Sign Up
          </button>

          <div className="text-center mt-3">
            <p className="text-md text-gray-400">
              Already have an account?{' '}
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

export default Signup;
