export const addItemToCart =(cartItems, cartItemTOAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemTOAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemTOAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    return [...cartItems, { ...cartItemTOAdd, quantity: 1 } ];
};
