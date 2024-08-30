import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../Redux/Slices/blogSlice';
import BlogCard from '../Components/BlogCard';

function Blogspage() {
  const [allBlogs, setAllblogs] = useState([]);
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBlogs() {
      await dispatch(getAllBlogs());
    }
    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    setAllblogs(blogs);
  }, [blogs]);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Blogspage;
