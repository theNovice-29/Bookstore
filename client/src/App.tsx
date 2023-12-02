import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import CategoryBookList from "./components/CategoryBookList";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";


function App() {
    return (
        <Router basename="/BBookstoreReactSession">
                <AppHeader />
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/categories"
                        element={<CategoryBookList />}
                    >
                        <Route path=":id" element={<CategoryBookList />} />
                    </Route>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/confirmation" element={<Cart />} />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
                <AppFooter />
        </Router>
    );
}

export default App;
