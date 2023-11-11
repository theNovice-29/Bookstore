import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import {CartStore} from "../context/CartContext";

function AppHeader() {
    const { cart } = useContext(CartStore);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <section>
            <nav>
                <Link to="/">
                    <img
                        src={require('../assets/images/site/storelogo.png')}
                        alt="Another Bookstore Logo"
                        width="200px"
                        height="auto"
                    />
                </Link>
                <div className="dropdown">
                    <HeaderDropdown />
                </div>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search Books here..." />
                    <div className="social_icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="social_icon">
                    <i className="fa-solid fa-heart"></i>
                    <Link to="/cart" className="cart-link">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div className="cart-icon">
                        <span className="cart-count">{totalQuantity}</span>
                    </div>
                    </Link>
                </div>
                <div className="social_icon">
                    <i className="fa-solid fa-user"></i>
                </div>
            </nav>
        </section>
    );
}

export default AppHeader;
