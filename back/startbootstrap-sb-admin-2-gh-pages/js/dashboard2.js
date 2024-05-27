document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loggedInUserEmail = loggedInUser.email;
    
    // Filter the initiatives by user
    const rawInitiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const initiatives = rawInitiatives.filter(initiative => initiative.gestor === loggedInUserEmail);

    const professionals = JSON.parse(localStorage.getItem('profissionais')) || [];
    const gestores = JSON.parse(localStorage.getItem('gestores')) || [];
    
    topCards(initiatives, professionals, gestores);
  });
  
function topCards(initiatives, professionals, gestores) {

    //card initiatives
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const todaysInitiatives = initiatives.filter(initiative => {
        const initiativeDate = initiative.data; // Garantee its in the same format
        return initiativeDate === todayString;
    });

    const todaysInitiativesCount = todaysInitiatives.length;

    //card initiatives next 30 days
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);

    // Count the initiatives within the next 30 days
    const initiativesNext30DaysCount = initiatives.filter(initiative => {
        const initiativeDate = new Date(initiative.data);
        return initiativeDate >= today && initiativeDate <= thirtyDaysLater;
}).length;

    //card professionals
    const totalProfessionals = todaysInitiatives.reduce((count, initiative) => {
        return count + (initiative.profissionais ? initiative.profissionais.length : 0);
    }, 0);
    //card participantes
    const totalParticipantes = todaysInitiatives.reduce((count, initiative) => {
        return count + (initiative.participantes ? initiative.participantes.length : 0);
    }, 0);
    //escrever html
    const topCards = document.getElementById('topCards');

    topCards.innerHTML = `
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1"  style="margin-top: -15px;">
                        Iniciativas a decorrer</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800"  style="margin-top: 15px;">${todaysInitiativesCount}</div>
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
                            Participantes Esperados </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 15px;">${totalParticipantes}</div>
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
                            Profissionais Alocados</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800" style="margin-top: 15px;">${totalProfessionals}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Participantes Card Example -->
    <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-warning shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1"  style="margin-top: -15px;">
                    Iniciativas no próximo mês</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800"  style="margin-top: 15px;">${initiativesNext30DaysCount}</div>
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
            <div class="card2 border-left-primary shadow h-100 py-3">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1" style="margin-top: -15px;">
                                Ações a decorrer</div>
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
            <div class="card2 border-left-success shadow h-100 py-3">
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
            <div class="card2 border-left-info shadow h-100 py-3">
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
            <div class="card2 border-left-warning shadow h-100 py-3">
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