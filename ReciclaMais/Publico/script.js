document.addEventListener('DOMContentLoaded', () => {
  // ===== MARCAR NAV-LINK ATIVO BASEADO NA PÁGINA =====
  function marcarNavLinkAtivo() {
    const currentPage = window.location.pathname.split('/').pop() || window.location.href.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (currentPage.includes('index.html') || currentPage === '' || currentPage.includes('index')) {
        if (href && href.includes('index.html')) {
          link.classList.add('active');
        }
      } else if (currentPage.includes('materiais.html') || currentPage.includes('materiais')) {
        if (href && href.includes('materiais.html')) {
          link.classList.add('active');
        }
      } else if (currentPage.includes('blog.html') || currentPage.includes('blog')) {
        if (href && href.includes('blog.html')) {
          link.classList.add('active');
        }
      } else if (currentPage.includes('regras.html') || currentPage.includes('regras')) {
        // Não há nav-link para regras, então não marca nada
      } else if (currentPage.includes('login.html') || currentPage.includes('login')) {
        // Não há nav-link para login, então não marca nada
      }
    });
  }
  
  marcarNavLinkAtivo();
  
  // ===== MENU MOBILE (existente) =====
  const hamburger = document.getElementById('hamburger');
  const menuMobile = document.getElementById('menu-mobile');

  if (hamburger && menuMobile) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (menuMobile.classList.contains('show')) {
        menuMobile.classList.remove('show');
        menuMobile.style.display = 'none';
      } else {
        menuMobile.classList.add('show');
        menuMobile.style.display = 'flex';
        menuMobile.style.flexDirection = 'column';
      }
    });

    // Marcar menu mobile ativo baseado na página atual
    function marcarMenuMobileAtivo() {
      const currentPage = window.location.pathname.split('/').pop() || window.location.href.split('/').pop() || '';
      const mobileLinks = menuMobile.querySelectorAll('a');
      
      mobileLinks.forEach(link => {
        link.classList.remove('active');
        
        if (currentPage.includes('index.html') || currentPage === '' || currentPage.includes('index')) {
          if (link.classList.contains('mobile-home')) {
            link.classList.add('active');
          }
        } else if (currentPage.includes('materiais.html') || currentPage.includes('materiais')) {
          if (link.classList.contains('mobile-materiais')) {
            link.classList.add('active');
          }
        } else if (currentPage.includes('blog.html') || currentPage.includes('blog')) {
          if (link.classList.contains('mobile-blog')) {
            link.classList.add('active');
          }
        } else if (currentPage.includes('regras.html') || currentPage.includes('regras')) {
          if (link.classList.contains('mobile-regras')) {
            link.classList.add('active');
          }
        } else if (currentPage.includes('login.html') || currentPage.includes('login')) {
          if (link.classList.contains('mobile-login')) {
            link.classList.add('active');
          }
        }
      });
    }
    
    marcarMenuMobileAtivo();
    
    menuMobile.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        // O link já tem href, só precisa fechar o menu
        menuMobile.style.display = 'none';
        menuMobile.classList.remove('show');
      }
    });

    document.addEventListener('click', (e) => {
      if (!menuMobile.contains(e.target) && !hamburger.contains(e.target)) {
        menuMobile.style.display = 'none';
        menuMobile.classList.remove('show');
      }
    });
  }

  // ===== MENU LATERAL (NOVO) =====
  const menuBtn = document.getElementById('menu-btn');
  const sideMenu = document.getElementById('side-menu');
  const closeBtn = document.getElementById('close-menu');

  if (menuBtn && sideMenu && closeBtn) {
    menuBtn.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
      sideMenu.classList.remove('open');
      menuBtn.classList.remove('open');
    });

    // Obter itens do menu
    const menuItems = sideMenu.querySelectorAll('.menu-item');
    
    // Marcar item ativo baseado na página atual
    function atualizarMenuAtivo() {
      // Obter página atual de várias formas possíveis
      let currentPage = window.location.pathname.split('/').pop() || '';
      if (!currentPage || currentPage === '') {
        currentPage = window.location.href.split('/').pop() || '';
      }
      if (!currentPage || currentPage === '') {
        currentPage = window.location.pathname;
      }
      
      // Remover active de todos primeiro
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      
      // Adicionar active baseado na página atual
      menuItems.forEach(item => {
        const span = item.querySelector('span');
        if (span) {
          const texto = span.textContent.trim();
          // Verificar se está na página de regras
          if ((currentPage.includes('regras.html') || currentPage.includes('regras')) && texto === 'Regras da Recompensa') {
            item.classList.add('active');
          } 
          // Verificar se está na página de login
          else if ((currentPage.includes('login.html') || currentPage.includes('login')) && texto === 'Login') {
            item.classList.add('active');
          }
        }
      });
    }
    
    // Executar ao carregar a página
    atualizarMenuAtivo();

    // Adicionar funcionalidade aos itens do menu lateral
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        if (item.querySelector('span').textContent === 'Regras da Recompensa') {
          window.location.href = 'regras.html';
        } else if (item.querySelector('span').textContent === 'Login') {
          window.location.href = 'login.html';
        }
        sideMenu.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }

  // ===== CARROSSEL HOME =====
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }, 5000);
  }

  // ===== AUTENTICAÇÃO =====
  // A lógica de autenticação foi movida para auth.js para melhor organização

  // ===== CONFIGURAÇÃO DA API =====
  const API_BASE_URL = 'http://ec2-54-233-50-250.sa-east-1.compute.amazonaws.com:5000/api';

  // ===== PONTOS DE COLETA =====
  const materiaisSection = document.getElementById('materiais-section');
  const pontosSection = document.getElementById('pontos-section');
  const backButton = document.getElementById('back-button');
  const pontosTitulo = document.getElementById('pontos-titulo');
  const pontosLista = document.getElementById('pontos-lista');
  const buscaPontosInput = document.getElementById('busca-pontos-input');
  const buscarPontosBtn = document.getElementById('buscar-pontos-btn');

  // Cache de pontos de coleta da API
  let todosOsPontosAPI = [];

  // Variáveis de paginação para pontos de coleta
  let pontosPorPagina = 6;
  let paginaAtualPontos = 0;
  let pontosFiltrados = [];

  // Função para buscar pontos de coleta da API
  async function buscarPontosDeColetaDaAPI() {
    try {
      const response = await fetch(`${API_BASE_URL}/RecyclePoint/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar pontos de coleta');
      }

      const pontos = await response.json();
      todosOsPontosAPI = pontos;
      return pontos;
    } catch (error) {
      console.error('Erro ao buscar pontos de coleta:', error);
      mostrarMensagem('Erro ao carregar pontos de coleta. Tente novamente.', 'error');
      return [];
    }
  }

  // Função para formatar endereço completo
  function formatarEndereco(ponto) {
    const partes = [];
    if (ponto.address) partes.push(ponto.address);
    if (ponto.neighborhood) partes.push(ponto.neighborhood);
    if (ponto.city) partes.push(ponto.city);
    if (ponto.state) partes.push(ponto.state);
    if (ponto.zipCode) partes.push(`CEP: ${ponto.zipCode}`);
    return partes.join(' – ') || 'Endereço não informado';
  }

  // Função para renderizar pontos com paginação
  function renderizarPontosComPaginacao(pontos) {
    pontosFiltrados = pontos;
    const totalPaginas = Math.ceil(pontos.length / pontosPorPagina);
    paginaAtualPontos = 0;
    
    if (pontos.length === 0) {
      pontosLista.innerHTML = `
        <div class="ponto-coleta-card">
          <h3>Nenhum ponto encontrado</h3>
          <p>Não há pontos de coleta cadastrados para este material no momento.</p>
        </div>
      `;
      return;
    }
    
    atualizarPontosPagina();
    atualizarPaginacaoPontos(totalPaginas);
  }

  // Função para atualizar os pontos da página atual
  function atualizarPontosPagina() {
    const inicio = paginaAtualPontos * pontosPorPagina;
    const fim = inicio + pontosPorPagina;
    const pontosDaPagina = pontosFiltrados.slice(inicio, fim);
    
    pontosLista.innerHTML = pontosDaPagina.map(ponto => `
      <div class="ponto-coleta-card">
        <div class="ponto-header">
          <h3>${ponto.name || 'Ponto de Coleta'}</h3>
        </div>
        <p class="endereco">${formatarEndereco(ponto)}</p>
        
        ${ponto.workingHours ? `
        <div class="info-section">
          <h4><i class="fa fa-clock"></i> Horário de Funcionamento</h4>
          <div class="horario">${ponto.workingHours}</div>
        </div>
        ` : ''}
        
        ${ponto.phoneNumber ? `
        <div class="info-section">
          <h4><i class="fa fa-phone"></i> Contato</h4>
          <div class="contato">${ponto.phoneNumber}</div>
        </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Função para atualizar paginação
  function atualizarPaginacaoPontos(totalPaginas) {
    const paginacaoContainer = document.getElementById('paginacao-pontos');
    if (!paginacaoContainer) {
      // Criar container de paginação se não existir
      const paginacaoDiv = document.createElement('div');
      paginacaoDiv.id = 'paginacao-pontos';
      paginacaoDiv.className = 'paginacao-pontos';
      pontosLista.parentNode.insertBefore(paginacaoDiv, pontosLista.nextSibling);
    }
    
    const paginacaoEl = document.getElementById('paginacao-pontos');
    if (totalPaginas <= 1) {
      paginacaoEl.innerHTML = '';
      return;
    }
    
    paginacaoEl.innerHTML = '';
    
    // Botão anterior
    const btnAnterior = document.createElement('button');
    btnAnterior.className = 'pagina-ponto-btn pagina-ponto-anterior';
    btnAnterior.innerHTML = '‹';
    btnAnterior.disabled = paginaAtualPontos === 0;
    btnAnterior.addEventListener('click', () => {
      if (paginaAtualPontos > 0) {
        paginaAtualPontos--;
        atualizarPontosPagina();
        atualizarPaginacaoPontos(totalPaginas);
      }
    });
    paginacaoEl.appendChild(btnAnterior);
    
    // Botões numéricos
    for (let i = 0; i < totalPaginas; i++) {
      const btn = document.createElement('button');
      btn.className = 'pagina-ponto-btn';
      if (i === paginaAtualPontos) {
        btn.classList.add('active');
      }
      btn.textContent = i + 1;
      btn.addEventListener('click', () => {
        paginaAtualPontos = i;
        atualizarPontosPagina();
        atualizarPaginacaoPontos(totalPaginas);
      });
      paginacaoEl.appendChild(btn);
    }
    
    // Botão próximo
    const btnProximo = document.createElement('button');
    btnProximo.className = 'pagina-ponto-btn pagina-ponto-proximo';
    btnProximo.innerHTML = '›';
    btnProximo.disabled = paginaAtualPontos === totalPaginas - 1;
    btnProximo.addEventListener('click', () => {
      if (paginaAtualPontos < totalPaginas - 1) {
        paginaAtualPontos++;
        atualizarPontosPagina();
        atualizarPaginacaoPontos(totalPaginas);
      }
    });
    paginacaoEl.appendChild(btnProximo);
  }

  // Removido: objeto pontosDeColeta hardcoded - agora busca da API

  // Função para mostrar pontos de coleta
  async function mostrarPontosDeColeta(material) {
    materialAtual = material;
    pontosTitulo.textContent = "Escolha o destino da sua Reciclagem";
    
    // Mostrar loading
    pontosLista.innerHTML = `
      <div class="ponto-coleta-card">
        <h3>Carregando pontos de coleta...</h3>
        <p>Aguarde enquanto buscamos os pontos disponíveis.</p>
      </div>
    `;
    
    materiaisSection.classList.add('hidden');
    pontosSection.classList.add('active');
    
    // Buscar pontos da API
    let pontos = [];
    if (todosOsPontosAPI.length === 0) {
      pontos = await buscarPontosDeColetaDaAPI();
    } else {
      pontos = todosOsPontosAPI;
    }
    
    // Filtrar por material se necessário (quando a API tiver essa relação)
    // Por enquanto, mostra todos os pontos
    todosOsPontos = pontos;
    
    renderizarPontosComPaginacao(pontos);
  }

  // Função para atualizar paginação
  function atualizarPaginacaoPontos(totalPaginas) {
    const paginacaoContainer = document.getElementById('paginacao-pontos');
    if (!paginacaoContainer) {
      // Criar container de paginação se não existir
      const paginacaoDiv = document.createElement('div');
      paginacaoDiv.id = 'paginacao-pontos';
      paginacaoDiv.className = 'paginacao-pontos';
      pontosLista.parentNode.insertBefore(paginacaoDiv, pontosLista.nextSibling);
    }
    
    const paginacaoEl = document.getElementById('paginacao-pontos');
    if (totalPaginas <= 1) {
      paginacaoEl.innerHTML = '';
      return;
    }
    
    paginacaoEl.innerHTML = '';
    
    // Botão anterior
    const btnAnterior = document.createElement('button');
    btnAnterior.className = 'pagina-ponto-btn pagina-ponto-anterior';
    btnAnterior.innerHTML = '‹';
    btnAnterior.disabled = paginaAtualPontos === 0;
    btnAnterior.addEventListener('click', () => {
      if (paginaAtualPontos > 0) {
        paginaAtualPontos--;
        atualizarPontosPagina();
        atualizarPaginacaoPontos(totalPaginas);
      }
    });
    paginacaoEl.appendChild(btnAnterior);
    
    // Botões numéricos
    for (let i = 0; i < totalPaginas; i++) {
      const btn = document.createElement('button');
      btn.className = 'pagina-ponto-btn';
      if (i === paginaAtualPontos) {
        btn.classList.add('active');
      }
      btn.textContent = i + 1;
      btn.addEventListener('click', () => {
        paginaAtualPontos = i;
        atualizarPontosPagina();
        atualizarPaginacaoPontos(totalPaginas);
      });
      paginacaoEl.appendChild(btn);
    }
    
    // Botão próximo
    const btnProximo = document.createElement('button');
    btnProximo.className = 'pagina-ponto-btn pagina-ponto-proximo';
    btnProximo.innerHTML = '›';
    btnProximo.disabled = paginaAtualPontos === totalPaginas - 1;
    btnProximo.addEventListener('click', () => {
      if (paginaAtualPontos < totalPaginas - 1) {
        paginaAtualPontos++;
        atualizarPontosPagina();
        atualizarPaginacaoPontos(totalPaginas);
      }
    });
    paginacaoEl.appendChild(btnProximo);
  }

  // Função para mostrar pontos de coleta
  async function mostrarPontosDeColeta(material) {
    materialAtual = material;
    pontosTitulo.textContent = "Escolha o destino da sua Reciclagem";
    
    // Mostrar loading
    pontosLista.innerHTML = `
      <div class="ponto-coleta-card">
        <h3>Carregando pontos de coleta...</h3>
        <p>Aguarde enquanto buscamos os pontos disponíveis.</p>
      </div>
    `;
    
    materiaisSection.classList.add('hidden');
    pontosSection.classList.add('active');
    
    // Buscar pontos da API
    let pontos = [];
    if (todosOsPontosAPI.length === 0) {
      pontos = await buscarPontosDeColetaDaAPI();
    } else {
      pontos = todosOsPontosAPI;
    }
    
    // Filtrar por material se necessário (quando a API tiver essa relação)
    // Por enquanto, mostra todos os pontos
    todosOsPontos = pontos;
    
    renderizarPontosComPaginacao(pontos);
  }

  // Função para obter o nome formatado do material
  function getMaterialNome(material) {
    const nomes = {
      plastico: "Plástico",
      vidro: "Vidro",
      papel: "Papel",
      metal: "Metal",
      oleo: "Óleo",
      organicos: "Orgânico",
      hospitalares: "Hospitalar",
      moveis: "Móveis",
      eletronicos: "Eletrônicos"
    };
    return nomes[material] || material;
  }

  // Função para voltar aos materiais
  function voltarParaMateriais() {
    pontosSection.classList.remove('active');
    materiaisSection.classList.remove('hidden');
    buscaPontosInput.value = '';
  }

  // Variável para armazenar o material atual e todos os pontos disponíveis
  let materialAtual = null;
  let todosOsPontos = [];

  // Função para buscar pontos (por nome, endereço, cidade, etc)
  async function buscarPontos() {
    const termo = buscaPontosInput.value.toLowerCase().trim();
    
    if (!termo) {
      // Se não houver termo, mostrar todos os pontos
      await mostrarPontosDeColeta(materialAtual);
      return;
    }

    // Garantir que temos os pontos da API
    if (todosOsPontosAPI.length === 0) {
      await buscarPontosDeColetaDaAPI();
    }
    
    // Filtrar pontos que correspondem ao termo de busca
    const pontosFiltrados = todosOsPontosAPI.filter(ponto => {
      const nomeMatch = (ponto.name || '').toLowerCase().includes(termo);
      const enderecoMatch = (ponto.address || '').toLowerCase().includes(termo);
      const bairroMatch = (ponto.neighborhood || '').toLowerCase().includes(termo);
      const cidadeMatch = (ponto.city || '').toLowerCase().includes(termo);
      const estadoMatch = (ponto.state || '').toLowerCase().includes(termo);
      const cepMatch = (ponto.zipCode || '').toLowerCase().includes(termo);
      const telefoneMatch = (ponto.phoneNumber || '').toLowerCase().includes(termo);
      const horarioMatch = (ponto.workingHours || '').toLowerCase().includes(termo);
      
      return nomeMatch || enderecoMatch || bairroMatch || cidadeMatch || estadoMatch || cepMatch || telefoneMatch || horarioMatch;
    });

    // Renderizar pontos filtrados com paginação
    if (pontosFiltrados.length === 0) {
      pontosLista.innerHTML = `
        <div class="ponto-coleta-card">
          <h3>Nenhum ponto encontrado</h3>
          <p>Não encontramos pontos que correspondam à sua busca. Tente usar outros termos.</p>
        </div>
      `;
      const paginacaoEl = document.getElementById('paginacao-pontos');
      if (paginacaoEl) paginacaoEl.innerHTML = '';
    } else {
      renderizarPontosComPaginacao(pontosFiltrados);
    }
  }

  // Event Listeners para pontos de coleta
  if (materiaisSection) {
    // Clique nos materiais
    const materiais = document.querySelectorAll('.material');
    materiais.forEach(material => {
      material.addEventListener('click', () => {
        const materialType = material.getAttribute('data-material');
        mostrarPontosDeColeta(materialType);
      });
    });

    // Botão voltar
    if (backButton) {
      backButton.addEventListener('click', voltarParaMateriais);
    }

    // Busca de pontos
    if (buscarPontosBtn) {
      buscarPontosBtn.addEventListener('click', buscarPontos);
    }

    if (buscaPontosInput) {
      buscaPontosInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          buscarPontos();
        }
      });
    }
  }

  // ===== CARROSSEL DO BLOG =====
  const blogCarrossel = document.querySelector('.blog-carrossel');
  
  if (blogCarrossel) {
    const postsContainer = blogCarrossel.querySelector('#posts-container');
    const btnAnterior = blogCarrossel.querySelector('#btn-anterior');
    const btnProximo = blogCarrossel.querySelector('#btn-proximo');
    const paginacao = blogCarrossel.querySelector('#paginacao');
    
    // Dados dos posts do blog
    const posts = [
      {
        titulo: "A importância de Reciclar",
        conteudo: `
          <p>Reciclar vai muito além de descartar corretamente o lixo. É uma forma de cuidar do planeta, preservar recursos e causar impacto positivo na sociedade.</p>
          
          <p>Quando reciclamos, evitamos que toneladas de resíduos acabem em aterros ou no meio ambiente, reduzindo a poluição dos cursos d'água e do ar, e ainda economizamos energia e matéria-prima que seriam usadas na produção de novos produtos.</p>
          
          <h3>Benefícios Ambientais</h3>
          <p>Além disso, a reciclagem gera empregos, movimenta a economia e incentiva a responsabilidade social das empresas e das pessoas. Cada garrafa, lata ou papel reciclado representam uma escolha consciente em favor das próximas gerações.</p>
          
          <p>Reciclar é simples, mas o resultado é gigantesco: menos desperdício, mais sustentabilidade e um futuro mais verde.</p>
        `
      },
      {
        titulo: "Como separar corretamente os materiais recicláveis",
        conteudo: `
          <h3>Passo a passo para separação ideal</h3>
          <p>Separar os materiais recicláveis corretamente é fundamental para garantir que eles possam ser reaproveitados. Comece limpando os resíduos para evitar contaminação.</p>
          
          <h3>Dicas importantes:</h3>
          <p>- Lave embalagens de alimentos antes de descartar</p>
          <p>- Separe por categorias: plástico, vidro, metal e papel</p>
          <p>- Amasse latas e garrafas para ocupar menos espaço</p>
          <p>- Remova tampas e rótulos quando possível</p>
          
          <p>Uma separação bem feita aumenta significativamente a eficiência do processo de reciclagem.</p>
        `
      },
      {
        titulo: "Benefícios da reciclagem para o meio ambiente",
        conteudo: `
          <h3>Preservação de recursos naturais</h3>
          <p>A reciclagem contribui diretamente para a preservação do planeta, reduzindo a extração de matéria-prima virgem e diminuindo o impacto ambiental.</p>
          
          <h3>Redução da poluição</h3>
          <p>Quando reciclamos, reduzimos a quantidade de lixo em aterros sanitários, evitando a contaminação do solo e da água, além de diminuir a emissão de gases do efeito estufa.</p>
          
          <h3>Economia de energia</h3>
          <p>Produzir produtos a partir de materiais reciclados consome menos energia do que produzi-los a partir de matéria-prima nova, contribuindo para a eficiência energética.</p>
        `
      },
      {
        titulo: "Tipos de materiais recicláveis e como identificá-los",
        conteudo: `
          <h3>Plásticos</h3>
          <p>Identificados pelos símbolos de 1 a 7. Os mais comuns são PET (1), PEAD (2) e PVC (3).</p>
          
          <h3>Vidros</h3>
          <p>Garrafas, potes e frascos de vidro podem ser infinitamente reciclados sem perder qualidade.</p>
          
          <h3>Metais</h3>
          <p>Latas de alumínio e aço são altamente recicláveis e têm grande valor no mercado de reciclagem.</p>
          
          <h3>Papéis</h3>
          <p>Jornais, revistas, caixas de papelão e papéis de escritório são facilmente recicláveis.</p>
        `
      },
      {
        titulo: "O futuro da reciclagem: tecnologias e inovações",
        conteudo: `
          <h3>Tecnologias emergentes</h3>
          <p>Novas tecnologias estão revolucionando a reciclagem, desde máquinas de separação automatizada até processos químicos avançados.</p>
          
          <h3>Reciclagem química</h3>
          <p>Permite reciclar plásticos que antes eram considerados não recicláveis, abrindo novas possibilidades para a economia circular.</p>
          
          <h3>Inteligência Artificial</h3>
          <p>Sistemas de IA estão sendo usados para melhorar a triagem de materiais, aumentando a eficiência e a qualidade do processo.</p>
          
          <p>O futuro da reciclagem é promissor, com inovações constantes que tornam o processo mais eficiente e abrangente.</p>
        `
      },
      {
        titulo: "Como reciclar óleo de cozinha usado corretamente",
        conteudo: `
          <h3>Por que reciclar óleo de cozinha?</h3>
          <p>O óleo de cozinha usado é um dos maiores poluentes quando descartado incorretamente. Um único litro de óleo pode contaminar até 25.000 litros de água potável.</p>
          
          <h3>Como armazenar</h3>
          <p>Deixe o óleo esfriar completamente após o uso. Armazene em garrafas PET limpas e fechadas. Evite misturar com água ou outros resíduos.</p>
          
          <h3>Onde descartar</h3>
          <p>Procure pontos de coleta especializados na sua cidade. Muitas cooperativas e empresas de reciclagem recebem óleo usado, transformando-o em sabão, biodiesel e outros produtos.</p>
          
          <p>Reciclar óleo de cozinha é simples e faz uma enorme diferença para o meio ambiente!</p>
        `
      },
      {
        titulo: "Economia circular: o que é e como participar",
        conteudo: `
          <h3>Conceito de economia circular</h3>
          <p>A economia circular é um modelo que busca eliminar o desperdício e manter os recursos em uso pelo maior tempo possível. É o oposto da economia linear tradicional.</p>
          
          <h3>Princípios básicos</h3>
          <p>Reduzir, reutilizar e reciclar são os três pilares fundamentais. Reduzir o consumo, reutilizar produtos sempre que possível e reciclar materiais no fim da vida útil.</p>
          
          <h3>Como você pode participar</h3>
          <p>Compre produtos duráveis, repare em vez de substituir, doe itens que não usa mais, e sempre separe corretamente os materiais recicláveis.</p>
          
          <p>A economia circular não é apenas sobre reciclagem, mas sobre repensar completamente como usamos os recursos do planeta.</p>
        `
      },
      {
        titulo: "Plásticos: tipos e formas de reciclagem",
        conteudo: `
          <h3>Tipos de plástico</h3>
          <p>Existem sete tipos principais de plástico, identificados por números de 1 a 7. Cada tipo tem características diferentes e requer processos específicos de reciclagem.</p>
          
          <h3>PET (1) - Polietileno Tereftalato</h3>
          <p>Comum em garrafas de refrigerante e água. Altamente reciclável, é transformado em fibras, embalagens e até mesmo novas garrafas.</p>
          
          <h3>PEAD (2) - Polietileno de Alta Densidade</h3>
          <p>Usado em embalagens de produtos de limpeza e garrafas de leite. Pode ser reciclado em novas embalagens, tubos e brinquedos.</p>
          
          <h3>Importância da separação</h3>
          <p>Separar corretamente os tipos de plástico facilita o processo de reciclagem e aumenta o valor dos materiais reciclados.</p>
        `
      },
      {
        titulo: "Compostagem caseira: transforme resíduos orgânicos em adubo",
        conteudo: `
          <h3>O que é compostagem?</h3>
          <p>A compostagem é o processo de decomposição de resíduos orgânicos, transformando-os em adubo rico em nutrientes para plantas.</p>
          
          <h3>O que pode ser compostado</h3>
          <p>Cascas de frutas e legumes, restos de verduras, borra de café, cascas de ovos trituradas, folhas secas e grama cortada são ideais para compostagem.</p>
          
          <h3>O que evitar</h3>
          <p>Não composte carnes, laticínios, óleos, alimentos processados ou produtos químicos. Estes podem atrair pragas ou contaminar o composto.</p>
          
          <h3>Benefícios</h3>
          <p>A compostagem reduz o lixo doméstico em até 40%, cria um adubo natural grátis e ajuda a reduzir emissões de gases do efeito estufa.</p>
        `
      },
      {
        titulo: "Reciclagem de eletrônicos: cuidados importantes",
        conteudo: `
          <h3>Por que reciclar eletrônicos?</h3>
          <p>Eletrônicos contêm materiais valiosos como ouro, prata e cobre, mas também substâncias tóxicas como chumbo e mercúrio que precisam ser tratadas corretamente.</p>
          
          <h3>Dados pessoais</h3>
          <p>Antes de descartar, remova todos os dados pessoais. Formate computadores e celulares, remova cartões de memória e SIM cards.</p>
          
          <h3>Onde descartar</h3>
          <p>Procure pontos de coleta especializados ou programas de reciclagem oferecidos pelas próprias marcas. Nunca descarte eletrônicos no lixo comum.</p>
          
          <h3>Benefícios</h3>
          <p>A reciclagem de eletrônicos recupera materiais valiosos, reduz a necessidade de mineração e previne a contaminação ambiental.</p>
        `
      },
      {
        titulo: "Vidro: o material 100% reciclável",
        conteudo: `
          <h3>Características do vidro</h3>
          <p>O vidro pode ser reciclado infinitamente sem perder qualidade ou pureza. É um dos materiais mais sustentáveis para embalagens.</p>
          
          <h3>Como reciclar vidro</h3>
          <p>Lave bem os recipientes de vidro antes de descartar. Remova rótulos de papel quando possível. Separe por cores quando houver essa opção.</p>
          
          <h3>Economia de recursos</h3>
          <p>Reciclar vidro economiza energia, reduz o uso de areia e outros recursos naturais, e diminui significativamente as emissões de CO2.</p>
          
          <h3>O que não pode ser reciclado</h3>
          <p>Cristais, espelhos, vidros temperados e cerâmicas não devem ser misturados com vidro reciclável comum, pois podem contaminar o processo.</p>
        `
      },
      {
        titulo: "Papel e papelão: como reciclar corretamente",
        conteudo: `
          <h3>Tipos de papel reciclável</h3>
          <p>Jornais, revistas, papel de escritório, envelopes, papelão e caixas podem ser reciclados. Mantenha-os secos e limpos.</p>
          
          <h3>O que não reciclar</h3>
          <p>Papel engordurado, papel plastificado, papel higiênico usado, fotografias e papel carbono não podem ser reciclados normalmente.</p>
          
          <h3>Preparação para reciclagem</h3>
          <p>Remova clipes, fitas adesivas e grampos antes de descartar. Amasse caixas de papelão para economizar espaço durante o transporte.</p>
          
          <h3>Benefícios ambientais</h3>
          <p>Reciclar papel reduz o corte de árvores, economiza água e energia, e reduz a quantidade de lixo em aterros sanitários.</p>
        `
      },
      {
        titulo: "Metais: alumínio e aço na reciclagem",
        conteudo: `
          <h3>Alumínio</h3>
          <p>O alumínio é infinitamente reciclável e mantém suas propriedades. A reciclagem de alumínio consome 95% menos energia que a produção primária.</p>
          
          <h3>Aço</h3>
          <p>Latas de aço são 100% recicláveis e podem ser transformadas em novos produtos sem perda de qualidade. O aço pode ser reciclado infinitamente.</p>
          
          <h3>Como preparar</h3>
          <p>Lave bem as latas antes de descartar. Amasse latas de alumínio para economizar espaço. Remova rótulos quando possível.</p>
          
          <h3>Impacto positivo</h3>
          <p>A reciclagem de metais reduz drasticamente a necessidade de mineração, economiza energia e água, e diminui a poluição ambiental.</p>
        `
      },
      {
        titulo: "Reciclagem de resíduos hospitalares: segurança em primeiro lugar",
        conteudo: `
          <h3>Importância do descarte correto</h3>
          <p>Resíduos hospitalares podem conter agentes patogênicos e substâncias perigosas. O descarte correto é essencial para proteger a saúde pública e o meio ambiente.</p>
          
          <h3>Tipos de resíduos</h3>
          <p>Medicamentos vencidos, agulhas, seringas, materiais perfurocortantes e resíduos biológicos requerem tratamento especial antes do descarte.</p>
          
          <h3>Onde descartar</h3>
          <p>Sempre procure pontos de coleta especializados ou farmácias que recebem medicamentos vencidos. Nunca descarte no lixo comum ou no esgoto.</p>
          
          <h3>Responsabilidade</h3>
          <p>O descarte correto de resíduos hospitalares é uma responsabilidade compartilhada entre cidadãos, estabelecimentos de saúde e órgãos públicos.</p>
        `
      }
    ];

    // Constantes de paginação
    const POSTS_POR_PAGINA = 5;
    let paginaAtual = 0;
    let postAtual = 0; // Post atual dentro da página
    
    // Agrupar posts em páginas de 5
    const paginas = [];
    for (let i = 0; i < posts.length; i += POSTS_POR_PAGINA) {
      paginas.push(posts.slice(i, i + POSTS_POR_PAGINA));
    }

    // Renderizar posts no HTML
    function renderizarPosts() {
      postsContainer.innerHTML = '';
      
      paginas.forEach((pagina, indexPagina) => {
        const paginaDiv = document.createElement('div');
        paginaDiv.className = 'post-page';
        if (indexPagina === paginaAtual) {
          paginaDiv.classList.add('active');
        }
        
        pagina.forEach((post, indexPost) => {
          const postArticle = document.createElement('article');
          postArticle.className = 'post';
          if (indexPagina === paginaAtual && indexPost === postAtual) {
            postArticle.style.display = 'block';
          } else {
            postArticle.style.display = 'none';
          }
          
          postArticle.innerHTML = `
            <h2>${post.titulo}</h2>
            ${post.conteudo}
          `;
          
          paginaDiv.appendChild(postArticle);
        });
        
        postsContainer.appendChild(paginaDiv);
      });
      
      atualizarNavegacao();
    }

    // Atualizar navegação
    function atualizarNavegacao() {
      const postsNaPaginaAtual = paginas[paginaAtual] || [];
      const totalPosts = posts.length;
      const indicePostGlobal = (paginaAtual * POSTS_POR_PAGINA) + postAtual;
      
      // Atualizar botões de setas
      btnAnterior.disabled = paginaAtual === 0 && postAtual === 0;
      btnProximo.disabled = indicePostGlobal === totalPosts - 1;
      
      // Mostrar/ocultar posts na página atual
      const paginaAtualElement = postsContainer.querySelectorAll('.post-page')[paginaAtual];
      if (paginaAtualElement) {
        const postsNaPagina = paginaAtualElement.querySelectorAll('.post');
        postsNaPagina.forEach((post, index) => {
          post.style.display = index === postAtual ? 'block' : 'none';
        });
        
        // Ativar página atual
        document.querySelectorAll('.post-page').forEach((pag, idx) => {
          pag.classList.toggle('active', idx === paginaAtual);
        });
      }
      
      atualizarBotoesPagina();
    }

    // Atualizar botões de paginação
    function atualizarBotoesPagina() {
      paginacao.innerHTML = '';
      
      // Mostrar paginação sempre (mesmo com uma página)
      if (paginas.length > 0) {
        // Apenas botões numéricos de página (sem setas)
        paginas.forEach((pagina, index) => {
          const btnPagina = document.createElement('button');
          btnPagina.className = 'pagina-btn';
          btnPagina.textContent = index + 1;
          
          if (index === paginaAtual) {
            btnPagina.classList.add('active');
          }
          
          btnPagina.addEventListener('click', () => {
            irParaPagina(index);
          });
          
          paginacao.appendChild(btnPagina);
        });
      }
    }

    // Ir para uma página específica
    function irParaPagina(novaPagina) {
      if (novaPagina >= 0 && novaPagina < paginas.length) {
        paginaAtual = novaPagina;
        postAtual = 0; // Voltar para o primeiro post da página
        renderizarPosts();
      }
    }

    // Navegação com setas
    btnAnterior.addEventListener('click', () => {
      if (postAtual > 0) {
        // Ir para o post anterior na mesma página
        postAtual--;
        atualizarNavegacao();
      } else if (paginaAtual > 0) {
        // Ir para a última página
        paginaAtual--;
        postAtual = paginas[paginaAtual].length - 1;
        renderizarPosts();
      }
    });

    btnProximo.addEventListener('click', () => {
      const indicePostGlobal = (paginaAtual * POSTS_POR_PAGINA) + postAtual;
      
      if (indicePostGlobal < posts.length - 1) {
        const postsNaPaginaAtual = paginas[paginaAtual] || [];
        
        if (postAtual < postsNaPaginaAtual.length - 1) {
          // Próximo post na mesma página
          postAtual++;
          atualizarNavegacao();
        } else if (paginaAtual < paginas.length - 1) {
          // Próxima página
          paginaAtual++;
          postAtual = 0;
          renderizarPosts();
        }
      }
    });

    // Inicializar
    renderizarPosts();
  }

  // ===== BUSCA CEP E MAPA =====
  let map = null;
  let marker = null;

  const buscaCepInput = document.getElementById('cep');
  const buscarCepBtn = document.getElementById('buscar');

  // Aguardar Leaflet carregar antes de inicializar
  function inicializarMapaQuandoPronto() {
    if (typeof L !== 'undefined' && document.getElementById('map')) {
      initMap();
    } else {
      setTimeout(inicializarMapaQuandoPronto, 100);
    }
  }

  function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Coordenadas padrão (Criciúma, SC)
    const defaultLocation = [-28.6783, -49.3692];

    // Inicializar mapa Leaflet
    map = L.map('map').setView(defaultLocation, 13);

    // Adicionar camada de tiles (mapa)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    // Adicionar marcador padrão
    marker = L.marker(defaultLocation)
      .addTo(map)
      .bindPopup('Criciúma, Santa Catarina')
      .openPopup();

    // Expandir mapa
    mapElement.classList.add('expanded');
  }

  // Função para formatar CEP (remover caracteres não numéricos)
  function formatarCEP(cep) {
    return cep.replace(/\D/g, '');
  }

  // Função para validar CEP
  function validarCEP(cep) {
    const cepLimpo = formatarCEP(cep);
    return cepLimpo.length === 8;
  }

  // Buscar endereço pelo CEP usando ViaCEP
  async function buscarEnderecoPorCEP(cep) {
    const cepLimpo = formatarCEP(cep);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        throw new Error('CEP não encontrado');
      }
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      throw error;
    }
  }

  // Buscar coordenadas pelo endereço usando Nominatim (OpenStreetMap)
  async function buscarCoordenadas(endereco) {
    const query = encodeURIComponent(`${endereco.logradouro}, ${endereco.localidade}, ${endereco.uf}, Brasil`);
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
      const data = await response.json();
      
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      
      // Se não encontrar com logradouro, tentar apenas cidade
      const queryCidade = encodeURIComponent(`${endereco.localidade}, ${endereco.uf}, Brasil`);
      const responseCidade = await fetch(`https://nominatim.openstreetmap.org/search?q=${queryCidade}&format=json&limit=1`);
      const dataCidade = await responseCidade.json();
      
      if (dataCidade.length > 0) {
        return {
          lat: parseFloat(dataCidade[0].lat),
          lng: parseFloat(dataCidade[0].lon)
        };
      }
      
      throw new Error('Coordenadas não encontradas');
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      throw error;
    }
  }

  // Função principal para buscar por CEP
  async function buscarPorCEP() {
    const cep = buscaCepInput.value.trim();
    const mapElement = document.getElementById('map');

    if (!cep) {
      alert('Por favor, digite um CEP válido.');
      return;
    }

    if (!validarCEP(cep)) {
      alert('CEP inválido. Digite um CEP com 8 dígitos.');
      return;
    }

    // Expandir o mapa
    if (mapElement) {
      mapElement.classList.add('expanded');
    }

    // Mostrar loading
    if (mapElement) {
      mapElement.style.opacity = '0.7';
      mapElement.style.pointerEvents = 'none';
    }

    try {
      // Buscar endereço pelo CEP
      const endereco = await buscarEnderecoPorCEP(cep);
      
      // Buscar coordenadas
      const coordenadas = await buscarCoordenadas(endereco);
      
      // Atualizar mapa
      if (map && coordenadas) {
        map.setView([coordenadas.lat, coordenadas.lng], 15);
        
        // Remover marcador anterior
        if (marker) {
          map.removeLayer(marker);
        }
        
        // Adicionar novo marcador
        const enderecoCompleto = `${endereco.logradouro || endereco.localidade}, ${endereco.localidade}, ${endereco.uf}`;
        marker = L.marker([coordenadas.lat, coordenadas.lng])
          .addTo(map)
          .bindPopup(`<b>CEP: ${endereco.cep}</b><br>${enderecoCompleto}`)
          .openPopup();
        
        // Centralizar no marcador
        map.setView([coordenadas.lat, coordenadas.lng], 15);
      }
      
      // Restaurar mapa
      if (mapElement) {
        mapElement.style.opacity = '1';
        mapElement.style.pointerEvents = 'auto';
      }
      
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao buscar localização. Verifique se o CEP está correto e tente novamente.');
      
      // Restaurar mapa
      if (mapElement) {
        mapElement.style.opacity = '1';
        mapElement.style.pointerEvents = 'auto';
      }
    }
  }

  // Event listeners
  if (buscarCepBtn && buscaCepInput) {
    buscarCepBtn.addEventListener('click', buscarPorCEP);
    buscaCepInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        buscarPorCEP();
      }
    });

    // Máscara de CEP (formato: 00000-000)
    buscaCepInput.addEventListener('input', (e) => {
      let value = formatarCEP(e.target.value);
      if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5, 8);
      }
      e.target.value = value;
    });
  }

  // Inicializar mapa quando Leaflet estiver disponível
  inicializarMapaQuandoPronto();
});

// Função initMap removida - agora é inicializada dentro do DOMContentLoaded

// ===== FUNÇÕES AUXILIARES =====
function formatarTelefone(telefone) {
  // Formatação básica de telefone
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarMensagem(mensagem, tipo = 'info') {
  // Criar elemento de mensagem
  const mensagemEl = document.createElement('div');
  mensagemEl.className = `mensagem ${tipo}`;
  mensagemEl.textContent = mensagem;
  mensagemEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  // Estilos baseados no tipo
  const estilos = {
    success: 'background: #4caf50;',
    error: 'background: #f44336;',
    info: 'background: #2196f3;',
    warning: 'background: #ff9800;'
  };

  mensagemEl.style.cssText += estilos[tipo] || estilos.info;

  document.body.appendChild(mensagemEl);

  // Remover após 5 segundos
  setTimeout(() => {
    mensagemEl.remove();
  }, 5000);
}

// Adicionar estilos CSS para animação
if (!document.querySelector('#mensagem-styles')) {
  const style = document.createElement('style');
  style.id = 'mensagem-styles';
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}