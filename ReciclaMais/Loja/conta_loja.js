document.addEventListener("DOMContentLoaded", () => {
  const senhaInput = document.getElementById("senha");
  const toggleBtn = document.getElementById("togglePwd");
  const form = document.getElementById("accountForm");

  // Mostrar / Ocultar Senha
  toggleBtn.addEventListener("click", () => {
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
      toggleBtn.setAttribute("aria-label", "Ocultar senha");
    } else {
      senhaInput.type = "password";
      toggleBtn.setAttribute("aria-label", "Mostrar senha");
    }
  });

  // Envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      usuario: document.getElementById("usuario").value,
      senha: document.getElementById("senha").value,
    };

    console.log("Dados enviados:", dados);

    const btn = document.querySelector(".save-btn");
    btn.textContent = "Salvando...";

    setTimeout(() => {
      btn.textContent = "Salvar";
      alert("Dados atualizados com sucesso (simulação).");
    }, 800);
  });
});
