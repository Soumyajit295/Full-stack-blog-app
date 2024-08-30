import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  // Truncate the blog content to 200 characters for preview
  const truncatedContent = blog.blogContent.substring(0, 200) + (blog.blogContent.length > 200 ? '...' : '');

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="h-48 w-full object-cover rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold text-white mb-2">{blog.title}</h2>

      <p className="text-gray-400 mb-4">{blog.description}</p>

      <div className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: truncatedContent }} />

      {blog.blogContent.length > 200 && (
        <Link
          to={`/blog/${blog._id}`}
          className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
        >
          Read More
        </Link>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          <p>Author: {blog.author.username}</p>
          <p>{new Date(blog.createdAt).toDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
