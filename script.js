// Get the transaction list element
const transactionList = document.getElementById('transaction-list');

// Get the balance element
const balanceElement = document.getElementById('balance');

// Initialize the transaction array
let transactions = [];

// Function to display transactions
function displayTransactions() {
  // Clear the transaction list
  transactionList.innerHTML = '';

  // Iterate through each transaction
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    // Create a new list item
    const listItem = document.createElement('li');

    // Set the text content of the list item
    listItem.textContent = `${transaction.description} - ${transaction.amount}`;

    // Append the list item to the transaction list
    transactionList.appendChild(listItem);
  }
}

// Function to update the balance
function updateBalance() {
  // Calculate the total balance
  let totalBalance = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    totalBalance += parseFloat(transaction.amount);
  }

  // Update the balance element
  balanceElement.textContent = totalBalance.toFixed(2);
}

// Function to add a transaction
function addTransaction(e) {
  e.preventDefault();

  // Get the description and amount from the form
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  // Create a new transaction object
  const transaction = {
    description,
    amount
  };

  // Add the transaction to the transactions array
  transactions.push(transaction);

  // Clear the form inputs
  descriptionInput.value = '';
  amountInput.value = '';

  // Update the transaction list and balance
  displayTransactions();
  updateBalance();
}

// Add event listener for the form submission
const transactionForm = document.getElementById('transaction-form');
transactionForm.addEventListener('submit', addTransaction);

// Load transactions from local storage
const storedTransactions = localStorage.getItem('transactions');
if (storedTransactions) {
  transactions = JSON.parse(storedTransactions);
}

// Display initial transactions and balance
displayTransactions();
updateBalance();

// Save transactions to local storage on page unload
window.addEventListener('beforeunload', () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
});
