import { useSelector, useDispatch } from "react-redux";
import classes from "./Counter.module.css";
import { decrement, increment, toggleCounter } from "../store/store";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(increment(2));
  };

  const decrementHandler = () => {
    dispatch(decrement(2));
  };

  const incrementBy5Handler = () => {
    dispatch(increment(5));
  };

  const decrementBy5Handler = () => {
    dispatch(decrement(5));
  };

  const toggleCounterHandler = () => {
    dispatch(toggleCounter());
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>-- {counter} --</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <div>
        <button onClick={incrementBy5Handler}>Increment By 5</button>
        <button onClick={decrementBy5Handler}>Decrement By 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
export default Counter;