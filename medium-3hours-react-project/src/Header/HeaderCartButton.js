
import CartIcon from "../Cart/CartIcon";


import "./HeaderCartButton.css";

const HeaderCartButton = (props) => {
 

  return (
    <button className="cart-button" onClick={props.showCartHandler}>
      <span className="cart-icon">
        <CartIcon />
      </span>
      <h3>Cart</h3>
    </button>
  );
};

export default HeaderCartButton;