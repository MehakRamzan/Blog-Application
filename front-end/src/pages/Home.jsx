import React, { useEffect, useState } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import Hero from '../components/Hero';
import { fetchPosts } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        console.log('Fetched posts:', data); // Log the data to verify
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Hero />
      <div className="container mx-auto mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map(post => (
            <BlogPostCard key={post._id} post={post} />
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};

export default Home;
