import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#222831] text-white py-6 border-t border-[#005461]">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left text */}
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Vector. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="/privacy" className="hover:text-[#00B7B5]">Privacy Policy</a>
          <a href="/terms" className="hover:text-[#00B7B5]">Terms of Service</a>
          <a href="/contact" className="hover:text-[#00B7B5]">Contact</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
