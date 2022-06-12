import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    reduceItemFromCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartContextProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        let newCount = cartItems.reduce((sum, cartItem) => {return sum + cartItem.quantity}, 0);
        setCartCount(newCount);

        let newTotal = cartItems.reduce((sum, cartItem) => {return sum + cartItem.quantity * cartItem.price}, 0);
        setCartTotal(newTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        //If productToAdd exists in cartItems, increment quantity.
        //Else add new item to cartItems

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

    const reduceItemFromCart = (productToReduce) => {
        let item = cartItems.find((cartItem) => {
            return cartItem.id === productToReduce.id
        });

        if(item) {
            if(item.quantity > 1) {
                setCartItems(cartItems.map((cartItem) => cartItem.id === productToReduce.id ?
                                    {...cartItem, quantity: cartItem.quantity - 1} : cartItem));
            }
            else {
                setCartItems(cartItems.filter((cartItem) => {
                    return cartItem.id !== productToReduce.id
                }))
            }
        }
    }

    const removeItemFromCart = (productToRemove) => {
            setCartItems(cartItems.filter((cartItem) => {
                return cartItem.id !== productToRemove.id
            }))
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, reduceItemFromCart, removeItemFromCart, cartCount, cartTotal};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}