document.addEventListener('DOMContentLoaded', function() {
    loadPedidos(); // Certifique-se de que esta chamada está aqui
    ensureAdminExists();
    preloadProfiles();
    preloadInitiatives();
    preloadDonations();
    preloadPedidos();
    preloadGestores();
    

    // Defina a aba inicial ativa e exiba seus conteúdos
    changeTab('em_espera', document.querySelector('.tab-button[data-tab="em_espera"]'));
});

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const email = loggedInUser ? loggedInUser.email : '';

function loadPedidos() {
    if (!localStorage.getItem('pedidos')) {
        localStorage.setItem('pedidos', JSON.stringify(predefinedPedidos));
    }

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const email = loggedInUser ? loggedInUser.email : '';
    const containerTodosPedidos = document.getElementById('eventosTodosPedidos');
    const containerRecusadas = document.getElementById('eventosRecusadas');
    const containerEmEspera = document.getElementById('eventosEmEspera');
    const containerAceites = document.getElementById('eventosAceites');

    // Limpa conteúdo anterior
    containerRecusadas.innerHTML = '';
    containerEmEspera.innerHTML = '';
    containerAceites.innerHTML = '';
    containerTodosPedidos.innerHTML = '';

    const pedidosUser = pedidos.filter(pedido => pedido.email === email);

    // Verifica se há pedidos para o usuário em qualquer estado
    if (pedidosUser.length === 0) {
        const message = document.createElement('div');
        message.className = 'Mensagem-pedidos';
        message.textContent = 'Ainda sem pedidos';
    
        // Adiciona a mensagem de "Ainda sem pedidos" apenas na aba geral quando não houver pedidos
        document.getElementById('todosPedidos').style.display = 'block'; // Garante que a aba geral esteja visível
        document.getElementById('eventosTodosPedidos').appendChild(message);
    
        // Assegura que as outras abas estão visíveis e acessíveis, mas sem pedidos listados
        ['eventosRecusadas', 'eventosEmEspera', 'eventosAceites'].forEach(id => {
            if(document.getElementById(id).children.length === 0) {
                const emptyMessage = message.cloneNode(true);
                document.getElementById(id).appendChild(emptyMessage);
            }
        });
    } else {
        pedidosUser.forEach(pedido => {
            const pedidoElement = createPedidoElement(pedido);
            containerTodosPedidos.appendChild(pedidoElement.cloneNode(true));
            if (pedido.estado === "recusado") {
                containerRecusadas.appendChild(pedidoElement.cloneNode(true));
            } else if (pedido.estado === "pendente") {
                containerEmEspera.appendChild(pedidoElement.cloneNode(true));
            } else if (pedido.estado === "aceite") {
                containerAceites.appendChild(pedidoElement.cloneNode(true));
            }
        });
    }
}

function createPedidoElement(pedido) {
    const element = document.createElement('div');
    element.className = 'pedido';
    element.innerHTML = `
        <h3 style="margin-bottom: 0;">${pedido.titulo}</h3>
        <div class="pedido-estado ${pedido.estado}">${pedido.estado}</div>`;  // Classe adicional baseada no estado
    return element;
}

function changeTab(tabId, element) {
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.content-section-pedidos').forEach(section => {
        section.style.display = 'none'; // Esconde todas as seções
    });
    document.getElementById(tabId).style.display = 'block'; // Mostra apenas a seção da aba ativa
}

function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'index.html'
    window.location.href = 'index.html';
}