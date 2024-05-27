function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

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

  loadProfiles();

  const id = getQueryParameter('id');

  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const initiative = initiatives.find(i => i.id == id);

  if (initiative) {
    document.getElementById('titulo').value = initiative.titulo;
    document.getElementById('type').value = initiative.type;
    document.getElementById('localidade').value = initiative.localidade;
    document.getElementById('region').value = initiative.region;
    document.getElementById('data').value = initiative.data;
    document.getElementById('horaInicio').value = initiative.horaInicio;
    document.getElementById('horaFim').value = initiative.horaFim;
    document.getElementById('descricao').value = initiative.descricao;
    document.getElementById('gestor').value = initiative.gestor;
    document.getElementById('doacoes').value = initiative.doacoes;
    document.getElementById('maxparticipantesindividual').value = initiative.participantesmax;

    const participantesLength = initiative.participantes.length;
    document.getElementById('participantesindividual').value = participantesLength;

    const displayImage = document.getElementById('displayImage');
    if (initiative.imagem) {
      displayImage.src = initiative.imagem;
    }

    const tituloBold = document.getElementById('tituloBold');
    if (tituloBold) {
      tituloBold.textContent = initiative.titulo;
    }

    updateProfissionaisTable(initiative.profissionais, initiative.horaInicio, initiative.horaFim);
  }

  function updateProfissionaisTable(profissionais, horaInicio, horaFim) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const totalHours = calculateTotalHours(horaInicio, horaFim);

    profissionais.forEach((prof, index) => {
      const row = document.createElement('tr');

      const funcaoCell = document.createElement('td');
      funcaoCell.textContent = prof.funcao;
      row.appendChild(funcaoCell);

      const qtdCell = document.createElement('td');
      qtdCell.textContent = prof.qtd;
      row.appendChild(qtdCell);

      const selecionadosCell = document.createElement('td');
      selecionadosCell.textContent = prof.selecionados || 0;
      row.appendChild(selecionadosCell);

      const custoUnitarioCell = document.createElement('td');
      custoUnitarioCell.innerHTML = `<input type="number" class="custo-unitario" value="${prof.custoUnitario || 0}" min="0" step="0.01" onchange="updateProfissional(${index}, 'custoUnitario', this.value)"> €`;
      row.appendChild(custoUnitarioCell);

      const custoTotalCell = document.createElement('td');
      const total = (prof.selecionados || 0) * (prof.custoUnitario || 0) * totalHours;
      custoTotalCell.textContent = `${total.toFixed(2)} €`;
      row.appendChild(custoTotalCell);

      tableBody.appendChild(row);
    });

    updateGrandTotalProfissional(profissionais, totalHours);
  }

  window.updateProfissional = function(index, field, value) {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const id = getQueryParameter('id');
    const initiative = initiatives.find(i => i.id == id);

    if (initiative && initiative.profissionais) {
      if (field === 'selecionados') {
        initiative.profissionais[index][field] = parseFloat(value) || 0;
      }
      if (field === 'custoUnitario') {
        initiative.profissionais[index][field] = parseFloat(value).toFixed(2) || 0;
      }

      localStorage.setItem('initiatives', JSON.stringify(initiatives));
      updateProfissionaisTable(initiative.profissionais, initiative.horaInicio, initiative.horaFim);
    }
  };

  function calculateTotalHours(horaInicio, horaFim) {
    const startTime = new Date(`1970-01-01T${horaInicio}:00`);
    const endTime = new Date(`1970-01-01T${horaFim}:00`);
    const diffMs = endTime - startTime;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  }

  function updateGrandTotalProfissional(profissionais, totalHours) {
    let grandTotalProfissional = 0;

    profissionais.forEach(prof => {
      const total = (prof.selecionados || 0) * (prof.custoUnitario || 0) * totalHours;
      grandTotalProfissional += total;
    });

    document.getElementById('totalCustoProfissionais').textContent = `Total: €${grandTotalProfissional.toFixed(2)}`;
  }

  function loadProfiles() {
    const profiles = JSON.parse(localStorage.getItem('profissionais'));
    if (profiles) {
      populateTables(profiles);
    } else {
      console.error("No profiles found in localStorage.");
    }
  }

  function populateTables(profiles) {
    const ajudantesTable = document.querySelector("#ajudanteTable tbody");
    const advogadosTable = document.querySelector("#advogadoTable tbody");
    const gestoresSegurosTable = document.querySelector("#gestorSegurosTable tbody");

    profiles.forEach(profile => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.textContent = profile.name;
      const selectCell = document.createElement('td');
      const selectInput = document.createElement('input');
      selectInput.type = 'checkbox';
      selectInput.checked = isEmployeeSelected(profile);
      selectInput.addEventListener('change', () => handleSelection(profile, selectInput.checked));
      selectCell.appendChild(selectInput);
      row.appendChild(nameCell);
      row.appendChild(selectCell);

      if (profile.profession === "Ajudante") {
        ajudantesTable.appendChild(row);
      } else if (profile.profession === "Advogado") {
        advogadosTable.appendChild(row);
      } else if (profile.profession === "Gestor_de_Seguros") {
        gestoresSegurosTable.appendChild(row);
      }
    });
  }

  function isEmployeeSelected(profile) {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const id = getQueryParameter('id');
    const initiative = initiatives.find(i => i.id == id);

    if (initiative && initiative.profissionais) {
      const professional = initiative.profissionais.find(p => p.funcao === profile.profession);
      if (professional && professional.selectedEmployees) {
        return professional.selectedEmployees.some(emp => emp.email === profile.email);
      }
    }
    return false;
  }

  function handleSelection(profile, isSelected) {
    const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
    const id = getQueryParameter('id');
    const initiative = initiatives.find(i => i.id == id);

    if (initiative && initiative.profissionais) {
      const professional = initiative.profissionais.find(p => p.funcao === profile.profession);
      if (professional) {
        if (isSelected) {
          professional.selecionados = (professional.selecionados || 0) + 1;
          if (!professional.selectedEmployees) {
            professional.selectedEmployees = [];
          }
          professional.selectedEmployees.push({ name: profile.name, email: profile.email });
        } else {
          professional.selecionados = (professional.selecionados || 0) - 1;
          professional.selectedEmployees = professional.selectedEmployees.filter(emp => emp.email !== profile.email);
        }
        localStorage.setItem('initiatives', JSON.stringify(initiatives));
        updateProfissionaisTable(initiative.profissionais, initiative.horaInicio, initiative.horaFim);
      }
    }
  }

  if (initiative && initiative.materiais) {
    const tableBody = document.getElementById('materiaisTableBody');
    initiative.materiais.forEach((item, index) => {
      let row = tableBody.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.textContent = item.material;
      cell2.textContent = item.neededqtd;
      cell3.innerHTML = `<input type="number" class="em-posse" value="${item.emPosse || 0}" min="0" onchange="updateMaterial(${index}, 'emPosse', this.value)">`;
      cell4.innerHTML = `<input type="number" class="custo-unitario" value="${item.custoUnitario || 0}" min="0" step="0.01" onchange="updateMaterial(${index}, 'custoUnitario', this.value)"> €`;
      cell5.innerHTML = `${(item.emPosse * item.custoUnitario).toFixed(2)} €`; // Initial value with € symbol
    });

    updateGrandTotalMaterial();
  }
});

