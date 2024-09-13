import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }], // Add font size and font family
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'align': [] }],
    ['clean'], // Add a button to clear formatting
    ['emoji'] // Custom button for emojis
  ],
};

const BlogForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [tags, setTags] = useState(initialData.tags || []);
  const [fileUpload, setFileUpload] = useState(initialData.fileUpload || '');
  const [creator, setCreator] = useState(initialData.creator || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, tags, fileUpload, creator });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-lg font-medium">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-lg font-medium">Description</label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          placeholder="Write your description..."
          className="border-gray-300 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-lg font-medium">Tags (comma-separated)</label>
        <input
          id="tags"
          type="text"
          value={tags.join(', ')}
          onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="fileUpload" className="block text-lg font-medium">Image URL</label>
        <input
          id="fileUpload"
          type="text"
          value={fileUpload}
          onChange={(e) => setFileUpload(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="creator" className="block text-lg font-medium">Author</label>
        <input
          id="creator"
          type="text"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-[#d76f30] text-white py-2 px-4 rounded-md shadow-sm"
      >
        {initialData._id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
};

export default BlogForm;
