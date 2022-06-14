import { useContext } from 'react';

import Button, {BUTTON_TYPE_CLASSES} from '../UI/button/button.component';
import { CartContext } from '../../contexts/cart.context';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const {addItemToCart} = useContext(CartContext);
    const {name, price, imageUrl} = product;

    const addToCartHandler = () => {
        addItemToCart(product);
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCartHandler}>Add to Cart</Button>
        </div>
    );
}

export default ProductCard;