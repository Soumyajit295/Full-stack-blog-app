import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '../Components/Text Editor/RTE';
import { fetchSingleBlog, updateBlog } from '../Redux/Slices/blogSlice';

function EditBlogPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { blogId } = useParams();
    const { singleBlog } = useSelector((state) => state.blog);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        blogContent: '',
    });
    const [loading, setLoading] = useState(true);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleContentChange(value) {
        setFormData({
            ...formData,
            blogContent: value,
        });
    }

    useEffect(() => {
        async function fetchBlog() {
            setLoading(true);
            await dispatch(fetchSingleBlog(blogId));
            setLoading(false);
        }
        fetchBlog();
    }, [dispatch, blogId]);


    useEffect(() => {
        if (singleBlog) {
            setFormData({
                title: singleBlog.title || '',
                description: singleBlog.description || '',
                blogContent: singleBlog.blogContent || '',
            });
        }
    }, [singleBlog]);

    async function handleSubmit(e){
        e.preventDefault()
        const res = await dispatch(updateBlog({blogId , data : formData}))
        if(res?.payload?.success){
            navigate('/blogs')
        }
    }

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Update Blog Post</h2>
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

                    <div>
                        <label htmlFor="content" className="block text-lg font-semibold text-gray-300 mb-2">Content</label>
                        <RichTextEditor value={formData.blogContent} onChange={handleContentChange} />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Save changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditBlogPage;
