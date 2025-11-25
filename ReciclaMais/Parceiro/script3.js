document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menuMobile = document.getElementById('menu-mobile');

  hamburger.addEventListener('click', () => {
    menuMobile.classList.toggle('show');
  });

  const links = menuMobile.querySelectorAll('.mobile-link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuMobile.classList.remove('show');
    });
  });
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