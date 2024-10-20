import { crearteStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "INCREMENTBY2") {
    return {
      counter: state.counter + 2,
    };
  }

  if (action.type === "DECREMENTBY2") {
    return {
      counter: state.counter - 2,
    };
  }

  if (action.type === "INCREMENTBY5") {
    return {
      counter: state.counter + 5,
    };
  }

  if (action.type === "DECREMENTBY5") {
    return {
      counter: state.counter - 5,
    };
  }

  return state;
};

const store = crearteStore(counterReducer);

export default store;