import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#172d13] text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
