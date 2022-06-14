import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect} from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle} from './category.styles';

const CategoryComponent = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const { category } = useParams();       //returns object containing all matched route params

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products && products.map(product => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </CategoryContainer>
        </>
    );
}

export default CategoryComponent;