document.addEventListener('DOMContentLoaded', function() {
    // Initially display the "FUTURAS" tab
    changeTab('future', document.querySelector('.tab-button[data-tab="future"]'));

    // Load initiatives from local storage
    loadInitiatives();
});

function loadInitiatives() {
    if (!localStorage.getItem('initiatives')) {
        localStorage.setItem('initiatives', JSON.stringify(predefinedInitiatives));
    }

    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const reversedInitiatives = initiatives.reverse();
    const pastContainer = document.getElementById('past').querySelector('#eventos');
    const currentContainer = document.getElementById('current').querySelector('#eventos');
    const futureContainer = document.getElementById('future').querySelector('#eventos');

    pastContainer.innerHTML = '';
    currentContainer.innerHTML = '';
    futureContainer.innerHTML = '';

    const currentDate = new Date();
    let currentHasInitiatives = false;

    reversedInitiatives.forEach(initiative => {
        const startDate = new Date(`${initiative.data}T${initiative.horaInicio}`);
        const endDate = new Date(`${initiative.data}T${initiative.horaFim}`);
        const initiativeElement = createInitiativeElement(initiative);

        if (endDate < currentDate) {
            pastContainer.appendChild(initiativeElement);
        } else if (startDate <= currentDate && currentDate <= endDate) {
            currentContainer.appendChild(initiativeElement);
            currentHasInitiatives = true;
        } else {
            futureContainer.appendChild(initiativeElement);
        }
    });

    if (!currentHasInitiatives) {
        currentContainer.innerHTML = '<br><br/><p class="no-initiatives">Nenhuma iniciativa a decorrer neste momento.</p><br><br/>';
    }

    applyFilters();
}

function createInitiativeElement(initiative) {
    const container = document.createElement('div');
    container.className = 'event-container';
    container.setAttribute('data-region', initiative.region);

    const formattedDate = new Date(initiative.data).toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: 'short' });

    container.innerHTML = `
        <img src="${initiative.imagem}" alt="Event Image">
        <div class="event-date">${formattedDate}</div>
        <div class="event-location">${initiative.localidade}</div>
        <h3>${initiative.titulo}</h3>
        <p class="descriçãoiniciativas">${initiative.descricao}</p>
    `;

    const currentDate = new Date();
    const startDate = new Date(`${initiative.data}T${initiative.horaInicio}`);
    if (startDate > currentDate) {
        const detailsUrl = `inscricao.html?` +
            `id=${encodeURIComponent(initiative.id)}` +
            `&titulo=${encodeURIComponent(initiative.titulo)}` +
            `&type=${encodeURIComponent(initiative.type)}` +
            `&localidade=${encodeURIComponent(initiative.localidade)}` +
            `&region=${encodeURIComponent(initiative.region)}` +
            `&data=${encodeURIComponent(initiative.data)}` +
            `&horaInicio=${encodeURIComponent(initiative.horaInicio)}` +
            `&horaFim=${encodeURIComponent(initiative.horaFim)}` +
            `&descricao=${encodeURIComponent(initiative.descricao)}` +
            `&participantes=${encodeURIComponent(initiative.participantes)}` +
            `&doacoes=${encodeURIComponent(initiative.doacoes)}` +
            `&materiais=${encodeURIComponent(initiative.materiais)}` +
            `&profissionais=${encodeURIComponent(initiative.profissionais)}` +
            `&gestor=${encodeURIComponent(initiative.gestor)}` +
            `&participantesmax=${encodeURIComponent(initiative.participantesmax)}`;
        
        console.log("Generated details URL:", detailsUrl);
        container.innerHTML += `<a href="${detailsUrl}" class="register-button">INSCREVER</a>`;
    }

    return container;
}


let activeRegions = [];

function filterRegion(region, element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        activeRegions = activeRegions.filter(r => r !== region);
    } else {
        element.classList.add('active');
        activeRegions.push(region);
    }
    applyFilters();
}

function applyFilters() {
    const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
    const allContainers = document.querySelectorAll(`#${activeTab} .event-container`);

    allContainers.forEach(container => {
        const eventRegion = container.getAttribute('data-region');
        const matchesRegion = activeRegions.length === 0 || activeRegions.includes(eventRegion);
        container.style.display = matchesRegion ? '' : 'none';
    });
}

function changeTab(tabId, element) {
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    applyFilters();
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