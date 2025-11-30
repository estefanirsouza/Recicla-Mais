// script4.js - Loja
console.log("JS CARREGOU!");

// ======================= CONFIGURAÇÕES GERAIS =======================
const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';

function obterToken() {
  return localStorage.getItem('authToken');
}

function obterDadosUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// ======================= BUSCAR DADOS DA LOJA =======================
async function buscarDadosLojaAPI(userId) {
  try {
    const token = obterToken();
    if (!token) throw new Error('Usuário não autenticado');

    const response = await fetch(`${API_BASE_URL}/RecycleReward/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Erro ao buscar dados da loja');

    const lojas = await response.json();
    return lojas.find(l => l.userId === userId) || null;

  } catch (error) {
    console.error('Erro ao buscar dados da loja:', error);
    return null;
  }
}

// ======================= ATUALIZAR NOME DA LOJA =======================
async function atualizarNomeLoja() {
  const userData = obterDadosUsuario();
  const nomeElement = document.getElementById('nome-loja');

  if (!userData || !userData.id) {
    window.location.href = '../Publico/login.html';
    return;
  }

  if (nomeElement) {
    try {
      const dadosLoja = await buscarDadosLojaAPI(userData.id);

      if (dadosLoja?.name) {
        nomeElement.textContent = dadosLoja.name;
      } else {
        const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
        nomeElement.textContent = nomeCompleto || userData.userName || 'Loja';
      }

    } catch (error) {
      console.error(error);
      const fallback = `${userData.name || ''} ${userData.surname || ''}`.trim();
      nomeElement.textContent = fallback || userData.userName || 'Loja';
    }
  }
}


// ======================= DOM READY =======================
document.addEventListener("DOMContentLoaded", async () => {

  await atualizarNomeLoja();

  // ======================= MENU MOBILE =======================
  const hamburger = document.getElementById("hamburger");
  const menuMobile = document.getElementById("menu-mobile");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menuMobile.classList.toggle("show");
    });
  }

  const mobileLinks = menuMobile.querySelectorAll(".mobile-link");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("show");
    });
  });

  // ======================= PAGINAÇÃO =======================
  const rowsPerPage = 6;
  const table = document.querySelector(".tabela-recompensas tbody");
  let rows = Array.from(table?.querySelectorAll("tr") || []);
  const paginationContainer = document.getElementById("pagination");

  function displayPage(page) {
    if (!table) return;

    table.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.slice(start, end).forEach(row => table.appendChild(row));
    updatePaginationButtons(page);
  }

  function updatePaginationButtons(currentPage) {
    if (!paginationContainer) return;

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    paginationContainer.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Anterior";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => displayPage(currentPage - 1);
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      if (i === currentPage) button.classList.add("active");
      button.onclick = () => displayPage(i);
      paginationContainer.appendChild(button);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Próximo";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => displayPage(currentPage + 1);
    paginationContainer.appendChild(nextBtn);
  }

  displayPage(1);

  // ======================= INPUT DO TOKEN =======================
  const codeBoxes = Array.from(document.querySelectorAll('.code-box'));
  codeBoxes.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.slice(-1).trim();
      if (e.target.value && idx < codeBoxes.length - 1) codeBoxes[idx + 1].focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        codeBoxes[idx - 1].focus();
      }
    });
  });

  // ======================= PREENCHER TABELA =======================
  function preencherTabela(result) {
    if (!table) return;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${result.rewardName || "Recompensa"}</td>
      <td>${result.description || "Descrição não informada"}</td>
      <td>${result.points || 0}</td>
      <td>${result.partnerName || "Parceiro"}</td>
    `;

    table.appendChild(tr);

    rows = Array.from(table.querySelectorAll("tr"));
    displayPage(1);
  }

  // ======================= VALIDAR TOKEN =======================
  async function validarToken() {
    const tokenDigitado = codeBoxes.map(i => i.value).join('').toUpperCase();

    if (tokenDigitado.length < 5) {
      alert("Digite o código completo.");
      return;
    }

    const userData = obterDadosUsuario();
    if (!userData || !userData.token) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/userreward/validatetoken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`
        },
        body: JSON.stringify({
          Token: tokenDigitado,
          StoreId: "7ac52d2f-2259-4061-afd3-2d7298825c9e",
          PartnerId: null
        })
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Token inválido.");
        return;
      }

      alert("Token válido! 🎉");
      preencherTabela(result);

    } catch (error) {
      console.error("Erro ao validar token:", error);
      alert("Erro na validação. Tente novamente.");
    }
  }

  // ======================= BOTÃO =======================
  const btnGenerate = document.getElementById('btnGenerate');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', validarToken);
  }

  if (codeBoxes.length) codeBoxes[0].focus();
});
