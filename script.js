const WHATSAPP = "5534999999999"; // ALTERAR AQUI

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
   RESERVA — Formulário de reserva de mesa
   - Define data mínima como hoje (bloqueia passado)
   - Máscara automática no telefone: (00) 00000-0000
   - Valida todos os campos; erros em vermelho abaixo
   - Se válido: abre WhatsApp com mensagem pré-preenchida
============================================= */
(function iniciarFormReserva() {

  var form      = document.getElementById('form-reserva');
  var inputNome = document.getElementById('reserva-nome');
  var inputTel  = document.getElementById('reserva-telefone');
  var inputData = document.getElementById('reserva-data');
  var inputHora = document.getElementById('reserva-horario');

  if (!form) return;

  /* Data mínima = hoje (impede datas passadas) */
  var hoje = new Date();
  var aaaa  = hoje.getFullYear();
  var mm    = String(hoje.getMonth() + 1).padStart(2, '0');
  var dd    = String(hoje.getDate()).padStart(2, '0');
  inputData.min = aaaa + '-' + mm + '-' + dd;

  /* --- Máscara de telefone: (00) 00000-0000 --- */
  inputTel.addEventListener('input', function () {
    var digitos = this.value.replace(/\D/g, '');
    if (digitos.length > 11) digitos = digitos.slice(0, 11);

    var mascarado = '';
    if (digitos.length === 0) {
      mascarado = '';
    } else if (digitos.length <= 2) {
      mascarado = '(' + digitos;
    } else if (digitos.length <= 7) {
      mascarado = '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2);
    } else {
      mascarado = '(' + digitos.slice(0, 2) + ') ' + digitos.slice(2, 7) + '-' + digitos.slice(7);
    }
    this.value = mascarado;
  });

  /* --- Helpers de erro --- */
  function mostrarErro(idErro, mensagem) {
    var span = document.getElementById(idErro);
    if (span) span.textContent = mensagem;
  }

  function limparErros() {
    ['erro-nome', 'erro-telefone', 'erro-data', 'erro-horario'].forEach(function (id) {
      var span = document.getElementById(id);
      if (span) span.textContent = '';
    });
  }

  /* --- Formata data de AAAA-MM-DD para DD/MM/AAAA --- */
  function formatarData(iso) {
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  /* --- Submit --- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    limparErros();

    var nome   = inputNome.value.trim();
    var tel    = inputTel.value.trim();
    var data   = inputData.value;
    var hora   = inputHora.value;
    var valido = true;

    if (!nome) {
      mostrarErro('erro-nome', 'Por favor, informe seu nome completo.');
      valido = false;
    }

    var digitos = tel.replace(/\D/g, '');
    if (!digitos) {
      mostrarErro('erro-telefone', 'Por favor, informe seu telefone.');
      valido = false;
    } else if (digitos.length < 10 || digitos.length > 11) {
      mostrarErro('erro-telefone', 'Informe um telefone válido com DDD (10 ou 11 dígitos).');
      valido = false;
    }

    if (!data) {
      mostrarErro('erro-data', 'Por favor, escolha uma data para a reserva.');
      valido = false;
    }

    if (!hora) {
      mostrarErro('erro-horario', 'Por favor, informe o horário desejado.');
      valido = false;
    }

    if (!valido) return;

    var mensagem = 'Olá! Gostaria de reservar uma mesa.' +
                   ' Nome: ' + nome +
                   ' | Telefone: ' + tel +
                   ' | Data: ' + formatarData(data) +
                   ' | Horário: ' + hora;

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensagem);
    window.open(url, '_blank', 'noopener,noreferrer');
  });

})();

/* =============================================
   WHATSAPP — Link de delivery
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

  /* Ícone de WhatsApp nas redes sociais */
  var btnRede = document.getElementById('btn-whatsapp-rede');
  if (btnRede) btnRede.href = url;

  /* Botão flutuante fixo de WhatsApp */
  var btnFlutuante = document.getElementById('btn-flutuante-whatsapp');
  if (btnFlutuante) btnFlutuante.href = url;

})();
