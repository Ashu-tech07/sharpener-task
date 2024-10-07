import React, { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cartContext'

const Cart = (props) => {
    const ctx = useContext(CartContext)

    const increaseItem = (itemId) => {
        ctx.items.forEach((item) => {
            if (item.id === itemId) {
                ctx.addItem({ ...item, quantity: 1 });
            }
        });
    };
    const decreaseItem = (itemId) => {
        ctx.items.forEach((item) => {
            if (item.id === itemId) {
                ctx.removeItem(itemId);
            }
        });
    };

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
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                            <span>${item.price}</span>
                            <div className="btnGroup">
                                <button
                                    className={classes["button--decrease"]}
                                    onClick={() => decreaseItem(item.id)}
                                >
                                    -
                                </button>
                                <button
                                    className={classes["button--increase"]}
                                    onClick={() => increaseItem(item.id)}
                                >
                                    +
                                </button>
                            </div>
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
