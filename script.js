document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMAÇÃO GSAP DO TÍTULO =====
    function animateWelcomeTitle() {
      if (typeof gsap === 'undefined') return;
      
      // Timeline principal
      const tl = gsap.timeline();
      
      // Animação das palavras do título
      const titleWords = document.querySelectorAll('.title-word');
      const subtitle = document.querySelector('.welcome-subtitle');
      
      // Reset das palavras para estado inicial
      gsap.set(titleWords, { opacity: 0, y: 50 });
      gsap.set(subtitle, { opacity: 0, y: 30, visibility: 'hidden' });
      
      // Animação sequencial das palavras
      tl.to(titleWords, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Adiciona efeito de brilho após cada palavra aparecer
          titleWords.forEach((word, index) => {
            setTimeout(() => {
              word.classList.add('animated');
              // Efeito de partículas para cada palavra
              createTitleParticles(word);
            }, index * 150 + 800);
          });
        }
      })
      .to(subtitle, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          // Inicia o efeito de digitação após o subtítulo aparecer
          startTypewriterEffect();
        }
      }, "-=0.3");
      
      // Efeito de hover nas palavras
      titleWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
          gsap.to(word, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        word.addEventListener('mouseleave', () => {
          gsap.to(word, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
    
    // Função para criar partículas no título
    function createTitleParticles(element) {
      const rect = element.getBoundingClientRect();
      const colors = ['#2563eb', '#1d4ed8', '#3b82f6'];
      
      for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          width: 4px;
          height: 4px;
          background: ${colors[i % colors.length]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
        `;
        document.body.appendChild(particle);
        
        gsap.to(particle, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: "power2.out",
          onComplete: () => particle.remove()
        });
      }
    }
    
    // Função para o efeito de digitação
    function startTypewriterEffect() {
      const typewriterElement = document.getElementById('typewriter-text');
      if (!typewriterElement) return;

      // Limpa o texto e o cursor
      typewriterElement.textContent = '';
      typewriterElement.innerHTML = '';
      typewriterElement.style.visibility = 'visible';

      // Para qualquer instância anterior do Typewriter.js
      if (window.typewriterInstance && typeof window.typewriterInstance.stop === 'function') {
        window.typewriterInstance.stop();
        window.typewriterInstance = null;
      }

      // Cancela timeout do fallback manual, se houver
      if (window.typewriterTimeout) {
        clearTimeout(window.typewriterTimeout);
        window.typewriterTimeout = null;
      }

      setTimeout(() => {
        const text = typewriterElement.getAttribute('data-text') || 'Encontre rapidamente as informações que precisa ou converse com nosso assistente inteligente';
        if (typeof Typewriter !== 'undefined') {
          window.typewriterInstance = new Typewriter(typewriterElement, {
            strings: [text],
            autoStart: true,
            loop: false,
            delay: 50,
            deleteSpeed: 30,
            cursor: '<span class="typewriter-cursor">|</span>',
            onComplete: () => {
              if (typeof gsap !== 'undefined') {
                gsap.to(typewriterElement, {
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1
                });
              }
            }
          });
        } else {
          // Fallback manual
          let index = 0;
          function typeChar() {
            if (index < text.length) {
              typewriterElement.innerHTML += text.charAt(index);
              index++;
              window.typewriterTimeout = setTimeout(typeChar, 50);
            } else {
              typewriterElement.innerHTML += '<span class="typewriter-cursor">|</span>';
              if (typeof gsap !== 'undefined') {
                gsap.to(typewriterElement, {
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power2.out",
                  yoyo: true,
                  repeat: 1
                });
              }
              window.typewriterTimeout = null;
            }
          }
          typeChar();
        }
      }, 100);
    }
    
    // Executa a animação quando a página carrega
    animateWelcomeTitle();
    
    // Executa a animação dos cards após o título
    setTimeout(() => {
      animateCards();
    }, 1000);
    
    // ===== ANIMAÇÃO GSAP DOS CARDS =====
    function animateCards() {
      const cardsContainer = document.getElementById('homeCards');
      const cards = [
        document.getElementById('card-guia'),
        document.getElementById('card-cadastro'),
        document.getElementById('card-relatorio'),
        document.getElementById('card-config')
      ];
      
      // Fallback se GSAP não estiver disponível
      if (typeof gsap === 'undefined') {
        if (cardsContainer) {
          cardsContainer.style.opacity = '1';
          cardsContainer.style.visibility = 'visible';
        }
        cards.forEach(card => {
          if (card) {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }
        });
        return;
      }
      
      // Garante que o container esteja visível
      if (cardsContainer) {
        gsap.set(cardsContainer, {
          opacity: 1,
          visibility: 'visible'
        });
      }
      
      // Timeline para os cards
      const cardsTl = gsap.timeline();
      
      // Configuração inicial dos cards
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationY: 15
      });
      
      // Animação sequencial dos cards
      cardsTl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Adiciona efeitos de hover após a animação
          addCardHoverEffects();
        }
      });
      
      // Animação dos ícones dentro dos cards
      cards.forEach((card, index) => {
        const icon = card.querySelector('i:first-child');
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        const arrow = card.querySelector('.arrow');
        
        if (icon) {
          gsap.fromTo(icon, 
            { scale: 0, rotation: -180 },
            { 
              scale: 1, 
              rotation: 0, 
              duration: 0.6, 
              delay: 0.8 + (index * 0.2),
              ease: "back.out(1.7)"
            }
          );
        }
        
        if (title) {
          gsap.fromTo(title,
            { opacity: 0, x: -30 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.5, 
              delay: 1.0 + (index * 0.2),
              ease: "power2.out"
            }
          );
        }
        
        if (description) {
          gsap.fromTo(description,
            { opacity: 0, x: -20 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.5, 
              delay: 1.2 + (index * 0.2),
              ease: "power2.out"
            }
          );
        }
        
        if (arrow) {
          gsap.fromTo(arrow,
            { opacity: 0, x: 20 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.4, 
              delay: 1.4 + (index * 0.2),
              ease: "power2.out"
            }
          );
        }
      });
      
      // Animar os ícones da seção de ações
      animateActionIcons();
    }
    
    // Função para animar os ícones da seção de ações
    function animateActionIcons() {
      if (typeof gsap === 'undefined') return;
      
      const actions = document.querySelectorAll('.action');
      
      // Reset inicial dos ícones
      gsap.set(actions, {
        opacity: 0,
        y: 40,
        scale: 0.8
      });
      
      // Animação sequencial dos ícones
      actions.forEach((action, index) => {
        const iconBg = action.querySelector('.icon-bg');
        const title = action.querySelector('h4');
        const description = action.querySelector('p');
        
        // Animação do container da ação
        gsap.to(action, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 2.0 + (index * 0.3),
          ease: "back.out(1.7)"
        });
        
        // Animação do ícone de fundo
        if (iconBg) {
          gsap.fromTo(iconBg, 
            { scale: 0, rotation: -180, opacity: 0 },
            { 
              scale: 1, 
              rotation: 0, 
              opacity: 1,
              duration: 0.8, 
              delay: 2.2 + (index * 0.3),
              ease: "back.out(1.7)"
            }
          );
        }
        
        // Animação do título
        if (title) {
          gsap.fromTo(title,
            { opacity: 0, y: 20 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              delay: 2.4 + (index * 0.3),
              ease: "power2.out"
            }
          );
        }
        
        // Animação da descrição
        if (description) {
          gsap.fromTo(description,
            { opacity: 0, y: 15 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              delay: 2.6 + (index * 0.3),
              ease: "power2.out"
            }
          );
        }
      });
      
      // Adicionar efeitos de hover nos ícones
      addActionHoverEffects();
    }
    
    // Função para adicionar efeitos de hover nos ícones de ação
    function addActionHoverEffects() {
      const actions = document.querySelectorAll('.action');
      
      actions.forEach(action => {
        const iconBg = action.querySelector('.icon-bg');
        
        // Efeito de hover na ação
        action.addEventListener('mouseenter', () => {
          gsap.to(action, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Efeito no ícone de fundo
          if (iconBg) {
            gsap.to(iconBg, {
              scale: 1.15,
              rotation: 360,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
            
            // Adiciona brilho ao ícone
            gsap.to(iconBg, {
              boxShadow: "0 0 20px rgba(255,255,255,0.6)",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        action.addEventListener('mouseleave', () => {
          gsap.to(action, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Reset do ícone de fundo
          if (iconBg) {
            gsap.to(iconBg, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            
            // Remove o brilho
            gsap.to(iconBg, {
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        // Efeito de clique
        action.addEventListener('click', () => {
          // Efeito de pulso no clique
          gsap.to(action, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(action, {
                scale: 1.05,
                duration: 0.1,
                ease: "power2.out"
              });
            }
          });
          
          // Cria partículas no clique
          createParticleExplosion(action);
        });
      });
    }
    
    // Função para resetar os cards ao estado inicial
    function resetCards() {
      if (typeof gsap === 'undefined') return;
      
      const cards = [
        document.getElementById('card-guia'),
        document.getElementById('card-cadastro'),
        document.getElementById('card-relatorio'),
        document.getElementById('card-config')
      ];
      
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationY: 15
      });
    }
    

    
    // Função para adicionar efeitos de hover nos cards
    function addCardHoverEffects() {
      const cards = [
        document.getElementById('card-guia'),
        document.getElementById('card-cadastro'),
        document.getElementById('card-relatorio'),
        document.getElementById('card-config')
      ];
      
      cards.forEach(card => {
        if (!card) return;
        
        const icon = card.querySelector('i:first-child');
        const arrow = card.querySelector('.arrow');
        
        // Efeito de hover no card
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -8,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Efeito no ícone
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 360,
              duration: 0.4,
              ease: "back.out(1.7)"
            });
          }
          
          // Efeito na seta - inicia animação contínua no hover
          if (arrow) {
            // Remove qualquer animação anterior
            gsap.killTweensOf(arrow);
            
            // Inicia animação contínua apenas no hover
            const arrowTl = gsap.timeline({ repeat: -1 });
            arrowTl.to(arrow, {
              x: 6,
              scale: 1.15,
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut"
            })
            .to(arrow, {
              x: 0,
              scale: 1,
              opacity: 0.7,
              duration: 0.8,
              ease: "power2.inOut"
            });
            
            // Armazena a timeline para poder parar depois
            arrow._hoverAnimation = arrowTl;
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          
          // Reset do ícone
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          // Reset da seta - para animação e volta ao normal
          if (arrow) {
            // Para a animação de hover
            if (arrow._hoverAnimation) {
              arrow._hoverAnimation.kill();
              arrow._hoverAnimation = null;
            }
            
            // Retorna ao estado normal
            gsap.to(arrow, {
              x: 0,
              scale: 1,
              opacity: 0.7,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    }
    
    // Sidebar dropdowns
    document.querySelectorAll('.sidebar-dropdown').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita conflito com links internos
        document.querySelectorAll('.sidebar-dropdown').forEach(b => {
          if (b !== btn) b.classList.remove('open');
        });
        document.querySelectorAll('.sidebar-dropdown-content').forEach(c => {
          if (c !== btn.nextElementSibling) c.style.display = 'none';
        });
        btn.classList.toggle('open');
        const content = btn.nextElementSibling;
        if (btn.classList.contains('open')) {
          content.style.display = 'flex';
          anime({
            targets: content,
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 400,
            easing: 'easeOutCubic',
            begin: function() {
              content.style.opacity = 0;
              content.style.transform = 'translateX(-30px)';
            },
            complete: function() {
              content.style.opacity = 1;
              content.style.transform = 'none';
            }
          });
        } else {
          anime({
            targets: content,
            opacity: [1, 0],
            translateX: [0, -30],
            duration: 300,
            easing: 'easeInCubic',
            complete: function() {
              content.style.display = 'none';
            }
          });
        }
      });
    });

    // Sidebar link active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Função para mostrar uma seção e esconder as outras
    function showSection(sectionId) {
      // Esconde todas as seções do main com animação de saída
      document.querySelectorAll('.main > div').forEach(div => {
        if (div.style.display !== 'none') {
          anime({
            targets: div,
            opacity: [1, 0],
            translateY: [0, 30],
            duration: 350,
            easing: 'easeInCubic',
            complete: function() {
              div.style.display = 'none';
            }
          });
        } else {
          div.style.display = 'none';
          div.style.opacity = 0;
          div.style.transform = 'translateY(30px)';
        }
      });
      // Mostra a seção desejada com animação de entrada
      const section = document.getElementById(sectionId);
      if (section) {
        section.style.display = section.classList.contains('cards-row') ? 'flex' : 'block';
        anime({
          targets: section,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 500,
          easing: 'easeOutCubic',
          begin: function() {
            section.style.opacity = 0;
            section.style.transform = 'translateY(30px)';
          },
          complete: function() {
            section.style.opacity = 1;
            section.style.transform = 'none';
          }
        });
      }
    }

    // Cards navegação
    const cards = document.querySelectorAll('.card');
    const mainContent = document.getElementById('mainContent');
    const homeWelcome = document.getElementById('homeWelcome');
    const homeCards = document.getElementById('homeCards');
    const homeActions = document.getElementById('homeActions');
    const devSection = document.getElementById('devSection');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        // Efeito GSAP no card clicado
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            scale: 1.1,
            rotationY: 10,
            duration: 0.3,
            ease: "back.out(1.7)",
            onComplete: () => {
              gsap.to(card, {
                scale: 1,
                rotationY: 0,
                duration: 0.2,
                ease: "power2.out"
              });
            }
          });
          
          // Efeito de partículas no card clicado
          const rect = card.getBoundingClientRect();
          for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
              position: fixed;
              width: 6px;
              height: 6px;
              background: #2563eb;
              border-radius: 50%;
              pointer-events: none;
              z-index: 1000;
              left: ${rect.left + rect.width / 2}px;
              top: ${rect.top + rect.height / 2}px;
            `;
            document.body.appendChild(particle);
            
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 120,
              y: (Math.random() - 0.5) * 120,
              opacity: 0,
              scale: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => particle.remove()
            });
          }
          
          // Efeito especial na seta quando clicada
          const arrow = card.querySelector('.arrow');
          if (arrow) {
            gsap.to(arrow, {
              x: 15,
              scale: 1.3,
              rotation: 15,
              duration: 0.4,
              ease: "back.out(1.7)",
              onComplete: () => {
                gsap.to(arrow, {
                  x: 0,
                  scale: 1,
                  rotation: 0,
                  duration: 0.2,
                  ease: "power2.out"
                });
              }
            });
          }
        } else {
          // Fallback com anime.js
          anime({
            targets: card,
            scale: [1, 1.08, 1],
            opacity: [1, 0.7, 1],
            duration: 600,
            easing: 'easeInOutQuad',
          });
        }
        
        // Mostra a seção correspondente
        const section = card.getAttribute('data-section');
        showSection('section-' + section);
        setTimeout(() => {
          card.classList.remove('selected');
        }, 800);
      });
    });

    // Sidebar navegação
    // Adiciona data-section nos botões do menu lateral para identificar a seção
    // (Se não houver, pode-se mapear pelo texto ou adicionar manualmente)
    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation(); // Não fecha o dropdown ao clicar no link
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        // Mapeamento simples pelo texto do link
        const text = link.textContent.trim().toLowerCase();
        let section = '';
        if (text.includes('guia')) section = 'guia';
        else if (text.includes('paciente')) section = 'cadastro';
        else if (text.includes('relat')) section = 'relatorio';
        else if (text.includes('config')) section = 'config';
        // Adicione outros mapeamentos conforme necessário
        if (section) showSection('section-' + section);
      });
    });

    // Variável global para controlar animação da home
    window.isHomeAnimating = false;
    // Função para mostrar a home (welcome, cards e actions)
    function showHome() {
      if (window.isHomeAnimating) return; // Evita múltiplas execuções
      window.isHomeAnimating = true;
      // Esconde todas as seções
      document.querySelectorAll('.main > div').forEach(div => {
        div.style.display = 'none';
      });
      // Mostra todas as partes da home e reseta opacity/transform
      const homeWelcome = document.getElementById('homeWelcome');
      const homeCards = document.getElementById('homeCards');
      const homeActions = document.getElementById('homeActions');
      homeWelcome.style.display = 'block';
      homeWelcome.style.opacity = 1;
      homeWelcome.style.transform = 'none';
      homeCards.style.display = 'flex';
      homeCards.style.opacity = 0;
      homeCards.style.visibility = 'hidden';
      homeActions.style.display = 'block';
      homeActions.style.opacity = 1;
      homeActions.style.transform = 'none';
      
      // Re-anima o título quando retorna à home
      setTimeout(() => {
        animateWelcomeTitle();
        window.isHomeAnimating = false; // Libera para novo clique só depois de tudo
      }, 100);
      
      // Reseta e re-anima os cards
      setTimeout(() => {
        resetCards();
        animateCards();
      }, 1200);
      // Removido: chamada duplicada de startTypewriterEffect()
    }

    // Voltar para home ao clicar no logo
    document.querySelector('.header-logo').addEventListener('click', showHome);

    // Chat flutuante
    const chatFab = document.getElementById('chatFab');
    const chatBox = document.getElementById('chatBox');
    // const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const chatForm = document.getElementById('chatForm');
    const chatSendBtn = document.getElementById('chatSendBtn');

    function toggleChat() {
      if (chatBox.classList.contains('open')) {
        // Efeito de saída melhorado
        anime({
          targets: chatBox,
          opacity: [1, 0],
          translateY: [0, 40],
          scale: [1, 0.95],
          duration: 400,
          easing: 'easeInCubic',
          complete: function() {
            chatBox.classList.remove('open');
            chatBox.style.opacity = '';
            chatBox.style.transform = '';
            chatBox.style.scale = '';
          }
        });
      } else {
        // Efeito de entrada melhorado
        // Se for mobile, esconder o tooltip ao abrir o chat
        if (isMobile()) {
          hideFabDialog();
        }
        chatBox.classList.add('open');
        chatBox.style.opacity = 0;
        chatBox.style.transform = 'translateY(40px) scale(0.95)';
        
        // Aplicar animações internas
        setTimeout(() => {
          enhanceChatBoxAnimations();
        }, 100);
        
        anime({
          targets: chatBox,
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.95, 1],
          duration: 600,
          easing: 'easeOutCubic',
          complete: function() {
            chatBox.style.opacity = '';
            chatBox.style.transform = '';
            chatBox.style.scale = '';
          }
        });
        chatInput.focus();
      }
    }
    // Função utilitária para detectar mobile
    function isMobile() {
      return window.innerWidth <= 900 || /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    chatFab.addEventListener('click', function(e) {
      // Se for mobile, esconder o tooltip antes de abrir o chat
      if (isMobile()) {
        hideFabDialog();
      }
      // Efeito de círculo de explosão
      const rect = chatFab.getBoundingClientRect();
      const circle = document.createElement('div');
      circle.className = 'fab-explosion-circle';
      document.body.appendChild(circle);
      const size = Math.max(rect.width, rect.height) * 2.2;
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
      circle.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
      circle.style.position = 'fixed';
      circle.style.zIndex = 9999;
      circle.style.pointerEvents = 'none';
      anime({
        targets: circle,
        scale: [0.2, 1.1],
        opacity: [0.45, 0],
        easing: 'cubicBezier(.7,-0.3,.5,1.5)',
        duration: 520,
        complete: function() { circle.remove(); }
      });
      // Efeito robusto: squash, bounce, rotação e fade
      anime({
        targets: chatFab,
        scaleX: [1, 1.3, 0.12],
        scaleY: [1, 0.7, 0.12],
        rotate: [0, 12, -18, 0],
        translateY: [0, -12, 40],
        opacity: [1, 0.7, 0],
        duration: 480,
        easing: 'cubicBezier(.7,-0.3,.5,1.5)',
        complete: function() {
          chatFab.style.transform = '';
          chatFab.style.opacity = '';
          chatFab.style.display = 'none';
          toggleChat();
        }
      });
    });
    // openChatBtn.addEventListener('click', toggleChat);
    // openChatBtn.addEventListener('keydown', function(e) {
    //   if (e.key === 'Enter' || e.key === ' ') toggleChat();
    // });
    closeChatBtn.addEventListener('click', closeChat);

    let perguntas = [];
    let respostas = {};

    fetch('perguntas.json')
      .then(res => res.json())
      .then(data => { perguntas = data; });

    fetch('respostas.json')
      .then(res => res.json())
      .then(data => { respostas = data; });

    function normalizarTexto(texto) {
      return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[ -]/g, c => c.normalize ? c.normalize('NFD') : c)
        .replace(/[ -]/g, '')
        .replace(/[^a-z0-9 ]/gi, '') // remove tudo que não for letra, número ou espaço
        .trim();
    }

    function typeBotMsg(msg) {
      // Adiciona efeito de digitando
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg typing-effect';
      typingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
      // Remove efeito após 1,5s e mostra a mensagem digitada
      setTimeout(() => {
        typingDiv.remove();
        // Exibe a mensagem normalmente
        const div = document.createElement('div');
        div.className = 'chat-msg';
        chatBody.appendChild(div);
        let i = 0;
        function type() {
          if (i <= msg.length) {
            div.innerHTML = msg.slice(0, i) + '<span class="type-cursor">|</span>';
            chatBody.scrollTop = chatBody.scrollHeight;
            i++;
            setTimeout(type, 18 + Math.random() * 30);
          } else {
            div.innerHTML = msg;
            chatBody.scrollTop = chatBody.scrollHeight;
          }
        }
        type();
      }, 1500);
    }

    function getIdByPergunta(pergunta) {
      const p = perguntas.find(q => normalizarTexto(q.pergunta) === normalizarTexto(pergunta));
      return p ? p.id : null;
    }

    // Ao enviar pergunta ou clicar em FAQ
    function responder(pergunta) {
      const id = getIdByPergunta(pergunta);
      if (id && respostas[id]) {
        typeBotMsg(respostas[id].resumida);
      } else {
        typeBotMsg('Desculpe, não encontrei uma resposta para sua pergunta.');
      }
    }

    // FAQ buttons
    // Buscar resposta no banco carregado
    const faqBtns = document.querySelectorAll('.chat-faq-btn');
    let faqRespondendo = false;
    const faqList = document.querySelector('.chat-faq-list');
    const faqTitle = document.querySelector('.chat-faq-title');
    faqBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (faqRespondendo) return;
        faqRespondendo = true;
        // Desabilita todos os botões FAQ
        faqBtns.forEach(b => b.disabled = true);
        // Oculta a lista de perguntas frequentes
        if (faqList) faqList.style.display = 'none';
        if (faqTitle) faqTitle.style.display = 'none';
        // Efeito de livro caindo de cima para baixo - Versão simplificada
        const faqRect = btn.getBoundingClientRect();
        const input = chatInput;
        const inputRect = input.getBoundingClientRect();
        const chatBoxRect = chatBox.getBoundingClientRect();
        
        // Posição relativa ao chatBox
        const faqLeft = faqRect.left - chatBoxRect.left;
        const faqTop = faqRect.top - chatBoxRect.top;
        const inputLeft = inputRect.left - chatBoxRect.left;
        const inputTop = inputRect.top - chatBoxRect.top;
        
        // Cria o livro simplificado
        const book = document.createElement('div');
        book.className = 'book-effect';
        book.innerHTML = `
          <div class="book-cover">
            <div class="book-content">
              <i class="ri-book-2-line"></i>
              <span class="book-text">${btn.textContent}</span>
            </div>
          </div>
        `;
        chatBox.appendChild(book);
        
        // Estilos iniciais do livro - posicionado acima do chat
        book.style.position = 'absolute';
        book.style.left = faqLeft + 'px';
        book.style.top = '-60px'; // Começa acima do chat
        book.style.width = faqRect.width + 'px';
        book.style.height = faqRect.height + 'px';
        book.style.zIndex = 9999;
        book.style.pointerEvents = 'none';
        book.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)';
        book.style.borderRadius = '8px';
        book.style.boxShadow = '0 8px 32px rgba(139, 69, 19, 0.4)';
        book.style.display = 'flex';
        book.style.alignItems = 'center';
        book.style.justifyContent = 'center';
        book.style.color = '#fff';
        book.style.fontWeight = '500';
        book.style.fontSize = '1rem';
        book.style.transform = 'scale(0.8)';
        book.style.transformOrigin = 'center bottom';
        
        // Cria a resposta que sai do livro
        const answer = document.createElement('div');
        answer.className = 'book-answer';
        answer.innerHTML = `
          <div class="answer-content">
            <span class="answer-text">${btn.textContent}</span>
          </div>
        `;
        chatBox.appendChild(answer);
        
        // Estilos iniciais da resposta - posicionada acima do chat
        answer.style.position = 'absolute';
        answer.style.left = faqLeft + 'px';
        answer.style.top = '-40px'; // Começa acima do chat
        answer.style.width = faqRect.width + 'px';
        answer.style.height = faqRect.height + 'px';
        answer.style.zIndex = 9998;
        answer.style.pointerEvents = 'none';
        answer.style.opacity = '0';
        answer.style.background = 'linear-gradient(135deg, #2563eb, #3b82f6)';
        answer.style.borderRadius = '8px';
        answer.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.3)';
        answer.style.display = 'flex';
        answer.style.alignItems = 'center';
        answer.style.justifyContent = 'center';
        answer.style.color = '#fff';
        answer.style.fontWeight = '500';
        answer.style.fontSize = '1rem';
        answer.style.transform = 'scale(0.6)';
        answer.style.transformOrigin = 'center bottom';
        
        // Sequência de animações simplificada
        const timeline = anime.timeline({
          easing: 'easeInOutCubic'
        });
        
        // 1. Livro cai de cima para baixo
        timeline.add({
          targets: book,
          top: [faqTop - 10, faqTop],
          scale: [0.8, 1.1, 1],
          duration: 600,
          easing: 'easeOutBounce(1, 0.8)'
        });
        
        // 2. Resposta aparece e cai
        timeline.add({
          targets: answer,
          top: [faqTop - 5, faqTop],
          opacity: [0, 1],
          scale: [0.6, 1],
          duration: 400,
          easing: 'easeOutBack(1.7)'
        }, '-=300');
        
        // 3. Resposta voa para o input
        timeline.add({
          targets: answer,
          left: inputLeft + 'px',
          top: inputTop + 'px',
          width: inputRect.width + 'px',
          height: inputRect.height + 'px',
          scale: [1, 0.95, 1],
          background: [
            'linear-gradient(135deg, #2563eb, #3b82f6)',
            'linear-gradient(135deg, #e8f0fe, #dbeafe)'
          ],
          color: ['#fff', '#2563eb'],
          borderRadius: ['8px', '20px'],
          boxShadow: [
            '0 8px 32px rgba(37, 99, 235, 0.3)',
            '0 4px 16px rgba(37, 99, 235, 0.15)'
          ],
          duration: 800,
          easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)'
        }, '-=200');
        
        // 4. Livro sobe e desaparece
        timeline.add({
          targets: book,
          scale: [1, 0.8],
          top: [faqTop, faqTop - 40],
          opacity: [1, 0],
          duration: 500,
          easing: 'easeInOutQuart'
        }, '-=600');
        
        // 5. Resposta desaparece no input
        timeline.add({
          targets: answer,
          scale: [1, 1.1, 0.8],
          opacity: [1, 0.9, 0],
          duration: 300,
          easing: 'easeInOutQuad',
          complete: function() {
            book.remove();
            answer.remove();
            // Preenche o input e dispara o envio
            chatInput.value = btn.textContent;
            chatForm.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
          }
        }, '-=200');
      });
    });

    // Controle global para digitação do bot
    window.isBotTyping = false;
    window.stopBotTyping = false;

    function setSendBtnToStop() {
      chatSendBtn.innerHTML = '<i class="ri-stop-line"></i>';
      chatSendBtn.title = 'Parar resposta';
      chatSendBtn.classList.add('stop-btn');
    }
    function setSendBtnToSend() {
      chatSendBtn.innerHTML = '<i class="ri-send-plane-2-line"></i>';
      chatSendBtn.title = 'Enviar';
      chatSendBtn.classList.remove('stop-btn');
    }

    // Reabilita os botões FAQ após a resposta ser exibida
    const oldTypeBotMsg = typeBotMsg;
    typeBotMsg = function(msg) {
      // Desabilita imediatamente ao iniciar a resposta
      faqRespondendo = true;
      faqBtns.forEach(b => b.disabled = true);
      if (faqList) faqList.style.display = 'none';
      if (faqTitle) faqTitle.style.display = 'none';
      // Nova versão: callback ao final da digitação
      function onFinish() {
        faqRespondendo = false;
        faqBtns.forEach(b => b.disabled = false);
        if (faqList) faqList.style.display = '';
        if (faqTitle) faqTitle.style.display = '';
      }
      // Modifica oldTypeBotMsg para aceitar callback
      let i = 0;
      const div = document.createElement('div');
      div.className = 'chat-msg bot-msg';
      div.innerHTML = `
        <div class="msg-content">
          <div class="bot-avatar">
            <i class="ri-robot-2-line"></i>
          </div>
          <div class="msg-text"></div>
          <button class="tts-btn" title="Ouvir mensagem" style="opacity: 0; pointer-events: none;">
            <i class="ri-volume-up-line"></i>
          </button>
        </div>
      `;
      chatBody.appendChild(div);
      const msgTextElement = div.querySelector('.msg-text');
      const ttsBtn = div.querySelector('.tts-btn');
      
      // Ativa modo de digitação do bot
      window.isBotTyping = true;
      window.stopBotTyping = false;
      setSendBtnToStop();

      function type() {
        if (window.stopBotTyping) {
          msgTextElement.innerHTML = msg.slice(0, i - 1); // Mostra só até onde digitou
          window.isBotTyping = false;
          setSendBtnToSend();
          onFinish();
          return;
        }
        if (i <= msg.length) {
          msgTextElement.innerHTML = msg.slice(0, i) + '<span class="typing-cursor">|</span>';
          chatBody.scrollTop = chatBody.scrollHeight;
          i++;
          setTimeout(type, 18 + Math.random() * 30);
        } else {
          msgTextElement.innerHTML = msg;
          chatBody.scrollTop = chatBody.scrollHeight;
          window.isBotTyping = false;
          setSendBtnToSend();
          // Mostra o botão TTS com animação
          ttsBtn.style.opacity = '0';
          ttsBtn.style.pointerEvents = 'auto';
          ttsBtn.onclick = () => playTTS(ttsBtn, msg);
          anime({
            targets: ttsBtn,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            easing: 'easeOutBack(1.7)'
          });
          onFinish();
        }
      }
      // Adiciona efeito de digitando
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg typing-effect';
      typingDiv.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
      chatBody.appendChild(typingDiv);
      chatBody.scrollTop = chatBody.scrollHeight;
      setTimeout(() => {
        typingDiv.remove();
        type();
      }, 1500);
    };

    // Chat envio
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const msg = chatInput.value.trim();
      if (!msg) return;
      addUserMsg(msg);
      chatInput.value = '';
      setTimeout(() => {
        responder(msg);
      }, 900);
    });

    // Listener extra para garantir que o botão nunca recarregue a página
    if (chatSendBtn) {
      chatSendBtn.addEventListener('click', function(e) {
        if (window.isBotTyping) {
          window.stopBotTyping = true;
          return;
        }
        if (e) e.preventDefault();
        chatForm.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
      });
    }

    function addUserMsg(msg) {
      const div = document.createElement('div');
      div.className = 'chat-msg';
      div.style.background = '#e8f0fe';
      div.style.alignSelf = 'flex-end';
      div.innerHTML = msg;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
    function addBotMsg(msg) {
      const div = document.createElement('div');
      div.className = 'chat-msg bot-msg';
      div.innerHTML = `
        <div class="msg-content">
          <div class="bot-avatar">
            <i class="ri-robot-2-line"></i>
          </div>
          <div class="msg-text">${msg}</div>
          <button class="tts-btn" title="Ouvir mensagem" onclick="playTTS(this, '${msg.replace(/'/g, "\\'")}')">
            <i class="ri-volume-up-line"></i>
          </button>
        </div>
      `;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Ao fechar o chat, mostrar o chatFab com efeito de retorno
    function closeChat() {
      if (chatBox.classList.contains('open')) {
        anime({
          targets: chatBox,
          opacity: [1, 0],
          translateY: [0, 40],
          duration: 350,
          easing: 'easeInCubic',
          complete: function() {
            chatBox.classList.remove('open');
            chatBox.style.opacity = '';
            chatBox.style.transform = '';
            // Mostra o chatFab com efeito
            chatFab.style.display = 'block';
            chatFab.style.opacity = 0;
            chatFab.style.transform = 'scaleX(0.12) scaleY(0.12) rotate(-18deg) translateY(40px)';
            anime({
              targets: chatFab,
              scaleX: [0.12, 1.18, 1],
              scaleY: [0.12, 1.25, 1],
              rotate: [-18, 8, 0],
              translateY: [40, -10, 0],
              opacity: [0, 1],
              duration: 520,
              easing: 'cubicBezier(.7,-0.3,.5,1.5)',
              complete: function() {
                chatFab.style.transform = '';
                chatFab.style.opacity = '';
              }
            });
          }
        });
      }
    }

    // Fechar chat ao clicar fora (opcional)
    // document.addEventListener('mousedown', function(e) {
    //   if (chatBox.classList.contains('open') && !chatBox.contains(e.target) && !chatFab.contains(e.target) && !openChatBtn.contains(e.target)) {
    //     closeChat();
    //   }
    // });

    // Enter abre chat se focado no botão
    // Busca no header (apenas visual)
    document.querySelector('.header-search input').addEventListener('focus', function() {
      this.style.border = '1.5px solid var(--azul)';
    });
    document.querySelector('.header-search input').addEventListener('blur', function() {
      this.style.border = '1px solid var(--cinza-borda)';
    });

    // Clique em 'Clique aqui para maiores informações'
    chatBody.addEventListener('click', function(e) {
      if (e.target.classList.contains('manual-link')) {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        if (id && respostas[id]) {
          document.querySelectorAll('.main > div').forEach(div => div.style.display = 'none');
          document.getElementById('card-detalhe-completo').style.display = 'block';
          const perguntaObj = perguntas.find(q => q.id === id);
          document.getElementById('card-titulo').innerText = perguntaObj ? perguntaObj.pergunta : '';
          document.getElementById('card-conteudo').innerHTML = respostas[id].completa;
          closeChat();
        }
      }
    });

    // Efeitos JS extras para cada ícone (opcional)
    document.querySelectorAll('.icon-1').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.background = '#F4AC52';
      });
      el.addEventListener('mouseleave', function() {
        el.style.background = '#181818';
      });
    });
    document.querySelectorAll('.icon-2').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.background = '#E88C38';
      });
      el.addEventListener('mouseleave', function() {
        el.style.background = '#181818';
      });
    });
    document.querySelectorAll('.icon-3').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        el.style.background = '#545554';
      });
      el.addEventListener('mouseleave', function() {
        el.style.background = '#181818';
      });
    });

    // ===== ANIMAÇÕES ROBUSTAS DO CHAT FLUTUANTE =====
    
    // 1. Efeito shake e caixinha de diálogo no hover do chatFab
    let fabDialog = null;
    let isFabAnimating = false;
    
    function showFabDialog() {
      if (fabDialog || chatBox.classList.contains('open') || chatFab.style.display === 'none') return;
      fabDialog = document.createElement('div');
      fabDialog.className = 'fab-dialog-bubble';
      fabDialog.innerHTML = `
        <div class="dialog-content">
          <i class="ri-robot-2-line"></i>
          <span>Olá, como posso te ajudar hoje?</span>
        </div>
        <div class="dialog-arrow"></div>
      `;
      document.body.appendChild(fabDialog);
      const rect = chatFab.getBoundingClientRect();
      fabDialog.style.position = 'fixed';
      fabDialog.style.left = (rect.left + rect.width / 2) + 'px';
      fabDialog.style.top = (rect.top - 60) + 'px';
      fabDialog.style.transform = 'translateX(-92%) scale(0.8)';
      fabDialog.style.zIndex = 10000;
      setTimeout(() => {
        if (fabDialog) {
          fabDialog.classList.add('show');
          anime({
            targets: fabDialog,
            scale: [0.8, 1.1, 1],
            duration: 400,
            easing: 'easeOutBack(1.7)'
          });
        }
      }, 10);
    }
    
    function hideFabDialog() {
      if (fabDialog) {
        anime({
          targets: fabDialog,
          scale: [1, 0.8],
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInQuad',
          complete: function() {
            if (fabDialog) {
              fabDialog.remove();
              fabDialog = null;
            }
          }
        });
      }
    }
    
    // 2. Efeitos avançados no hover do FAB
    chatFab.addEventListener('mouseenter', function() {
      if (isMobile()) return; // Não mostra o tooltip em mobile
      if (isFabAnimating) return;
      isFabAnimating = true;
      
      // Efeito shake melhorado
      anime({
        targets: chatFab,
        translateX: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0],
        rotate: [0, -5, 5, -3, 3, -1, 1, 0],
        scale: [1, 1.1, 1],
        duration: 600,
        easing: 'easeInOutSine',
        complete: function() {
          isFabAnimating = false;
        }
      });
      
      // Efeito de brilho
      const glow = document.createElement('div');
      glow.className = 'fab-glow';
      chatFab.appendChild(glow);
      
      anime({
        targets: glow,
        scale: [0, 1.5],
        opacity: [0, 0.6, 0],
        duration: 800,
        easing: 'easeOutQuad',
        complete: function() {
          glow.remove();
        }
      });
      
      showFabDialog();
    });
    
    chatFab.addEventListener('mouseleave', hideFabDialog);
    
    // 3. Efeito de clique no FAB
    chatFab.addEventListener('click', function() {
      // Efeito de explosão de partículas
      createParticleExplosion(chatFab);
      
      // Efeito de onda
      createRippleEffect(chatFab);
    });
    
    // 4. Função para criar explosão de partículas
    function createParticleExplosion(element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = '✨';
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.zIndex = 10001;
        particle.style.fontSize = '16px';
        particle.style.pointerEvents = 'none';
        
        anime({
          targets: particle,
          left: endX,
          top: endY,
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          rotate: [0, 360],
          duration: 1000 + Math.random() * 500,
          easing: 'easeOutQuad',
          complete: function() {
            particle.remove();
          }
        });
      }
    }
    
    // 5. Função para criar efeito de onda
    function createRippleEffect(element) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      element.appendChild(ripple);
      
      anime({
        targets: ripple,
        scale: [0, 2],
        opacity: [0.6, 0],
        duration: 600,
        easing: 'easeOutQuad',
        complete: function() {
          ripple.remove();
        }
      });
    }
    
    // 6. Animações do chat box
    function enhanceChatBoxAnimations() {
      // Efeito de entrada do chat
      const chatHeader = document.querySelector('.chat-header');
      const chatBody = document.querySelector('.chat-body');
      const chatInput = document.querySelector('.chat-input-row');
      
      // Header desliza de cima
      anime({
        targets: chatHeader,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic'
      });
      
      // Body aparece com fade
      anime({
        targets: chatBody,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 200,
        easing: 'easeOutCubic'
      });
      
      // Input desliza de baixo
      anime({
        targets: chatInput,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 400,
        easing: 'easeOutCubic'
      });
    }
    
    // 7. Efeito de digitação melhorado
    function enhancedTypeEffect(element, text, speed = 50) {
      let i = 0;
      element.innerHTML = '';
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          element.scrollTop = element.scrollHeight;
          i++;
          
          // Efeito de cursor piscante
          const cursor = document.createElement('span');
          cursor.className = 'typing-cursor';
          cursor.textContent = '|';
          element.appendChild(cursor);
          
          setTimeout(() => {
            if (cursor.parentNode) cursor.remove();
          }, 300);
          
          setTimeout(type, speed + Math.random() * 30);
        }
      }
      
      type();
    }
    
    // 8. Efeito de notificação
    window.showNotification = function(message, type = 'info') {
      const chatBox = document.getElementById('chatBox');
      if (!chatBox) {
        alert(message);
        return;
      }
      
      const notification = document.createElement('div');
      notification.className = `chat-notification ${type}`;
      notification.innerHTML = `
        <i class="ri-${type === 'success' ? 'check-line' : type === 'error' ? 'close-line' : 'information-line'}"></i>
        <span>${message}</span>
      `;
      
      chatBox.appendChild(notification);
      
      if (window.anime) {
        anime({
          targets: notification,
          translateX: [300, 0],
          opacity: [0, 1],
          duration: 400,
          easing: 'easeOutBack(1.7)',
          complete: function() {
            setTimeout(() => {
              anime({
                targets: notification,
                translateX: [0, 300],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: function() {
                  notification.remove();
                }
              });
            }, 3000);
          }
        });
      } else {
        // Fallback sem anime.js
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
        setTimeout(() => {
          notification.remove();
        }, 3000);
      }
    };
    
    // 9. Efeito de carregamento
    function showLoadingEffect() {
      const loading = document.createElement('div');
      loading.className = 'chat-loading';
      loading.innerHTML = `
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span>Processando...</span>
      `;
      
      chatBody.appendChild(loading);
      
      anime({
        targets: loading,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        easing: 'easeOutCubic'
      });
      
      return loading;
    }
    
    // ===== SISTEMA DE TEXT-TO-SPEECH =====
    
    // Função para reproduzir TTS (escopo global)
    window.playTTS = function(button, text) {
      // Verifica se o navegador suporta TTS
      if (!window.speechSynthesis) {
        if (window.showNotification) {
          window.showNotification('Seu navegador não suporta síntese de voz', 'error');
        } else {
          alert('Seu navegador não suporta síntese de voz');
        }
        return;
      }
      
      // Verifica se já está falando (botão vermelho)
      const icon = button.querySelector('i');
      const isCurrentlySpeaking = icon.className === 'ri-volume-mute-line';
      
      if (isCurrentlySpeaking) {
        // Se está falando, para a reprodução
        window.speechSynthesis.cancel();
        icon.className = 'ri-volume-up-line';
        button.style.background = '';
        button.title = 'Ouvir mensagem';
        if (window.anime) {
          anime({
            targets: button,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
          });
        }
        return;
      }
      
      // Cancela qualquer fala anterior
      window.speechSynthesis.cancel();
      
      // Cria a mensagem de fala
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configurações da voz
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9; // Velocidade (0.1 a 10)
      utterance.pitch = 1; // Tom (0 a 2)
      utterance.volume = 1; // Volume (0 a 1)
      
      // Tenta usar uma voz feminina em português
      const voices = window.speechSynthesis.getVoices();
      const portugueseVoice = voices.find(voice => 
        voice.lang.includes('pt') && voice.name.includes('female')
      ) || voices.find(voice => 
        voice.lang.includes('pt')
      ) || voices.find(voice => 
        voice.lang.includes('en') && voice.name.includes('female')
      );
      
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }
      
      // Efeito visual no botão durante a fala
      const originalIcon = icon.className;
      
      // Anima o botão
      if (window.anime) {
        anime({
          targets: button,
          scale: [1, 1.1, 1],
          duration: 200,
          easing: 'easeInOutQuad'
        });
      }
      
      // Muda o ícone para indicar que está falando
      icon.className = 'ri-volume-mute-line';
      button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      button.title = 'Parar reprodução';
      
      // Eventos da síntese de voz
      utterance.onstart = function() {
        // Efeito de pulso durante a fala
        if (window.anime) {
          anime({
            targets: button,
            scale: [1, 1.05, 1],
            duration: 1000,
            easing: 'easeInOutSine',
            loop: true
          });
        }
      };
      
      utterance.onend = function() {
        // Restaura o botão ao estado original
        icon.className = originalIcon;
        button.style.background = '';
        button.title = 'Ouvir mensagem';
        if (window.anime) {
          anime({
            targets: button,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
          });
        }
      };
      
      utterance.onerror = function(event) {
        console.error('Erro na síntese de voz:', event);
        icon.className = originalIcon;
        button.style.background = '';
        button.title = 'Ouvir mensagem';
        if (window.showNotification) {
          window.showNotification('Erro ao reproduzir áudio', 'error');
        } else {
          alert('Erro ao reproduzir áudio');
        }
      };
      
      // Inicia a síntese de voz
      window.speechSynthesis.speak(utterance);
    };
    
    // Carrega as vozes disponíveis
    function loadVoices() {
      return new Promise((resolve) => {
        if (window.speechSynthesis.getVoices().length > 0) {
          resolve(window.speechSynthesis.getVoices());
        } else {
          window.speechSynthesis.onvoiceschanged = () => {
            resolve(window.speechSynthesis.getVoices());
          };
        }
      });
    }
    
    // Inicializa o sistema TTS
    loadVoices().then(voices => {
      console.log('Vozes disponíveis:', voices.length);
    });
    
    // 10. Exibir automaticamente a cada 30 segundos
    setInterval(() => {
      if (isMobile()) return; // Não mostra o tooltip em mobile
      if (!fabDialog && !chatBox.classList.contains('open') && chatFab.style.display !== 'none') {
        showFabDialog();
        setTimeout(hideFabDialog, 2200);
      }
    }, 30000);

    // ===== Alternância de Tema Light/Dark =====
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    function setTheme(dark) {
      if (dark) {
        document.body.classList.add('dark');
        if(themeIcon) themeIcon.className = 'ri-sun-line';
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        if(themeIcon) themeIcon.className = 'ri-moon-line';
        localStorage.setItem('theme', 'light');
      }
    }
    // Detecta preferência salva ou do sistema
    const userTheme = localStorage.getItem('theme');
    if (userTheme === 'dark') setTheme(true);
    else if (userTheme === 'light') setTheme(false);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);
    else setTheme(false);
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function() {
        setTheme(!document.body.classList.contains('dark'));
      });
    }
}); // Fim do DOMContentLoaded
  