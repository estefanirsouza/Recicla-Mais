// ======================= MENU MOBILE =======================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menuMobile = document.getElementById("menu-mobile");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menuMobile.classList.toggle("show");
    });
  }

  const links = menuMobile?.querySelectorAll(".mobile-link") ?? [];
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("show");
    });
  });
});

// ======================= API CONFIG =======================
const API =
  "http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api/recyclereward";

const form = document.getElementById("formRecompensa");
const btnExcluir = document.getElementById("btnExcluir");

// Campos do formulário
const campoNome = document.getElementById("campoNome");
const campoPontos = document.getElementById("campoPontos");
const campoDescricao = document.getElementById("campoDescricao");
const campoCidade = document.getElementById("campoCidade");
const campoEstado = document.getElementById("campoEstado");
const campoCep = document.getElementById("campoCep");
const campoEndereco = document.getElementById("campoEndereco");
const campoBairro = document.getElementById("campoBairro");
const campoTelefone = document.getElementById("campoTelefone");

const contadorDescricao = document.getElementById("contadorDescricao");

campoDescricao.addEventListener("input", () => {
  let tamanho = campoDescricao.value.length;

  if (tamanho > 50) {
    campoDescricao.value = campoDescricao.value.slice(0, 50);
    tamanho = 50;
  }

  contadorDescricao.textContent = `${tamanho} / 50 caracteres`;
});

const urlParams = new URLSearchParams(window.location.search);
const recompensaId = urlParams.get("id");

// ===========================
// CARREGAR DADOS PARA EDIÇÃO
// ===========================
document.addEventListener("DOMContentLoaded", async () => {
  if (!form) return;

  if (recompensaId) {
    try {
      const res = await fetch(`${API}/get/${recompensaId}`);
      const dados = await res.json();

      campoNome.value = dados.name;
      campoPontos.value = dados.defaultValidDays;
      campoDescricao.value = dados.description;
      campoCidade.value = dados.city;
      campoEstado.value = dados.state;
      campoCep.value = dados.zipCode ?? "";
      campoEndereco.value = dados.address ?? "";
      campoBairro.value = dados.neighborhood ?? "";
      campoTelefone.value = dados.phoneNumber ?? "";
    } catch (e) {
      alert("Erro ao carregar recompensa!");
      console.error(e);
    }
  } else if (btnExcluir) {
    btnExcluir.style.display = "none";
  }
});

// ===========================
// SALVAR
// ===========================
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ------------------------------
    // VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
    // ------------------------------
    let erros = [];

    if (!campoNome.value.trim()) {
      erros.push("- Nome da Recompensa");
    }

    if (!campoPontos.value || Number(campoPontos.value) <= 0) {
      erros.push("- Dias Válidos (maior que zero)");
    }

    if (!campoCidade.value.trim()) {
      erros.push("- Cidade");
    }

    if (!campoEstado.value.trim()) {
      erros.push("- Estado");
    }

    // Se houver erros → impede o envio
    if (erros.length > 0) {
      alert(
        "⚠ Por favor, preencha os seguintes campos obrigatórios:\n\n" +
          erros.join("\n")
      );
      return;
    }

    // ------------------------------
    // OBJETO A ENVIAR PARA A API
    // ------------------------------
    const objeto = {
      name: campoNome.value,
      description: campoDescricao.value,
      defaultValidDays: Number(campoPontos.value),

      // Obrigatórios na API
      city: campoCidade.value,
      state: campoEstado.value,

      // Opcionais, mas aceitos
      address: campoEndereco.value || "Não informado",
      neighborhood: campoBairro.value || "Não informado",
      city: campoCidade.value || "Não informado",
      state: campoEstado.value || "Não informado",
      zipCode: campoCep.value || "Não informado",
      phoneNumber: campoTelefone.value || "Não informado",

      // GUIDs obrigatórios
      userStoreId: "7ac52d2f-2259-4061-afd3-2d7298825c9e",
      userPartnerId: "205dd8d2-8344-4ad4-8ff5-a1abe0aada89",
    };

    try {
      if (recompensaId) {
        await fetch(`${API}/update/${recompensaId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objeto),
        });

        alert("Recompensa atualizada!");
      } else {
        await fetch(`${API}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(objeto),
        });

        alert("Recompensa criada!");
      }

      window.location.href = "./gerenciamento.html";
    } catch (e) {
      alert("Erro ao salvar recompensa!");
      console.error(e);
    }
  });
}

// ===========================
// EXCLUIR
// ===========================
if (btnExcluir) {
  btnExcluir.addEventListener("click", async () => {
    if (!confirm("Deseja excluir?")) return;

    try {
      await fetch(`${API}/delete/${recompensaId}`, { method: "DELETE" });
      alert("Recompensa removida!");
      window.location.href = "./gerenciamento.html";
    } catch (e) {
      alert("Erro ao excluir!");
      console.error(e);
    }
  });
}
