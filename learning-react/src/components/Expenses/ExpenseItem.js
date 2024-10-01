import { useState } from "react";
import Card from "../UI/Card";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";


function ExpenseItem(props) {
  const [title, setTitle]=useState(props.title);

  function buttonClickHandler(event){
    setTitle("New Title");
  }
  
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date}/>
      <div className="expense-item__location">{props.location}</div>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.price}</div>
        <button onClick={buttonClickHandler}>Change Title</button>
      </div>
    </Card>
  );
}

export default ExpenseItem;
