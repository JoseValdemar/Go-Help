document.addEventListener('DOMContentLoaded', () => {
    ensureAdminExists(); // Check and add admin on page load
    preloadProfiles();
    preloadInitiatives();
    preloadDonations();
    preloadPedidos();
    preloadGestores();
    preloadUsers();
    preloadFrontUsers();


    const loginButton = document.querySelector('.btn-user.btn-block');
    if (loginButton) {
        loginButton.addEventListener("click", function(event) {
            event.preventDefault();

            const email = document.getElementById("exampleInputEmail").value.trim();
            const password = document.getElementById("exampleInputPassword").value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                const fullName = user.firstName + ' ' + user.lastName;
                localStorage.setItem('loggedInUser', JSON.stringify({ name: fullName, email: user.email, role: user.profession }));

                // Redirect based on user type
                const redirectPage = user.isAdmin ? 'index.html' : 'dashboardTerreno.html';
                window.location.href = redirectPage;
            } else {
                // Optionally handle login failure case here
            }
        });
    } else {
        console.log("Login button not found.");
    }
});

function ensureAdminExists() {
    const defaultAdmin = {
        firstName: "Admin",
        lastName: "",
        email: "admin@gmail.com",
        password: "adminpass", 
        profession: "Admin",
        isAdmin: true
    };

    const users = JSON.parse(localStorage.getItem('Users')) || [];

    if (!users.some(user => user.email === defaultAdmin.email && user.isAdmin)) {
        users.push(defaultAdmin);
        localStorage.setItem('Users', JSON.stringify(users));
        console.log("Admin named 'Admin' added to local storage.");
    } else {
        console.log("Admin named 'Admin' already exists in local storage.");
    }
}

function preloadProfiles() {
    // Predefined professional profiles
    const predefinedProfiles = [
        { name: "Jane Smith", email: "jane.smith@example.com", phone: "0987654321", region: "Lisboa", profession: "Advogado" },
        { name: "Alice Johnson", email: "alice.johnson@example.com", phone: "1122334455", region: "Lisboa", profession: "Gestor_de_Seguros" },
        { name: "João Sousa", email: "joao.souza@example.com", phone: "1987654321", region: "Norte", profession: "Advogado" },
        { name: "Ana Luisa", email: "ana.luisa@example.com", phone: "2122334455", region: "Norte", profession: "Gestor_de_Seguros" },
        { name: "Pedro Cunha", email: "pedro.cunha@example.com", phone: "1987654321", region: "Algarve", profession: "Advogado" },
        { name: "Joana Marques", email: "joana.marques@example.com", phone: "2122334455", region: "Algarve", profession: "Gestor_de_Seguros" },
        { name: "Bruno Brown", email: "bruno.brown@example.com", phone: "5544332211", region: "Lisboa", profession: "Ajudante" },
        { name: "Pedro Alves", email: "pedro.alves@example.com", phone: "2234567890", region: "Alentejo", profession: "Ajudante" },
        { name: "Rosa Silva", email: "rosa.silva@example.com", phone: "3234567890", region: "Norte", profession: "Ajudante" },
        { name: "Tiago Carlos", email: "tiago.carlos@example.com", phone: "4234567890", region: "Centro", profession: "Ajudante" },
        { name: "Pedro Cunha", email: "pedro.cunha@example.com", phone: "4234567890", region: "Algarve", profession: "Ajudante" },
    ];

    // Check if profiles already exist in local storage
    if (!localStorage.getItem('profissionais')) {
        // Store predefined profiles in local storage
        localStorage.setItem('profissionais', JSON.stringify(predefinedProfiles));
        console.log("Professional profiles preloaded into local storage.");
    } else {
        console.log("Professional profiles already exist in local storage.");
    }
}

function preloadGestores() {
    // Predefined professional profiles
    const predefinedGestor = [
        {firstName: "Souges",  lastName: "Thor",  email: "s.thor@example.com",  password: "gestorpass", profession: "Gestor", isAdmin: false}
    ];
    
    // Check if profiles already exist in local storage
    if (!localStorage.getItem('gestores')) {
        // Store predefined profiles in local storage
        localStorage.setItem('gestores', JSON.stringify(predefinedGestor));
        console.log("Gestor profiles preloaded into local storage.");
    } else {
        console.log("Gestor profiles already exist in local storage.");
    }
    
}

