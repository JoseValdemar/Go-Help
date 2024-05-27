const resetPasswordButton = document.querySelector('.btn-user.btn-block');
if (resetPasswordButton) {
    resetPasswordButton.addEventListener("click", function(event) {
        event.preventDefault();
        const email = document.getElementById("exampleInputEmail").value.trim();
        const users = JSON.parse(localStorage.getItem('Users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            localStorage.setItem('resetEmail', JSON.stringify(email)); // Store the email in local storage
            window.location.href = 'define-password.html';
        } else {
            alert("No account found with that email address.");
        }
    });
}