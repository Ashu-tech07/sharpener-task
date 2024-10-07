import React,{useState} from 'react'
import CartContext from './cartContext'

const CartProvider = (props) => {
    const [items,setItems]=useState([])

    const addItemToCartHandler = (item) => {
        const updatedItem = [...items];
        const existingItem = updatedItem.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existingItem) {
          existingItem.quantity =
            Number(existingItem.quantity) + Number(item.quantity);
        } else {
          updatedItem.push(item);
        }
        setItems(updatedItem);
      };
    
      const removeItemFromCartHandler = (id) => {};

    const context={
        items: items,
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
      };
  return (
    <CartContext.Provider value={context}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
