import React, { useContext } from 'react';

import '../assets/css/CategoryNav.css';
import { Link, useParams } from 'react-router-dom';
import {Category} from "../context/CategoryContext";
import {CategoryItem} from "../types";

function CategoryNav() {
    const categories = useContext<CategoryItem[]>(Category);
    const { id } = useParams();

    return (
        <div className="categories_card">
            <h2>Categories       &#8212;</h2>
            {categories.map((category) => (
                <Link
                    to={`/categories/${category.name}`}
                    className={category.name === id ? 'active' : ''}
                    key={category.categoryId}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}

export default CategoryNav;
