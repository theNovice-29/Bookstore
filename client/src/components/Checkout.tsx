import "../assets/css/Checkout.css"


import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails, years} from "../types";

import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {CartStore} from "../context/CartContext";
import axios from "axios";
import api from "../services/api";


function Checkout() {

    const bookImageFileName = (bookId: number) => `${bookId}.jpeg`;

    const decreaseQuantity = (id: number) => {
        const item = cart.find((cartItem) => cartItem.id === id);

        if (item && item.quantity > 1) {
            dispatch({type: 'DECREASE', id});
        } else {
            dispatch({type: 'REMOVE', id});
        }
    };

    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const years = Array.from({length: 10}, (_, index) => yearFrom(index));

    const {cart, dispatch} = useContext(CartStore);
    const navigate = useNavigate();
    const isCartEmpty = cart.length === 0;

    const cartTotalPrice = parseFloat(
        cart.reduce((acc, item) => acc + item.quantity * item.book.price, 0).toFixed(2)
    );

    const tax = cartTotalPrice * 0.1;
    const subTotal = cartTotalPrice + tax;
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);


    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCCNumberError] = useState("");


    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 0,
        ccExpiryYear: 0
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");

    function isValidForm() {
        //TO DO code that returns true is the customer form is valid, false otherwise

        return true;
    }

    // TO DO placeOrder function comes here. Needed for project 9 (not 8)

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 4 || value.length > 45) {
                    setNameError("Name must be at least 4 characters long!");
                } else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                // TO DO: Add address validation
                if (value.length < 5) {
                    setAddressError("Address must be at least 5 characters long!");
                } else {
                    setAddressError("");
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                // Using isMobilePhone utility function for phone validation
                if (!isMobilePhone(value)) {
                    setPhoneError("Invalid phone number. Use 10 digits without spaces or dashes.");
                } else {
                    setPhoneError("");
                }
                break;
            case 'email':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                // Using isvalidEmail utility function for email validation
                if (!isvalidEmail(value)) {
                    setEmailError("Invalid email address.");
                } else {
                    setEmailError("");
                }
                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                // Using isCreditCard utility function for credit card validation
                if (!isCreditCard(value)) {
                    setCCNumberError("Invalid credit card number. Use 16 digits.");
                } else {
                    setCCNumberError("");
                }
                break;
            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
                break;
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value, 10) }));
                break;
            default:
                break;
        }
    }

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
            }
        }
    }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };
        const orders = JSON.stringify(order);
        console.log(orders);
        const url = '/orders';
        const orderDetails: OrderDetails = await api.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log("order details: ", orderDetails);
        return orderDetails;
    }

    function formatCreditCardNumber(creditCardNumber: string) {
        const numericValue = creditCardNumber.replace(/\D/g, '');
        return numericValue.replace(/(\d{4})/g, '$1 ').trim();
    }


    return (
        <section className="checkout-cart-table-view">
            <div className="checkout-page-body">
                <div>
                    {isCartEmpty ? (
                        <div className="empty-cart-logo">
                            <img src="../assets/images/site/empty-shopping-cart.png" alt="Empty Cart" />
                            <p>Your cart is empty!</p>
                        </div>
                    ) : (
                    <form
                        className="checkout-form"
                        onSubmit ={(event)=>submitOrder(event)}
                        method="post"
                    >
                        <div>
                            <label htmlFor="fname">Name</label>
                            <input
                                type="text"
                                size={20}
                                name="name"
                                id="fname"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {nameError && <div className="error"> {nameError}</div>}</>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                size={20}
                                name="address"
                                id="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {addressError && <div className="error"> {addressError}</div>}</>

                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                size={20}
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {phoneError && <div className="error"> {phoneError}</div>}</>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                size={20}
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {emailError && <div className="error"> {emailError}</div>}</>

                        <div>
                            <label htmlFor="ccNumber">Credit Card</label>
                            <input
                                type="text"
                                size={20}
                                name="ccNumber"
                                id="ccNumber"
                                placeholder="Enter your credit card number"
                                value={formatCreditCardNumber(formData.ccNumber)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>

                        <div>
                            <label htmlFor="ccExpiry">Expiration Date</label>
                            <div className="expiry-container">
                                <select
                                    name="ccExpiryMonth"
                                    value={formData.ccExpiryMonth}
                                    onChange={handleInputChange}
                                >
                                    {months.map((month: string, i: number) => (
                                        <option key={i} value={i + 1}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    name="ccExpiryYear"
                                    value={formData.ccExpiryYear}
                                    onChange={handleInputChange}
                                >
                                    {years.map((year, i) => (
                                        <option key={i} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>



                    </form>
                    )}
                </div>

                <div>
                    <div className="checkout-cart-summary-item">
                        <span className="checkout-cart-summary-title">Subtotal</span>
                        <span className="checkout-cart-summary-value">${cartTotalPrice}</span>
                    </div>
                    <div className="checkout-cart-summary-item tax">
                        <span className="checkout-cart-summary-title">Tax</span>
                        <span className="checkout-cart-summary-value">${tax}</span>
                    </div>
                    <div className="checkout-cart-summary-item total">
                        <span className="checkout-cart-summary-title">Total</span>
                        <span className="checkout-cart-summary-value">${subTotal}</span>
                    </div>
                    {/* TO DO: Add Complete Purchase button */}
                    <button className="complete-purchase-button" onClick={submitOrder}>
                        Complete Purchase
                    </button>

                </div>

                <div>
                    {/*The following code displays different string based on the */}
                    {/*value of the checkoutStatus*/}
                    {/*Note the ternary operator*/}
                    {
                        checkoutStatus !== '' ?
                            <>
                                <section className="checkoutStatusBox">
                                    {(checkoutStatus === 'ERROR') ?
                                        <div>
                                            Error: Please fix the problems above and try again.
                                        </div> : (checkoutStatus === 'PENDING' ?
                                            <div>
                                                Processing...
                                            </div> : (checkoutStatus === 'OK' ?
                                                <div>
                                                    Order placed...
                                                </div> :
                                                <div>
                                                    An unexpected error occurred, please try again.
                                                </div>))}
                                </section>
                            </>
                            : <></>}
                </div>
            </div>

            <div>
                {/*This displays the information about the items in the cart*/}
                <ul className="checkout-cart-info">
                    {
                        cart?.map((item, i) => (
                            <div className="checkout-cart-book-item">
                                <div className="checkout-cart-book-image" key={i}>
                                    <img src={require(`../assets/images/books/${bookImageFileName(item.id)}`)}
                                         alt="title" className="checkout-cart-info-img"
                                    />
                                </div>

                                <div className="checkout-cart-book-info">
                                    <div className="checkout-cart-book-title">{item.book.title} </div>
                                    <div className="checkout-cart-book-subtotal">
                                        ${(item.book.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="checkout-cart-book-quantity">
                                        <button className="checkout-icon-button inc-button" onClick={() => {
                                            dispatch({type: CartTypes.ADD, book: item.book, id: item.id});
                                        }}>
                                            <i><FontAwesomeIcon icon={faPlusCircle}/></i>
                                        </button>
                                        <button className="checkout-num-button">{item.quantity}</button>
                                        <button className="checkout-icon-button dec-button"
                                                onClick={() => decreaseQuantity(item.id)}>
                                            <FontAwesomeIcon icon={faMinusCircle}/>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                </ul>
            </div>
        </section>
    )
}

export default Checkout;