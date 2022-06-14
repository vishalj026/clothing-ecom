import {createContext, useState, useEffect} from 'react';


import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesContextProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap] = useState({});
    const value = {categoriesMap};

    //This effect writes SHOP_DATA to 'categories' collection in firebase, no need to run it again if it already exists in DB.
    //THIS WILL OVERRIDE 'categories' COLLECTION in FIREBASE!!!
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setcategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}