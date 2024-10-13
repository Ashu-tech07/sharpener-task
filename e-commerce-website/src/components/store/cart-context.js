import { createContext } from 'react';

const CartContext=createContext({
    items:[],
    totalAmout:0,
    addItem:()=>{},
    removeItem:()=>{}
})

export default CartContext