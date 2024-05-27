document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.getElementById("donationForm");
  
    donationForm.onsubmit = function(e) {
      e.preventDefault(); // Prevent the form from submitting
  
      // Extract donation value
      const donationOptions = document.querySelectorAll('input[name="flexRadioDefault"]');
      let donationValue = 0; // Initialize as 0
  
      // Loop through radio options to find the checked one
      for (const option of donationOptions) {
        if (option.checked) {
          const label = option.nextElementSibling;
          donationValue = parseFloat(label.innerText.trim().replace("€", ""));
          break;
        }
      }
  
      // Check for custom donation amount
      const customAmountInput = donationForm.querySelector('input[type="text"]');
      if (customAmountInput && customAmountInput.value.trim()) {
        // Parse the custom donation value as a number
        donationValue = parseFloat(customAmountInput.value.trim().replace("€", ""));
      }
  
      // Now `donationValue` contains the numeric value of the donation
      console.log(`Numeric Donation Value: ${donationValue}`);
  
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];


      const donation = {
        data: formattedToday,
        montante: donationValue,
        type: "Online",
    };


      const donations = JSON.parse(localStorage.getItem('donations')) || [];

      // Add the new initiative to the array
      donations.push(donation);

      // Save the updated array back to local storage
      localStorage.setItem('donations', JSON.stringify(donations));


      // Display Bootstrap modal
      var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {
        keyboard: false
      });
      myModal.show();
    };
  });

  document.addEventListener('DOMContentLoaded', function() {
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const loginLink = document.getElementById('loginLink');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userProfileDropdown.classList.remove('d-none');
    } else {
        loginLink.classList.remove('d-none');
    }
});

function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'index.html'
    window.location.href = 'index.html';
}
  