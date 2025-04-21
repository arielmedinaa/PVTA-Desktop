import { useMemo, useState } from "react";

const menuCategoriesData = [
    { id: 'all', name: 'All Menu', itemCount: 124 },
    { id: 'breakfast', name: 'Breakfast', itemCount: 13 },
    { id: 'fastfood', name: 'Fastfood', itemCount: 9 },
    { id: 'soups', name: 'Soups', itemCount: 11 },
    { id: 'pasta', name: 'Pasta', itemCount: 8 },
    { id: 'snack', name: 'Snack', itemCount: 9 }
];


const menuItemsData = [
    {
        id: 1,
        name: 'Scrambled Eggs With Toast',
        price: 16.99,
        description: 'perfectly seasoned scrambled eggs served with a side of warm toast.',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080',
        category: 'breakfast',
        tags: ['Popular']
    },
    {
        id: 2,
        name: 'Greek Yogurt Parfait',
        price: 21.49,
        description: 'a harmonious blend of creamy Greek yogurt, layered with ripe, and fruits.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1887',
        category: 'breakfast'
    },
    {
        id: 3,
        name: 'Vegetable Omelette',
        price: 17.09,
        originalPrice: 18.99,
        description: 'crafted with farm-fresh eggs and filled with a medley of colorful vegetables.',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1998',
        category: 'breakfast',
        tags: ['Disc 10%']
    },
    {
        id: 4,
        name: 'Smoked Salmon Bagel',
        price: 18.99,
        description: 'A savory delight that captures the essence of a classic brunch of salmon',
        image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=1977',
        category: 'breakfast'
    },
    {
        id: 5,
        name: 'French Bread & Potato',
        price: 19.36,
        originalPrice: 22.49,
        description: 'Soft mashed potatoes served with slices of freshly baked French bread',
        image: 'https://images.unsplash.com/photo-1630492782892-4d96ddf76721?q=80&w=1964',
        category: 'breakfast',
        tags: ['Disc 12%']
    },
    {
        id: 6,
        name: 'Belgian Waffles',
        price: 19.49,
        description: 'rafted to perfection with a crisp golden exterior and a soft interior.',
        image: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?q=80&w=1974',
        category: 'breakfast'
    }
];

export const useMenu = () => {
  const [menuItems] = useState(menuItemsData);
  const [menuCategories] = useState(menuCategoriesData);
  const [activeCategory, setActiveCategory] = useState('All Menu');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    let filtered = activeCategory === 'All Menu' 
      ? menuItems 
      : menuItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  },[menuItems, activeCategory, searchTerm]);

  return {
    menuItems,
    menuCategories,
    activeCategory,
    setActiveCategory,
    searchTerm, 
    setSearchTerm,
    filteredItems
  };
}