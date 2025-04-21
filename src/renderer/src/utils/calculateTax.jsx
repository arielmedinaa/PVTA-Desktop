export const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateTax = (cartItems) => {
    return calculateSubtotal(cartItems) * 0.05;
};

export const calculateTotal = (cartItems) => {
    return calculateSubtotal(cartItems) + calculateTax(cartItems);
};