let expenses = [];

function addExpense() {
  const person = document.getElementById("person").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!person || isNaN(amount) || amount <= 0) return alert("Enter valid data");

  expenses.push({ person, amount });
  updateDisplay();
}

function updateDisplay() {
  const expenseDiv = document.getElementById("expenses");
  const balanceDiv = document.getElementById("balances");
  expenseDiv.innerHTML = "";
  balanceDiv.innerHTML = "";

  const totals = {};
  expenses.forEach(e => {
    expenseDiv.innerHTML += `<p>${e.person} paid ₹${e.amount}</p>`;
    totals[e.person] = (totals[e.person] || 0) + e.amount;
  });

  const people = Object.keys(totals);
  const totalAmount = Object.values(totals).reduce((a, b) => a + b, 0);
  const splitAmount = totalAmount / people.length;

  people.forEach(p => {
    const balance = totals[p] - splitAmount;
    const msg = balance >= 0 ? `${p} gets ₹${balance.toFixed(2)}` : `${p} owes ₹${Math.abs(balance).toFixed(2)}`;
    balanceDiv.innerHTML += `<p>${msg}</p>`;
  });
}