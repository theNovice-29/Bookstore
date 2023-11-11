import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeCategoryList from './HomeCategoryList';

import '../assets/css/global.css';
import '../assets/css/Home.css';
import { BookList, BookItem } from '../types';
import {Category} from "../context/CategoryContext";
import BestSellingBookList from "./BestsellingBookList";
import api from "../services/api";

function Home() {
    const categories = useContext(Category);
    const [books, setBooks] = useState<BookList[]>([]);

    useEffect(() => {
        if (categories && categories.length > 0) {
            api.get<BookList[]>(`/categories/name/${categories[0].name}/books`)
                .then(response => setBooks(response.data))
                .catch(console.error);
        }
    }, [categories]);

    return (
        <section>
            <div className="container">
                <img src={require('../assets/images/site//image_banner.jpg')}
                     alt="Your Image"/>
                <div className="overlay">
                    <div className="main">
                        <div className="main_tag">
                            <p>
                                THE BOOKSTORE EDITOR'S
                            </p>
                            <h1>Featured Books of<br/><span>AUGUST</span></h1>
                            <Link to="/categories/Photography" className="main_btn">See More</Link>
                        </div>
                        <div className="main_img">
                            <img src={require('../assets/images/site/main_banner.png')}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="services">
                <div className="featured">
                    <h4>Featured Categories </h4>
                    <Link to="/Categories">
                        <h5>All Categories {'>'}</h5>
                    </Link>
                </div>

                <div className="services_box">
                    <HomeCategoryList />
                </div>
            </div>

            <div className="bestselling">
                <div className="bestselling_tag">
                    <h4>Bestselling Books</h4>
                    <Link to="/allbooks">
                        <h5>View All {'>'}</h5>
                    </Link>
                </div>

                <div className="bestselling_box">
                    <BestSellingBookList bookList={books} />
                </div>
            </div>
        </section>
    );
}

export default Home;
