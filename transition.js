// ===== MEGA TRANSITION SYSTEM =====
// Sistema de transição épica do manual v1.0 para v2.0

class MegaTransition {
  constructor() {
    this.isTransitioning = false;
    this.currentPhase = 0;
    this.totalPhases = 5;
    this.init();
  }

  init() {
    // Aguarda o DOM carregar
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const upgradeBtn = document.getElementById('upgradeBtn');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', () => this.startMegaTransition());
    }
  }

  async startMegaTransition() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    console.log('🚀 Iniciando Mega Transição...');
    
    try {
      // Fase 1: Preparação
      await this.phase1Preparation();
      
      // Fase 2: Transformação do Layout
      await this.phase2LayoutTransformation();
      
      // Fase 3: Cores e Estilo
      await this.phase3ColorsAndStyle();
      
      // Fase 4: Animações e Interatividade
      await this.phase4AnimationsAndInteractivity();
      
      // Fase 5: Finalização
      await this.phase5Finalization();
      
      // Redirecionar para o novo manual
      this.redirectToNewManual();
      
    } catch (error) {
      console.error('Erro na transição:', error);
      this.handleTransitionError();
    }
  }

  // ===== FASE 1: PREPARAÇÃO =====
  async phase1Preparation() {
    console.log('📋 Fase 1: Preparação');
    
    // Criar overlay de transição
    this.createTransitionOverlay();
    
    // Fade out do manual antigo
    await this.fadeOutLegacyManual();
    
    // Mostrar tela de loading
    await this.showLoadingScreen();
    
    this.currentPhase = 1;
  }

  createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'transitionOverlay';
    overlay.innerHTML = `
      <div class="transition-content">
        <div class="transition-logo">
          <i class="ri-book-2-line"></i>
        </div>
        <div class="transition-text">
          <h2>Preparando Nova Experiência</h2>
          <p>Transformando o manual em algo extraordinário...</p>
        </div>
        <div class="transition-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <span class="progress-text">0%</span>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Estilos do overlay
    const style = document.createElement('style');
    style.textContent = `
      #transitionOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      
      .transition-content {
        text-align: center;
        color: white;
        max-width: 500px;
        padding: 40px;
      }
      
      .transition-logo {
        font-size: 4rem;
        margin-bottom: 30px;
        animation: logoFloat 3s ease-in-out infinite;
      }
      
      @keyframes logoFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      .transition-text h2 {
        font-size: 2.5rem;
        margin-bottom: 15px;
        font-weight: bold;
      }
      
      .transition-text p {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-bottom: 40px;
      }
      
      .transition-progress {
        margin-top: 40px;
      }
      
      .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 15px;
      }
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #fff, #f0f0f0);
        width: 0%;
        transition: width 0.3s ease;
        border-radius: 4px;
      }
      
      .progress-text {
        font-size: 1.1rem;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }

  async fadeOutLegacyManual() {
    const legacyElements = [
      '.legacy-header',
      '.legacy-sidebar', 
      '.legacy-main'
    ];
    
    const tl = gsap.timeline();
    
    legacyElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        tl.to(element, {
          opacity: 0,
          y: -50,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.inOut"
        }, index * 0.2);
      }
    });
    
    await tl;
  }

  async showLoadingScreen() {
    const overlay = document.getElementById('transitionOverlay');
    if (overlay) {
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
    
    // Simular progresso
    await this.simulateProgress();
  }

  async simulateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    for (let i = 0; i <= 100; i += 10) {
      if (progressFill && progressText) {
        gsap.to(progressFill, {
          width: `${i}%`,
          duration: 0.2,
          ease: "power2.out"
        });
        progressText.textContent = `${i}%`;
      }
      await this.delay(100);
    }
    
    await this.delay(500);
  }

  // ===== FASE 2: TRANSFORMAÇÃO DO LAYOUT =====
  async phase2LayoutTransformation() {
    console.log('🏗️ Fase 2: Transformação do Layout');
    
    // Atualizar texto
    this.updateTransitionText('Transformando Layout', 'Construindo nova estrutura...');
    
    // Criar elementos do novo layout
    await this.createNewLayoutElements();
    
    // Animar entrada dos containers
    await this.animateNewContainers();
    
    this.currentPhase = 2;
  }

  updateTransitionText(title, subtitle) {
    const titleEl = document.querySelector('.transition-text h2');
    const subtitleEl = document.querySelector('.transition-text p');
    
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;
  }

  async createNewLayoutElements() {
    // Criar estrutura do novo manual
    const newManualHTML = `
      <div id="newManual" style="display: none;">
        <header class="header">
          <div class="header-left">
            <span class="header-logo"><i class="ri-book-2-line"></i></span>
            <div>
              <span class="header-title">Manual do Prontuário Médico</span><br>
              <span class="header-desc">Guia completo do sistema</span>
            </div>
          </div>
          <div class="header-search">
            <input type="text" placeholder="Buscar no manual...">
            <i class="ri-search-line"></i>
          </div>
        </header>
        
        <div class="container">
          <nav class="sidebar">
            <ul>
              <li><button class="sidebar-dropdown" data-dropdown="guias">
                <span><i class="ri-file-list-2-line"></i> Geração de Guias</span>
                <i class="ri-arrow-right-s-line"></i>
              </button></li>
              <li><button class="sidebar-dropdown" data-dropdown="cadastros">
                <span><i class="ri-user-add-line"></i> Cadastros</span>
                <i class="ri-arrow-right-s-line"></i>
              </button></li>
              <li><button class="sidebar-dropdown" data-dropdown="pe">
                <span><i class="ri-calendar-check-line"></i> Prontuário Eletrônico</span>
                <i class="ri-arrow-right-s-line"></i>
              </button></li>
            </ul>
          </nav>
          
          <main class="main">
            <div class="welcome" id="homeWelcome">
              <h1 class="welcome-title">
                <span class="title-word">Bem-vindo</span>
                <span class="title-word">ao</span>
                <span class="title-word">Manual</span>
                <span class="title-word">do</span>
                <span class="title-word">Prontuário</span>
                <span class="title-word">Médico</span>
              </h1>
              <p class="welcome-subtitle" id="typewriter-text"></p>
              <span class="version">Versão 2.0 - Atualizado em Janeiro 2025</span>
            </div>
            
            <div class="cards-row" id="homeCards">
              <div class="card" id="card-guia">
                <i class="ri-file-list-3-line"></i>
                <h3>Como gerar uma guia</h3>
                <p>Aprenda o passo a passo para gerar guias médicas</p>
                <i class="ri-arrow-right-s-line arrow"></i>
              </div>
              <div class="card" id="card-cadastro">
                <i class="ri-user-add-line"></i>
                <h3>Cadastrar paciente</h3>
                <p>Tutorial completo de cadastro de novos pacientes</p>
                <i class="ri-arrow-right-s-line arrow"></i>
              </div>
              <div class="card" id="card-relatorio">
                <i class="ri-bar-chart-2-line"></i>
                <h3>Emitir relatórios</h3>
                <p>Gere relatórios médicos e administrativos</p>
                <i class="ri-arrow-right-s-line arrow"></i>
              </div>
              <div class="card" id="card-config">
                <i class="ri-settings-3-line"></i>
                <h3>Configurações do sistema</h3>
                <p>Personalize as configurações do prontuário</p>
                <i class="ri-arrow-right-s-line arrow"></i>
              </div>
            </div>
            
            <div class="actions-section">
              <h2>O que você pode fazer aqui?</h2>
              <div class="actions-row">
                <div class="action manual">
                  <div class="icon-bg"><i class="ri-book-open-line"></i></div>
                  <h4>Manual Completo</h4>
                  <p>Acesse todas as seções organizadas do manual</p>
                </div>
                <div class="action ia">
                  <div class="icon-bg"><i class="ri-robot-2-line"></i></div>
                  <h4>Assistente Inteligente</h4>
                  <p>Faça perguntas e obtenha respostas instantâneas</p>
                </div>
                <div class="action busca">
                  <div class="icon-bg"><i class="ri-search-eye-line"></i></div>
                  <h4>Busca Avançada</h4>
                  <p>Encontre informações rapidamente</p>
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <button class="chat-fab" id="chatFab">
          <span class="robot-status-wrapper">
            <i class="ri-robot-2-line"></i>
            <span class="status-dot"></span>
          </span>
        </button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', newManualHTML);
  }

  async animateNewContainers() {
    const newManual = document.getElementById('newManual');
    if (!newManual) return;
    
    // Mostrar o novo manual
    gsap.set(newManual, { display: 'block', opacity: 0 });
    
    // Animar entrada dos containers principais
    const tl = gsap.timeline();
    
    // Header
    tl.to(newManual.querySelector('.header'), {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
    
    // Container principal
    tl.to(newManual.querySelector('.container'), {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, 0.2);
    
    // Sidebar
    tl.fromTo(newManual.querySelector('.sidebar'), 
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      0.4
    );
    
    // Main content
    tl.fromTo(newManual.querySelector('.main'), 
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      0.6
    );
    
    await tl;
  }

  // ===== FASE 3: CORES E ESTILO =====
  async phase3ColorsAndStyle() {
    console.log('🎨 Fase 3: Cores e Estilo');
    
    this.updateTransitionText('Aplicando Novo Design', 'Transformando cores e estilos...');
    
    // Carregar CSS do novo manual
    await this.loadNewStyles();
    
    // Aplicar transformações de cor
    await this.applyColorTransformations();
    
    this.currentPhase = 3;
  }

  async loadNewStyles() {
    // Carregar o CSS do novo manual
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles.css';
    document.head.appendChild(link);
    
    // Aguardar carregamento
    return new Promise((resolve) => {
      link.onload = resolve;
      setTimeout(resolve, 1000); // Fallback
    });
  }

  async applyColorTransformations() {
    const newManual = document.getElementById('newManual');
    if (!newManual) return;
    
    // Animar transição de cores
    const elements = newManual.querySelectorAll('.header, .sidebar, .main, .card, .action');
    
    const tl = gsap.timeline();
    
    elements.forEach((element, index) => {
      tl.to(element, {
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        duration: 0.3,
        delay: index * 0.05,
        ease: "power2.out"
      }, index * 0.05);
    });
    
    await tl;
  }

  // ===== FASE 4: ANIMAÇÕES E INTERATIVIDADE =====
  async phase4AnimationsAndInteractivity() {
    console.log('✨ Fase 4: Animações e Interatividade');
    
    this.updateTransitionText('Ativando Animações', 'Preparando interatividade...');
    
    // Carregar scripts do novo manual
    await this.loadNewScripts();
    
    // Ativar animações
    await this.activateAnimations();
    
    this.currentPhase = 4;
  }

  async loadNewScripts() {
    // Carregar script.js do novo manual
    const script = document.createElement('script');
    script.src = 'script.js';
    document.head.appendChild(script);
    
    return new Promise((resolve) => {
      script.onload = resolve;
      setTimeout(resolve, 2000); // Fallback
    });
  }

  async activateAnimations() {
    // Simular ativação das animações
    await this.delay(1000);
    
    // Mostrar elementos com animação
    const newManual = document.getElementById('newManual');
    if (!newManual) return;
    
    // Animar entrada dos elementos
    const cards = newManual.querySelectorAll('.card');
    const actions = newManual.querySelectorAll('.action');
    
    const tl = gsap.timeline();
    
    // Cards
    cards.forEach((card, index) => {
      tl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      }, index * 0.1);
    });
    
    // Actions
    actions.forEach((action, index) => {
      tl.to(action, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)"
      }, index * 0.1);
    });
    
    await tl;
  }

  // ===== FASE 5: FINALIZAÇÃO =====
  async phase5Finalization() {
    console.log('🎉 Fase 5: Finalização');
    
    this.updateTransitionText('Finalizando', 'Bem-vindo ao futuro do manual!');
    
    // Efeito final
    await this.finalEffects();
    
    // Remover overlay
    await this.removeTransitionOverlay();
    
    this.currentPhase = 5;
  }

  async finalEffects() {
    // Efeito de partículas finais
    await this.createFinalParticles();
    
    // Zoom out para mostrar o layout completo
    const newManual = document.getElementById('newManual');
    if (newManual) {
      gsap.to(newManual, {
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });
    }
    
    await this.delay(1000);
  }

  async createFinalParticles() {
    // Criar partículas de celebração
    for (let i = 0; i < 50; i++) {
      this.createParticle();
      await this.delay(50);
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    particle.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      left: ${Math.random() * window.innerWidth}px;
      top: ${Math.random() * window.innerHeight}px;
    `;
    
    document.body.appendChild(particle);
    
    gsap.to(particle, {
      y: -100,
      x: Math.random() * 200 - 100,
      opacity: 0,
      scale: 0,
      duration: 2,
      ease: "power2.out",
      onComplete: () => particle.remove()
    });
  }

  async removeTransitionOverlay() {
    const overlay = document.getElementById('transitionOverlay');
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => overlay.remove()
      });
    }
    
    await this.delay(500);
  }

  // ===== REDIRECIONAMENTO =====
  redirectToNewManual() {
    console.log('🎯 Redirecionando para o novo manual...');
    
    // Simular redirecionamento (na prática seria para index.html)
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }

  // ===== UTILITÁRIOS =====
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleTransitionError() {
    console.error('Erro na transição - redirecionando diretamente');
    window.location.href = 'index.html';
  }
}

// Inicializar o sistema de transição
const megaTransition = new MegaTransition(); 