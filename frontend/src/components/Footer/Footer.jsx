import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bg text-white py-6 border-t border-border">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left text */}
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} Vector. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="/privacy" className="hover:text-primaryHover">Privacy Policy</a>
          <a href="/terms" className="hover:text-primaryHover">Terms of Service</a>
          <a href="/contact" className="hover:text-primaryHover">Contact</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
