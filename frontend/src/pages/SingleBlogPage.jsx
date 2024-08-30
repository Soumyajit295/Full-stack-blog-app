import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, fetchSingleBlog, updateThumbnail } from '../Redux/Slices/blogSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function SingleBlogPage() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(null); // State to handle thumbnail file input
  const singleBlog = useSelector((state) => state.blog.singleBlog);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      await dispatch(fetchSingleBlog(blogId));
      setLoading(false);
    }
    fetchBlog();
  }, [dispatch, blogId]);

  useEffect(() => {
    if (singleBlog.author && userData) {
      setAuth(singleBlog.author.username === userData.name);
    }
  }, [singleBlog, userData]);

  async function handleDeleteBlog() {
    const res = await dispatch(deleteBlog(blogId));
    if (res?.payload?.success) {
      navigate('/blogs');
    }
  }

  function handleThumbnailChange(e) {
    setThumbnail(e.target.files[0]);
  }

  async function handleUpdateThumbnail() {
    if (!thumbnail) return;
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    await dispatch(updateThumbnail({ blogId, thumbnail: formData }));
  }

  if (loading) {
    return <div className="text-center bg-slate-800 text-white min-h-screen">Loading...</div>; // Loading indicator
  }

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen p-6">
      {singleBlog.thumbnail && (
        <img
          src={singleBlog.thumbnail}
          alt={singleBlog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold text-white mb-4">{singleBlog.title}</h1>

      <p className="text-gray-400 mb-8">{singleBlog.description}</p>

      <div
        className="prose prose-lg text-gray-300"
        dangerouslySetInnerHTML={{ __html: singleBlog.blogContent }}
      ></div>

      <div className="text-sm text-gray-500 mt-6">
        <p>Author: {singleBlog.author?.username}</p>
        <p>{new Date(singleBlog.createdAt).toDateString()}</p>
      </div>

      {auth && (
        <div className="flex mt-8">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700 transition-colors duration-300"
            onClick={() => navigate(`/blog/edit/${blogId}`)}
          >
            Edit
          </button>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
            onClick={handleDeleteBlog}
          >
            Delete
          </button>

          <div className="flex items-center ml-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="bg-gray-700 text-white px-4 py-2 rounded mr-2"
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
              onClick={handleUpdateThumbnail}
            >
              Update Thumbnail
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleBlogPage;
