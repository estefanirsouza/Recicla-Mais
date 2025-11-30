// Configuração da API
const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';

// Função para obter dados do usuário do localStorage
function obterDadosUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// Função para atualizar nome do usuário na página
function atualizarNomeUsuario() {
  const userData = obterDadosUsuario();
  const nomeElement = document.getElementById('nome-usuario');
  
  if (nomeElement && userData) {
    const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
    nomeElement.textContent = nomeCompleto || userData.userName || 'Usuário';
  } else if (nomeElement && !userData) {
    window.location.href = '../Publico/login.html';
  }
}

// =========================================================
// 🔵 BUSCA RECOMPENSAS DO USUÁRIO NA API (CORRETO)
// =========================================================
async function carregarRecompensasAPI() {
  const userData = obterDadosUsuario();
  if (!userData) {
    alert("Você precisa estar logado.");
    window.location.href = "../Publico/login.html";
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/UserReward/user/${userData.id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userData.token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar recompensas na API");
    }

    return await response.json();

  } catch (err) {
    console.error(err);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  atualizarNomeUsuario();
  
  const hamburger = document.getElementById('hamburger');
  const menuMobile = document.getElementById('menu-mobile');

  if (hamburger && menuMobile) {
    hamburger.addEventListener('click', () => {
      menuMobile.classList.toggle('show');
    });

    const mobileLinks = menuMobile.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuMobile.classList.remove('show');
      });
    });
  }

  // ====================================================================
  // 🔵 CARREGAR RECOMPENSAS NA TABELA
  // ====================================================================
  const tabelaBody = document.querySelector(".tabela-recompensas tbody");
  const dados = await carregarRecompensasAPI();

  tabelaBody.innerHTML = "";

  // 🔧 ***AQUI SÃO AS ÚNICAS MUDANÇAS***
  dados.forEach(item => {
    const tr = document.createElement("tr");

    const parceiroOuLoja =
      item.reward?.userPartnerId
        ? "Parceiro"
        : item.reward?.userStoreId
        ? "Loja"
        : "—";

    tr.innerHTML = `
      <td>${parceiroOuLoja}</td>
      <td>${item.token ?? "—"}</td>
      <td>${formatarData(item.dateCreated)}</td>
      <td>${item.reward?.name ?? "—"}</td>
      <td>${item.tokenUsed ? "Utilizado" : "Pendente"}</td>
      <td>${formatarData(item.dateValid)}</td>
      <td>—</td>
      <td><i class="icone-olho ver" style="cursor:pointer; font-size:20px;">👁</i></td>
    `;

    tabelaBody.appendChild(tr);
  });
  // 🔧 ***FIM DAS MUDANÇAS***


  // MODAL
  const modal = document.getElementById("modal");
  const fecharModal = document.getElementById("fecharModal");

  const tokenEl = document.getElementById("modalToken");
  const recompensaEl = document.getElementById("modalRecompensa");
  const validadeEl = document.getElementById("modalValidade");

  tabelaBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("icone-olho")) {
    const row = e.target.closest("tr");

    // ID real do item no array original
    const rewardId = row.dataset.rewardId;

    // pega o item correspondente da API
    const item = dados.find(x => x.id == rewardId);

    // dados da recompensa
    const codigo = item.token ?? "—";
    const recompensa = item.reward?.name ?? "—";
    const validade = formatarData(item.dateValid);

    // dados da localidade
    const address = item.reward?.address ?? "";
    const neighborhood = item.reward?.neighborhood ?? "";
    const city = item.reward?.city ?? "";
    const state = item.reward?.state ?? "";

    const localidade =
      city || state
        ? `${address}, ${neighborhood} — ${city} / ${state}`
        : "—";

    // preencher modal
    tokenEl.textContent = codigo;
    recompensaEl.textContent = recompensa;
    validadeEl.textContent = `até ${validade}`;

    // localidade (HTML usa id="modalLocal")
    const localidadeEl = document.getElementById("modalLocal");
    localidadeEl.textContent = localidade;

    modal.style.display = "flex";
  }
});

  fecharModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

  // Paginação
 // Paginação
const rowsPerPage = 6;
let rows = []; // inicia vazio
const paginationContainer = document.getElementById("pagination");

// 🚀 Atualiza as linhas DEPOIS de preencher a tabela
rows = Array.from(document.querySelectorAll(".tabela-recompensas tbody tr"));

  function displayPage(page) {
    tabelaBody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    rows.slice(start, end).forEach(row => tabelaBody.appendChild(row));
    updatePaginationButtons(page);
  }

  function updatePaginationButtons(currentPage) {
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
});

// =========================================================
// 🔵 Função utilitária — formatar datas da API
// =========================================================
function formatarData(data) {
  if (!data) return "—";
  return new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}
