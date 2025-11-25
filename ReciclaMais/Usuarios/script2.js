//Menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menuMobile = document.getElementById('menu-mobile');

  if (hamburger && menuMobile) {
    hamburger.addEventListener('click', () => {
      menuMobile.classList.toggle('show');
    });

    // Fecha o menu ao clicar em algum link
    const mobileLinks = menuMobile.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuMobile.classList.remove('show');
      });
    });
  }

// MODAL DO OLHINHO
// ==============================

const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");

const tokenEl = document.getElementById("modalToken");
const recompensaEl = document.getElementById("modalRecompensa");
const validadeEl = document.getElementById("modalValidade");

// Abrir modal ao clicar no olhinho
document.querySelectorAll(".icone-olho.ver").forEach((icone) => {
  icone.addEventListener("click", () => {

    const row = icone.closest("tr");

    const codigo = row.children[1].textContent.trim();
    const recompensa = row.children[3].textContent.trim();
    const validade = row.children[5].textContent.trim();

    tokenEl.textContent = codigo;
    recompensaEl.textContent = recompensa;
    validadeEl.textContent = `até ${validade}`;

    modal.style.display = "flex";
  });
});

// Fechar modal
fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

//Paginação
const rowsPerPage = 6;
const table = document.querySelector(".tabela-recompensas tbody");
const rows = Array.from(table.querySelectorAll("tr"));
const paginationContainer = document.getElementById("pagination");

function displayPage(page) {
  table.innerHTML = "";

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  const paginatedRows = rows.slice(start, end);

  paginatedRows.forEach(row => table.appendChild(row));

  updatePaginationButtons(page);
}

function updatePaginationButtons(currentPage) {
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  paginationContainer.innerHTML = "";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Anterior";
  prevBtn.disabled = currentPage === 1;
  prevBtn.classList.toggle("disabled", currentPage === 1);
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
  nextBtn.classList.toggle("disabled", currentPage === totalPages);
  nextBtn.onclick = () => displayPage(currentPage + 1);
  paginationContainer.appendChild(nextBtn);
}
displayPage(1);

  //Input cód
  const codeBoxes = Array.from(document.querySelectorAll('.code-box'));
  codeBoxes.forEach((input, idx) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      e.target.value = val.slice(-1).trim();
      if (e.target.value && idx < codeBoxes.length - 1) codeBoxes[idx + 1].focus();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && idx > 0) {
        codeBoxes[idx - 1].focus();
      }
    });

    input.addEventListener('paste', (ev) => {
      ev.preventDefault();
      const paste = (ev.clipboardData || window.clipboardData).getData('text').trim();
      for (let i = 0; i < paste.length && (idx + i) < codeBoxes.length; i++) {
        codeBoxes[idx + i].value = paste[i];
      }
      for (let j = idx; j < codeBoxes.length; j++) {
        if (!codeBoxes[j].value) { codeBoxes[j].focus(); return; }
      }
      codeBoxes[codeBoxes.length - 1].focus();
    });
  });

  //Botão Recompensa
  const btnGenerate = document.getElementById('btnGenerate');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => {
      window.location.href = 'recompensas.html';
    });
  }

  //FOCUS INICIAL
  if (codeBoxes.length) codeBoxes[0].focus();
});
