// Configuração da API
const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';

// Função para obter token de autenticação
function obterToken() {
  return localStorage.getItem('authToken');
}

// Função para obter dados do usuário do localStorage
function obterDadosUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// Função para buscar dados completos do usuário da API
async function buscarDadosUsuarioAPI(userId) {
  try {
    const token = obterToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    const response = await fetch(`${API_BASE_URL}/User/get/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
}

// Função para preencher formulário com dados do usuário
function preencherFormulario(dadosUsuario) {
  if (!dadosUsuario) return;

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const usuarioInput = document.getElementById("usuario");

  // Preencher campos se existirem
  if (nomeInput && dadosUsuario.name) {
    const nomeCompleto = `${dadosUsuario.name || ''} ${dadosUsuario.surname || ''}`.trim();
    nomeInput.value = nomeCompleto || '';
  }

  if (emailInput && dadosUsuario.email) {
    emailInput.value = dadosUsuario.email || '';
  }

  if (usuarioInput && dadosUsuario.userName) {
    usuarioInput.value = dadosUsuario.userName || '';
  }

  // Senha não é preenchida por segurança
}

document.addEventListener("DOMContentLoaded", async () => {
  const senhaInput = document.getElementById("senha");
  const toggleBtn = document.getElementById("togglePwd");
  const form = document.getElementById("accountForm");

  // Verificar se o usuário está autenticado
  const userData = obterDadosUsuario();
  if (!userData || !userData.id) {
    // Redirecionar para login se não estiver autenticado
    window.location.href = '../Publico/login.html';
    return;
  }

  // Preencher formulário com dados do localStorage
  preencherFormulario(userData);

  // Tentar buscar dados atualizados da API
  try {
    const dadosAPI = await buscarDadosUsuarioAPI(userData.id);
    if (dadosAPI) {
      preencherFormulario(dadosAPI);
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    // Continuar com dados do localStorage se a API falhar
  }

  // Mostrar / Ocultar Senha
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (senhaInput.type === "password") {
        senhaInput.type = "text";
        toggleBtn.setAttribute("aria-label", "Ocultar senha");
      } else {
        senhaInput.type = "password";
        toggleBtn.setAttribute("aria-label", "Mostrar senha");
      }
    });
  }

  // Envio do formulário
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const usuario = document.getElementById("usuario").value;
      const senha = document.getElementById("senha").value;

      // Validações básicas
      if (!nome || !email) {
        alert("Por favor, preencha pelo menos o nome e o e-mail.");
        return;
      }

      const btn = document.querySelector(".save-btn");
      const textoOriginal = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Salvando...";

      try {
        // Nota: Não há endpoint de atualização de usuário na API atual
        // Por enquanto, apenas atualizamos o localStorage
        const nomeParts = nome.split(' ');
        const firstName = nomeParts[0] || nome;
        const lastName = nomeParts.slice(1).join(' ') || '';

        // Atualizar dados no localStorage
        const dadosAtualizados = {
          ...userData,
          name: firstName,
          surname: lastName,
          email: email,
          userName: usuario
        };
        localStorage.setItem('userData', JSON.stringify(dadosAtualizados));

        // Se houver senha nova, seria necessário um endpoint de atualização de senha
        if (senha) {
          console.warn('Atualização de senha requer endpoint específico na API');
        }

        btn.textContent = "Salvo!";
        setTimeout(() => {
          btn.textContent = textoOriginal;
          btn.disabled = false;
        }, 1500);
      } catch (error) {
        console.error('Erro ao salvar dados:', error);
        alert("Erro ao salvar dados. Tente novamente.");
        btn.textContent = textoOriginal;
        btn.disabled = false;
      }
    });
  }
});
