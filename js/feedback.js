// Feedback Form JavaScript

document.getElementById("feedback-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rating = document.getElementById("rating").value;
    const message = document.getElementById("message").value;

    // For now, log the feedback details (backend will process this later)
    console.log("Feedback Submitted:");
    console.log(Name: ${name});
    console.log(Email: ${email});
    console.log(Rating: ${rating});
    console.log(Message: ${message});

    // Show confirmation message
    alert("Thank you for your feedback! We'll get back to you shortly.");

    // Reset the form
    e.target.reset();
});