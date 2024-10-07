import React, { useContext } from 'react'

import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cartContext'

const HeaderCartButton = (props) => {
    const ctx=useContext(CartContext);
    let quantity=0;

    ctx.items.forEach( item => quantity = quantity+Number(item.quantity))

  return (
    <button className={classes.button} onClick={props.showCartHandler}>
      <span className={classes.icon}>
      <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  )
}

export default HeaderCartButton
