import axios from 'axios';

// Set the base URL for the API
const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// API methods

export const createPost = async (formData) => {
  try {
    const response = await API.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPosts = () => API.get('/blogs');
export const fetchPost = (id) => API.get(`/blogs/${id}`);
export const updatePost = (id, updatedPost) => API.patch(`/blogs/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/blogs/${id}`);
export const likePost = (id) => API.patch(`/blogs/${id}/likePost`);

export default API;