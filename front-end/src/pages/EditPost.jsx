import React, { useEffect, useState } from 'react';
import BlogForm from '../components/BlogForm';
import { fetchPost, updatePost } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
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

  const handleSubmit = async (updatedPost) => {
    try {
      await updatePost(id, updatedPost);
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#172d13]">Edit Post</h1>
      <BlogForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPost;
