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

  // ===== PONTOS DE COLETA =====
  const materiaisSection = document.getElementById('materiais-section');
  const pontosSection = document.getElementById('pontos-section');
  const backButton = document.getElementById('back-button');
  const pontosTitulo = document.getElementById('pontos-titulo');
  const pontosLista = document.getElementById('pontos-lista');
  const buscaPontosInput = document.getElementById('busca-pontos-input');
  const buscarPontosBtn = document.getElementById('buscar-pontos-btn');

  // Dados simulados dos pontos de coleta
  const pontosDeColeta = {
    plastico: [
      {
        nome: "EcoCenter Reciclagem",
        endereco: "Av. Verde, 123 – Bairro Jardim",
        requisitos: [
          "Levar no mínimo 5 garrafas PET",
          "Lavar os plásticos antes de entregar"
        ],
        recompensa: "10 pontos no app de recompensas",
        horario: "Seg a Sex, 08:00 - 17:00",
        contato: "(11) 91234-5678"
      },
      {
        nome: "Ponto Sustentável",
        endereco: "Rua das Flores, 456 – Centro",
        requisitos: [
          "Separar plástico PET e plástico rígido",
          "Embalagens sem resíduos de alimento",
          "Levar no mínimo 35 garrafas PET"
        ],
        recompensa: "Voucher de café na padaria Mais Docê",
        horario: "Ter a Sex, 09:00 - 18:00",
        contato: "(11) 98765-4321"
      },
      {
        nome: "Recicla Mais",
        endereco: "Av. Principal, 789 – Centro",
        requisitos: [
          "Plásticos limpos e secos",
          "Mínimo 3kg de plástico",
          "Separar por tipo (PET, PEAD, PVC)"
        ],
        recompensa: "20 pontos no app + brinde ecológico",
        horario: "Seg a Sáb, 07:00 - 18:00",
        contato: "(11) 91234-8765"
      },
      {
        nome: "Ecoponto Central",
        endereco: "Rua Sustentável, 321 – Vila Verde",
        requisitos: [
          "Garrafas PET amassadas",
          "Embalagens de produtos de limpeza",
          "Mínimo 10 unidades"
        ],
        recompensa: "Cupom de desconto em loja parceira",
        horario: "Ter a Dom, 09:00 - 17:00",
        contato: "(11) 98765-1234"
      },
      {
        nome: "Verde Vida Reciclagem",
        endereco: "Av. Ecológica, 654 – Parque",
        requisitos: [
          "Plásticos rígidos separados",
          "Sem restos de alimentos",
          "Mínimo 5kg"
        ],
        recompensa: "15 pontos + semente de árvore",
        horario: "Seg a Sex, 08:00 - 16:00",
        contato: "(11) 92345-6789"
      },
      {
        nome: "Plástico Verde",
        endereco: "Rua Reciclagem, 890 – Vila Nova",
        requisitos: [
          "PET transparente e colorido",
          "Embalagens limpas",
          "Mínimo 20 garrafas"
        ],
        recompensa: "18 pontos no app",
        horario: "Seg a Dom, 07:00 - 19:00",
        contato: "(11) 91111-2222"
      },
      {
        nome: "Eco Plástico",
        endereco: "Av. Sustentável, 567 – Centro",
        requisitos: [
          "Todos os tipos de plástico",
          "Limpos e secos",
          "Mínimo 4kg"
        ],
        recompensa: "Voucher de desconto em loja",
        horario: "Ter a Sáb, 09:00 - 17:00",
        contato: "(11) 92222-3333"
      },
      {
        nome: "Recicla PET",
        endereco: "Rua do Meio Ambiente, 123 – Jardim",
        requisitos: [
          "Apenas garrafas PET",
          "Amassadas e limpas",
          "Mínimo 50 unidades"
        ],
        recompensa: "25 pontos + brinde",
        horario: "Seg a Sex, 08:00 - 18:00",
        contato: "(11) 93333-4444"
      },
      {
        nome: "Plast Reciclagem",
        endereco: "Av. Verde Vida, 321 – Parque Ecológico",
        requisitos: [
          "Plásticos diversos",
          "Separados por tipo",
          "Mínimo 6kg"
        ],
        recompensa: "20 pontos + certificado ecológico",
        horario: "Qua a Dom, 10:00 - 16:00",
        contato: "(11) 94444-5555"
      },
      {
        nome: "Sustenta Plástico",
        endereco: "Rua Ambiental, 654 – Bairro Verde",
        requisitos: [
          "Embalagens plásticas",
          "Sem resíduos",
          "Mínimo 30 unidades"
        ],
        recompensa: "15 pontos no app",
        horario: "Seg a Sex, 09:00 - 17:00",
        contato: "(11) 95555-6666"
      },
      {
        nome: "Centro de Reciclagem Plástica",
        endereco: "Av. Industrial, 789 – Zona Industrial",
        requisitos: [
          "Grandes volumes aceitos",
          "Agendamento prévio",
          "Mínimo 20kg"
        ],
        recompensa: "50 pontos + desconto especial",
        horario: "Seg a Sex, 07:00 - 16:00",
        contato: "(11) 96666-7777"
      },
      {
        nome: "Plástico Mais",
        endereco: "Rua Sustentabilidade, 234 – Vila",
        requisitos: [
          "Todos os tipos de plástico",
          "Limpos e organizados",
          "Mínimo 3kg"
        ],
        recompensa: "12 pontos no app",
        horario: "Ter a Dom, 08:00 - 18:00",
        contato: "(11) 97777-8888"
      }
    ],
    vidro: [
      {
        nome: "Vidro Reciclável Center",
        endereco: "Rua Cristal, 789 – Centro",
        requisitos: [
          "Vidros inteiros (sem quebras)",
          "Separar por cor (transparente, verde, marrom)",
          "Embalagens limpas"
        ],
        recompensa: "15 pontos no app de recompensas",
        horario: "Seg a Sab: 07:00 - 16:00",
        contato: "(11) 94567-8901"
      },
      {
        nome: "Vidros & Vidros",
        endereco: "Av. Transparente, 456 – Industrial",
        requisitos: [
          "Frascos e garrafas de vidro",
          "Limpas e sem rótulos",
          "Mínimo 10 unidades"
        ],
        recompensa: "Voucher em loja de vidros",
        horario: "Seg a Sex, 09:00 - 17:00",
        contato: "(11) 95678-9012"
      },
      {
        nome: "Ecovitro Reciclagem",
        endereco: "Rua Espelho, 123 – Bairro Novo",
        requisitos: [
          "Vidros quebrados em embalagem resistente",
          "Sem partes de metal ou plástico",
          "Mínimo 3kg"
        ],
        recompensa: "12 pontos no app",
        horario: "Ter a Sáb, 08:00 - 15:00",
        contato: "(11) 93456-7890"
      },
      {
        nome: "Vidros do Futuro",
        endereco: "Av. Cristal, 567 – Centro",
        requisitos: [
          "Garrafas e frascos de vidro",
          "Limpos e sem tampas",
          "Mínimo 15 unidades"
        ],
        recompensa: "18 pontos + desconto em vidros",
        horario: "Seg a Sex, 08:00 - 17:00",
        contato: "(11) 98888-9999"
      },
      {
        nome: "Recicla Vidro",
        endereco: "Rua Transparente, 890 – Parque",
        requisitos: [
          "Vidros coloridos e transparentes",
          "Embalagens limpas",
          "Mínimo 5kg"
        ],
        recompensa: "20 pontos no app",
        horario: "Ter a Sáb, 09:00 - 16:00",
        contato: "(11) 99999-0000"
      },
      {
        nome: "Vitro Sustentável",
        endereco: "Av. Vidro, 456 – Vila",
        requisitos: [
          "Garrafas de vidro inteiras",
          "Sem rótulos de papel",
          "Mínimo 20 unidades"
        ],
        recompensa: "15 pontos + brinde",
        horario: "Seg a Dom, 08:00 - 18:00",
        contato: "(11) 90000-1111"
      },
      {
        nome: "Eco Vidro Center",
        endereco: "Rua Reciclagem, 234 – Jardim",
        requisitos: [
          "Todos os tipos de vidro",
          "Organizados por cor",
          "Mínimo 10kg"
        ],
        recompensa: "25 pontos + certificado",
        horario: "Qua a Dom, 07:00 - 17:00",
        contato: "(11) 90111-2222"
      },
      {
        nome: "Vidros Verdes",
        endereco: "Av. Sustentável, 678 – Centro",
        requisitos: [
          "Vidros limpos",
          "Sem etiquetas",
          "Mínimo 8kg"
        ],
        recompensa: "22 pontos no app",
        horario: "Seg a Sex, 09:00 - 18:00",
        contato: "(11) 90222-3333"
      }
    ],
    papel: [
      {
        nome: "Papel Ecológico",
        endereco: "Av. das Árvores, 321 – Parque Verde",
        requisitos: [
          "Papel seco e limpo",
          "Separar jornal, revista e papelão",
          "Mínimo 2kg"
        ],
        recompensa: "Caderno ecológico",
        horario: "Qua a Dom: 10:00 - 19:00",
        contato: "(11) 92345-6789"
      },
      {
        nome: "Recicla Papel",
        endereco: "Rua das Folhas, 567 – Centro",
        requisitos: [
          "Papéis sem plástico",
          "Sem grampos ou clipes",
          "Mínimo 5kg"
        ],
        recompensa: "20 pontos + bloco de notas reciclado",
        horario: "Seg a Sex, 08:00 - 17:00",
        contato: "(11) 94567-8901"
      },
      {
        nome: "Papel & Vida",
        endereco: "Av. Sustentável, 890 – Vila Nova",
        requisitos: [
          "Papelão limpo e seco",
          "Caixas desmontadas",
          "Mínimo 10kg"
        ],
        recompensa: "25 pontos no app",
        horario: "Ter a Sáb, 09:00 - 16:00",
        contato: "(11) 97890-1234"
      },
      {
        nome: "Papel Reciclado Plus",
        endereco: "Rua das Folhas, 456 – Bairro Novo",
        requisitos: [
          "Papéis de escritório",
          "Revistas e jornais",
          "Mínimo 7kg"
        ],
        recompensa: "18 pontos + caderno reciclado",
        horario: "Seg a Sex, 08:00 - 17:00",
        contato: "(11) 90333-4444"
      },
      {
        nome: "Eco Papel",
        endereco: "Av. Papelão, 123 – Centro",
        requisitos: [
          "Papelão corrugado",
          "Limpo e seco",
          "Mínimo 15kg"
        ],
        recompensa: "30 pontos no app",
        horario: "Ter a Sáb, 07:00 - 16:00",
        contato: "(11) 90444-5555"
      },
      {
        nome: "Recicla Papelão",
        endereco: "Rua Sustentável, 567 – Parque",
        requisitos: [
          "Caixas de papelão",
          "Desmontadas e limpas",
          "Mínimo 12kg"
        ],
        recompensa: "22 pontos + brinde",
        horario: "Seg a Dom, 09:00 - 18:00",
        contato: "(11) 90555-6666"
      },
      {
        nome: "Papel Ecológico Plus",
        endereco: "Av. Verde, 789 – Vila",
        requisitos: [
          "Jornais e revistas",
          "Sem plástico",
          "Mínimo 5kg"
        ],
        recompensa: "15 pontos no app",
        horario: "Qua a Dom, 10:00 - 19:00",
        contato: "(11) 90666-7777"
      },
      {
        nome: "Centro de Reciclagem de Papel",
        endereco: "Rua do Meio Ambiente, 234 – Jardim",
        requisitos: [
          "Grandes volumes",
          "Agendamento prévio",
          "Mínimo 50kg"
        ],
        recompensa: "100 pontos + certificado",
        horario: "Seg a Sex, 07:00 - 15:00",
        contato: "(11) 90777-8888"
      }
    ],
    metal: [
      {
        nome: "Metal Recicla",
        endereco: "Rua Ferro, 654 – Industrial",
        requisitos: [
          "Latas limpas e amassadas",
          "Separar alumínio e aço",
          "Mínimo 1kg"
        ],
        recompensa: "5 pontos no app + brinde surpresa",
        horario: "Seg a Sex: 08:30 - 17:30",
        contato: "(11) 93456-7890"
      },
      {
        nome: "Metais & Cia",
        endereco: "Av. Alumínio, 234 – Centro",
        requisitos: [
          "Latas de bebidas amassadas",
          "Ferros e metais diversos",
          "Mínimo 3kg"
        ],
        recompensa: "15 pontos + imã de geladeira",
        horario: "Seg a Sáb, 08:00 - 18:00",
        contato: "(11) 91234-5678"
      },
      {
        nome: "Recicla Metal",
        endereco: "Rua Aço, 789 – Zona Industrial",
        requisitos: [
          "Metais separados por tipo",
          "Limpos e secos",
          "Mínimo 5kg"
        ],
        recompensa: "20 pontos no app",
        horario: "Ter a Sex, 09:00 - 16:00",
        contato: "(11) 98765-4321"
      },
      {
        nome: "Metal & Ferro",
        endereco: "Av. Industrial, 345 – Zona Industrial",
        requisitos: [
          "Latas de aço e alumínio",
          "Amassadas e limpas",
          "Mínimo 8kg"
        ],
        recompensa: "25 pontos + desconto",
        horario: "Seg a Sáb, 08:00 - 17:00",
        contato: "(11) 90888-9999"
      },
      {
        nome: "Alumínio Recicla",
        endereco: "Rua dos Metais, 678 – Centro",
        requisitos: [
          "Apenas latas de alumínio",
          "Amassadas",
          "Mínimo 10kg"
        ],
        recompensa: "30 pontos no app",
        horario: "Ter a Dom, 09:00 - 18:00",
        contato: "(11) 90999-0000"
      },
      {
        nome: "Recicla Ferro",
        endereco: "Av. Metalúrgica, 123 – Industrial",
        requisitos: [
          "Ferros e aços",
          "Separados por tipo",
          "Mínimo 15kg"
        ],
        recompensa: "35 pontos + certificado",
        horario: "Seg a Sex, 07:00 - 16:00",
        contato: "(11) 90000-1111"
      },
      {
        nome: "Metais Sustentáveis",
        endereco: "Rua Ecológica, 456 – Parque",
        requisitos: [
          "Todos os tipos de metal",
          "Limpos e organizados",
          "Mínimo 6kg"
        ],
        recompensa: "18 pontos no app",
        horario: "Qua a Dom, 08:00 - 17:00",
        contato: "(11) 90111-2222"
      }
    ],
    oleo: [
      {
        nome: "Óleo Sustentável",
        endereco: "Av. Ecológica, 987 – Centro",
        requisitos: [
          "Óleo usado em garrafa PET",
          "Óleo limpo sem resíduos de comida",
          "Mínimo 2 litros"
        ],
        recompensa: "Sabão ecológico caseiro",
        horario: "Seg a Sex: 09:00 - 16:00",
        contato: "(11) 95678-9012"
      },
      {
        nome: "Óleo Verde",
        endereco: "Rua Sustentável, 543 – Vila",
        requisitos: [
          "Óleo de cozinha usado",
          "Em recipiente fechado",
          "Mínimo 1 litro"
        ],
        recompensa: "10 pontos + sabão artesanal",
        horario: "Ter a Sáb, 08:00 - 15:00",
        contato: "(11) 92345-6789"
      },
      {
        nome: "Recicla Óleo",
        endereco: "Av. Reciclagem, 321 – Centro",
        requisitos: [
          "Óleo filtrado e limpo",
          "Sem água misturada",
          "Mínimo 3 litros"
        ],
        recompensa: "15 pontos + produto de limpeza",
        horario: "Seg a Dom, 09:00 - 17:00",
        contato: "(11) 93456-7890"
      },
      {
        nome: "Óleo Verde Vida",
        endereco: "Rua Sustentável, 789 – Vila",
        requisitos: [
          "Óleo de cozinha usado",
          "Em garrafa PET fechada",
          "Mínimo 2 litros"
        ],
        recompensa: "12 pontos + sabão ecológico",
        horario: "Seg a Sex, 09:00 - 16:00",
        contato: "(11) 90222-3333"
      },
      {
        nome: "Eco Óleo",
        endereco: "Av. Ecológica, 567 – Centro",
        requisitos: [
          "Óleo usado filtrado",
          "Sem resíduos sólidos",
          "Mínimo 5 litros"
        ],
        recompensa: "20 pontos + kit de produtos",
        horario: "Ter a Sáb, 08:00 - 17:00",
        contato: "(11) 90333-4444"
      }
    ],
    organicos: [
      {
        nome: "Compostagem Natural",
        endereco: "Rua Verde, 234 – Jardim",
        requisitos: [
          "Resíduos orgânicos separados",
          "Sem plástico ou materiais não orgânicos",
          "Trazer em recipiente próprio"
        ],
        recompensa: "Adubo orgânico",
        horario: "Ter a Sab: 08:00 - 15:00",
        contato: "(11) 96789-0123"
      },
      {
        nome: "Horta Comunitária",
        endereco: "Av. Orgânica, 678 – Parque",
        requisitos: [
          "Cascas de frutas e legumes",
          "Restos de comida vegetal",
          "Mínimo 2kg"
        ],
        recompensa: "Mudas de hortaliças",
        horario: "Seg a Sex, 07:00 - 16:00",
        contato: "(11) 91234-8765"
      },
      {
        nome: "Eco Compostagem",
        endereco: "Rua Fertilizante, 456 – Vila",
        requisitos: [
          "Materiais orgânicos secos",
          "Sem carnes ou laticínios",
          "Mínimo 3kg"
        ],
        recompensa: "15 pontos + composto orgânico",
        horario: "Ter a Dom, 08:00 - 14:00",
        contato: "(11) 95678-1234"
      },
      {
        nome: "Orgânico Natural",
        endereco: "Av. Verde, 123 – Parque",
        requisitos: [
          "Cascas e restos vegetais",
          "Limpos e separados",
          "Mínimo 4kg"
        ],
        recompensa: "18 pontos + mudas",
        horario: "Seg a Sex, 08:00 - 15:00",
        contato: "(11) 90444-5555"
      },
      {
        nome: "Compostagem Vida",
        endereco: "Rua Orgânica, 678 – Jardim",
        requisitos: [
          "Resíduos orgânicos",
          "Sem plástico",
          "Mínimo 5kg"
        ],
        recompensa: "20 pontos no app",
        horario: "Ter a Sáb, 07:00 - 16:00",
        contato: "(11) 90555-6666"
      }
    ],
    hospitalares: [
      {
        nome: "Saúde Ambiental",
        endereco: "Av. da Saúde, 567 – Centro",
        requisitos: [
          "Material em embalagem específica",
          "Agendamento prévio obrigatório",
          "Documentação necessária"
        ],
        recompensa: "Certificado de descarte correto",
        horario: "Seg a Sex: 08:00 - 12:00",
        contato: "(11) 97890-1234"
      },
      {
        nome: "Descartável Seguro",
        endereco: "Rua Médica, 890 – Zona Hospitalar",
        requisitos: [
          "Materiais perfurocortantes em caixa específica",
          "Agulhas em recipiente rígido",
          "Agendamento prévio"
        ],
        recompensa: "Certificado de descarte ambiental",
        horario: "Seg a Sex, 09:00 - 13:00",
        contato: "(11) 92345-8765"
      },
      {
        nome: "Resíduos Especiais",
        endereco: "Av. Hospitalar, 234 – Centro Médico",
        requisitos: [
          "Medicamentos vencidos",
          "Frasco de remédios vazios",
          "Receita ou prescrição médica"
        ],
        recompensa: "10 pontos + certificado",
        horario: "Ter a Sex, 08:00 - 12:00",
        contato: "(11) 93456-9012"
      },
      {
        nome: "Saúde & Ambiente",
        endereco: "Rua Médica, 567 – Zona Hospitalar",
        requisitos: [
          "Material hospitalar descartável",
          "Em embalagem segura",
          "Agendamento obrigatório"
        ],
        recompensa: "Certificado de descarte",
        horario: "Seg a Sex, 09:00 - 13:00",
        contato: "(11) 90666-7777"
      },
      {
        nome: "Descarte Seguro",
        endereco: "Av. Saúde, 890 – Centro",
        requisitos: [
          "Resíduos de saúde",
          "Documentação completa",
          "Agendamento prévio"
        ],
        recompensa: "15 pontos + certificado",
        horario: "Ter a Sex, 08:00 - 12:00",
        contato: "(11) 90777-8888"
      }
    ],
    moveis: [
      {
        nome: "Móveis Reciclados",
        endereco: "Rua dos Móveis, 876 – Industrial",
        requisitos: [
          "Móveis em condições de reaproveitamento",
          "Desmontar quando necessário",
          "Agendamento prévio"
        ],
        recompensa: "Cupom de desconto em reformas",
        horario: "Qua a Dom: 09:00 - 17:00",
        contato: "(11) 98901-2345"
      },
      {
        nome: "Reutiliza Móveis",
        endereco: "Av. Reforma, 567 – Centro",
        requisitos: [
          "Móveis usados em bom estado",
          "Sem cupins ou danos graves",
          "Agendamento obrigatório"
        ],
        recompensa: "15 pontos + desconto em móveis",
        horario: "Seg a Sáb, 09:00 - 17:00",
        contato: "(11) 91234-5678"
      },
      {
        nome: "Upcycle Móveis",
        endereco: "Rua Renovada, 234 – Vila",
        requisitos: [
          "Móveis para reaproveitamento",
          "Peças separadas e organizadas",
          "Mínimo 2 peças"
        ],
        recompensa: "10 pontos no app",
        horario: "Ter a Sex, 08:00 - 16:00",
        contato: "(11) 94567-8901"
      },
      {
        nome: "Móveis Sustentáveis",
        endereco: "Av. Reforma, 345 – Centro",
        requisitos: [
          "Móveis usados",
          "Em bom estado de conservação",
          "Agendamento prévio"
        ],
        recompensa: "20 pontos + desconto",
        horario: "Seg a Sáb, 09:00 - 17:00",
        contato: "(11) 90888-9999"
      },
      {
        nome: "Recicla Móveis",
        endereco: "Rua dos Móveis, 678 – Vila",
        requisitos: [
          "Móveis desmontados",
          "Peças organizadas",
          "Mínimo 3 peças"
        ],
        recompensa: "15 pontos no app",
        horario: "Qua a Dom, 08:00 - 16:00",
        contato: "(11) 90999-0000"
      }
    ],
    eletronicos: [
      {
        nome: "E-Lixo Reciclagem",
        endereco: "Av. Tecnologia, 543 – Centro",
        requisitos: [
          "Aparelhos completos quando possível",
          "Baterias removidas separadamente",
          "Cabos enrolados e organizados"
        ],
        recompensa: "10 pontos no app + brinde tecnológico",
        horario: "Seg a Sex: 10:00 - 18:00",
        contato: "(11) 99012-3456"
      },
      {
        nome: "Tech Recicla",
        endereco: "Rua Digital, 789 – Zona Tech",
        requisitos: [
          "Eletrônicos desligados",
          "Baterias removidas",
          "Cabos separados"
        ],
        recompensa: "20 pontos + certificado de descarte",
        horario: "Seg a Sáb, 09:00 - 17:00",
        contato: "(11) 92345-6789"
      },
      {
        nome: "Recicla Eletrônicos",
        endereco: "Av. Eletrônica, 456 – Centro",
        requisitos: [
          "Aparelhos sem dados pessoais",
          "Carregadores e acessórios",
          "Mínimo 3 unidades"
        ],
        recompensa: "15 pontos no app",
        horario: "Ter a Sex, 10:00 - 16:00",
        contato: "(11) 93456-7890"
      },
      {
        nome: "E-Lixo Verde",
        endereco: "Rua Tecnológica, 789 – Zona Tech",
        requisitos: [
          "Eletrônicos antigos",
          "Baterias removidas",
          "Mínimo 5 unidades"
        ],
        recompensa: "25 pontos + brinde",
        horario: "Seg a Sáb, 09:00 - 18:00",
        contato: "(11) 90000-1111"
      },
      {
        nome: "Tech Reciclagem",
        endereco: "Av. Digital, 234 – Centro",
        requisitos: [
          "Celulares e tablets",
          "Sem dados pessoais",
          "Mínimo 2 unidades"
        ],
        recompensa: "20 pontos + certificado",
        horario: "Ter a Sex, 10:00 - 17:00",
        contato: "(11) 90111-2222"
      },
      {
        nome: "Recicla Tech",
        endereco: "Rua Eletrônica, 567 – Parque",
        requisitos: [
          "Computadores e periféricos",
          "HDs formatados",
          "Agendamento prévio"
        ],
        recompensa: "30 pontos no app",
        horario: "Seg a Sex, 08:00 - 16:00",
        contato: "(11) 90222-3333"
      }
    ]
  };

  // Variáveis de paginação para pontos de coleta
  let pontosPorPagina = 6;
  let paginaAtualPontos = 0;
  let pontosFiltrados = [];

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
          <h3>${ponto.nome}</h3>
        </div>
        <p class="endereco">${ponto.endereco}</p>
        
        <div class="info-section">
          <h4><i class="fa fa-info-circle"></i> Requisitos da Recompensa</h4>
          <ul class="requisitos-lista">
            ${ponto.requisitos.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
        
        <div class="info-section">
          <h4><i class="fa fa-gift"></i> Recompensa</h4>
          <div class="recompensa">${ponto.recompensa}</div>
        </div>
        
        <div class="info-section">
          <h4><i class="fa fa-clock"></i> Horário de Funcionamento</h4>
          <div class="horario">${ponto.horario}</div>
        </div>
        
        <div class="info-section">
          <h4><i class="fa fa-phone"></i> Contato</h4>
          <div class="contato">${ponto.contato}</div>
        </div>
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

  // Função para mostrar pontos de coleta
  function mostrarPontosDeColeta(material) {
    materialAtual = material;
    pontosTitulo.textContent = "Escolha o destino da sua Reciclagem";
    
    const pontos = pontosDeColeta[material] || [];
    todosOsPontos = pontos;
    
    renderizarPontosComPaginacao(pontos);
    
    materiaisSection.classList.add('hidden');
    pontosSection.classList.add('active');
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

  // Função para buscar pontos (por nome do ponto, tipo de material, título ou localização)
  function buscarPontos() {
    const termo = buscaPontosInput.value.toLowerCase().trim();
    
    if (!termo) {
      // Se não houver termo, mostrar todos os pontos
      mostrarPontosDeColeta(materialAtual);
      return;
    }

    // Buscar em todos os materiais se não houver material selecionado
    const pontosParaBuscar = materialAtual ? pontosDeColeta[materialAtual] || [] : 
      Object.values(pontosDeColeta).flat();
    
    // Filtrar pontos que correspondem ao termo de busca
    const pontosFiltrados = pontosParaBuscar.filter(ponto => {
      const nomeMatch = ponto.nome.toLowerCase().includes(termo);
      const enderecoMatch = ponto.endereco.toLowerCase().includes(termo);
      const recompensaMatch = ponto.recompensa.toLowerCase().includes(termo);
      const horarioMatch = ponto.horario.toLowerCase().includes(termo);
      const requisitosMatch = ponto.requisitos.some(req => req.toLowerCase().includes(termo));
      
      // Buscar também pelo tipo de material
      let tipoMatch = false;
      if (materialAtual) {
        const nomeMaterial = getMaterialNome(materialAtual).toLowerCase();
        tipoMatch = nomeMaterial.includes(termo) || termo.includes(nomeMaterial);
      } else {
        // Se não há material selecionado, buscar em todos os tipos
        Object.keys(pontosDeColeta).forEach(key => {
          const nomeMaterial = getMaterialNome(key).toLowerCase();
          if (nomeMaterial.includes(termo) || termo.includes(nomeMaterial)) {
            tipoMatch = true;
          }
        });
      }
      
      return nomeMatch || enderecoMatch || recompensaMatch || horarioMatch || requisitosMatch || tipoMatch;
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