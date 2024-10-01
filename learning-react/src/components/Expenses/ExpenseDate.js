import React from 'react'
import './ExpenseDate.css';

const months=["January", "February","March","April","May", "June", "July",
    "August","September","October","November","December"]
const ExpenseDate = (props) => {
    const month=months[props.date.getMonth()];
  const year=props.date.getFullYear();
  const date=props.date.getDate()===1?"01":props.date.getDate();
  return (
    <div className='expense-date'>
        <div className='expense-date__month'>{month}</div>
        <div className='expense-date__year'>{year}</div>
        <div className='expense-date__date'>{date}</div>
      </div>
  )
}

export default ExpenseDate
