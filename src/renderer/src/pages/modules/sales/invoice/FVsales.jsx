import React from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import SearchBar from './components/SearchBar';
import FilterOptionsSales from './components/FilterOptionsSales';
import MenuCategories from './components/MenuCategories';
import ProductGrid from './components/ProductGrid';
import OrderSidebar from './components/OrderSidebar';
import { useCart } from './hooks/useCarrito';
import { useMenu } from './hooks/useMenu';
import { useOrder } from './hooks/useOrder';
import { useNavigate } from 'react-router-dom';

const initialCartItems = [
  { id: 1, name: 'Scrambled eggs with toast', price: 16.99, quantity: 1, extras: 'Extra Egg & Salsa', notes: 'make the dish a bit spicy' },
  { id: 2, name: 'Smoked Salmon Bagel', price: 18.99, quantity: 1, extras: '', notes: '' },
  { id: 3, name: 'Belgian Waffles', price: 19.49, quantity: 2, extras: 'Extra Honey', notes: '' },
  { id: 4, name: 'Classic Lemonade', price: 12.49, quantity: 1, extras: '', notes: 'Less Ice' }
];

const SalesPage = () => {
  const navigate = useNavigate();
  const { 
    menuCategories, 
    activeCategory, 
    setActiveCategory, 
    searchTerm, 
    setSearchTerm, 
    filteredItems 
  } = useMenu();
  
  const { 
    cartItems, 
    addToCart, 
    updateItemNote 
  } = useCart(initialCartItems);
  
  const { orderSummary } = useOrder(cartItems);
  const handleUpdateNote = (itemId) => {
    const newNote = prompt("Enter note for this item:");
    if (newNote !== null) {
      updateItemNote(itemId, newNote);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-2/3 p-4 overflow-y-auto">
        <div className="p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button 
                className="mr-3 text-gray-700 bg-gray-100 rounded-full"
                onClick={() => navigate(-1)}
              >
                <RiArrowLeftSLine className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">Choose Menu</h1>
            </div>
            
            <div className='flex items-center gap-5'>
            <FilterOptionsSales />

            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
            </div>
          </div>
          
          <MenuCategories 
            categories={menuCategories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          <ProductGrid 
            products={filteredItems} 
            onAddToCart={addToCart} 
            activeCategory={activeCategory}
          />
        </div>
      </div>

      <OrderSidebar 
        cartItems={cartItems} 
        orderSummary={orderSummary} 
        onUpdateNote={handleUpdateNote} 
      />
    </div>
  );
};

export default SalesPage;