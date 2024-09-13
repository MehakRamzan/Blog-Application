import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'align': [] }],
    ['clean'],
    ['emoji']
  ],
};

const BlogForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [tags, setTags] = useState(initialData.tags || []);
  const [fileUpload, setFileUpload] = useState(null); // Changed to handle file
  const [creator, setCreator] = useState(initialData.creator || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleFileChange = (e) => {
    setFileUpload(e.target.files[0]); // Get the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags.join(','));
    formData.append('creator', creator);
    if (fileUpload) {
      formData.append('image', fileUpload); // Append the file
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" mt-[80px] space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className='text-3xl text-green-900 font-bold' >Create a Blog</h2>
  <div>
    
    <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
    <input
      id="title"
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-[#d76f30] focus:border-[#d76f30] transition duration-300"
      required
    />
  </div>

  <div>
    <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Description</label>
    <ReactQuill
      value={description}
      onChange={setDescription}
      modules={modules}
      placeholder="Write your description..."
      className="border border-gray-300 rounded-md min-h-[200px] focus:ring-[#d76f30] focus:border-[#d76f30] transition duration-300"
    />
  </div>

  <div>
    <label htmlFor="tags" className="block text-lg font-semibold text-gray-700">Tags (comma-separated)</label>
    <input
      id="tags"
      type="text"
      value={tags.join(', ')}
      onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-[#d76f30] focus:border-[#d76f30] transition duration-300"
    />
  </div>

  <div>
    <label htmlFor="fileUpload" className="block text-lg font-semibold text-gray-700">Upload Image</label>
    <input
      id="fileUpload"
      type="file"
      onChange={handleFileChange}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-[#d76f30] focus:border-[#d76f30] transition duration-300"
    />
  </div>

  <div>
    <label htmlFor="creator" className="block text-lg font-semibold text-gray-700">Author</label>
    <input
      id="creator"
      type="text"
      value={creator}
      onChange={(e) => setCreator(e.target.value)}
      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:ring-[#d76f30] focus:border-[#d76f30] transition duration-300"
      required
    />
  </div>

  <button
    type="submit"
    className="bg-[#d76f30] text-white py-2 px-6 rounded-md shadow-sm hover:bg-[#c7652e] transition duration-300"
  >
    {initialData._id ? 'Update Post' : 'Create Post'}
  </button>
</form>

  );
};

export default BlogForm;
