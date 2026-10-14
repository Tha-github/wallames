const WHATSAPP = "553499236-2770"; // ALTERAR AQUI

/* =============================================
   BANNER — ANIMAÇÃO SEQUENCIAL DE PALAVRAS
   Ordem: "O MELHOR" → "PASTEL" → "DO MUNDO"
   Após as três: exibe assinatura e rola até #sobre.
   O scroll automático é cancelado se o usuário
   rolar manualmente (wheel, touch ou teclado).
============================================= */
(function iniciarBanner() {

  const palavras    = ['palavra-1', 'palavra-2', 'palavra-3'].map(id => document.getElementById(id));
  const logo        = document.getElementById('banner-logo');
  const proximaSecao = document.getElementById('sobre');

  /* Flag para cancelar o scroll automático */
  let scrollCancelado = false;

  function cancelarScroll() {
    scrollCancelado = true;
  }

  /* Detecta rolagem manual do usuário */
  window.addEventListener('wheel',     cancelarScroll, { once: true, passive: true });
  window.addEventListener('touchmove', cancelarScroll, { once: true, passive: true });
  window.addEventListener('keydown', function(e) {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) {
      cancelarScroll();
    }
  }, { once: true });

  /* Utilitário: aguarda N milissegundos */
  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* Exibe a palavra com animação de entrada */
  function mostrar(el) {
    el.classList.add('entrada');
  }

  /* Esconde a palavra com animação de saída e resolve após terminar */
  function esconder(el) {
    return new Promise(resolve => {
      el.classList.add('saida');
      setTimeout(() => {
        el.classList.remove('entrada', 'saida');
        resolve();
      }, 450); /* bate com a transition de saída no CSS */
    });
  }

  /* Sequência principal */
  async function animar() {
    const DURACAO_ENTRADA  = 700;  /* ms da transição de entrada */
    const TEMPO_EXIBICAO   = 1300; /* ms que cada palavra fica visível */
    const PAUSA_ENTRE      = 180;  /* ms de pausa entre uma palavra e outra */

    for (const palavra of palavras) {
      mostrar(palavra);
      await esperar(DURACAO_ENTRADA + TEMPO_EXIBICAO);
      await esconder(palavra);
      await esperar(PAUSA_ENTRE);
    }

    /* Exibe o logo, com a mesma animação de entrada das palavras */
    if (logo) mostrar(logo);

    /* Aguarda um instante e rola até a próxima seção (se não cancelado) */
    await esperar(2800);
    if (!scrollCancelado && proximaSecao) {
      proximaSecao.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* Pequeno delay antes de iniciar para a página terminar de carregar */
  esperar(400).then(animar);

})();

/* =============================================
   REVEAL — Animação por scroll
   Observa todos os .reveal e adiciona .visivel
   quando entram na viewport.
============================================= */
(function iniciarReveal() {

  const elementos = document.querySelectorAll('.reveal');
  if (!elementos.length) return;

  const observador = new IntersectionObserver(
    function(entradas) {
      entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target); /* executa uma única vez */
        }
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach(function(el) { observador.observe(el); });

})();

/* =============================================
   WHATSAPP — Links de delivery, franquia e contato
   Usa a constante WHATSAPP definida no topo.
============================================= */
(function configurarWhatsApp() {

  const url = 'https://wa.me/' + WHATSAPP;

  /* Busca todos os botões de delivery marcados com data-delivery */
  document.querySelectorAll('[data-delivery]').forEach(function(btn) {
    btn.href = url;
  });

  /* Botão de delivery da seção Sobre */
  var btnSobre = document.getElementById('btn-delivery-sobre');
  if (btnSobre) btnSobre.href = url;

  /* Botão de delivery da seção Cardápio */
  var btnCardapio = document.getElementById('btn-delivery-cardapio');
  if (btnCardapio) btnCardapio.href = url;

  /* Botão "Quero ser Franqueado", com mensagem pré-preenchida */
  var btnFranquia = document.getElementById('btn-franquia');
  if (btnFranquia) {
    var mensagemFranquia = 'Olá! Tenho interesse em ser um franqueado da Eu Amo Pastel.';
    btnFranquia.href = url + '?text=' + encodeURIComponent(mensagemFranquia);
  }

  /* Ícone de WhatsApp nas redes sociais */
  var btnRede = document.getElementById('btn-whatsapp-rede');
  if (btnRede) btnRede.href = url;

  /* Botão flutuante fixo de WhatsApp */
  var btnFlutuante = document.getElementById('btn-flutuante-whatsapp');
  if (btnFlutuante) btnFlutuante.href = url;

})();
