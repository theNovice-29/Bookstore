// CartContext.js
import { createContext, Dispatch, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/CartReducer";
import {BookList, ShoppingCartItem} from "../types";

const initialCartState: ShoppingCartItem[] = [];
const storageKey = 'cart';

type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR' | 'DECREASE' | 'INCREASE';
    item: BookList;
}

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

interface CartContextProps {
    children: React.ReactNode;
}

function CartContext({ children }: CartContextProps) {
    const [cart, dispatch] = useReducer(
        cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
        initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]);

    return (
        <CartStore.Provider value={{ cart, dispatch }}>{children}</CartStore.Provider>
    );
}

export default CartContext;
