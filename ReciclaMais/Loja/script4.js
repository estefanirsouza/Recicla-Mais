// script4.js - Loja
console.log("JS CARREGOU!");

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

// Função para buscar dados da loja na API
async function buscarDadosLojaAPI(userId) {
  try {
    const token = obterToken();
    if (!token) {
      throw new Error('Usuário não autenticado');
    }

    // Buscar todas as lojas e filtrar por userId
    const response = await fetch(`${API_BASE_URL}/RecycleReward/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da loja');
    }

    const lojas = await response.json();
    // Encontrar a loja associada a este usuário
    const loja = lojas.find(l => l.userId === userId);
    return loja;
  } catch (error) {
    console.error('Erro ao buscar dados da loja:', error);
    return null;
  }
}

// Função para atualizar nome da loja na página
async function atualizarNomeLoja() {
  const userData = obterDadosUsuario();
  const nomeElement = document.getElementById('nome-loja');
  
  if (!userData || !userData.id) {
    // Se não estiver autenticado, redirecionar para login
    window.location.href = '../Publico/login.html';
    return;
  }
  
  if (nomeElement) {
    // Tentar buscar dados da loja da API
    try {
      const dadosLoja = await buscarDadosLojaAPI(userData.id);
      if (dadosLoja && dadosLoja.name) {
        nomeElement.textContent = dadosLoja.name;
      } else {
        // Fallback para nome do usuário se não encontrar loja
        const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
        nomeElement.textContent = nomeCompleto || userData.userName || 'Loja';
      }
    } catch (error) {
      console.error('Erro ao buscar nome da loja:', error);
      // Fallback para nome do usuário
      const nomeCompleto = `${userData.name || ''} ${userData.surname || ''}`.trim();
      nomeElement.textContent = nomeCompleto || userData.userName || 'Loja';
    }
  }
}

// ======================= MENU MOBILE =======================
document.addEventListener("DOMContentLoaded", async () => {
  // Atualizar nome da loja
  await atualizarNomeLoja();
  
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
});
