// Budget Tracker JavaScript

let totalBudget = 0;
let totalExpenses = 0;

// Update Summary
const updateSummary = () => {
    const balance = totalBudget - totalExpenses;
    document.getElementById("display-budget").innerText = totalBudget;
    document.getElementById("display-expenses").innerText = totalExpenses;
    document.getElementById("display-balance").innerText = balance >= 0 ? balance : "Over Budget!";
};

// Handle Budget Submission
document.getElementById("budget-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const budgetInput = document.getElementById("total-budget").value;
    totalBudget = Number(budgetInput);
    updateSummary();
    e.target.reset();
});

// Handle Expense Submission
document.getElementById("expense-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = Number(document.getElementById("expense-amount").value);

    totalExpenses += expenseAmount;

    // Add Expense to List
    const expenseItems = document.getElementById("expense-items");
    if (expenseItems.children[0].tagName === "LI" && expenseItems.children[0].innerText === "No expenses added yet.") {
        expenseItems.innerHTML = "";
    }
    const newExpense = document.createElement("li");
    newExpense.innerText = ${expenseName}: ₹${expenseAmount};
    expenseItems.appendChild(newExpense);

    updateSummary();
    e.target.reset();
});