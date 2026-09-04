/* =========================================================================
   AULA ENGINE: marcação da interface
   ---------------------------------------------------------------------------
   O motor monta a própria interface: o HTML da página fica só com <div id="app">,
   e este arquivo gera o esqueleto (topbar, sidebar, editor, progresso).
   ========================================================================= */
(function (global) {
'use strict';

/* Etiqueta (pílula) mostrada na faixa de ação, por tipo de etapa */
const PILL = {
  folder:['criar','Nova pasta'], file:['criar','Novo arquivo'], code:['escrever','Escrever código'],
  insert:['inserir','Inserir no arquivo'], clear:['apagar','Limpar arquivo'],
  delete:['apagar','Apagar'], rename:['info','Renomear'],
  note:['info','Conceito'], intro:['info','Início'], outro:['info','Conclusão'],
  challenge:['desafio','Desafio']
};

function esqueleto(meta){
  return '' +
  '<div class="topbar">' +
    '<div class="proj"><b>' + (meta.projeto || 'projeto') + '</b>' +
      '<span>' + (meta.subtitulo || '') + '</span></div>' +
    '<div class="spacer"></div>' +
    '<div class="badge-part" data-el="partBadge"></div>' +
    '<div class="keys"><kbd>←</kbd><kbd>→</kbd> navegar</div>' +
    '<button class="theme-toggle" data-el="sidebarToggle" title="Ocultar Explorer">◧</button>' +
    '<button class="theme-toggle" data-el="headerToggle" title="Recolher cabeçalho">⤒</button>' +
    '<button class="theme-toggle" data-el="noteToggle" title="Ocultar nota didática">⤓</button>' +
    '<button class="theme-toggle" data-el="themeToggle" title="Alternar tema claro/escuro">◐</button>' +
    '<div class="speed">' +
      '<button data-el="slowerBtn" title="Mais devagar (seta ↓)">−</button>' +
      '<div class="val"><b data-el="speedVal">1x</b><i data-el="speedCps">30 c/s</i></div>' +
      '<button data-el="fasterBtn" title="Mais rápido (seta ↑)">+</button>' +
    '</div>' +
  '</div>' +

  '<div class="main">' +
    '<aside class="sidebar" data-el="sidebar">' +
      '<div class="sb-head">' +
        '<div class="sb-head-left">' +
          '<span>Explorer</span>' +
          '<button class="sb-collapse" data-el="sidebarCollapseBtn" title="Recolher Explorer">‹</button>' +
        '</div>' +
        '<small data-el="fileCount"></small>' +
      '</div>' +
      '<div class="tree" data-el="tree"></div>' +
      '<div class="sb-foot" data-el="depsBox">' +
        '<div class="sb-foot-head" data-el="depsHead">' +
          '<b data-el="depsTitle"></b>' +
          '<button class="deps-toggle" data-el="depsToggle" title="Minimizar/expandir dependências">−</button>' +
        '</div>' +
        '<div data-el="deps" class="deps-list"></div>' +
      '</div>' +
    '</aside>' +

    '<section class="editor">' +
      '<div class="tabs" data-el="tabs"></div>' +
      '<div class="action-strip" data-el="strip"></div>' +
      '<div class="codewrap" data-el="codewrap">' +
        '<div class="gutter" data-el="gutter"></div>' +
        '<div class="code" data-el="code"></div>' +
        '<div class="concept" data-el="concept"></div>' +
      '</div>' +
    '</section>' +
  '</div>' +

  '<div class="note" data-el="note"></div>' +

  '<div class="progress">' +
    '<div class="pmeta">' +
      '<span>Etapa <b data-el="stepNum">1</b> de <b data-el="stepTotal">1</b> &nbsp;·&nbsp; ' +
        '<span data-el="partName"></span></span>' +
      '<div class="right">' +
        '<span><kbd>↑</kbd><kbd>↓</kbd> velocidade &nbsp;·&nbsp; <kbd>Espaço</kbd> avançar</span>' +
        '<span><b data-el="pct">0%</b> da aula</span>' +
        '<div class="navbtns">' +
          '<button data-el="prevBtn">← Voltar</button>' +
          '<button data-el="nextBtn">Avançar →</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ptrack" data-el="ptrack"><div class="pfill" data-el="pfill"></div>' +
      '<div class="pticks" data-el="pticks"></div></div>' +
  '</div>';
}

global.AulaEngine = global.AulaEngine || {};
global.AulaEngine.markup = { esqueleto, PILL };

})(window);