function updateMaterial(index, field, value) {
  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const id = getQueryParameter('id');
  const initiative = initiatives.find(i => i.id == id);

  if (initiative && initiative.materiais) {
    if (field === 'emPosse') {
      initiative.materiais[index][field] = parseFloat(value) || 0;
    }
    if (field === 'custoUnitario') {
      initiative.materiais[index][field] = parseFloat(value).toFixed(2) || 0;
      initiative.materiais[index].total = (initiative.materiais[index].emPosse * initiative.materiais[index].custoUnitario).toFixed(2);
    }

    localStorage.setItem('initiatives', JSON.stringify(initiatives));
    updateGrandTotalMaterial();
  }
}

function updateGrandTotalMaterial() {
  const id = getQueryParameter('id');
  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const initiative = initiatives.find(i => i.id == id);

  const tableBody = document.getElementById('materiaisTableBody');
  const rows = tableBody.rows;
  let grandTotalMaterial = 0;

  for (let i = 0; i < rows.length; i++) {
    const emPosse = parseFloat(rows[i].cells[2].querySelector('.em-posse').value) || 0;
    const custoUnitario = parseFloat(rows[i].cells[3].querySelector('.custo-unitario').value).toFixed(2) || 0;
    const custoTotal = emPosse * custoUnitario;

    rows[i].cells[4].textContent = `${custoTotal.toFixed(2)} €`;
    grandTotalMaterial += custoTotal;
  }

  document.getElementById('totalCustoMateriais').textContent = `Total: €${grandTotalMaterial.toFixed(2)}`;
}

function openTab(tabName) {
  var tabcontents = document.querySelectorAll(".tab-content");
  tabcontents.forEach(function (tabcontent) {
    tabcontent.style.display = "none";
  });

  var tabbuttons = document.querySelectorAll(".tab-button");
  tabbuttons.forEach(function (tabbutton) {
    tabbutton.classList.remove("active");
  });

  document.getElementById(tabName).style.display = "block";
  document.querySelector(".tab-button[data-tab='" + tabName + "']").classList.add('active');
}

