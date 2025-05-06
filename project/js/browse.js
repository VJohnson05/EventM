import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

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

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM reference
const vendorContainer = document.querySelector(".vendor-container");

// Load services from all vendors
function loadAllVendorServices() {
  const servicesRef = ref(db, "services");

  onValue(servicesRef, (snapshot) => {
    vendorContainer.innerHTML = ""; // clear any existing content

    if (!snapshot.exists()) {
      vendorContainer.innerHTML = "<p>No services available yet.</p>";
      return;
    }

    snapshot.forEach((vendorSnap) => {
      const vendorId = vendorSnap.key;
      const services = vendorSnap.val();

      for (const serviceId in services) {
        const service = services[serviceId];

        const card = document.createElement("div");
        card.className = "vendor-card";
        card.innerHTML = `
          <h2>${service.name}</h2>
          <img src="assets/images/default-service.jpg" alt="${service.name}">
          <p><strong>Description:</strong> ${service.description}</p>
          <p><strong>Category:</strong> ${service.category}</p>
          <p><strong>Price:</strong> ₹${service.price}</p>
          <p><strong>Status:</strong> ${service.available ? "Available" : "Unavailable"}</p>
        `;
        vendorContainer.appendChild(card);
      }
    });
  });
}

// Call function
loadAllVendorServices();