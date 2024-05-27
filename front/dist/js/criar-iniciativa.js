function storeFormData() {
  const form = document.getElementById('inscricaoForm');
  
  const localidade = form.querySelector('#localidade').value.trim();
  const data = form.querySelector('#data').value.trim();
  const titulo = form.querySelector('#titulo').value.trim();
  const type = form.querySelector('#type').value.trim(); // New
  const region = form.querySelector('#region').value.trim(); // New
  const horaInicio = form.querySelector('#horaInicio').value.trim(); // New
  const horaFim = form.querySelector('#horaFim').value.trim(); // New
  const descricao = form.querySelector('#descricao').value.trim();
  
  // Retrieve the logged-in user's email from local storage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const email = loggedInUser ? loggedInUser.email : ''; // Default to an empty string if not found

  // Validate the date (at least the next day)
  const today = new Date();
  const inputDate = new Date(data);
  if (inputDate <= today.setDate(today.getDate() + 1)) {
      alert("Data já ultrapassada.");
      return;
  }

  // Validate time: horaFim should be after horaInicio
  const [horaInicioHour, horaInicioMinute] = horaInicio.split(':').map(Number);
  const [horaFimHour, horaFimMinute] = horaFim.split(':').map(Number);
  const isHoraFimAfter = (horaFimHour > horaInicioHour) || (horaFimHour === horaInicioHour && horaFimMinute > horaInicioMinute);

  if (!isHoraFimAfter) {
      alert("Hora Fim deve ser depois de Hora Ínicio.");
      return;
  }

  let imagem = "";
  const fileInput = form.querySelector('#imagem');
  if (fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
          imagem = e.target.result; // Base64 string
          savePedido(); // Save pedido once image has been read
      };
      reader.readAsDataURL(fileInput.files[0]); // Convert file to Base64
  } else {
      savePedido(); // Save pedido even without an image
  }

  function savePedido() {
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const newId = pedidos.length ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
    const newPedido = {
        id: newId,
        estado: "pendente",
        email,
        titulo,
        type,
        localidade,
        region,
        data,
        horaInicio,
        horaFim,
        descricao,
        imagem
    };
    pedidos.push(newPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');
    if (localidade && data && titulo && descricao) {
        successMessage.classList.remove('d-none');
        errorMessage.classList.add('d-none');
    } else {
        successMessage.classList.add('d-none');
        errorMessage.classList.remove('d-none');
    }
    form.reset();
}
}

function updateStyle(selectElement) {
    if (selectElement.value === "") {
      selectElement.style.fontWeight = "bold";
    } else {
      selectElement.style.fontWeight = "normal";
    }
  }
  
  window.onload = function() {
    updateStyle(document.getElementById('region'));
  };


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