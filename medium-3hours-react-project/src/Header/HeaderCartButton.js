import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../Store/cartContext";

import "./HeaderCartButton.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  let quantity=0;
  ctx.items.forEach( item => quantity = quantity+Number(item.quantity))

  return (
    <button className="cart-button" onClick={props.showCartHandler}>
      <span className="cart-icon">
        <CartIcon />
      </span>
      <h3>Cart</h3>
      <span className="badge">{quantity}</span>
    </button>
  );
};

export default HeaderCartButton;