window.onload = function () {
  openTab('Dados');
};

document.getElementById('data').addEventListener('change', function () {
  this.setCustomValidity('');
  validateDate();
});

document.getElementById('horaInicio').addEventListener('change', function () {
  this.setCustomValidity('');
  validateTime();
});

document.getElementById('horaFim').addEventListener('change', function () {
  this.setCustomValidity('');
  validateTime();
});

const form = document.getElementById('inscricaoForm');
let changedFields = new Set();

['titulo', 'type', 'localidade', 'region', 'data', 'horaInicio', 'horaFim', 'descricao'].forEach(id => {
  const element = document.getElementById(id);
  element.addEventListener('change', () => {
    changedFields.add(id);
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Form submission initiated.');

  let valid = true;
  let invalidFields = [];

  if (changedFields.has('data') && !validateDate()) {
    invalidFields.push('data');
    valid = false;
  }

  if ((changedFields.has('horaInicio') || changedFields.has('horaFim')) && !validateTime()) {
    invalidFields.push('horaInicio', 'horaFim');
    valid = false;
  }

  if (!valid) {
    invalidFields.forEach(id => {
      document.getElementById(id).reportValidity();
    });
    return;
  }

  const id = getQueryParameter('id');
  const titulo = document.getElementById('titulo').value.trim();
  const type = document.getElementById('type').value.trim();
  const localidade = document.getElementById('localidade').value.trim();
  const region = document.getElementById('region').value.trim();
  const data = document.getElementById('data').value;
  const horaInicio = document.getElementById('horaInicio').value;
  const horaFim = document.getElementById('horaFim').value;
  const descricao = document.getElementById('descricao').value.trim();

  console.log('Form values:', { id, titulo, type, localidade, region, data, horaInicio, horaFim, descricao });

  const successMessage = document.getElementById('submitSuccessMessage');
  const errorMessage = document.getElementById('submitErrorMessage');

  successMessage.classList.add('d-none');
  errorMessage.classList.add('d-none');

  const initiatives = JSON.parse(localStorage.getItem('initiatives')) || [];
  const sameDayInitiatives = initiatives.filter(initiative => initiative.data === data && initiative.region === region);

  // Region-specific validation
  if (changedFields.has('region') || changedFields.has('data') || changedFields.has('type')) {
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
  }

  const initiative = initiatives.find(i => i.id == id);
  if (initiative) {
    if (changedFields.has('titulo')) initiative.titulo = titulo;
    if (changedFields.has('type')) initiative.type = type;
    if (changedFields.has('localidade')) initiative.localidade = localidade;
    if (changedFields.has('region')) initiative.region = region;
    if (changedFields.has('data')) initiative.data = data;
    if (changedFields.has('horaInicio')) initiative.horaInicio = horaInicio;
    if (changedFields.has('horaFim')) initiative.horaFim = horaFim;
    if (changedFields.has('descricao')) initiative.descricao = descricao;

    console.log('Updated initiative:', initiative);
  } else {
    console.error('Initiative not found.');
  }

  localStorage.setItem('initiatives', JSON.stringify(initiatives));
  console.log('Initiatives saved to localStorage.');

  successMessage.classList.remove('d-none');
  errorMessage.classList.add('d-none');

  console.log('Form submission completed.');
});

function validateDate() {
  const data = document.getElementById('data').value;
  const dateInput = document.getElementById('data');
  const selectedDate = new Date(data);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);

  if (selectedDate <= nextDay) {
    dateInput.setCustomValidity('Data já ultrapassada');
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

  const startTime = new Date(`1970-01-01T${horaInicio}:00`);
  const endTime = new Date(`1970-01-01T${horaFim}:00`);

  if (endTime <= startTime) {
    horaFimInput.setCustomValidity('Hora de Fim deve ser depois de Hora de Início');
    return false;
  } else {
    horaInicioInput.setCustomValidity('');
    horaFimInput.setCustomValidity('');
    return true;
  }
}

// Function to enforce 2 decimal places on input
function enforceTwoDecimalPlaces(input) {
  input.addEventListener('input', function() {
    let value = this.value;
    if (value.includes('.')) {
      value = value.split('.');
      value[1] = value[1].slice(0, 2);
      this.value = value.join('.');
    }
  });
}

// Apply the two decimal places enforcement to the custo-unitario inputs
document.querySelectorAll('.custo-unitario').forEach(input => {
  enforceTwoDecimalPlaces(input);
});

function logout() {
  // Clear the logged-in user from local storage
  localStorage.removeItem('loggedInUser');

  // Redirect to 'login.html'
  window.location.href = "../../front/dist/index.html";
}