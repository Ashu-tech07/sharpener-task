import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../Store/uiSlice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;