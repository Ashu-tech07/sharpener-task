import React, { useEffect, useState } from 'react'
import CartContext from './cart-context';

const CartProvider = (props) => {

    const [items, setItems] = useState([]);
    let email = localStorage.getItem("email");

    const URL="https://crudcrud.com/api/91c56fdab85046fc9b95e2c137514b9d/";

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${URL}${email}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              const data = await response.json();
              setItems(data);
            } else {
              console.log("Failed to fetch cart data");
            }
          } catch (error) {
            console.error("Error fetching cart data:", error);
          }
        };
        fetchData();
      }, []);
    

    const addItemToCartHandler = async (item,email) => {
        let updatedItem;
        try {
            const response = await fetch(`${URL}${email}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            updatedItem = data;
          } catch (error) {
            console.log(error);
          }
          let existingItem = updatedItem.find(
            (cartItem) => Number(cartItem.items.id) === Number(item.id)
          );
        
          
          if (existingItem) {
            existingItem.items.quantity =
              Number(existingItem.items.quantity) + Number(item.quantity);
            await fetch(`${URL}${email}/${existingItem._id}`, {
              method: "PUT",
              body: JSON.stringify({
                items: existingItem.items,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          } else {
            // If the item doesn't exist, add it to the cart with a POST request
            await fetch(`${URL}${email}`, {
              method: "POST",
              body: JSON.stringify({
                items: item,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
          setItems(updatedItem);
        };
      
    
    const removeItemFromCartHandler = async (id) => {
        let updatedItem;
        try {
          const response = await fetch(`${URL}${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          updatedItem = data;
        } catch (error) {
          console.log(error);
        }
        let existingItem = updatedItem.find((cartItem) => cartItem._id === id);
        if (Number(existingItem.items.quantity) > 1) {
          existingItem.items.quantity = Number(existingItem.items.quantity) - 1;
          await fetch(`${URL}${email}/${existingItem._id}`, {
            method: "PUT",
            body: JSON.stringify({
              items: existingItem.items,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else {
          updatedItem = items.filter((item) => item.id !== id);
          await fetch(`${URL}${email}/${existingItem._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        setItems(updatedItem);
      };
    
    const cartContext = {
        items: items,
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,

    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider
