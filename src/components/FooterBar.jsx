import React from 'react';

const FooterBar = () => {
  return (
    <div className="w-full bg-[#121212] text-gray-400 text-sm text-center py-4 px-4">
      <p className="max-w-7xl mx-auto">
        Copyright © {new Date().getFullYear()} Your Blog Name. All rights reserved.
      </p>
    </div>
  );
};

export default FooterBar;
