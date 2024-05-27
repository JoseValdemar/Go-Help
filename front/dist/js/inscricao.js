document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('titulo')) {
        displayInitiativeDetailsFromURL(); // Carrega detalhes com base nos parâmetros da URL
    } else if (urlParams.has('evento')) {
        loadInitiativeDetailsById(); // Carrega detalhes com base no ID
    }

    const form = document.getElementById('inscricaoForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            handleFormSubmission(); // Trata a submissão do formulário
        }
    });
});

function displayInitiativeDetailsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = decodeURIComponent(urlParams.get('titulo'));
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(init => init.titulo === titulo);

    displayInitiativeDetails(initiative);
}

function loadInitiativeDetailsById() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('evento');
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(init => init.id.toString() === eventoId);

    displayInitiativeDetails(initiative);
}

function displayInitiativeDetails(initiative) {
    if (initiative) {
        const eventoContainer = document.querySelector('.event-container');
        eventoContainer.innerHTML = `
            <img src="${initiative.imagem}" alt="Event Image">
            <div class="event-date">${new Date(initiative.data).toLocaleDateString('pt-PT')}</div>
            <div class="event-location">${initiative.localidade}</div>
            <h3>${initiative.titulo}</h3>
            <p>${initiative.descricao}</p>
            <div><strong>Participantes: </strong>${initiative.participantes.length}/${initiative.participantesmax}</div>
        `;
    } else {
        console.log("Iniciativa não encontrada.");
    }
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }
    return true;
}

function handleFormSubmission() {
    const email = document.getElementById('email').value.trim();
    const urlParams = new URLSearchParams(window.location.search);
    const titulo = urlParams.get('titulo');
    const eventoId = urlParams.get('evento');
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiative = initiatives.find(init => titulo ? init.titulo === titulo : init.id.toString() === eventoId);

    if (!initiative) {
        alert('Evento não encontrado.');
        return;
    }

    // Verifica se o e-mail já está presente no array de participantes da iniciativa
    if (initiative.participantes.includes(email)) {
        alert('Este e-mail já foi utilizado para se inscrever neste evento.');
        return;
    }

    if (initiative.participantes.length >= initiative.participantesmax) {
        alert('Número máximo de participantes atingido.');
        return;
    }

    initiative.participantes.push(email);
    localStorage.setItem('initiatives', JSON.stringify(initiatives));
    updateParticipantsDisplay(initiative);
    new bootstrap.Modal(document.getElementById('confirmationModal')).show(); // Exibir o modal de confirmação
}

function updateParticipantsDisplay(initiative) {
    const eventoContainer = document.querySelector('.event-container');
    eventoContainer.querySelector('div:last-child').innerHTML = `<strong>Participantes: </strong>${initiative.participantes.length}/${initiative.participantesmax}`;
}

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