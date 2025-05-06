// Password Strength Checker (Registration Page)
document.getElementById('password').addEventListener('input', function (e) {
  const password = e.target.value;
  const strengthIndicator = document.getElementById('password-strength');

  if (password.length < 6) {
    strengthIndicator.textContent = 'Weak';
    strengthIndicator.style.color = 'red';
  } else if (password.length < 12) {
    strengthIndicator.textContent = 'Medium';
    strengthIndicator.style.color = 'orange';
  } else {
    strengthIndicator.textContent = 'Strong';
    strengthIndicator.style.color = 'green';
  }
});

// Show/Hide Password (Login Page)
const togglePassword = document.getElementById('toggle-password');
if (togglePassword) {
  togglePassword.addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      togglePassword.textContent = 'Hide Password';
    } else {
      passwordField.type = 'password';
      togglePassword.textContent = 'Show Password';
    }
  });
}