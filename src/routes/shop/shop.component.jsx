import {useContext} from 'react';

import { ProductsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
    const {products} = useContext(ProductsContext);

    return (
        <div className='products-container'>
            {products.map((product) => {
                return (
                    // <div key={id}>
                    //     <h2>{name}</h2>
                    // </div>
                    <ProductCard key={product.id} product={product}/>
                )
            })
            }
        </div>
    );
}

export default Shop;