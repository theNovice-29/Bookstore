import '../assets/css/CategoryBookListItem.css';
import { BookList } from '../types';
import { Link } from 'react-router-dom';
import {CartTypes} from "../reducers/CartReducer";
import  {CartStore} from "../context/CartContext";
import {useContext} from "react";

function CategoryBookListItem(props: { bookList: BookList[] }) {
    const { bookList } = props;

    const bookImageFileName = (bookId: number) => `${bookId}.jpeg`;
    const { dispatch } = useContext(CartStore);
    function addToCart(book: BookList) {
        dispatch({ type: CartTypes.ADD, id: book.bookId, item: book });
    }


    return (
        <div className="categorys_box">
            {bookList.map(book => (
                <div className="categorys_card" key={book.bookId}>
                    <div className="categorys_image">
                        <img src={require(`../assets/images/books/${bookImageFileName(book.bookId)}`)} alt="books" />
                        {book.isPublic ? (
                            <p></p>
                        ) : (
                            <Link to="/" className="social-icon">
                                <img
                                    src={require('../assets/images/site/readnow-removebg-preview.png')}
                                    alt="Read Now"
                                />
                            </Link>
                        )}
                    </div>
                    <div className="categorys_tag">
                        <p>{book.title}</p>
                        <h6>{book.author}</h6>
                        <h3>{'$'}{book.price}</h3>
                        <button className="categorys_btn" onClick={() => addToCart(book)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CategoryBookListItem;
