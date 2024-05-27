document.addEventListener('DOMContentLoaded', () => {
    const userProfileDropdown = document.getElementById('userProfileDropdown');
    const loginLink = document.getElementById('loginLink');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userProfileDropdown.classList.remove('d-none');

        if (loggedInUser.name && loggedInUser.role) {
            const displayName = `${loggedInUser.name} (${loggedInUser.role})`;
            document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
            displayRequests();
            displayOpenRequestsCount();
        }
    } else {
        loginLink.classList.remove('d-none');
        // Redirect to 'index.html' if loggedInUser does not exist
       
    }
});

function displayRequests(page = 1) {
    const itemsPerPage = 5;
    const rawPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedidos = rawPedidos.slice().reverse();

    // Filter only "pendente" requests
    const filteredPedidos = pedidos.filter(pedido => pedido.estado === 'pendente');

    const listGroup = document.querySelector('.list-group');

    // Calculate pagination
    const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Clear existing content
    listGroup.innerHTML = '';

    filteredPedidos.slice(start, end).forEach(pedido => {
        const requestElement = createRequestElement(pedido);
        listGroup.appendChild(requestElement);
    });

    updatePagination(totalPages, page);
}

function createRequestElement(pedido) {
    const listItem = document.createElement('div');
    listItem.className = 'list-group-item list-group-item-action flex-column align-items-start mb-2';
    listItem.setAttribute('data-id', pedido.id);

    listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${pedido.titulo}</h5>
            <small class="text-muted">
                <a href="#" class="details-link2" data-toggle="modal" onclick="showDetails(${pedido.id})">Mais Detalhes</a>
            </small>
        </div>
        <p class="mb-2"></p>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-success" onclick="approveRequest(${pedido.id})">Aprovar</button>
        </div>
        <div class="btn-group" role="group">    
            <button type="button" class="btn btn-danger" onclick="rejectRequest(${pedido.id})">Rejeitar</button>
        </div>
    `;

    return listItem;
}

function showDetails(id) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(item => item.id === id);

    if (!pedido) return;

    const modalBody = document.querySelector('#detailsModal .modal-body');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Título:</strong> ${pedido.titulo}</p>
                <p><strong>Descrição:</strong> ${pedido.descricao}</p>
                <p><strong>Tipo:</strong> ${pedido.type}</p>
                <p><strong>Morada:</strong> ${pedido.localidade}</p>
                <p><strong>Região:</strong> ${pedido.region}</p>
                <p><strong>Data:</strong> ${pedido.data}</p>
                <p><strong>Hora Início:</strong> ${pedido.horaInicio}</p>
                <p><strong>Hora Fim:</strong> ${pedido.horaFim}</p>
                <p><strong>Email:</strong> ${pedido.email}</p>
            </div>
            <div class="col-md-6">
                <img src="${pedido.imagem}" class="img-fluid" alt="Evento">
            </div>
        </div>
    `;

    $('#detailsModal').modal('show');
}

function approveRequest(id) {
    window.location.href = `criar-iniciativa.html?id=${id}`;
}

function rejectRequest(id) {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const index = pedidos.findIndex(item => item.id === id);

    if (index !== -1) {
        pedidos[index].estado = 'recusado'; // Set status to "rejeitado"
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        displayRequests(); // Refresh the requests display
        displayOpenRequestsCount(); // Update the count of open requests
    }
}

function updatePagination(totalPages, currentPage) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    // Add "Previous" button
    const prevItem = document.createElement('li');
    prevItem.className = 'page-item';
    prevItem.innerHTML = `<a class="page-link page-link-previous" href="#">Previous</a>`;
    prevItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) displayRequests(currentPage - 1);
    });
    pagination.appendChild(prevItem);

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (i === currentPage ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            displayRequests(i);
        });
        pagination.appendChild(pageItem);
    }

    // Add "Next" button
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item';
    nextItem.innerHTML = `<a class="page-link page-link-next" href="#">Next</a>`;
    nextItem.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) displayRequests(currentPage + 1);
    });
    pagination.appendChild(nextItem);
}


function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'login.html'
    window.location.href = "../../front/dist/index.html";
}