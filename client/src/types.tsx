

export interface BookItem {
  id: number;
  book: any;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
}
export interface CatProp{
  catList: CategoryItem[];
}
export interface BookProp{
  bookList: BookList[];
}
export interface CategoryItem {
  categoryId: number;
  name: string;
  iconClass: string;
}

export interface BookList {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
  categoryId: number;
  rating: number;
  description: string;
  isFeatured: boolean;
}

export interface NavCategories {
  categoryId: number;
  name: string;
  iconClass: string;
}

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id:number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.id;
    this.book = theBook;
    this.quantity = 1;
  }
}
