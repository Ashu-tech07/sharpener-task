import React, { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cartContext'

const Cart = (props) => {
    const ctx = useContext(CartContext)

    let totalPrice = 0;
    ctx.items.forEach((item) => {
        totalPrice += Number(item.price) * Number(item.quantity);
        totalPrice = parseFloat(totalPrice.toFixed(2));
    });
    return (
        <Modal hideCartHandler={props.hideCartHandler}>
            {
                <ul className={classes["cart-items"]}>
                    {ctx.items.map((item) => (
                        <li key={item.id}>
                            <span> Name: </span> {item.name}
                            <span> Quantity: </span> {item.quantity}
                            <span> Price: </span> ${item.price}
                        </li>
                    ))}
                </ul>
            }
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalPrice}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["buttton--alt"]} onClick={props.hideCartHandler}>close</button>
                <button className={classes.buttom}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart
