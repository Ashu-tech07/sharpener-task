import React from 'react'
import ExpenseItem from './ExpenseItem';
import './Expenses.css'
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';

const Expense = (props) => {
    const expenses=props.expenses;
    const [filteredYear,setFilteredYear]=useState("2023");

    const filteredExpenses=expenses.filter((item)=>item.date.getFullYear().toString()===filteredYear)
    

    const changeFilterHandler=(selectedYear)=>{
      setFilteredYear(selectedYear);
    }

  return (
    <Card className="expenses">
    <ExpensesFilter
      selected={filteredYear}
      onChangeFilter={changeFilterHandler}
    />
    <ExpensesChart filteredData={filteredExpenses}/>
    <ExpenseItem items={filteredExpenses} />
  </Card>
  )
}

export default Expense
