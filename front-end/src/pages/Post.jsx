import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, likePost, deletePost } from '../services/api';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();  // Move useNavigate inside the component

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
      setPost(data); // Update the post with the new like count
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');  // Redirect to home page after successful deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    // Redirect to the edit page
    navigate(`/edit/${id}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-[#172d13]">{post.title}</h1>
      <img src={post.fileUpload} alt={post.title} className="w-full h-64 object-cover mt-4" />
      <p className="mt-4">{post.description}</p>
      <p className="text-gray-600 mt-2">By {post.creator}</p>
      <div className="mt-4">
        <button
          onClick={handleLike}
          className="bg-[#6bb77b] text-white py-2 px-4 rounded-md shadow-sm"
        >
          Like ({post.upvote})
        </button>
        <button
          onClick={handleEdit}
          className="bg-[#d76f30] text-white py-2 px-4 rounded-md shadow-sm ml-4"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md shadow-sm ml-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;