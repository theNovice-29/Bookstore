import '../assets/css/BestsellingBookList.css';
import {BookProp} from "../types";

function BestSellingBookList({ bookList }: BookProp) {
    return(
        <div className="bestselling_box">
            {bookList.map((books) => (
               <div className="bestselling_card">
                   <img src={require(`../assets/images/books/${books.bookId}.jpeg`)} alt="books" />
                    <h3>{books.title}</h3>
                    <p>
                        {books.author}
                    </p>
                    <h2>{'$'}{books.price}</h2>

               </div>
            ))}
        </div>
    )
}

export default BestSellingBookList;