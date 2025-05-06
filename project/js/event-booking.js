// Event Booking JavaScript
document.getElementById("eventBookingForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Capture form data
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const services = document.getElementById("services").value;
    const additionalDetails = document.getElementById("additionalDetails").value;

    // Validate required fields
    if (!eventName || !eventDate || !eventLocation || !services) {
        alert("Please fill out all required fields!");
        return;
    }

    // Display success message
    alert(Event "${eventName}" has been successfully booked on ${eventDate} at ${eventLocation}.);

    // Clear form
    document.getElementById("eventBookingForm").reset();
});