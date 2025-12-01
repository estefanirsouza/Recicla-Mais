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

// ======================= IDs FIXOS =======================
// Loja fixa vinculada à recompensa
const STORE_ID_FIXO = "b443154a-c6c5-48d0-a1ce-cbdf278aab6b";

const PARTNER_ID_FIXO = "41a7404c-a9e5-4795-9510-268fcfb6c045";

// Obter dados do usuário logado
function obterDadosUsuario() {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
}

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

    // Validar usuário logado
    const usuario = obterDadosUsuario();
    if (!usuario || !usuario.id) {
      alert("Erro: parceiro não identificado!");
      return;
    }

    

    // ------------------------------
    // VALIDAÇÃO DOS CAMPOS
    // ------------------------------
    let erros = [];

    if (!campoNome.value.trim()) erros.push("- Nome da Recompensa");
    if (!campoPontos.value || Number(campoPontos.value) <= 0)
      erros.push("- Dias Válidos (maior que zero)");
    if (!campoCidade.value.trim()) erros.push("- Cidade");
    if (!campoEstado.value.trim()) erros.push("- Estado");

    if (erros.length > 0) {
      alert("⚠ Preencha:\n\n" + erros.join("\n"));
      return;
    }

    // ------------------------------
    // OBJETO A ENVIAR
    // ------------------------------
    const objeto = {
      name: campoNome.value,
      description: campoDescricao.value,
      defaultValidDays: Number(campoPontos.value),

      city: campoCidade.value,
      state: campoEstado.value,
      address: campoEndereco.value || "Não informado",
      neighborhood: campoBairro.value || "Não informado",
      zipCode: campoCep.value || "Não informado",
      phoneNumber: campoTelefone.value || "Não informado",

      // IDs dinâmicos
      userStoreId: STORE_ID_FIXO,
      userPartnerId: PARTNER_ID_FIXO, // agora fixo
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
