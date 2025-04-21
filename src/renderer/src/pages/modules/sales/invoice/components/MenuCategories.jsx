import React from 'react';

const MenuCategories = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => setActiveCategory(category.name)}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            activeCategory === category.name
              ? 'bg-blue-400 text-blue-100'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
          }`}
        >
          <h3 className="font-semibold">{category.name}</h3>
          <p className="text-sm">{category.itemCount} Items</p>
        </div>
      ))}
    </div>
  );
};

export default MenuCategories;