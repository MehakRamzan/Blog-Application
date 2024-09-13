import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, likePost, deletePost } from '../services/api';
import DOMPurify from 'dompurify';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    getPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const { data } = await likePost(id);
      setPost(data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!post) return <div>Loading...</div>;

  // Convert fileUpload path to URL
  const imageUrl = `http://localhost:5001/${post.fileUpload.replace(/\\/g, '/')}`;

  return (
    <div className="container mx-auto p-6 max-w-3xl mt-[80px] min-h-[85vh] ">
    <h1 className="text-4xl font-bold text-[#172d13] mb-4 text-center">{post.title}</h1>
    <div className="relative w-full h-64 mb-4">
      <img
        src={imageUrl}
        alt={post.title}
        className="w-full h-full object-cover rounded-lg shadow-md"
        onError={(e) => {
          console.error(`Failed to load image from ${imageUrl}`);
          e.target.src = '/path/to/your/fallback/image.jpg'; // Path to a fallback image
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
    </div>
    <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
    <p className="text-gray-600 mt-4 text-center">By {post.creator}</p>
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={handleLike}
        className="bg-[#6bb77b] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#5a9a6c] transition duration-300"
      >
        Like ({post.upvote})
      </button>
      <button
        onClick={handleEdit}
        className="bg-[#d76f30] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#b65c20] transition duration-300"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Delete
      </button>
    </div>
  </div>
  );
};

export default Post;
