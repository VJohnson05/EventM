import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFqA-ND0ZUPI-zeXJDPia4FlbYUkFFi_g",
  authDomain: "planitnow-4.firebaseapp.com",
  databaseURL: "https://planitnow-4-default-rtdb.firebaseio.com",
  projectId: "planitnow-4",
  storageBucket: "planitnow-4.appspot.com",
  messagingSenderId: "459500688850",
  appId: "1:459500688850:web:8654582d843e0e4979a40b",
  measurementId: "G-NEBHY93TQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Entry point
const initializeVendorDashboard = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Show switch-role button if user has both roles
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        const userData = snapshot.val();
        const roles = userData?.roles || {};
        const switchBtn = document.getElementById("switch-role-btn");

        if (switchBtn) {
          if (roles.client && roles.vendor) {
            switchBtn.style.display = "block";
          } else {
            switchBtn.style.display = "none";
          }
        }
      });

      loadServices(user.uid);
      loadBookings(user.uid);
      setupFormHandlers(user.uid);
    } else {
      alert("You must be logged in.");
      window.location.href = "login.html";
    }
  });
};

// Handle form UI and submission
const setupFormHandlers = (uid) => {
  const toggleBtn = document.getElementById("toggle-service-form-btn");
  const form = document.getElementById("service-form");

  toggleBtn.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("service-title").value.trim();
    const description = document.getElementById("service-description").value.trim();
    const category = document.getElementById("service-category").value.trim();
    const price = document.getElementById("service-price").value.trim();

    if (!name || !description || !category || !price) {
      alert("Please fill all fields.");
      return;
    }

    const service = {
      name,
      description,
      category,
      price: Number(price),
      available: true,
    };

    push(ref(db, `services/${uid}`), service).then(() => {
      form.reset();
      form.style.display = "none";
    });
  });
};

// Load Vendor Services
const loadServices = (uid) => {
  const serviceList = document.getElementById("service-list");
  const servicesRef = ref(db, `services/${uid}`);

  onValue(servicesRef, (snapshot) => {
    serviceList.innerHTML = "";

    if (!snapshot.exists()) {
      serviceList.innerHTML = "<p>No services added yet.</p>";
      return;
    }

    snapshot.forEach((childSnap) => {
      const service = childSnap.val();
      const id = childSnap.key;

      const serviceDiv = document.createElement("div");
      serviceDiv.classList.add("service-item");
      serviceDiv.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p>Category: ${service.category}</p>
        <p>Price: ₹${service.price}</p>
        <p>Status: ${service.available ? "Available" : "Unavailable"}</p>
        <button class="edit-btn" data-id="${id}">Edit</button>
        <button class="delete-btn" data-id="${id}">Delete</button>
      `;
      serviceList.appendChild(serviceDiv);
    });

    attachServiceEventListeners(uid);
  });
};

// Edit / Delete Service
const attachServiceEventListeners = (uid) => {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const serviceRef = ref(db, `services/${uid}/${id}`);

      get(serviceRef).then((snap) => {
        const service = snap.val();
        const newName = prompt("Edit name:", service.name);
        const newPrice = prompt("Edit price:", service.price);

        if (newName || newPrice) {
          update(serviceRef, {
            name: newName || service.name,
            price: newPrice ? Number(newPrice) : service.price,
          });
        }
      });
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      remove(ref(db, `services/${uid}/${id}`));
    });
  });
};

// Load Bookings
const loadBookings = (uid) => {
  const bookingList = document.getElementById("booking-list");
  const bookingsRef = ref(db, `vendorBookings/${uid}`);

  onValue(bookingsRef, (snapshot) => {
    bookingList.innerHTML = "";

    if (!snapshot.exists()) {
      bookingList.innerHTML = "<p>No bookings available.</p>";
      return;
    }

    snapshot.forEach((childSnap) => {
      const booking = childSnap.val();
      const bookingDiv = document.createElement("div");
      bookingDiv.classList.add("booking-item");
      bookingDiv.innerHTML = `
        <h3>${booking.clientName}</h3>
        <p>Service: ${booking.serviceName}</p>
        <p>Date: ${booking.date}</p>
        <p>Status: ${booking.status}</p>
      `;
      bookingList.appendChild(bookingDiv);
    });
  });
};

// Initialize
initializeVendorDashboard();