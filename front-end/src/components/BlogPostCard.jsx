import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML content

const BlogPostCard = ({ post }) => {
  if (!post) return null;

  const { title = 'Untitled', description = '', fileUpload = '', creator = 'Unknown', _id } = post;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {fileUpload ? (
        <img 
          src={fileUpload} 
          alt={title} 
          className="w-full h-48 object-cover" 
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-[#172d13]">{title}</h2>
        <p 
          className="text-gray-600 mt-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description.length > 100 ? description.substring(0, 100) + '...' : description) }}
        />
        <div className="flex items-center justify-between mt-4">
          <Link to={`/post/${_id}`} className="text-[#d76f30] hover:underline">
            Read More
          </Link>
          <span className="text-gray-400 text-sm">By {creator}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;