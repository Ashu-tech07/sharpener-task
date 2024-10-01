import React from 'react'
import ExpenseItem from './ExpenseItem';
import './Expenses.css'
import Card from '../UI/Card';

const Expense = (props) => {
    const expenses=props.expenses
  return (
    <Card className='expenses'>
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
    </Card>
  )
}

export default Expense
