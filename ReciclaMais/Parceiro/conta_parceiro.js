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

// Função para buscar dados do parceiro (ponto de reciclagem) da API
async function buscarDadosParceiroAPI(userId) {
  try {
    const token = obterToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Buscar todos os pontos de reciclagem e filtrar por userId
    const response = await fetch(`${API_BASE_URL}/RecyclePoint/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do parceiro');
    }

    const pontos = await response.json();
    // Encontrar o ponto de reciclagem associado a este usuário
    const pontoParceiro = pontos.find(p => p.userId === userId);
    return pontoParceiro;
  } catch (error) {
    console.error('Erro ao buscar dados do parceiro:', error);
    return null;
  }
}

// Função para preencher formulário com dados do usuário e parceiro
function preencherFormulario(dadosUsuario, dadosParceiro) {
  if (!dadosUsuario) return;

  const empresaInput = document.getElementById("empresa");
  const cnpjInput = document.getElementById("cnpj");
  const inscricaoInput = document.getElementById("inscricao");
  const emailInput = document.getElementById("email");
  const telefoneInput = document.getElementById("telefone");
  const horarioInput = document.getElementById("horario");
  const usuarioInput = document.getElementById("usuario");

  // Preencher dados do parceiro (ponto de reciclagem) se existirem
  if (dadosParceiro) {
    if (empresaInput && dadosParceiro.name) {
      empresaInput.value = dadosParceiro.name || '';
    }
    if (telefoneInput && dadosParceiro.phoneNumber) {
      telefoneInput.value = dadosParceiro.phoneNumber || '';
    }
    if (horarioInput && dadosParceiro.workingHours) {
      horarioInput.value = dadosParceiro.workingHours || '';
    }
    // CNPJ e Inscrição Estadual não estão no modelo RecyclePoint atual
    // Seria necessário adicionar esses campos ao modelo ou criar um modelo separado
  }

  // Preencher dados do usuário
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
  preencherFormulario(userData, null);

  // Tentar buscar dados atualizados da API
  try {
    const [dadosAPI, dadosParceiro] = await Promise.all([
      buscarDadosUsuarioAPI(userData.id),
      buscarDadosParceiroAPI(userData.id)
    ]);
    
    if (dadosAPI || dadosParceiro) {
      preencherFormulario(dadosAPI || userData, dadosParceiro);
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    // Continuar com dados do localStorage se a API falhar
  }

  // Mostrar / Ocultar Senha
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isPassword = senhaInput.type === "password";
      senhaInput.type = isPassword ? "text" : "password";
      toggleBtn.setAttribute(
        "aria-label",
        isPassword ? "Ocultar senha" : "Mostrar senha"
      );
    });
  }

  // Envio do formulário
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const empresa = document.getElementById("empresa").value;
      const cnpj = document.getElementById("cnpj").value;
      const inscricao = document.getElementById("inscricao").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
      const horario = document.getElementById("horario").value;
      const usuario = document.getElementById("usuario").value;
      const senha = document.getElementById("senha").value;

      // Validações básicas
      if (!empresa || !email) {
        alert("Por favor, preencha pelo menos o nome da empresa e o e-mail.");
        return;
      }

      const btn = document.querySelector(".save-btn");
      const textoOriginal = btn.textContent;
      btn.disabled = true;
      btn.textContent = "Salvando...";

      try {
        // Nota: Não há endpoint de atualização de usuário ou parceiro na API atual
        // Por enquanto, apenas atualizamos o localStorage
        const dadosAtualizados = {
          ...userData,
          email: email,
          userName: usuario
        };
        localStorage.setItem('userData', JSON.stringify(dadosAtualizados));

        // Se houver senha nova, seria necessário um endpoint de atualização de senha
        if (senha) {
          console.warn('Atualização de senha requer endpoint específico na API');
        }

        // Nota: Atualização de dados do parceiro (empresa, CNPJ, telefone, horário)
        // requereria um endpoint específico na API ou atualização do RecyclePoint

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
