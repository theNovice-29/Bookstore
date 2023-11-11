import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { CategoryItem } from "../types";
import { Link } from 'react-router-dom';
import {Category} from "../context/CategoryContext";
import React, { useContext } from 'react';

const HeaderDropdown: React.FC = () => {
    const categories: CategoryItem[] = useContext(Category);

    // Ensure categories is defined and not empty before rendering
    if (!categories || categories.length === 0) {
        return null; // Or you might want to add some fallback UI for when categories are not available
    }
    return (
        <div className="dropdown">
            <Link to={`/categories/${categories[0].name}`}>
                <button className="dropbtn">Categories &#9660;</button>
            </Link>
            <div className="dropdown-content">
                {categories.map((item: CategoryItem) => (
                    <li key={item.categoryId}>
                        <Link to={`/categories/${item.name}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    );
}

export default HeaderDropdown;
