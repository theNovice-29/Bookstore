import "../assets/css/CartTable.css";
import React, { useContext } from "react";
import { CartStore } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function CartTable() {
    const { cart, dispatch } = useContext(CartStore);

    const bookImageFileName = (bookId: number) => `${bookId}.jpeg`;

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE', id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const decreaseQuantity = (id: number) => {
        const item = cart.find((cartItem) => cartItem.id === id);

        if (item && item.quantity > 1) {
            dispatch({ type: 'DECREASE', id });
        } else {
            dispatch({ type: 'REMOVE', id });
        }
    };

    const increaseQuantity = (id: number) => {
        dispatch({ type: 'INCREASE', id });
    };

    const getItemCountText = () => {
        const itemCount = cart.length;
        if (itemCount === 0) return "Your cart is empty";
        if (itemCount === 1) return "1 book";
        return `${itemCount} books`;
    };

    return (
        <div className="cart-table">
            <div className="cart-header">
                <h2>BOOKSTORE</h2>
                <span>{getItemCountText()}</span>
                {cart.length > 0 && (
                    <button onClick={clearCart} className="clear-cart">
                        Clear Cart
                    </button>
                )}
            </div>
            {cart.length > 0 ? (
                <React.Fragment>
                    <div className="cart-items">
                        <div className="cart-item cart-item-heading">
                            <div className="cart-book-image">Cover</div>
                            <div className="cart-book-title">Title</div>
                            <div className="cart-book-price">Unit Price</div>
                            <div className="cart-book-quantity">Quantity</div>
                            <div className="cart-book-subtotal">Subtotal</div>
                            <div className="cart-book-remove">Remove</div>
                        </div>
                        {cart.map((cartItem) => (
                            <div className="cart-item" key={cartItem.id}>
                                <div className="cart-book-image">
                                    <img src={require(`../assets/images/books/${bookImageFileName(cartItem.id)}`)} alt={cartItem.book.title} />
                                </div>
                                <div className="cart-book-title">{cartItem.book.title}</div>
                                <div className="cart-book-price">${cartItem.book.price.toFixed(2)}</div>
                                <div className="cart-book-quantity">
                                    <button className="icon-button" onClick={() => decreaseQuantity(cartItem.id)}>
                                        <FontAwesomeIcon icon={faMinusCircle} />
                                    </button>
                                    <span>{cartItem.quantity}</span>
                                    <button className="icon-button" onClick={() => increaseQuantity(cartItem.id)}>
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </button>
                                </div>
                                <div className="cart-book-subtotal">
                                    ${ (cartItem.book.price * cartItem.quantity).toFixed(2) }
                                </div>
                                <div className="cart-book-remove">
                                    <button className="icon-button" onClick={() => removeFromCart(cartItem.id)}>x</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-footer">
                        <div className="cart-subtotal">
                            <span>Sub-total:</span>
                            <span>${cart.reduce((acc, item) => acc + (item.quantity * item.book.price), 0).toFixed(2)}</span>
                        </div>

                        <div className="cart-actions">
                            <Link to="/categories/Photography" className="button continue-shopping">Continue Shopping</Link>
                            <Link to="/checkout" className="button checkout">Proceed to Checkout</Link>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <div className="cart-empty-message">
                    <p>Your cart is empty. <Link to="/categories/Photography">Start shopping</Link>.</p>
                </div>
            )}
        </div>
    );
}


export default CartTable;
