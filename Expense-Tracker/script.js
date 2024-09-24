function addExpense() {
  var amount = document.getElementById("amount").value;
  var description = document.getElementById("description").value;
  var category = document.getElementById("category").value;
  var editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({
      amount: amount,
      description: description,
      category: category,
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    var tableBody = document
      .getElementById("expenseTable")
      .getElementsByTagName("tbody")[0];
    var row =
      "<tr><td>" +
      amount +
      "</td><td>" +
      description +
      "</td><td>" +
      category +
      '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
    tableBody.insertAdjacentHTML("beforeend", row);
  } else {
    editExpense(editIndex, amount, description, category);
  }

  resetForm();
}

function resetForm() {
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("editIndex").value = "";
  document.getElementById("addButton").innerHTML = "Add Expense";
}

function deleteExpense(row) {
  row.parentNode.removeChild(row);
  var expenses = JSON.parse(localStorage.getItem("expenses"));
  var rowIndex = row.rowIndex - 1;
  expenses.splice(rowIndex, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function editForm(row) {
  var rowIndex = row.rowIndex - 1;
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var expense = expenses[rowIndex];
  document.getElementById("amount").value = expense.amount;
  document.getElementById("description").value = expense.description;
  document.getElementById("category").value = expense.category;
  document.getElementById("editIndex").value = rowIndex;
  document.getElementById("addButton").innerHTML = "Update Expense";
}

function editExpense(index, amount, description, category) {
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses[index] = {
    amount: amount,
    description: description,
    category: category,
  };
  localStorage.setItem("expenses", JSON.stringify(expenses));
  var tableRow = document.getElementById("expenseTable").rows[index + 1];
  tableRow.cells[0].innerHTML = amount;
  tableRow.cells[1].innerHTML = description;
  tableRow.cells[2].innerHTML = category;
  resetForm();
}

function showExpenses() {
  var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  var tableBody = document
    .getElementById("expenseTable")
    .getElementsByTagName("tbody")[0];
  for (var i = 0; i < expenses.length; i++) {
    var expense = expenses[i];
    var row =
      "<tr><td>" +
      expense.amount +
      "</td><td>" +
      expense.description +
      "</td><td>" +
      expense.category +
      '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteExpense(this.parentNode.parentNode)">Delete</button></td></tr>';
    tableBody.insertAdjacentHTML("beforeend", row);
  }
}
