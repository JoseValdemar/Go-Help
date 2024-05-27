document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("registerButton").addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default form submission

        const firstName = document.getElementById("exampleFirstName").value.trim();
        const lastName = document.getElementById("exampleLastName").value.trim();
        const email = document.getElementById("exampleInputEmail").value.trim();
        const password = document.getElementById("exampleInputPassword").value.trim();
        const repeatPassword = document.getElementById("exampleRepeatPassword").value.trim();

        // Simple validation check
        if (!firstName || !lastName || !email || !password || password !== repeatPassword) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Retrieve existing users from local storage or initialize empty array if none exist
        const users = JSON.parse(localStorage.getItem('Users')) || [];

        // Check if the email already exists
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            alert("Email is already in use.");
            return;
        }

        // Create user object
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password, // Note: Storing passwords in local storage is not recommended for security reasons
            frontoffice: true,
            isAdmin: false,
        };

        // Add new user to the array
        users.push(newUser);

        // Store updated users array in local storage
        localStorage.setItem('Users', JSON.stringify(users));
        alert("Registration successful!");

        // Optionally, redirect to login page or another page
        window.location.href = 'login.html';
    });
})