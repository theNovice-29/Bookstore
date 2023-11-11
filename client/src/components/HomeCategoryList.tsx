import React, { useContext } from 'react';

import '../assets/css/HomeCategoryList.css';
import { Link } from 'react-router-dom';
import {Category} from "../context/CategoryContext";

function HomeCategoryList() {
    const catList = useContext(Category);

    return (
        <div className="services_box">
            {catList && catList.length > 0 && catList.map((category) => (
                <Link to={`/categories/${category.name}`} key={category.categoryId}>
                    <div className="services_card">
                        <i className={category.iconClass}></i>
                        <h3>{category.name}</h3>
                        <p>Shop Now</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default HomeCategoryList;
