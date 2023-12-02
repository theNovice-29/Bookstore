import React from 'react';

import "../assets/css/Cart.css"
import CartTable from "./CarTable";
function Cart() {
    return (
        <div className="cart-container">
            <h1>
                My Cart
            </h1>
            <CartTable />
        </div>
    );
}

export default Cart;