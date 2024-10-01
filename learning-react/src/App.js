
import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";


function App() {
  // const expenses = [
  //   { id: "1", date: new Date(2023, 7, 15), title: "Insurance", price: 100, location:"Bangalore"},
  //   { id: "2", date: new Date(2023, 3, 25), title: "Book", price: 10, location:"Delhi" },
  //   { id: "3", date: new Date(2023, 10, 11), title: "Pen", price: 1, location:"Hyderabad" },
  //   { id: "4", date: new Date(2023, 1, 14), title: "Laptop", price: 200, location:"Mumbai" },
  // ];

 const [expenses,setExpenses]=useState([])
  const saveExpenseDataApp=(expense)=>{
    setExpenses((prevState)=>{
      return [...prevState,expense]
    })
  }

  return (
    <div>
       <NewExpense onAddExpense={saveExpenseDataApp}/>
      <Expenses expenses={expenses}/>
    </div>
  );
}

export default App;
