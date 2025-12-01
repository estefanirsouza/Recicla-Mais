// Configuração da API
const API_BASE_URL =
  "http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api";

// ======================= USUÁRIO FIXO PARA VINCULAR TOKEN =======================
// ❗ AGORA É DIRETO PELO ID, SEM E-MAIL E SEM CARREGAR VIA API
const USER_ID_FIXO = "d291fb6e-d2c0-4cc5-ac19-e2d0c07226b2"; 


// Função para obter token de autenticação
function obterToken() {
  return localStorage.getItem("authToken");
}

// Função para obter dados do usuário do localStorage
function obterDadosUsuario() {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
}

// Função para buscar dados do parceiro (ponto de reciclagem)
async function buscarDadosParceiroAPI(userId) {
  try {
    const token = obterToken();
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch(`${API_BASE_URL}/RecyclePoint/getall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar dados do parceiro");

    const lista = await response.json();
    return lista.find((p) => p.userId === userId) || null;

  } catch (error) {
    console.error("Erro ao buscar dados do parceiro:", error);
    return null;
  }
}

// Atualizar nome do parceiro na página
async function atualizarNomeParceiro() {
  const userData = obterDadosUsuario();
  const nomeElement = document.getElementById("nome-parceiro");

  if (!userData || !userData.id) {
    window.location.href = "../Publico/login.html";
    return;
  }

  if (nomeElement) {
    try {
      const dadosParceiro = await buscarDadosParceiroAPI(userData.id);
      if (dadosParceiro?.name) {
        nomeElement.textContent = dadosParceiro.name;
      } else {
        const nomeCompleto = `${userData.name || ""} ${userData.surname || ""}`.trim();
        nomeElement.textContent = nomeCompleto || userData.userName || "Parceiro";
      }

    } catch (error) {
      const fallback = `${userData.name || ""} ${userData.surname || ""}`.trim();
      nomeElement.textContent = fallback || userData.userName || "Parceiro";
    }
  }
}

// ======================= MENU MOBILE =======================
document.addEventListener("DOMContentLoaded", async () => {
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
// ======================= CARREGAR DADOS =======================
async function carregarRecompensas() {
  try {
    const usuario = obterDadosUsuario();

    if (!usuario || !usuario.id) {
      alert("Erro: parceiro não identificado!");
      return;
    }

    const partnerId = usuario.id;

    // AGORA LISTA SOMENTE AS RECOMPENSAS DO PARCEIRO LOGADO
    const res = await fetch(`${API}/partner/${partnerId}`);
    const dados = await res.json();

    rows = [];
    tableBody.innerHTML = "";

    dados.forEach((item) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.recycleRewardId}</td>
        <td>${item.dateUpdate ? item.dateUpdate.split("T")[0] : item.dateInsert.split("T")[0]}</td>
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

            <i class="fa-solid fa-ticket gerar-token"
               data-reward-id="${item.recycleRewardId}"
               title="Gerar Token"
               style="cursor:pointer; margin-left:12px; font-size:20px;">
            </i>
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

// ======================================
// GERAR TOKEN SEMPRE VINCULADO AO USUÁRIO FIXO
// ======================================
document.addEventListener("click", async function (e) {

  if (!e.target.classList.contains("gerar-token")) return;

  const recycleRewardId = e.target.getAttribute("data-reward-id");
  const token = obterToken();

  if (!USER_ID_FIXO) {
    alert("ID fixo do usuário não configurado.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/userreward/generate`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recycleRewardId: Number(recycleRewardId),
        userId: USER_ID_FIXO // 👈 AGORA É SOMENTE ESTE ID
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro API Generate:", data);
      alert("Erro ao gerar token (veja console).");
      return;
    }

    alert(
      `Token gerado com sucesso!\n` +
      `Token: ${data.token}\n\n` +
      `Enviado com:\n` +
      `UserId: ${USER_ID_FIXO}`
    );

  } catch (error) {
    console.error("Erro ao gerar token:", error);
    alert("Erro ao gerar token.");
  }
});