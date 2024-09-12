import axios from 'axios';

// Set the base URL for the API
const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// API.interceptors.request.use(
//   (config) => {

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// API methods

export const fetchPosts = () => API.get('/blogs');
export const fetchPost = (id) => API.get(`/blogs/${id}`);
export const createPost = (newPost) => API.post('/blogs', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/blogs/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/blogs/${id}`);
export const likePost = (id) => API.patch(`/blogs/${id}/likePost`);

export default API;
