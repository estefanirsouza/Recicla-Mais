console.log("JS CARREGOU!");

// Configuração da API
const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';

// Função para obter token de autenticação
function obterToken() {
  return localStorage.getItem('authToken');
}

// Função para obter dados do usuário do localStorage
function obterDadosUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// Função para buscar dados do parceiro (ponto de reciclagem) da API
async function buscarDadosParceiroAPI(userId) {
  try {
    const token = obterToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Buscar todos os pontos de reciclagem e filtrar por userId
    const response = await fetch(`${API_BASE_URL}/RecyclePoint/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do parceiro');
    }

    const pontos = await response.json();
    // Encontrar o ponto de reciclagem associado a este usuário
    const pontoParceiro = pontos.find(p => p.userId === userId);
    return pontoParceiro;
  } catch (error) {
    console.error('Erro ao buscar dados do parceiro:', error);
    return null;
  }
}

// Função para atualizar nome do parceiro na página
async function atualizarNomeParceiro() {
  const userData = obterDadosUsuario();
  const nomeElement = document.getElementById('nome-parceiro');
  
  if (!userData || !userData.id) {
    // Se não estiver autenticado, redirecionar para login
    window.location.href = '../Publico/login.html';
    return;
  }
  
  if (nomeElement) {
    // Tentar buscar dados do parceiro da API
    try {
      const dadosParceiro = await buscarDadosParceiroAPI(userData.id);
      if (dadosParceiro && dadosParceiro.name) {
        nomeElement.textContent = dadosParceiro.name;
      } else {
        // Fallback para nome do usuário se não encontrar ponto de reciclagem
        const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
        nomeElement.textContent = nomeCompleto || userData.userName || 'Parceiro';
      }
    } catch (error) {
      console.error('Erro ao buscar nome do parceiro:', error);
      // Fallback para nome do usuário
      const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
      nomeElement.textContent = nomeCompleto || userData.userName || 'Parceiro';
    }
  }
}

// ======================= MENU MOBILE =======================
document.addEventListener("DOMContentLoaded", async () => {
  // Atualizar nome do parceiro
  await atualizarNomeParceiro();
  
  const hamburger = document.getElementById("hamburger");
  const menuMobile = document.getElementById("menu-mobile");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menuMobile.classList.toggle("show");
    });
  }

  const links = menuMobile.querySelectorAll(".mobile-link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("show");
    });
  });

  // Só carrega recompensas se a tabela existir na página
  if (document.querySelector(".tabela-recompensas tbody")) {
    carregarRecompensas();
  }
});

// ======================= API CONFIG =======================
const API =
  "http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api/recyclereward";

const tableBody = document.querySelector(".tabela-recompensas tbody");
const paginationContainer = document.getElementById("pagination");
const searchInput = document.getElementById("busca");

let rows = [];
const rowsPerPage = 6;

// ======================= CARREGAR DADOS =======================
async function carregarRecompensas() {
  try {
    const res = await fetch(API + "/getall");
    const dados = await res.json();

    rows = [];
    tableBody.innerHTML = "";

    dados.forEach((item) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.recycleRewardId}</td>
        <td>${
          item.dateUpdate
            ? item.dateUpdate.split("T")[0]
            : item.dateInsert.split("T")[0]
        }</td>
        <td>${item.name}</td>
        <td>${item.city ?? "--"}</td>
        <td class="status disponivel">Disponível</td>
        <td>${item.defaultValidDays ?? "--"} dias</td>
        <td>${item.description ?? "--"}</td>

        <td class="acoes">
            <img src="../Imagens/editar.png"
                 class="icone-editar"
                 alt="Editar"
                 onclick="editar(${item.recycleRewardId})">

            <i class="fa fa-sync"></i>
        </td>
      `;

      rows.push(tr);
    });

    displayPage(1);
  } catch (error) {
    console.error("Erro ao carregar recompensas:", error);
    alert("Erro ao carregar recompensas!");
  }
}

// ======================= EDITAR =======================
function editar(id) {
  window.location.href = `nova_recompensa.html?id=${id}`;
}

// ======================= PAGINAÇÃO =======================
function displayPage(page) {
  tableBody.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  rows.slice(start, end).forEach((row) => tableBody.appendChild(row));

  updatePaginationButtons(page);
}

function updatePaginationButtons(currentPage) {
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  paginationContainer.innerHTML = "";

  const prev = document.createElement("button");
  prev.textContent = "Anterior";
  prev.disabled = currentPage === 1;
  prev.onclick = () => displayPage(currentPage - 1);

  paginationContainer.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) btn.classList.add("active");

    btn.onclick = () => displayPage(i);
    paginationContainer.appendChild(btn);
  }

  const next = document.createElement("button");
  next.textContent = "Próximo";
  next.disabled = currentPage === totalPages;
  next.onclick = () => displayPage(currentPage + 1);

  paginationContainer.appendChild(next);
}

// ======================= BUSCA =======================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const filtro = searchInput.value.toLowerCase();

    const filtrado = rows.filter((row) =>
      row.textContent.toLowerCase().includes(filtro)
    );

    tableBody.innerHTML = "";
    filtrado.forEach((row) => tableBody.appendChild(row));
  });
}
