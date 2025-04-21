import { calculateSubtotal, calculateTax, calculateTotal } from "../../../../../utils/calculateTax";

export const useOrder = (cartItems) => {
    const orderSummary = {
        subtotal: calculateSubtotal(cartItems),
        tax: calculateTax(cartItems),
        total: calculateTotal(cartItems),
        itemCount: cartItems.length
    };
    
    return {
        orderSummary
    };
};