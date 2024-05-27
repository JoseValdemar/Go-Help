document.addEventListener('DOMContentLoaded', () => {
    const userProfileDropdown = document.getElementById('userProfileDropdown');
        const loginLink = document.getElementById('loginLink');
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            userProfileDropdown.classList.remove('d-none');

            if (loggedInUser.name && loggedInUser.role) {
                const displayName = `${loggedInUser.name} (${loggedInUser.role})`;
                document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
            }
        } else {
            loginLink.classList.remove('d-none');
            // Redirect to 'index.html' if loggedInUser does not exist
           
        
    }


    const gestores = JSON.parse(localStorage.getItem('gestores')) || [];
    const dropdown = document.getElementById('gestorDropdown');

    // Populate the dropdown with gestor names
    gestores.forEach(gestor => {
        const option = document.createElement('option');
        option.value = gestor.email; // setting email as value, can change as required
        option.textContent = gestor.firstName + " " + gestor.lastName;
        dropdown.appendChild(option);
    });

    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const id = getQueryParameter('id');

    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const pedido = pedidos.find(p => p.id == id);

    if (pedido) {
        document.getElementById('titulo').value = pedido.titulo;
        document.getElementById('type').value = pedido.type;
        document.getElementById('localidade').value = pedido.localidade;
        document.getElementById('region').value = pedido.region;
        document.getElementById('data').value = pedido.data;
        document.getElementById('horaInicio').value = pedido.horaInicio;
        document.getElementById('horaFim').value = pedido.horaFim;
        document.getElementById('descricao').value = pedido.descricao;
    }

    function updateProfissionaisTable() {
        const professions = ["Ajudante", "Advogado", "Gestor de Seguros"];
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        professions.forEach((prof, index) => {
            const row = document.createElement('tr');
            const funcaoCell = document.createElement('td');
            funcaoCell.textContent = prof;
            row.appendChild(funcaoCell);

            const qtdCell = document.createElement('td');
            const qtdInput = document.createElement('input');
            qtdInput.type = 'number';
            qtdInput.id = `profQuantity${index}`;
            qtdInput.value = 0;
            qtdInput.min = 0;
            qtdInput.classList.add('prof-quantity');
            qtdInput.addEventListener('input', function () {
                this.setCustomValidity(''); // Clear validity on user input
            });
            qtdCell.appendChild(qtdInput);
            row.appendChild(qtdCell);

            tableBody.appendChild(row);
        });
    }

    updateProfissionaisTable(); // Call the function to update the table

    const addMaterialButton = document.getElementById('addMaterialBtn');
    const materiaisTableBody = document.getElementById('materiaisTableBody');

    addMaterialButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        const materialCell = document.createElement('td');
        const materialInput = document.createElement('input');
        materialInput.type = 'text';
        materialInput.className = 'form-control material-name';
        materialCell.appendChild(materialInput);

        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'form-control material-quantity';
        quantityInput.min = 1;
        quantityCell.appendChild(quantityInput);

        const removeBtnCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.className = 'btn btn-danger remove-btn';
        removeBtnCell.appendChild(removeButton);

        row.appendChild(materialCell);
        row.appendChild(quantityCell);
        row.appendChild(removeBtnCell);

        materiaisTableBody.appendChild(row);

        // Listener to clear/set custom validity based on both fields
        function validateMaterialRow() {
            const nameValid = materialInput.value.trim() !== '';
            const quantityValid = parseInt(quantityInput.value, 10) >= 1;

            materialInput.setCustomValidity(nameValid ? '' : 'O nome do material não pode estar vazio');
            quantityInput.setCustomValidity(quantityValid ? '' : 'Quantidade deve ser igual ou superior a 1');

            if (nameValid && quantityValid) {
                materialInput.setCustomValidity('');
                quantityInput.setCustomValidity('');
            }
        }

        // Attach listeners
        materialInput.addEventListener('input', validateMaterialRow);
        quantityInput.addEventListener('input', validateMaterialRow);

        removeButton.addEventListener('click', () => {
            row.parentNode.removeChild(row);
        });
    });

    document.getElementById('data').addEventListener('change', function () {
        this.setCustomValidity(''); // Clear any custom message set previously
        validateDate(); // Optionally, re-validate right away
    });

    document.getElementById('horaInicio').addEventListener('change', function () {
        this.setCustomValidity('');
        validateTime(); // Optionally, re-validate right away
    });

    document.getElementById('horaFim').addEventListener('change', function () {
        this.setCustomValidity('');
        validateTime(); // Optionally, re-validate right away
    });

    const form = document.getElementById('inscricaoForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!validateDate() || !validateTime() || !validateTables()) {
            return;
        }

        const titulo = document.getElementById('titulo').value.trim();
        const type = document.getElementById('type').value.trim();
        const localidade = document.getElementById('localidade').value.trim();
        const region = document.getElementById('region').value.trim();
        const data = document.getElementById('data').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFim = document.getElementById('horaFim').value;
        const participantesValue = document.getElementById('participantes').value.trim();
        const participantesmax = parseInt(participantesValue, 10);
        const gestor = document.getElementById('gestorDropdown').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
        const imagemFile = document.getElementById('imagem').files[0];

        // Collect and format "profissionais" data
        const profissionaisData = [];
        document.querySelectorAll('#tableBody tr').forEach(row => {
            const funcao = row.cells[0].textContent;
            const qtd = parseInt(row.cells[1].querySelector('input').value, 10);
            if (qtd > 0) { // Only add if quantity is more than zero
                profissionaisData.push({ funcao, qtd });
            }
        });

        // Collect and format "materiais" data
        const materiaisData = [];
        document.querySelectorAll('#materiaisTableBody tr').forEach(row => {
            const material = row.cells[0].querySelector('input').value.trim();
            const neededqtd = parseInt(row.cells[1].querySelector('input').value, 10);
            if (material && neededqtd > 0) { // Only add if material name is not empty and quantity is more than zero
                materiaisData.push({ material, neededqtd });
            }
        });

        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');
        const dateInput = document.getElementById('data');
        const horaInicioInput = document.getElementById('horaInicio');
        const horaFimInput = document.getElementById('horaFim');

        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        dateInput.setCustomValidity('');
        horaInicioInput.setCustomValidity('');
        horaFimInput.setCustomValidity('');

        const selectedDate = new Date(data);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to the start of the day for accurate comparison
        selectedDate.setHours(0, 0, 0, 0); // Ensure time is set to start of the day

        if (!titulo || !type || !localidade || !region || !data || !horaInicio || !horaFim || !participantesmax || !descricao || !gestor || !imagemFile) {
            errorMessage.classList.remove('d-none');
            return;
        }

        // Validate based on region-specific rules
        const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
        const sameDayInitiatives = initiatives.filter(initiative => initiative.data === data && initiative.region === region);

        if (region === 'Norte' || region === 'Lisboa') {
            if (sameDayInitiatives.length >= 3 || sameDayInitiatives.some(initiative => initiative.type === type)) {
                errorMessage.textContent = 'Não pode haver mais de 3 iniciativas na mesma data ou já existe uma iniciativa com o mesmo tipo.';
                errorMessage.classList.remove('d-none');
                return;
            }
        } else if (region === 'Centro' || region === 'Algarve') {
            if (sameDayInitiatives.length >= 2 || sameDayInitiatives.some(initiative => initiative.type === type)) {
                errorMessage.textContent = 'Não pode haver mais de 2 iniciativas na mesma data ou já existe uma iniciativa com o mesmo tipo.';
                errorMessage.classList.remove('d-none');
                return;
            }
        } else if (region === 'Alentejo') {
            if (sameDayInitiatives.length >= 1) {
                errorMessage.textContent = 'Não pode haver mais de 1 iniciativa na mesma data no Alentejo.';
                errorMessage.classList.remove('d-none');
                return;
            }
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const imagem = e.target.result;

            let newId = 1;
            if (initiatives.length > 0) {
                const maxId = Math.max(...initiatives.map(i => i.id || 0));
                newId = maxId + 1;
            }

            const initiative = {
                id: newId,
                titulo: titulo,
                type: type,
                localidade: localidade,
                region: region,
                data: data,
                horaInicio: horaInicio,
                horaFim: horaFim,
                descricao: descricao,
                imagem: imagem,
                participantes: [], // Default to empty array for now
                doacoes: 0,
                materiais: materiaisData,
                profissionais: profissionaisData,
                gestor: gestor,
                participantesmax: participantesmax
            };

            initiatives.push(initiative);
            localStorage.setItem('initiatives', JSON.stringify(initiatives));

            const index = pedidos.findIndex(p => p.id == id);
            if (index !== -1) {
                pedidos[index].estado = 'aceite';
                localStorage.setItem('pedidos', JSON.stringify(pedidos));
            }

            successMessage.classList.remove('d-none');
            errorMessage.classList.add('d-none');
            form.reset();
        };

        reader.readAsDataURL(imagemFile);
    });

    function validateDate() {
        const data = document.getElementById('data').value;
        const dateInput = document.getElementById('data');
        const selectedDate = new Date(data);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Calculate the next day from today
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        if (selectedDate <= nextDay) {
            dateInput.setCustomValidity('Data já ultrapassada');
            dateInput.reportValidity();
            return false;
        } else {
            dateInput.setCustomValidity('');
            return true;
        }
    }

    function validateTime() {
        const horaInicioInput = document.getElementById('horaInicio');
        const horaFimInput = document.getElementById('horaFim');
        const horaInicio = horaInicioInput.value;
        const horaFim = horaFimInput.value;

        // Convert times to date objects for comparison
        const startTime = new Date(`1970-01-01T${horaInicio}:00`);
        const endTime = new Date(`1970-01-01T${horaFim}:00`);

        if (endTime <= startTime) {
            horaFimInput.setCustomValidity('Hora de Fim deve ser depois de Hora de Início');
            horaFimInput.reportValidity();
            return false;
        } else {
            horaInicioInput.setCustomValidity('');
            horaFimInput.setCustomValidity('');
            return true;
        }
    }

    function validateTables() {
        const profInputs = document.querySelectorAll('.prof-quantity');
        let valid = true;

        // Validate Profissionais quantities
        profInputs.forEach(input => {
            if (parseInt(input.value, 10) < 1) {
                input.setCustomValidity('Quantidade deve ser igual ou superior a 1');
                valid = false;
            } else {
                input.setCustomValidity(''); // Clear the custom validity message
            }
        });

        // Validate Materiais quantities and names
        const materialRows = document.querySelectorAll('#materiaisTableBody tr');
        materialRows.forEach(row => {
            const materialNameInput = row.querySelector('.material-name');
            const quantityInput = row.querySelector('.material-quantity');

            if (materialNameInput.value.trim() === '') {
                materialNameInput.setCustomValidity('O nome do material não pode estar vazio');
                valid = false;
            } else {
                materialNameInput.setCustomValidity(''); // Clear the custom validity message for material name
            }

            if (parseInt(quantityInput.value, 10) < 1) {
                quantityInput.setCustomValidity('Quantidade deve ser igual ou superior a 1');
                valid = false;
            } else {
                quantityInput.setCustomValidity(''); // Clear the custom validity message for quantity
            }
        });

        return valid;
    }
});


function logout() {
    // Clear the logged-in user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect to 'login.html'
    window.location.href = "../../front/dist/index.html";
}