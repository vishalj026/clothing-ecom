import {Routes, Route} from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import CategoryComponent from '../category/category.component';

import './shop.styles.scss';

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=':category' element={<CategoryComponent />}/>
        </Routes>
    );
}

export default Shop;