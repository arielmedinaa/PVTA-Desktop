import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search a dishes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full py-2 px-4 pl-10 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <button className="p-1 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;