import { useState } from "react"

export const useCart = (initialItems = []) => {
    const [cartItems, setCartItems] = useState(initialItems);

    const updateQuantity = (id, change) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            updateQuantity(item.id, 1);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1, extras: '', notes: '' }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateItemNote = (id, note) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, notes: note } : item
        ));
    };

    const updateItemExtras = (id, extras) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, extras } : item
        ));
    };

    return {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        updateItemNote,
        updateItemExtras
    };
};