document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    const form = document.getElementById('inscricaoForm');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const region = form.querySelector('#region').value.trim();

    // Validate required fields
    if (!name || !email || !phone || !region) {
        document.getElementById('errorMessage').classList.remove('d-none');
        document.getElementById('successMessage').classList.add('d-none');
    } else {
        // Retrieve the existing array of gestor data from local storage or initialize it if not present
        const gestores = JSON.parse(localStorage.getItem('gestores')) || [];
        
        // Additionally, add to general users array
        const users = JSON.parse(localStorage.getItem('Users')) || [];
        
        // Check if the email already exists in Users array
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            document.getElementById('errorMessage').classList.remove('d-none');
            document.getElementById('errorMessage').textContent = "Email is already in use.";
            document.getElementById('successMessage').classList.add('d-none');
            return;
        }
        
        document.getElementById('errorMessage').classList.add('d-none');
        document.getElementById('successMessage').classList.remove('d-none');

        // Form data as an object with role set to "gestor_terreno"
        const gestor = {
            name: name,
            email: email,
            phone: phone,
            region: region,
            profession: "Gestor_Terreno"
        };

        gestores.push(gestor);
        localStorage.setItem('gestores', JSON.stringify(gestores));
        
        const newUser = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email,
            password: "gohelp",
            isAdmin: false,
            frontoffice: false, 
            profession: "Gestor_Terreno"
        };
        
        users.push(newUser);
        localStorage.setItem('Users', JSON.stringify(users)); // Save updated users array in local storage

        // Optionally clear all inputs after successful registration
        form.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
    }
});

// Load user information on DOMContentLoaded if available

document.addEventListener('DOMContentLoaded', () => {
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const loginLink = document.getElementById('loginLink');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userProfileDropdown.classList.remove('d-none');

        if (loggedInUser.name && loggedInUser.role) {
            const displayName = `${loggedInUser.name} (${loggedInUser.role})`;
            document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
        }
    } else {
        loginLink.classList.remove('d-none');
        // Redirect to 'index.html' if loggedInUser does not exist
        
    }
});

function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'login.html'
    window.location.href = "../../front/dist/index.html";
}