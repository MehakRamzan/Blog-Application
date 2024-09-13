import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white text-[#172d13] p-4 shadow-md fixed top-0 w-full z-50">
  <div className="container mx-auto flex justify-between items-center">
    <div className="text-2xl font-bold">
      Mehak
    </div>
    <nav>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/" className="text-[#172d13] hover:text-[#d76f30]">
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/create" className="bg-[#d76f30] text-white px-4 py-2 rounded hover:bg-[#bf5d29] transition">
            Create Blog
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</header>
  );
};

export default Header;
