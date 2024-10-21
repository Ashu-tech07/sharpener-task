import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, editItem, removeItem, setItems } from "./expenseSlice";

const ExpenseContext = createContext({
  expenses: [],
  fetchExpense: () => {},
  addExpense: (expense) => {},
  updateExpense: (expense)=>{},
  removeExpense: (id) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenseItems, setExpenseItems] = useState([]);

  const dispatch = useDispatch();

  let userEmail = localStorage.getItem("email");
  if (userEmail) {
    userEmail = userEmail.replace(/[^a-zA-Z0-9]/g, "");
  }

  const DATABASE_API = "https://sharpener-movies-default-rtdb.firebaseio.com/";

  const fetchExpenseHandler = async () => {
   
    if (userEmail) {
      const URL = `${DATABASE_API}/expenses${userEmail}.json`;
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch expense data");
        }
        const data = await response.json();
        const expenseList = Object.keys(data).map((expenseId) => {
          const expense = data[expenseId];
          return {
            id: expenseId,
            category: expense.category,
            description: expense.description,
            moneySpent: expense.moneySpent,
          };
        });

        dispatch(setItems(expenseList));

        setExpenseItems(expenseList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addExpenseHandler = (item) => {
    if (userEmail) {
      const URL = `${DATABASE_API}/expenses${userEmail}.json`;
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("Error adding/updating item");
          }
        })
        .then((data) => {
          item={...item, id:data.name}
          setExpenseItems([...expenseItems, item]);

          dispatch(addItem(item));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updateExpenseHandler = (updatedExpense) => {
    if (userEmail) {
      const URL = `${DATABASE_API}/expenses${userEmail}/${updatedExpense.id}.json`;
      fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Expense Updated");
            //update expense from expenseItems
            setExpenseItems((prevExpenseItems) =>
              prevExpenseItems.map((expense) =>
                expense.id === updatedExpense.id ? updatedExpense : expense
              )
            );

            dispatch(editItem({ item: updatedExpense }))
          } else {
            console.error("error while updating item");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const removeExpenseHandler = (expenseId) => {
    if (userEmail) {
      const URL = `${DATABASE_API}/expenses${userEmail}/${expenseId}.json`;
      fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Expense successfully deleted");
            //remove expense from expenseItems
            setExpenseItems((prevExpenseItems) =>
              prevExpenseItems.filter((expense) => expense.id !== expenseId)
            );

            dispatch(removeItem({ id: expenseId }));
          } else {
            console.error("error while deleting item");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const expenseContext = {
    expenses: expenseItems,
    fetchExpense: fetchExpenseHandler,
    addExpense: addExpenseHandler,
    updateExpense:updateExpenseHandler,
    removeExpense: removeExpenseHandler,
  };
  
  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContext;