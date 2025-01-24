// JavaScript for Client Dashboard

// Example Data (You can replace this with real data in Phase 2)
const events = [
    { name: "Wedding", date: "2024-01-15", location: "Banquet Hall" },
    { name: "Birthday Party", date: "2024-02-10", location: "Home Garden" },
];

const tasks = [
    { task: "Confirm Caterer", deadline: "2024-01-10" },
    { task: "Finalize Guest List", deadline: "2024-01-05" },
];

let budget = {
    total: 100000,
    spent: 45000,
};

// Update Upcoming Events Card
const updateEventsCard = () => {
    const eventsCard = document.querySelector(".card:nth-child(1)");
    const eventsText = events.length
        ? You have ${events.length} upcoming event(s).
        : "No upcoming events.";
    eventsCard.querySelector("p").textContent = eventsText;
};

// Update Budget Card
const updateBudgetCard = () => {
    const budgetCard = document.querySelector(".card:nth-child(2)");
    const budgetText = Budget: ₹${budget.spent} spent of ₹${budget.total};
    budgetCard.querySelector("p").textContent = budgetText;
};

// Update Task Card
const updateTaskCard = () => {
    const taskCard = document.querySelector(".card:nth-child(3)");
    const tasksText = tasks.length
        ? ${tasks.length} pending task(s).
        : "No pending tasks.";
    taskCard.querySelector("p").textContent = tasksText;
};

// Attach Button Event Listeners
const attachButtonListeners = () => {
    const buttons = document.querySelectorAll("button");
    buttons[0].addEventListener("click", () => {
        alert("View upcoming events clicked!");
    });
    buttons[1].addEventListener("click", () => {
        alert("Manage budget clicked!");
    });
    buttons[2].addEventListener("click", () => {
        alert("View tasks clicked!");
    });
};

// Simulate Calendar Updates
const updateCalendarPlaceholder = () => {
    const calendarPlaceholder = document.querySelector(".calendar-placeholder");
    calendarPlaceholder.innerHTML = `
        <ul>
            ${events
                .map(
                    (event) =>
                        <li><strong>${event.date}:</strong> ${event.name} at ${event.location}</li>
                )
                .join("")}
        </ul>
    `;
};

// Initialize Dashboard
const initializeDashboard = () => {
    updateEventsCard();
    updateBudgetCard();
    updateTaskCard();
    attachButtonListeners();
    updateCalendarPlaceholder();
};

// Run Initialization
initializeDashboard();