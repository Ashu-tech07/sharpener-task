import React from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
const Cart = (props) => {
    return (
        <Modal hideCartHandler={props.hideCartHandler}>
            {
                <ul className={classes["car-items"]}>
                    {[{ id: "c1", name: "Shushi", amount: 2, price: 12.99 }].map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            }
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["buttton--alt"]} onClick={props.hideCartHandler}>close</button>
                <button className={classes.buttom}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart
