import {useContext} from 'react';

import {CartContext} from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    const {removeItemFromCart, addItemToCart, reduceItemFromCart } = useContext(CartContext)
    const { name, quantity, imageUrl, price} = cartItem;

    const removeItemHandler = () => {
        removeItemFromCart(cartItem);
    }

    const incrementItemHandler = () => {
        addItemToCart(cartItem);
    }

    const decrementItemHandler = () => {
        reduceItemFromCart(cartItem);
    }
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={decrementItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={incrementItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className="remove-button" onClick={removeItemHandler}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;