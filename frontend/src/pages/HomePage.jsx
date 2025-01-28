import React from "react";

const HomePage = () => {
  return (
    <div className="relative">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Hover me
      </button>
      <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 text-white text-sm rounded opacity-0 hover:opacity-100 transition-opacity">
        This is a tooltip!
      </div>
    </div>
  );
};

export default HomePage;
