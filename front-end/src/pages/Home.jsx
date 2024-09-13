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
  const AboutMe = () => (
    <aside className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p>
        As a passionate full-stack web developer, I specialize in building dynamic and user-friendly web applications using the MERN stack—MongoDB, Express.js, React, and Node.js. My expertise spans both front-end and back-end technologies, allowing me to create seamless and efficient solutions. With a strong foundation in HTML, CSS, and JavaScript, I am dedicated to delivering high-quality, innovative projects that enhance user experiences and drive business success. When I’m not coding, I enjoy exploring new technologies, sharing knowledge through my blog, and contributing to open-source projects. Stay tuned for insights, tutorials, and updates from the world of web development!
      </p>
    </aside>
  );
  return (
    <div className='mb-5'>
    <Hero />
    <div className="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-3">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map(post => (
              <BlogPostCard key={post._id} post={post} />
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <AboutMe />
      </div>
    </div>
  </div>
  );
};

export default Home;
