import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import RichTextEditor from '../Components/Text Editor/RTE';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { crateNewBlogPost } from '../Redux/Slices/blogSlice';

function BlogCreationForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    blogContent: '',
    thumbnail: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const dispatch =useDispatch()
  const navigate = useNavigate()

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      thumbnail: file
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPreviewImage(fileReader.result);
    };
  }

  function handleContentChange(value) {
    setFormData({
      ...formData,
      blogContent : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData()
    data.append('title',formData.title)
    data.append('description',formData.description)
    data.append('blogContent',formData.blogContent)
    data.append('thumbnail',formData.thumbnail)
    const res = await dispatch(crateNewBlogPost(data))
    if(res?.payload?.success){
      setFormData({
        title : '',
        description : '',
        thumbnail : '',
        blogContent : ''
      })
      navigate('/blogs')
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Create a Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold text-gray-300 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-gray-300 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter blog description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-2">Thumbnail</label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center w-20 h-20 border border-gray-600 rounded-md bg-gray-700 text-gray-200">
                    {previewImage ? (
                      <img src={previewImage} alt="Thumbnail" className="w-full h-full object-cover rounded-md" />
                    ) : (
                      <AiOutlineCloudUpload className="w-10 h-10 text-gray-500" />
                    )}
                  </div>
                </label>
                <span className="text-gray-300">Upload a thumbnail image</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-lg font-semibold text-gray-300 mb-2">Content</label>
            <RichTextEditor value={formData.blogContent} onChange={handleContentChange}/>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogCreationForm;
