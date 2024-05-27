document.addEventListener('DOMContentLoaded', () => {
    // Filter the initiatives by user
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    topCards(pedidos);
  });
  
function topCards(pedidos) {

    //cards
    let pendenteCount = 0;
    let recusadoCount = 0;
    let aceiteCount = 0;
    
    // Count the number of each estado
    pedidos.forEach(pedido => {
        if (pedido.estado === "pendente") {
            pendenteCount++;
        } else if (pedido.estado === "recusado") {
            recusadoCount++;
        } else if (pedido.estado === "aceite") {
            aceiteCount++;
        }
    });


    //escrever html
    const topCards = document.getElementById('topCards');

    topCards.innerHTML = `
    <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1"  style="margin-top: -15px;">
                        Pedidos em Aberto</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"  style="margin-top: 15px;">${pendenteCount}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  Iniciativas a decorre Card Example -->
    <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1"  style="margin-top: -15px;">
                            Pedidos Aceites </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 15px;">${aceiteCount}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Profissionais no Terreno Card Example -->
    <div class="col-xl-4 col-md-6 mb-4">
        <div class="card border-left-danger shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-danger text-uppercase mb-1"  style="margin-top: -15px;">
                            Pedidos Rejeitados</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 15px;">${recusadoCount}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
    `;
}


function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'login.html'
    window.location.href = "../../front/dist/index.html";
}