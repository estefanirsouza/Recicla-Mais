console.log("JS CARREGOU!");

// ======================= MENU MOBILE =======================
document.addEventListener("DOMContentLoaded", () => {
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
