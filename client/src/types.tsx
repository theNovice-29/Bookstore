

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

// this is used by the reducer. You can define it on the CartReducer
export const initialCartState:ShoppingCartItem[] =  [];

export interface ContextProps {
  children: JSX.Element | JSX.Element[]
}


export const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
export interface CustomerForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  ccNumber: string;
  ccExpiryMonth: number;
  ccExpiryYear: number;
}

export interface Order {
  orderId: number;
  amount: number;
  dateCreated: number;
  confirmationNumber: number;
  customerId: number;
}

export interface OrderDetails {
  order: Order;
  customer: CustomerForm;
  books: BookItem[];
}

export interface ServerErrorResponse {
  reason: string;
  message: string;
  fieldName: string;
  error: boolean;
}
