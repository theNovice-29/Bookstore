import { BookList, ShoppingCartItem } from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    DECREASE: 'DECREASE',
    INCREASE: 'INCREASE'
};

type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR' | 'DECREASE' | 'INCREASE';
    item: BookList;
}

export const cartReducer = (state: ShoppingCartItem[], action: AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            const existingCartIndex = state.findIndex(
                (cartItem) => cartItem.id === action.id
            );

            if (existingCartIndex !== -1) {
                const updatedState = [...state];
                updatedState[existingCartIndex].quantity += 1;
                return updatedState;
            } else {
                return [
                    ...state,
                    { id: action.id, book: action.item, quantity: 1 }
                ];
            }

        case CartTypes.REMOVE:
            return state.filter((cartItem) => cartItem.id !== action.id);

        case CartTypes.CLEAR:
            return [];

        case CartTypes.DECREASE:
            return state.map((item) => {
                if (item.id === action.id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

        case CartTypes.INCREASE:
            // logic to handle increasing item quantity
            return state.map((item) => {
                if (item.id === action.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });


        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}