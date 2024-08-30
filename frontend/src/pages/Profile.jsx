import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getmyBlogs } from '../Redux/Slices/blogSlice';
import BlogCard from '../Components/BlogCard';

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      if (userData?._id) {
        await dispatch(getmyBlogs(userData._id));
      }
    }
    fetchBlogs();
  }, [dispatch, userData]);

  useEffect(() => {
    setUserBlogs(blogs);
  }, [blogs]);

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    // This could be navigation to an edit profile page or showing a modal
    console.log('Update profile button clicked');
  };

  return (
    <div className='w-full min-h-screen bg-gray-800 text-gray-300 p-6'>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
          <img
            src={userData.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold">{userData.name || 'Username'}</h1>
        <p className="text-gray-400">{userData.email || 'user@example.com'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {userBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
