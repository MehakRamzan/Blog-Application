import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-[#6bb77b] text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-xl mb-8">
          Discover insightful articles, share your thoughts, and explore a world of ideas.
        </p>
        <button className="bg-[#d76f30] text-white py-3 px-6 rounded-full hover:bg-[#172d13] transition duration-300">
        <Link to="/create"> Get Started</Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
