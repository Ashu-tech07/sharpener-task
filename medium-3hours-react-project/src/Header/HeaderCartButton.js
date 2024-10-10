
import CartIcon from "../Cart/CartIcon";
import CartContext from "../Store/cartContext";
import "./HeaderCartButton.css";

const HeaderCartButton = (props) => {
  // const cartCtx = useContext(CartContext);
  // let sum = 0;
  // cartCtx.cartItems.forEach((item) => {
  //   sum +=
  //     Number(item.items.large) +
  //     Number(item.items.medium) +
  //     Number(item.items.small);
  // });
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