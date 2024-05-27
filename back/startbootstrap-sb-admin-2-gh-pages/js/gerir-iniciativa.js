document.addEventListener('DOMContentLoaded', () => {
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const loginLink = document.getElementById('loginLink');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userProfileDropdown.classList.remove('d-none');

        if (loggedInUser.name && loggedInUser.role) {
            const displayName = `${loggedInUser.name} (${loggedInUser.role})`;
            document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
            displayInitiatives();
        }
    } else {
        loginLink.classList.remove('d-none');
        // Redirect to 'index.html' if loggedInUser does not exist
       
    }
});

function openTab(tabName) {
    // Esconde todos os conteúdos de abas
    var tabcontents = document.querySelectorAll(".tab-content");
    tabcontents.forEach(function(tabcontent) {
      tabcontent.style.display = "none";
    });
  
    // Remove 'active' de todos os botões
    var tabbuttons = document.querySelectorAll(".tab-button");
    tabbuttons.forEach(function(tabbutton) {
      tabbutton.classList.remove("active");
    });
  
    // Mostra a aba específica e adiciona 'active' ao botão correspondente
    document.getElementById(tabName).style.display = "block";
    document.querySelector(".tab-button[data-tab='" + tabName + "']").classList.add("active");
}
  
  // Garante que o script rode após o carregamento completo do DOM
  window.onload = function() {
    openTab('ADecorrer');
  };

  function displayInitiatives() {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const reversedInitiatives = initiatives.reverse();
    const realizadasContainer = document.getElementById('Realizadas');
    const aDecorrerContainer = document.getElementById('ADecorrer');
    const aRealizarContainer = document.getElementById('ARealizar');

    // Clear existing content
    realizadasContainer.innerHTML = '';
    aDecorrerContainer.innerHTML = '';
    aRealizarContainer.innerHTML = '';

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

    reversedInitiatives.forEach(initiative => {
        const eventDate = new Date(initiative.data);
        eventDate.setHours(0, 0, 0, 0); // Reset time part for accurate comparison
        const initiativeElement = createInitiativeElement(initiative, eventDate > currentDate);

        if (eventDate < currentDate) {
            realizadasContainer.appendChild(initiativeElement);
        } else if (eventDate.toDateString() === currentDate.toDateString()) {
            aDecorrerContainer.appendChild(initiativeElement);
        } else {
            aRealizarContainer.appendChild(initiativeElement);
        }
    });
}

function createInitiativeElement(initiative, isFuture) {
    const container = document.createElement('div');
    container.className = 'event-button'; // Assuming this class aligns with the intended style

    const formattedDate = new Date(initiative.data).toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: 'short' });
    const initiativeUrl = `Gerir-Iniciativa-Individual.html?id=${initiative.id}`;

    // Calculate materials risk value
    let totalNeeded = 0, totalInPossession = 0;
    initiative.materiais.forEach(material => {
        const neededQty = parseFloat(material.neededqtd) || 0; // Convert to float, default to 0 if NaN
        const inPossession = parseFloat(material.emPosse) || 0; // Convert to float, default to 0 if NaN
        totalNeeded += neededQty;
        totalInPossession += inPossession;
    });

    let riscoValue = 0; // Default risk value when no materials are needed
    if (totalNeeded > 0) {
        riscoValue = 10 - ((totalInPossession / totalNeeded) * 9); // Scale 1 to 10
        riscoValue = Math.max(riscoValue, 1); // Ensure minimum risk is 1 when there are needed materials
        riscoValue = Math.round(riscoValue / 2); // Divide by 2 to scale down to 1-5 and round to nearest whole number
    }

    container.innerHTML = `
    <a href="${initiativeUrl}">
        <div class="event-container">
            <img src="${initiative.imagem}" alt="Event Image" class="event-image" />
            <div class="event-date">${formattedDate}</div>
            <div class="event-location">${initiative.localidade}</div>
            <h3 class="event-Titel">${initiative.titulo}</h3>
            <p class="descriçãoiniciativas">${initiative.descricao}</p>
        </div>
    </a>
    <div class="row">
        <div class="event-inscricoes">
            <span class="numero-evento-inscricoes">${initiative.participantes.length}</span>
            <span class="texto-evento">Inscrições</span>
        </div>
        <div class="event-angariacoes">
            <span class="numero-evento-euros">${initiative.doacoes} €</span>
            <span class="texto-evento">Angariados</span>
        </div>
        ${isFuture ? `<div class="event-risco"><span class="numero-evento-risco">${riscoValue} </span><span class="texto-evento">Risco</span></div>` : ''}
    </div>
`;

    return container;
}

function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'login.html'
    window.location.href = "../../front/dist/index.html";
}