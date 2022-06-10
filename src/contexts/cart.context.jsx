import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartContextProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        let newCount = cartItems.reduce((sum, cartItem) => {return sum + cartItem.quantity}, 0);
        setCartCount(newCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        //If productToAdd exists in cartItems, increment quantity.
        //Else add new item to cartItems

        // setCartCount(cartCount + 1);

        let item = cartItems.find((cartItem) => {
            return cartItem.id === productToAdd.id
        });

        if(item) {
           setCartItems(cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
           {...cartItem, quantity: cartItem.quantity + 1} : cartItem)); 
        }
        else {
            setCartItems([...cartItems, {...productToAdd, quantity: 1}]);
        }
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}