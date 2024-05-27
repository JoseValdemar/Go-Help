document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    const form = document.getElementById('inscricaoForm');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const region = form.querySelector('#region').value.trim();
    const professionChecked = form.querySelector('input[name="profession"]:checked');

    // Validate required fields
    if (!name || !email || !phone || !region || !professionChecked) {
        document.getElementById('errorMessage').classList.remove('d-none');
        document.getElementById('successMessage').classList.add('d-none');
    } else {
        // Retrieve the existing array of form data from local storage or initialize it if not present
        const profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
        
        // Retrieve existing users from local storage or initialize empty array if none exist
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

        // Form data as an object
        const profs = {
            name: name,
            email: email,
            phone: phone,
            region: region,
            profession: professionChecked ? professionChecked.value : ''
        };

        profissionais.push(profs); // Add the new form data to the array
        localStorage.setItem('profissionais', JSON.stringify(profissionais)); // Save the updated array back to local storage

        const newUser = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email: email,
            password: "gohelp",
            isAdmin: false,
            frontoffice: false,
            profession: professionChecked.value
        };
        
        users.push(newUser);
        localStorage.setItem('Users', JSON.stringify(users)); // Save updated users array in local storage

        // Clear all inputs
        form.querySelectorAll('input').forEach(input => {
            input.value = '';
            if (input.type === 'radio') input.checked = false;
        });
    }
});

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

// Function to load data from local storage when the page loads
/* window.onload = function loadData() {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
        document.querySelector('#name').value = storedData.name;
        document.querySelector('#email').value = storedData.email;
        document.querySelector('#phone').value = storedData.phone;
        document.querySelector('#region').value = storedData.region;
        var profession = storedData.profession;
        document.querySelector('input[name="profession"][value="' + profession + '"]').checked = true;
    }
}; */

function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'login.html'
    window.location.href = "../../front/dist/index.html";
}