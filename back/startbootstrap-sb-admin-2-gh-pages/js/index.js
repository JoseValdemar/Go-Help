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