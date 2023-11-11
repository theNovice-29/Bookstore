import React, { createContext, useState, useEffect } from 'react';
import {CategoryItem, NavCategories} from "../types"; // Make sure to adjust the path to your types
import api from "../services/api";
export const Category = createContext<CategoryItem[] | []>([]);

Category.displayName = 'CategoryContext';

interface CategoryProviderProps {
    children: React.ReactNode; // Define the children prop type
}

const CategoryContext: React.FC<CategoryProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        api.get<NavCategories[]>('/categories')
            .then((result) => setCategories(result.data))
            .catch(console.error);
    }, []);

    return (
        <Category.Provider value={categories}>{children}</Category.Provider>
    );
};

export default CategoryContext;
