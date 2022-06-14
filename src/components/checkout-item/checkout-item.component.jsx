import {useContext} from 'react';

import {CartContext} from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, Quantity, Value, Arrow, RemoveButton, BaseSpan} from './checkout-item.styles';

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
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={decrementItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={incrementItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;