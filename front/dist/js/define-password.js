document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var newPassword = document.getElementById('newPassword').value.trim();
    var confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    
    var email = JSON.parse(localStorage.getItem('resetEmail')); // Retrieve the email from local storage
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    var userIndex = users.findIndex(user => user.email === email);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('Users', JSON.stringify(users));
        localStorage.removeItem('resetEmail'); // Clean up by removing the email from local storage
        alert('Your password has been reset successfully!');
        window.location.href = 'login.html';
    } else {
        alert('An error occurred. No user found.');
    }
});