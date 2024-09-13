import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML content

const BlogPostCard = ({ post }) => {
  if (!post) return null;

  const { title = 'Untitled', description = '', fileUpload = '', creator = 'Unknown', _id } = post;

  // Determine if fileUpload is a full URL or a relative path
  const isAbsoluteURL = /^https?:\/\//i.test(fileUpload);
  const baseURL = 'http://localhost:5001/';
  const imageUrl = isAbsoluteURL 
    ? fileUpload 
    : `${baseURL}${fileUpload.replace(/\\/g, '/')}`;

  console.log(`Image URL: ${imageUrl}`); // For debugging

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
    <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error(`Failed to load image from ${imageUrl}`);
            e.target.src = '/path/to/your/fallback/image.jpg'; // Path to a fallback image
          }}
        />
      ) : (
        <span className="text-gray-500 text-lg font-semibold">No Image</span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
    </div>
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#172d13] mb-2">{title}</h2>
      <p
        className="text-gray-700 mt-2"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description.length > 100 ? description.substring(0, 100) + '...' : description) }}
      />
      <div className="flex items-center justify-between mt-4">
        <Link to={`/post/${_id}`} className="text-[#d76f30] hover:text-[#d76f30] hover:underline font-semibold transition-colors duration-300">
          Read More
        </Link>
        <span className="text-gray-500 text-sm">By {creator}</span>
      </div>
    </div>
  </div>
  );
};

export default BlogPostCard;

