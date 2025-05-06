// Simulate the admin data (This will be replaced with actual API calls later)
const adminData = {
  users: 120,           // Total number of users
  events: 50,           // Total number of events
  revenue: 50000,       // Total revenue
  pendingTasks: 15,     // Number of pending tasks
};

// DOM elements
const usersCount = document.getElementById('users-count');
const eventsCount = document.getElementById('events-count');
const revenue = document.getElementById('revenue');
const pendingTasks = document.getElementById('pending-tasks');
const userTable = document.getElementById('user-table').getElementsByTagName('tbody')[0];

// Function to update the dashboard with data
function updateDashboard() {
  // Display admin data in the dashboard
  usersCount.innerText = adminData.users;
  eventsCount.innerText = adminData.events;
  revenue.innerText = $${adminData.revenue};
  pendingTasks.innerText = adminData.pendingTasks;

  // Populate user table (this is just sample data)
  const sampleUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Client' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Vendor' },
    { id: 3, name: 'Michael Johnson', email: 'mike@example.com', role: 'Client' },
  ];

  // Clear the table first
  userTable.innerHTML = '';

  // Loop through sample users and populate the table
  sampleUsers.forEach(user => {
    const row = userTable.insertRow();
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td><button class="btn-delete">Delete</button></td>
    `;
  });
}

// Function to handle deleting a user (This can be extended with actual API integration later)
function deleteUser(userId) {
  console.log(Deleting user with ID: ${userId});
  // In a real app, you would make an API call here to delete the user.
  // For now, we'll just log the user ID and simulate the deletion.
  alert('User deleted successfully');
}

// Event listener for delete buttons (dynamic content)
document.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('btn-delete')) {
    const userRow = event.target.closest('tr');
    const userId = userRow.cells[0].innerText; // Get user ID from the first cell (assumed)
    deleteUser(userId);
    userRow.remove(); // Remove the row from the table
  }
});

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', updateDashboard);