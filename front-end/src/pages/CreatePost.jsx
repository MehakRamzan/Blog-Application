import React, { useState } from 'react';
import BlogForm from '../components/BlogForm';
import { createPost } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (newPost) => {
    try {
      await createPost(newPost);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#172d13]">Create a New Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;
