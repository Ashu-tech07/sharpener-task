import React from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
    const saveExpenseData=(enteredExpenseData)=>{
        const newExpenseData={...enteredExpenseData, id: Math.random().toString()}
        console.log(newExpenseData);
        return props.onAddExpense(newExpenseData);
      }

  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseData}/>
    </div>
  );
};

export default NewExpense;