function preloadInitiatives() {
    // Predefined initiatives
    const predefinedInitiatives = [
        { id: 1, titulo: "Caminhada do Adepto", type: "Corrida/Maratona", localidade: "Parque da Cidade", region: "Norte", data: "2023-06-01", horaInicio: "08:00", horaFim: "10:00", descricao: "Corrida da Festa da Taça da Liga.", imagem: "../../assets/allianz.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 500.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 2, titulo: "Aula de Natação", type: "Aulas", localidade: "Piscina Municipal", region: "Centro", data: "2023-06-05", horaInicio: "09:00", horaFim: "11:00", descricao: "Aula de natação para todas as idades.", imagem: "../../assets/natacao.webp", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 150.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 3, titulo: "Torneio de Ténis", type: "Outro", localidade: "Quadra Central", region: "Algarve", data: "2023-06-12", horaInicio: "10:00", horaFim: "14:00", descricao: "Torneio de tênis aberto ao público.", imagem: "../../assets/tenis.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 200.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 4, titulo: "Palestra de Nutrição", type: "Outro", localidade: "Auditório Central", region: "Lisboa", data: "2023-06-18", horaInicio: "15:00", horaFim: "17:00", descricao: "Palestra sobre nutrição e bem-estar.", imagem: "../../assets/nutricao.jpeg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 300.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 5, titulo: "Corrida do Bem", type: "Corrida/Maratona", localidade: "Centro Esportivo", region: "Alentejo", data: "2023-06-25", horaInicio: "07:00", horaFim: "10:00", descricao: "Corrida beneficente para toda a família.", imagem: "../../assets/maratona1.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 1000.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 6, titulo: "Maratona Solidária", type: "Corrida/Maratona", localidade: "Centro da Cidade - Porto", region: "Norte", data: "2023-07-01", horaInicio: "09:00", horaFim: "12:00", descricao: "Maratona beneficente para a caridade.", imagem: "../../assets/maratona2.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 800.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 7, titulo: "Passeio Ciclístico", type: "Outro", localidade: "Centro Esportivo", region: "Centro", data: "2023-07-05", horaInicio: "08:00", horaFim: "11:00", descricao: "Passeio ciclístico para promover a saúde.", imagem: "../../assets/ciclismo.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 300.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 8, titulo: "Torneio de Futebol", type: "Jogos de Futebol", localidade: "Estádio Municipal", region: "Lisboa", data: "2023-07-12", horaInicio: "14:00", horaFim: "17:00", descricao: "Torneio de futebol beneficente.", imagem: "../../assets/futebol1.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 100.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 9, titulo: "Aula de Dança", type: "Aulas", localidade: "Estúdio de Dança", region: "Alentejo", data: "2023-07-18", horaInicio: "09:00", horaFim: "11:00", descricao: "Aula de dança contemporânea para todas as idades.", imagem: "../../assets/danca.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 50.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 10, titulo: "Corrida Pela Vida", type: "Corrida/Maratona", localidade: "Centro da Cidade - Coimbra", region: "Algarve", data: "2023-08-05", horaInicio: "09:00", horaFim: "11:00", descricao: "Corrida para arrecadar fundos para o combate ao câncer.", imagem: "../../assets/maratona3.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 600.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 11, titulo: "Aula de Zumba", type: "Aulas", localidade: "Parque das Águas", region: "Norte", data: "2023-08-15", horaInicio: "08:00", horaFim: "10:00", descricao: "Aula de zumba ao ar livre para promover a saúde e o bem-estar.", imagem: "../../assets/zumba.webp", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 50.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 12, titulo: "Jogo Beneficente de Vôlei", type: "Outro", localidade: "Ginásio Poliesportivo", region: "Centro", data: "2023-09-01", horaInicio: "14:00", horaFim: "16:00", descricao: "Jogo beneficente para arrecadar fundos para o combate ao câncer.", imagem: "../../assets/volei.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 200.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 13, titulo: "Aula de Tai Chi", type: "Aulas", localidade: "Parque das Águas", region: "Lisboa", data: "2023-09-12", horaInicio: "07:00", horaFim: "09:00", descricao: "Aula de Tai Chi ao ar livre para promover a saúde e o bem-estar.", imagem: "../../assets/taichi.webp", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 30.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 14, titulo: "Corrida Azul", type: "Corrida/Maratona", localidade: "Centro da Cidade - Braga", region: "Alentejo", data: "2023-11-05", horaInicio: "09:00", horaFim: "11:00", descricao: "Corrida para promover a conscientização sobre o câncer de próstata.", imagem: "../../assets/maratona1.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 700.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 15, titulo: "Torneio de Natação", type: "Outro", localidade: "Piscina Municipal", region: "Algarve", data: "2023-11-12", horaInicio: "10:00", horaFim: "14:00", descricao: "Torneio de natação beneficente para ajudar crianças necessitadas.", imagem: "../../assets/natacao.webp", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 200.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 16, titulo: "Workshop de Primeiros Socorros", type: "Workshop", localidade: "Centro Cultural", region: "Norte", data: "2023-11-25", horaInicio: "15:00", horaFim: "17:00", descricao: "Workshop sobre técnicas de primeiros socorros.", imagem: "../../assets/socorros.jpeg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 300.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 17, titulo: "Corrida Solidária", type: "Corrida/Maratona", localidade: "Centro Esportivo", region: "Centro", data: "2023-12-01", horaInicio: "09:00", horaFim: "11:00", descricao: "Corrida para promover a saúde e o bem-estar.", imagem: "../../assets/maratona2.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 400.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 18, titulo: "Aula de Yoga Natalina", type: "Aulas", localidade: "Parque das Águas", region: "Lisboa", data: "2023-12-12", horaInicio: "08:00", horaFim: "10:00", descricao: "Sessão de yoga natalina ao ar livre.", imagem: "../../assets/yoga.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 150.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 19, titulo: "Palestra de Saúde e Bem-Estar", type: "Outro", localidade: "Auditório Central", region: "Alentejo", data: "2023-12-25", horaInicio: "15:00", horaFim: "17:00", descricao: "Palestra sobre saúde e bem-estar geral.", imagem: "../../assets/saude.webp", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 300.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 20, titulo: "Corrida de Ano Novo", type: "Corrida/Maratona", localidade: "Centro da Cidade - Porto", region: "Algarve", data: "2024-01-05", horaInicio: "09:00", horaFim: "11:00", descricao: "Corrida para celebrar o Ano Novo.", imagem: "../../assets/maratona3.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 600.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 21, titulo: "Corrida do Amor", type: "Corrida/Maratona", localidade: "Centro da Cidade - Lisboa", region: "Norte", data: "2024-02-14", horaInicio: "09:00", horaFim: "11:00", descricao: "Corrida para promover o amor e a saúde no Dia dos Namorados.", imagem: "../../assets/maratona1.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 500.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 22, titulo: "Torneio de Handebol para ajudar crianças necessitadas.", type: "Outro", localidade: "Ginásio Poliesportivo", region: "Centro", data: "2024-02-20", horaInicio: "14:00", horaFim: "16:00", descricao: "Torneio beneficente de handebol.", imagem: "../../assets/handebol.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 200.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 23, titulo: "Workshop de Alimentação", type: "Workshop", localidade: "Centro Cultural", region: "Alentejo", data: "2024-03-15", horaInicio: "10:00", horaFim: "12:00", descricao: "Workshop sobre técnicas de alimentação saudável.", imagem: "../../assets/nutricao.jpeg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 300.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 24, titulo: "Corrida de Primavera", type: "Corrida/Maratona", localidade: "Centro da Cidade - Coimbra", region: "Algarve", data: "2024-03-20", horaInicio: "09:00", horaFim: "11:00", descricao: "Corrida para celebrar a chegada da primavera.", imagem: "../../assets/maratona2.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 600.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 25, titulo: "Corrida da Cidade", type: "Corrida/Maratona", localidade: "Centro da Cidade - Braga", region: "Norte", data: "2024-04-10", horaInicio: "09:00", horaFim: "11:00", descricao: "Uma maratona urbana para todos os níveis de corredores.", imagem: "../../assets/maratona3.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 535.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 26, titulo: "Aulas de Yoga", type: "Aulas", localidade: "Parque das Águas", region: "Centro", data: "2024-04-12", horaInicio: "08:00", horaFim: "10:00", descricao: "Sessão de yoga ao ar livre para promover a saúde e o bem-estar.", imagem: "../../assets/yoga.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 245.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 27, titulo: "Jogo de Futebol Beneficente", type: "Jogos de Futebol", localidade: "Estádio Municipal", region: "Lisboa", data: "2024-04-15", horaInicio: "15:00", horaFim: "17:00", descricao: "Jogo de futebol para arrecadar fundos para a caridade local.", imagem: "../../assets/futebol2.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 245.42, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 28, titulo: "Aula de Pilates", type: "Aulas", localidade: "Parque da Avenida", region: "Algarve", data: "2024-04-24", horaInicio: "15:00", horaFim: "17:00", descricao: "Sessão de pilates ao ar livre para promover a saúde e o bem-estar.", imagem: "../../assets/pilates.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com", "pedrocas@gmail.com"], doacoes: 45.00, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 1000 },
        { id: 29, titulo: "Maratona de Bicicleta Ecológica", type: "Corrida/Maratona", localidade: "Parque Nacional", region: "Norte", data: "2024-05-13", horaInicio: "07:00", horaFim: "10:00", descricao: "Maratona de bicicleta com foco em sustentabilidade e saúde.", imagem: "../../assets/ciclismo.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 80 },
        { id: 30, titulo: "Festival de Saúde Mental", type: "Outro", localidade: "Centro Comunitário", region: "Centro", data: "2024-05-19", horaInicio: "10:00", horaFim: "16:00", descricao: "Eventos e workshops sobre saúde mental e bem-estar emocional.", imagem: "../../assets/saude_mental.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 88 },
        { id: 31, titulo: "Skate4Cancer", type: "Outro", localidade: "Pista de Skate", region: "Algarve", data: "2024-05-22", horaInicio: "09:00", horaFim: "13:00", descricao: "Competição de skate para todas as idades.", imagem: "../../assets/skate.jpeg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 100 },
        { id: 32, titulo: "Workshop de Culinária Saudável", type: "Workshop", localidade: "Escola de Culinária", region: "Lisboa", data: "2024-05-25", horaInicio: "14:00", horaFim: "17:00", descricao: "Aprenda a preparar refeições saudáveis e nutritivas.", imagem: "../../assets/culinaria.webp", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 100 },
        { id: 33, titulo: "Caminhada Fotográfica", type: "Corrida/Maratona", localidade: "Parque das Artes", region: "Alentejo", data: "2024-05-29", horaInicio: "12:00", horaFim: "18:00", descricao: "Caminhada pela natureza com foco em fotografia de paisagem.", imagem: "../../assets/fotografia.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 26, materiais: [], profissionais: ["pedro.alves@example.com", "ana.luisa@example.com"], gestor: "s.thor@example.com", participantesmax: 100 },
        { id: 34, titulo: "Feira de Saúde e Bem-Estar", type: "Outro", localidade: "Praça Central", region: "Centro", data: "2024-05-29", horaInicio: "08:00", horaFim: "18:00", descricao: "Feira com exposições, atividades e palestras sobre saúde e bem-estar.", imagem: "../../assets/bem-estar.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 123.50, materiais: [], profissionais: ["pedro.alves@example.com", "ana.luisa@example.com"], gestor: "s.thor@example.com", participantesmax: 100 },
        { id: 35, titulo: "Corrida do Mosteiro", type: "Corrida/Maratona", localidade: "Mire de Tibães, Braga", region: "Norte", data: "2024-06-12", horaInicio: "15:00", horaFim: "19:00", descricao: "Junte-se a nós numa corrida noturna pelas históricas ruas de Mire de Tibães, iluminando caminhos com esperança e união pela caridade.", imagem: "../../assets/1.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 500 },
        { id: 36, titulo: "Corrida do Adepto", type: "Corrida/Maratona", localidade: "Estádio Dr. Magalhães Pessoa, Leiria", region: "Centro", data: "2024-06-15", horaInicio: "10:00", horaFim: "14:00", descricao: "Vista as cores da sua equipe e venha fazer parte deste evento energizante, unindo os fãs de futebol numa corrida de pura paixão pelas ruas de Leiria.", imagem: "../../assets/2.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 350 },
        { id: 37, titulo: "Corrida Social de Campolide", type: "Corrida/Maratona", localidade: "Campolide, Lisboa", region: "Lisboa", data: "2024-07-22", horaInicio: "09:00", horaFim: "13:00", descricao: "Participe de uma emocionante corrida pelas pitorescas ruas de Campolide. Cada passo dado contribui para apoiar projetos locais de inclusão social.", imagem: "../../assets/3.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 100 },
        { id: 38, titulo: "Jogo Solidário", type: "Jogos de Futebol", localidade: "Estádio Municipal de Braga", region: "Norte", data: "2024-06-11", horaInicio: "16:00", horaFim: "18:00", descricao: "Participe no nosso jogo solidário de futebol e junte-se a nós numa tarde emocionante de desporto e solidariedade.", imagem: "../../assets/4.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 100 },
        { id: 39, titulo: "Aula Solidária de Zumba", type: "Aulas", localidade: "São João de Areias, Viseu", region: "Alentejo", data: "2024-07-27", horaInicio: "18:00", horaFim: "20:00", descricao: "Descubra a alegria e a energia na nossa aula de Zumba, uma explosão de ritmo e movimento que transforma o seu treino numa festa.", imagem: "../../assets/5.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 50 },
        { id: 40, titulo: "Aula Solidária de Yoga", type: "Aulas", localidade: "Complexo Desportivo da Rodovia, Braga", region: "Lisboa", data: "2024-07-22", horaInicio: "07:00", horaFim: "09:00", descricao: "Descubra a paz interior e a flexibilidade na nossa aula de yoga, uma prática rejuvenescedora ao ar livre, ideal para alinhar corpo, mente e espírito.", imagem: "../../assets/6.jpg", participantes: ["jorge@hotmail.com", "joana@gmail.com"], doacoes: 0, materiais: [], profissionais: [], gestor: "s.thor@example.com", participantesmax: 100 }
    ];

    // Check if initiatives already exist in local storage
    if (!localStorage.getItem('initiatives')) {
        // Store predefined initiatives in local storage
        localStorage.setItem('initiatives', JSON.stringify(predefinedInitiatives));
        console.log("Initiatives preloaded into local storage.");
    } else {
        console.log("Initiatives already exist in local storage.");
    }
}

function preloadDonations() {
    // Predefined donations
    const predefinedDonations = [
        //online donations
        { data:"2024-05-01", montante:38030.5 ,type: "Online" },
        { data:"2024-04-25", montante:24000 ,type: "Online" },
        { data:"2024-03-25", montante:14500 ,type: "Online" },
        { data:"2024-02-25", montante:12554 ,type: "Online" },
        { data:"2024-01-25", montante:14040.5 ,type: "Online" },
        { data:"2023-12-25", montante:29050 ,type: "Online" },
        { data:"2023-11-25", montante:9345 ,type: "Online" },
        { data:"2023-10-25", montante:9775 ,type: "Online" },
        { data:"2023-09-25", montante:11040 ,type: "Online" },
        { data:"2023-08-25", montante:22495 ,type: "Online" },
        { data:"2023-07-25", montante:36050 ,type: "Online" },
        { data:"2023-06-25", montante:40775 ,type: "Online" },
        //field donations
        { data:"2024-05-01", montante:3800 ,type: "Field" },
        { data:"2024-04-25", montante:2403.5 ,type: "Field" },
        { data:"2024-03-25", montante:1400 ,type: "Field" },
        { data:"2024-02-25", montante:1254 ,type: "Field" },
        { data:"2024-01-25", montante:1440 ,type: "Field" },
        { data:"2023-12-25", montante:2950 ,type: "Field" },
        { data:"2023-11-25", montante:935.2 ,type: "Field" },
        { data:"2023-10-25", montante:975.5 ,type: "Field" },
        { data:"2023-09-25", montante:1140 ,type: "Field" },
        { data:"2023-08-25", montante:2245.5 ,type: "Field" },
        { data:"2023-07-25", montante:3050 ,type: "Field" },
        { data:"2023-06-25", montante:4075 ,type: "Field" },
        //sponsor donations
        { data:"2024-05-01", montante:24000 ,type: "Sponsor" },
        { data:"2024-04-25", montante:14000 ,type: "Sponsor" },
        { data:"2023-07-25", montante:40000 ,type: "Sponsor" },
        { data:"2023-06-25", montante:35000 ,type: "Sponsor" },
    ];

    // Check if initiatives already exist in local storage
    if (!localStorage.getItem('donations')) {
        // Store predefined initiatives in local storage
        localStorage.setItem('donations', JSON.stringify(predefinedDonations));
        console.log("Donations preloaded into local storage.");
    } else {
        console.log("Donations already exist in local storage.");
    }
}

function preloadPedidos() {
    // Predefined pedidos
    const predefinedPedidos = [
        { id: 1, estado: "pendente" ,email: "carlosjoao@example.com", titulo: "Corrida do Norte", type: "Corrida/Maratona", localidade: "Avenida da Liberdade - Porto", region: "Norte", data: "2024-06-10", horaInicio: "09:00", horaFim: "11:00", descricao: "Uma maratona urbana para todos os níveis de corredores.", imagem: "maratona.jpg" },
        { id: 2, estado: "pendente" ,email: "carlosjoao@example.com", titulo: "Aulas de Yoga - Conti", type: "Aulas", localidade: "Parque das Águas", region: "Lisboa", data: "2024-06-12", horaInicio: "08:00", horaFim: "10:00", descricao: "Sessão de yoga ao ar livre para promover a saúde e o bem-estar.", imagem: "yoga.jpg" },
        { id: 3, estado: "pendente" ,email: "carlosjoao@example.com", titulo: "Jogo de Futebol Beneficente dos Alves", type: "Jogos de Futebol", localidade: "Estádio Municipal", region: "Norte", data: "2024-06-15", horaInicio: "15:00", horaFim: "17:00", descricao: "Jogo de futebol para arrecadar fundos para a caridade local." },
        { id: 4, estado: "pendente" ,email: "carlosjoao@example.com", titulo: "Workshop de Fotografia", type: "Workshop", localidade: "Centro Cultural", region: "Alentejo", data: "2024-06-18", horaInicio: "10:00", horaFim: "12:00", descricao: "Workshop introdutório sobre técnicas de fotografia digital.", imagem: "fotografia.jpg" },
        { id: 5, estado: "pendente" ,email: "carlosjoao@example.com", titulo: "Aula de Pilates", type: "Aulas", localidade: "Parque da Avenida", region: "Norte", data: "2024-06-24", horaInicio: "15:00", horaFim: "17:00", descricao: "Sessão de pilates ao ar livre para promover a saúde e o bem-estar.", imagem: "pilates.jpg" },
        { id: 6, estado: "pendente" ,email: "carlosjoao@example.com", titulo: "Festa de Panóias", type: "Outro", localidade: "Marquês de Pombal", region: "Centro", data: "2024-07-01", horaInicio: "17:00", horaFim: "22:00", descricao: "Panóias Solidaria", imagem: "panoias.jpg" },
        { id: 7, estado: "recusado" ,email: "carlosjoao@example.com", titulo: "Aula de Pilates", type: "Aulas", localidade: "Parque da Avenida", region: "Norte", data: "2024-06-24", horaInicio: "15:00", horaFim: "17:00", descricao: "Sessão de pilates ao ar livre para promover a saúde e o bem-estar.", imagem: "pilates.jpg" },
        { id: 8, estado: "aceite" ,email: "carlosjoao@example.com", titulo: "aceite", type: "Aulas", localidade: "Parque da Avenida", region: "Norte", data: "2024-04-24", horaInicio: "15:00", horaFim: "17:00", descricao: "Sessão de pilates ao ar livre para promover a saúde e o bem-estar.", imagem: "pilates.jpg"}
    ];

    // Check if pedidos already exist in local storage
    if (!localStorage.getItem('pedidos')) {
        // Store predefined pedidos in local storage
        localStorage.setItem('pedidos', JSON.stringify(predefinedPedidos));
        console.log("Pedidos preloaded into local storage.");
    } else {
        console.log("Pedidos already exist in local storage.");
    }
}

function preloadUsers() {
    // Predefined user profiles with the required details
    const predefinedUsers = [
        { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", profession: "Advogado", isAdmin: false, password:"gohelp" },
        { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", profession: "Gestor de Seguros", isAdmin: false, password:"gohelp" },
        { firstName: "João", lastName: "Sousa", email: "joao.souza@example.com", profession: "Advogado", isAdmin: false, password:"gohelp" },
        { firstName: "Ana", lastName: "Luisa", email: "ana.luisa@example.com", profession: "Gestor de Seguros", isAdmin: false, password:"gohelp" },
        { firstName: "Pedro", lastName: "Cunha", email: "pedro.cunha@example.com", profession: "Advogado", isAdmin: false, password:"gohelp" },
        { firstName: "Joana", lastName: "Marques", email: "joana.marques@example.com", profession: "Gestor de Seguros", isAdmin: false, password:"gohelp" },
        { firstName: "Bruno", lastName: "Brown", email: "bruno.brown@example.com", profession: "Ajudante", isAdmin: false, password:"gohelp" },
        { firstName: "Pedro", lastName: "Alves", email: "pedro.alves@example.com", profession: "Ajudante", isAdmin: false, password:"gohelp" },
        { firstName: "Rosa", lastName: "Silva", email: "rosa.silva@example.com", profession: "Ajudante", isAdmin: false, password:"gohelp" },
        { firstName: "Tiago", lastName: "Carlos", email: "tiago.carlos@example.com", profession: "Ajudante", isAdmin: false, password:"gohelp" },
        { firstName: "Pedro", lastName: "Cunha", email: "pedro.cunha@example.com", profession: "Ajudante", isAdmin: false, password:"gohelp" },
        { firstName: "Souges", lastName: "Thor", email: "s.thor@example.com", password: "gestorpass", profession: "Gestor", isAdmin: false, password:"gohelp" }
    ];

    const users = JSON.parse(localStorage.getItem('users')) || [];
    predefinedUsers.forEach(predefinedUser => {
        if (!users.some(user => user.email === predefinedUser.email)) {
            users.push(predefinedUser);
        }
    });

    localStorage.setItem('users', JSON.stringify(users));
    console.log("Users updated in local storage.");
}

function preloadFrontUsers() {
    // Predefined user profiles with the required details
    const predefinedFrontUsers = [
        { firstName: "Carlos", lastName: "Joao", email: "carlosjoao@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Alice", lastName: "Vieira", email: "alice.vieira@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "João", lastName: "Sousa", email: "joao.sousa@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Ana", lastName: "Maria", email: "ana.maria@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Pedro", lastName: "Cunha", email: "pedro.cunha01@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Joana", lastName: "Oliveira", email: "joana.oliveira@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Bruno", lastName: "Carvalho", email: "bruno.carvalho@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Pedro", lastName: "Alves", email: "pedro.alves@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Rosa", lastName: "Silva", email: "rosa.silva@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Tiago", lastName: "Carlos", email: "tiago.carlos@example.com", isAdmin: false, password: "gohelp" },
        { firstName: "Pedro", lastName: "Cunha", email: "pedro.cunha02@example.com", isAdmin: false, password: "gohelp" },
    ];

    const frontUsers = JSON.parse(localStorage.getItem('FrontUsers')) || [];
    predefinedFrontUsers.forEach(user => {
        if (!frontUsers.some(existingUser => existingUser.email === user.email)) {
            frontUsers.push(user);
        }
    });

    localStorage.setItem('FrontUsers', JSON.stringify(frontUsers));
    console.log("FrontUsers updated in local storage.");
}