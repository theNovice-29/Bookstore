import React from 'react';
import CartTable from './CartTable';
import "../assets/css/Cart.css"
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