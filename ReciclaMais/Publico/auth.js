/**
 * Módulo de Autenticação - Recicla+
 * Gerencia login, cadastro e redirecionamento de usuários
 */

// ===== CONFIGURAÇÃO DA API =====
// const API_BASE_URL = 'http://localhost:5055/api';

const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';


// ===== FUNÇÕES DE AUTENTICAÇÃO =====

/**
 * Mapeia o tipo de acesso selecionado no formulário para a role do sistema
 * @param {string} tipoAcesso - Tipo de acesso ('reciclador', 'parceiro', 'publico')
 * @returns {string} Role correspondente no sistema
 */
function mapearTipoParaRole(tipoAcesso) {
  const mapeamento = {
    'reciclador': 'Store',
    'parceiro': 'Partner',
    'publico': 'User'
  };
  return mapeamento[tipoAcesso] || 'User';
}

/**
 * Redireciona o usuário para a página inicial baseado na sua role
 * @param {string|Array} roles - Role(s) do usuário
 */
function redirecionarPorRole(roles) {
  // Verificar roles (pode ser array ou string)
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  
  if (rolesArray.includes('Store')) {
    // Reciclador/Loja
    window.location.href = '../Loja/home_loja.html';
  } else if (rolesArray.includes('Partner')) {
    // Parceiro
    window.location.href = '../Parceiro/home_parceiro.html';
  } else if (rolesArray.includes('User')) {
    // Usuário público
    window.location.href = '../Usuarios/home_usario.html';
  } else if (rolesArray.includes('Admin')) {
    // Admin - redirecionar para usuário por padrão
    window.location.href = '../Usuarios/home_usario.html';
  } else {
    // Fallback para usuário
    window.location.href = '../Usuarios/home_usario.html';
  }
}

/**
 * Realiza o cadastro de um novo usuário
 * @param {Object} dados - Dados do usuário para cadastro
 * @param {string} dados.userName - Nome de usuário
 * @param {string} dados.firstName - Primeiro nome
 * @param {string} dados.lastName - Último nome
 * @param {string} dados.email - Email do usuário
 * @param {string} dados.password - Senha do usuário
 * @param {string} dados.role - Role do usuário
 * @returns {Promise<Object>} Dados do usuário cadastrado
 */
async function fazerCadastro(dados) {
  try {
    const response = await fetch(`${API_BASE_URL}/Login/RegisterUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Se houver erros, mostrar mensagem
      const errorMessage = data.errors 
        ? Array.isArray(data.errors) 
          ? data.errors.join(', ') 
          : data.errors
        : data.message || 'Erro ao realizar cadastro';
      throw new Error(errorMessage);
    }
    
    // Salvar token e dados do usuário
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify({
        id: data.id,
        email: data.email,
        name: data.name,
        surname: data.surname,
        userName: data.userName,
        roles: data.roles
      }));
    }
    
    // Redirecionar baseado na role
    redirecionarPorRole(data.roles);
    
    return data;
  } catch (error) {
    console.error('Erro no cadastro:', error);
    throw error;
  }
}

/**
 * Realiza o login de um usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} Dados do usuário autenticado
 */
async function fazerLogin(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/Login/SignIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = data.message || 'Email ou senha inválidos';
      throw new Error(errorMessage);
    }
    
    // Salvar token e dados do usuário
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify({
        id: data.id,
        email: data.email,
        name: data.name,
        surname: data.surname,
        userName: data.userName,
        roles: data.roles
      }));
    }
    
    // Redirecionar baseado na role
    redirecionarPorRole(data.roles);
    
    return data;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
}

/**
 * Obtém o token de autenticação armazenado
 * @returns {string|null} Token JWT ou null se não existir
 */
function obterToken() {
  return localStorage.getItem('authToken');
}

/**
 * Obtém os dados do usuário autenticado
 * @returns {Object|null} Dados do usuário ou null se não existir
 */
function obterDadosUsuario() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} True se o usuário estiver autenticado
 */
function estaAutenticado() {
  return !!obterToken();
}

/**
 * Faz logout do usuário, removendo token e dados do localStorage
 */
function fazerLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  window.location.href = './login.html';
}

// ===== INICIALIZAÇÃO DOS FORMULÁRIOS =====
document.addEventListener('DOMContentLoaded', () => {
  // ===== LOGIN FORM =====
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const loginInput = document.getElementById('login');
      const senhaInput = document.getElementById('senha');
      
      // O login pode ser email ou username, mas a API espera email
      // Vamos assumir que o campo "login" pode ser email
      const email = loginInput.value.trim();
      const password = senhaInput.value;
      
      if (!email || !password) {
        mostrarMensagem('Por favor, preencha todos os campos', 'error');
        return;
      }
      
      // Desabilitar botão durante o processo
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Entrando...';
      
      try {
        await fazerLogin(email, password);
        mostrarMensagem('Login realizado com sucesso!', 'success');
      } catch (error) {
        mostrarMensagem(error.message || 'Erro ao fazer login. Tente novamente.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // ===== CADASTRO FORM =====
  const cadastroForm = document.querySelector('.cadastro-form');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nomeInput = document.getElementById('nome');
      const emailInput = document.getElementById('email');
      const loginInput = document.getElementById('login');
      const senhaInput = document.getElementById('senha');
      const tipoAcessoSelect = document.getElementById('tipo-acesso');
      
      const nome = nomeInput.value.trim();
      const email = emailInput.value.trim();
      const userName = loginInput.value.trim();
      const password = senhaInput.value;
      const tipoAcesso = tipoAcessoSelect.value;
      
      // Validações
      if (!nome || !email || !userName || !password || !tipoAcesso) {
        mostrarMensagem('Por favor, preencha todos os campos', 'error');
        return;
      }
      
      if (!validarEmail(email)) {
        mostrarMensagem('Por favor, insira um email válido', 'error');
        return;
      }
      
      if (password.length < 6) {
        mostrarMensagem('A senha deve ter pelo menos 6 caracteres', 'error');
        return;
      }
      
      // Separar nome completo em primeiro e último nome
      const nomeParts = nome.split(' ');
      const firstName = nomeParts[0] || nome;
      const lastName = nomeParts.slice(1).join(' ') || '';
      
      // Mapear tipo de acesso para role
      const role = mapearTipoParaRole(tipoAcesso);
      
      // Desabilitar botão durante o processo
      const submitBtn = cadastroForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Criando conta...';
      
      try {
        await fazerCadastro({
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role
        });
        mostrarMensagem('Conta criada com sucesso!', 'success');
      } catch (error) {
        mostrarMensagem(error.message || 'Erro ao criar conta. Tente novamente.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});

