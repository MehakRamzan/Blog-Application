import React from 'react';
import { Link } from 'react-router-dom';
import Slide1 from "../assets/15.jpg"
const Hero = () => {
  return (
    <section
      className="bg-[rgba(0,0,0,0.5)] bg-blend-overlay text-white py-20 h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Slide1})` }}
    >
      <div className="container mx-auto text-center flex flex-col items-center justify-center space-y-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-xl mb-8">
          Discover insightful articles, share your thoughts, and explore a world of ideas.
        </p>
        <button className="bg-[#d76f30] text-white py-3 px-6 rounded-full hover:bg-[#172d13] transition duration-300">
          <Link to="/create">Get Started</Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
