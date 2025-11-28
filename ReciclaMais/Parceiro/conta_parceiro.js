document.addEventListener("DOMContentLoaded", () => {
  const senhaInput = document.getElementById("senha");
  const toggleBtn = document.getElementById("togglePwd");
  const form = document.getElementById("accountForm");

  // Mostrar / Ocultar Senha
  toggleBtn.addEventListener("click", () => {
    const isPassword = senhaInput.type === "password";
    senhaInput.type = isPassword ? "text" : "password";
    toggleBtn.setAttribute(
      "aria-label",
      isPassword ? "Ocultar senha" : "Mostrar senha"
    );
  });

  // Envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = {
      empresa: document.getElementById("empresa").value,
      cnpj: document.getElementById("cnpj").value,
      inscricao: document.getElementById("inscricao").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      horario: document.getElementById("horario").value,
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
