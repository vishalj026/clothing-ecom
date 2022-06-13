import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect} from 'react';

import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';

const CategoryComponent = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const { category } = useParams();       //returns object containing all matched route params

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log('Category component', categoriesMap[category])
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className='category-container'>
                {products && products.map(product => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </div>
        </>
    );
}

export default CategoryComponent;