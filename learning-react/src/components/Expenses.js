import React from 'react'
import ExpenseItem from './ExpenseItem';
import './Expenses.css'

const Expense = (props) => {
    const expenses=props.expenses
  return (
    <div className='expenses'>
       {expenses.map((expense) => {
        return (
          <ExpenseItem
            key={expense.id}
            date={expense.date}
            location={expense.location}
            title={expense.title}
            price={expense.price}
          ></ExpenseItem>
        );
      })}
    </div>
  )
}

export default Expense
