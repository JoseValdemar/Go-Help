  document.addEventListener('DOMContentLoaded', () => {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    const professionals = JSON.parse(localStorage.getItem('profissionais')) || [];
    const gestores = JSON.parse(localStorage.getItem('gestores')) || [];
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    barPerc(initiatives);
    topCards(donations, initiatives, professionals, gestores, pedidos);
  });
  
  function barPerc(initiatives) {
    const bars = document.getElementById('barPercentage');
  
    // Define the types and initialize counts to zero for each type
    const types = ['Corrida/Maratona', 'Aulas', 'Jogos de Futebol', 'Workshop', 'Outro'];
    const typeCounts = {};
    types.forEach(type => typeCounts[type] = 0);
  
    // Get today's date and the date one month ago
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
  
    // Filter initiatives based on date
    const filteredInitiatives = initiatives.filter(initiative => {
      const initiativeDate = new Date(initiative.data);
      return initiativeDate >= lastMonth && initiativeDate <= today;
    });
  
    // Count each initiative by its type
    filteredInitiatives.forEach(initiative => {
        if (typeCounts.hasOwnProperty(initiative.type)) {
            typeCounts[initiative.type]++;
        }
    });
  
    const totalFilteredInitiatives = filteredInitiatives.length;
  
    // Function to calculate percentage
    function calculatePercentage(count, total) {
        return total > 0 ? (count / total * 100).toFixed(2) : 0;
    }
  
    // Calculate percentages
    const typePercentages = {};
    types.forEach(type => {
        typePercentages[type] = calculatePercentage(typeCounts[type], totalFilteredInitiatives);
    });
  
    // Sort the initiative types by percentage in descending order
    const sortedTypePercentages = Object.entries(typePercentages).sort(([, a], [, b]) => b - a);
  
    // Call your function to create the initiative elements or update the UI
    createBarElement(sortedTypePercentages);
  
    // Function to create the initiative elements
    function createBarElement(sortedTypePercentages) {
        const container = document.createElement('div');
        container.className = 'card shadow mb-4'; // Assuming this class aligns with the intended style
  
        container.innerHTML = `
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Iniciativas - Tipo (no último mês)</h6>
            </div>
            <div class="card-body">
                ${sortedTypePercentages.map(([type, percentage]) => {
                    const colorClass = {
                        'Corrida/Maratona': 'bg-primary',
                        'Aulas': 'bg-success',
                        'Jogos de Futebol': 'bg-info',
                        'Workshop': 'bg-warning',
                        'Outro': 'bg-danger'
                    }[type] || 'bg-secondary';
  
                    return `
                        <h4 class="small font-weight-bold">${type} <span class="float-right">${percentage}%</span></h4>
                        <div class="progress mb-4">
                            <div class="progress-bar ${colorClass}" role="progressbar" style="width: ${percentage}%"></div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        bars.appendChild(container);
    }
  }

function topCards(donations, initiatives, professionals, gestores, pedidos) {
    //card donations
    const totalSum = donations.reduce((sum, donation) => sum + donation.montante, 0);
    const formattedTotalSum = totalSum.toFixed(2);
    const formattedTotalSum2 = new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(formattedTotalSum);

    //card initiatives
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const todaysInitiatives = initiatives.filter(initiative => {
        const initiativeDate = initiative.data; // Garantee its in the same format
        return initiativeDate === todayString;
    });

    const todaysInitiativesCount = todaysInitiatives.length;

    //card professionals
    const professionalsCount = professionals.length;
    const gestorCount = gestores.length;
    const totalProfessionals = professionalsCount+gestorCount
    //card pedidos
    const pendentePedidos = pedidos.filter(pedido => pedido.estado === "pendente");
    const pendenteCount = pendentePedidos.length;

    //escrever html
    const topCards = document.getElementById('topCards');

    topCards.innerHTML = `
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1"  style="margin-top: -15px;">
                            Doações</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"  style="margin-top: 15px;">${formattedTotalSum2}€</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-euro-sign fa-2x text-gray-300"  style="margin-top: 15px;"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--  Iniciativas a decorre Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1"  style="margin-top: -15px;">
                        Iniciativas a decorrer</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 15px;">${todaysInitiativesCount}</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"  style="margin-top: 15px;"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Profissionais no Terreno Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1"  style="margin-top: -15px;">
                            Profissionais</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 15px;">${totalProfessionals}</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-people-carry fa-2x text-gray-300"  style="margin-top: 15px;"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pedidos Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1"  style="margin-top: -15px;">
                        Pedidos</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800"  style="margin-top: 15px;">${pendenteCount}</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-comments fa-2x text-gray-300" style="margin-top: 15px;"></i>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    bottomCards(todaysInitiatives, todaysInitiativesCount);
}

function bottomCards(todaysInitiatives, todaysInitiativesCount) {
    //donations
    const totalSum = todaysInitiatives.reduce((total, todaysInitiatives) => total + todaysInitiatives.doacoes, 0);
    const formattedTotalSum3 = totalSum.toFixed(2);
    const formattedTotalSum4 = new Intl.NumberFormat('en-US').format(formattedTotalSum3);

    //professionals on work
    const workProfessioanls = todaysInitiatives.reduce((total, todaysInitiatives) => total + todaysInitiatives.profissionais,length, 0);

    //participants
    const totalParticipants = todaysInitiatives.reduce((total, todaysInitiatives) => total + todaysInitiatives.participantes, 0);

    //escrever html
    const topCards = document.getElementById('bottomCards');

    topCards.innerHTML = `
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card2 border-left-primary shadow h-100 py-3" style="margin-top: 15px;">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="margin-top: -15px;">
                            Iniciativas a decorrer</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 20px;">${todaysInitiativesCount}</div>
                        </div>
                        <div class="col-auto">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Doaçoes Card Example -->
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card2 border-left-success shadow h-100 py-3"  style="margin-top: 15px;">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1" style="margin-top: -15px;">
                                Doações</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 20px;">${formattedTotalSum4}€</div>
                        </div>
                        <div class="col-auto">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Funcionarios Card Example-->
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card2 border-left-info shadow h-100 py-3"  style="margin-top: 15px;">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1" style="margin-top: -15px;">
                                Funcionários em Ação</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 20px;"">${workProfessioanls}</div>
                        </div>
                        <div class="col-auto">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dsitritos Card Example -->
        <div class="col-xl-6 col-md-6 mb-4">
            <div class="card2 border-left-warning shadow h-100 py-3"  style="margin-top: 15px;">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1" style="margin-top: -15px;">
                                Participantes</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 20px;">${totalParticipants}</div>
                        </div>
                        <div class="col-auto">
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