const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Toggle the dropdown menu on button click
dropdownToggle.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if clicked outside of it
window.addEventListener('click', (event) => {
    if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Remove white borders when scrolling
window.addEventListener('scroll', () => {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.style.borderBottom = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    const professionals = JSON.parse(localStorage.getItem('profissionais')) || [];
    const gestores = JSON.parse(localStorage.getItem('gestores')) || [];


    //donations
    const totalSum = donations.reduce((sum, donation) => sum + donation.montante, 0);
    const formattedTotalSum = totalSum.toFixed(0);
    const formattedTotalSum2 = new Intl.NumberFormat('de-DE').format(formattedTotalSum);

    //iniciatives
    const initiativesCount = initiatives.length;

    //professionals
    const professionalsCount = professionals.length;
    const gestorCount = gestores.length;
    const totalProfessionals = professionalsCount+gestorCount
    
    //write
    const doacoes = document.getElementById('doacoes');
    doacoes.innerHTML = `
    ${formattedTotalSum2}€
    `;
    
    const acoes = document.getElementById('acoes');
    acoes.innerHTML = `
    ${initiativesCount}
    `;

    const profissionais = document.getElementById('profissionais');
    profissionais.innerHTML = `
    ${totalProfessionals}
    `;
  });

