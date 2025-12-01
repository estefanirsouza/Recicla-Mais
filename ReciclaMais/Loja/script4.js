// ======================= CONFIGURAÇÕES GERAIS =======================
// ======================= HELPERS GLOBAIS =======================
function obterToken() {
  try {
    return localStorage.getItem('authToken');
  } catch (e) {
    console.error('Erro ao acessar localStorage (obterToken):', e);
    return null;
  }
}

function obterDadosUsuario() {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error('Erro ao acessar localStorage (obterDadosUsuario):', e);
    return null;
  }
}

const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';

StoreId: "b443154a-c6c5-48d0-a1ce-cbdf278aab6b",

function obterToken() {
  return localStorage.getItem('authToken');
}

function obterDadosUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// ======================= ATUALIZAR NOME DA LOJA =======================
async function atualizarNomeLoja() {
  const userData = obterDadosUsuario();
  const nomeElement = document.getElementById('nome-loja');

  if (!userData || !userData.id) {
    window.location.href = '../Publico/login.html';
    return;
  }

  // ⭐ Loja = o próprio usuário
  STORE_ID_DA_LOJA = userData.id;

  console.log("STORE_ID_DA_LOJA DEFINIDO COMO:", STORE_ID_DA_LOJA);

  if (nomeElement) {
    const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
    nomeElement.textContent = nomeCompleto || userData.userName || 'Loja';
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
  console.log("Validando token...");

  // ------------------------------
  // 1) Token digitado
  // ------------------------------
  const tokenDigitado = codeBoxes.map(i => i.value).join('').toUpperCase();

  if (tokenDigitado.length < 5) {
    alert("Digite o código completo.");
    return;
  }
  console.log("Token digitado:", tokenDigitado);

  // ------------------------------
  // 2) Autenticação
  // ------------------------------
  if (typeof obterToken !== "function") {
    console.error("❌ ERRO: obterToken() NÃO EXISTE!");
    alert("Erro interno: Função obterToken ausente.");
    return;
  }

  const authToken = obterToken();
  console.log("Auth token:", authToken);

  if (!authToken) {
    alert("Erro de autenticação. Faça login novamente.");
    return;
  }

  // ------------------------------
  // 3) StoreId fixo solicitado
  // ------------------------------
  const STORE_ID_FIXO = "b443154a-c6c5-48d0-a1ce-cbdf278aab6b";
  console.log("StoreId enviado:", STORE_ID_FIXO);

  // ------------------------------
  // 4) Requisição POST
  // ------------------------------
  try {
    const response = await fetch(`${API_BASE_URL}/userreward/validatetoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        Token: tokenDigitado,
        StoreId: STORE_ID_FIXO,
        PartnerId: null
      })
    });

    console.log("Response status:", response.status);

    const rawText = await response.text();
    console.log("RAW RESPONSE:", rawText);

    let json = null;
    try { json = JSON.parse(rawText); }
    catch { console.warn("Resposta não era JSON."); }

    // ------------------------------
    // 5) Erro da API
    // ------------------------------
    if (!response.ok) {
      console.error("Erro retornado pela API:", json?.message || rawText);
      alert(json?.message || "Token inválido.");
      return;
    }

    // ------------------------------
    // 6) Sucesso
    // ------------------------------
    alert("Token validado com sucesso!");

    if (json) preencherTabela(json);

  } catch (error) {
    console.error("FALHA NO FETCH:", error);
    alert("Erro ao validar token. Veja o console.");
  }
}


  // ======================= BOTÃO =======================
  const btnGenerate = document.getElementById('btnGenerate');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', validarToken);
  }

  if (codeBoxes.length) codeBoxes[0].focus();
});
