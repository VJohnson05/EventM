// JavaScript for Vendor Dashboard

// Example Data (Replace with backend integration in Phase 2)
let services = [
    { id: 1, name: "Catering", price: 20000, available: true },
    { id: 2, name: "Photography", price: 15000, available: true },
];

let bookings = [
    { id: 1, client: "John Doe", service: "Catering", date: "2024-01-15", status: "Confirmed" },
    { id: 2, client: "Jane Smith", service: "Photography", date: "2024-01-18", status: "Pending" },
];

// Function to Display Services
const displayServices = () => {
    const serviceList = document.getElementById("service-list");
    serviceList.innerHTML = ""; // Clear existing content

    if (services.length === 0) {
        serviceList.innerHTML = "<p>No services added yet.</p>";
        return;
    }

    services.forEach((service) => {
        const serviceDiv = document.createElement("div");
        serviceDiv.classList.add("service-item");
        serviceDiv.innerHTML = `
            <h3>${service.name}</h3>
            <p>Price: ₹${service.price}</p>
            <p>Status: ${service.available ? "Available" : "Unavailable"}</p>
            <button class="edit-btn" data-id="${service.id}">Edit</button>
            <button class="delete-btn" data-id="${service.id}">Delete</button>
        `;
        serviceList.appendChild(serviceDiv);
    });

    attachServiceEventListeners();
};

// Function to Display Bookings
const displayBookings = () => {
    const bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = ""; // Clear existing content

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p>No bookings available.</p>";
        return;
    }

    bookings.forEach((booking) => {
        const bookingDiv = document.createElement("div");
        bookingDiv.classList.add("booking-item");
        bookingDiv.innerHTML = `
            <h3>${booking.client}</h3>
            <p>Service: ${booking.service}</p>
            <p>Date: ${booking.date}</p>
            <p>Status: ${booking.status}</p>
        `;
        bookingList.appendChild(bookingDiv);
    });
};

// Add New Service
const addService = () => {
    const serviceName = prompt("Enter service name:");
    const servicePrice = prompt("Enter service price:");
    if (serviceName && servicePrice) {
        const newService = {
            id: services.length + 1,
            name: serviceName,
            price: Number(servicePrice),
            available: true,
        };
        services.push(newService);
        displayServices();
    }
};

// Edit or Delete Service
const attachServiceEventListeners = () => {
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const serviceId = button.getAttribute("data-id");
            const service = services.find((s) => s.id === Number(serviceId));
            if (service) {
                const newName = prompt("Edit service name:", service.name);
                const newPrice = prompt("Edit service price:", service.price);
                if (newName) service.name = newName;
                if (newPrice) service.price = Number(newPrice);
                displayServices();
            }
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const serviceId = button.getAttribute("data-id");
            services = services.filter((s) => s.id !== Number(serviceId));
            displayServices();
        });
    });
};

// Initialize Vendor Dashboard
const initializeVendorDashboard = () => {
    displayServices();
    displayBookings();

    // Add Service Button Listener
    document.getElementById("add-service-btn").addEventListener("click", addService);
};

// Run Initialization
initializeVendorDashboard();