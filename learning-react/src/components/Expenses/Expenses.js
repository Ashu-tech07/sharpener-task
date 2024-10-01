import React from 'react'
import ExpenseItem from './ExpenseItem';
import './Expenses.css'
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';

const Expense = (props) => {
    const expenses=props.expenses;
    const [filteredYear,setFilteredYear]=useState("2023");

    const filteredExpenses=expenses.filter((item)=>item.date.getFullYear().toString()===filteredYear)
    

    const changeFilterHandler=(selectedYear)=>{
      setFilteredYear(selectedYear);
    }

    let expensesContent = <p>No expenses found</p>;

    if (filteredExpenses.length > 0) {
      expensesContent = filteredExpenses.map((expense) => {
        return (
          <>
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            date={expense.date}
            price={expense.price}
          />
            { filteredExpenses.length===1 && 
            <p>Only one expense here. Please add more</p>}
            </>
        );
      });
    }
  return (
    <Card className='expenses'>
      <ExpensesFilter selected={filteredYear} onChangeFilter={changeFilterHandler}/>
       {expensesContent}
    </Card>
  )
}

export default Expense
