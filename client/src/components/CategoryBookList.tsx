import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import '../assets/css/CategoryBookList.css';
import {Category} from "../context/CategoryContext";
import api from "../services/api";

function CategoryBookList() {
    const { id } = useParams();
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        api.get(`/categories/name/${id}/books`)
            .then((result) => {
                setBookList(result.data);
            })
            .catch(console.error);
    }, [id]);

    return (
        <section>
            <div className="categories_card">
                <CategoryNav />
            </div>
            <div className="categorys">
                <CategoryBookListItem bookList={bookList} />
            </div>
        </section>
    );
}

export default CategoryBookList;
