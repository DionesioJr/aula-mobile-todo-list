/* =========================================================================
   AULA ENGINE — markdown mínimo para os cartões de conceito/desafio
   ---------------------------------------------------------------------------
   Converte um texto em Markdown (campo `md` de uma etapa intro/note/outro/
   challenge) para HTML. Não é um parser completo — só o suficiente pra
   organizar uma explicação: títulos, parágrafos, listas, código, citação
   (usada como caixa de "dica") e negrito/código em linha.

   Puro, sem DOM: só concatena strings. Escapa HTML de tudo que não for
   sintaxe de markdown, então é seguro colocar `<TextInput>` etc. no meio do
   texto sem virar tag de verdade.
   ========================================================================= */
(function (global) {
'use strict';

function escapeHtml(s){
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* Marcador (Unicode de uso privado) improvável de aparecer em texto normal —
   guarda os trechos de `código em linha` enquanto o resto é escapado e
   formatado, e devolve eles no final. Números soltos no texto (ex.: "3
   campos") não podem servir de marcador, senão viram <code> por engano. */
const MARK = '';

/* Formatação em linha: `código`, **negrito**, [texto](url).
   Extrai os trechos de código ANTES de escapar o resto, pra não deixar
   ** ou [ ] dentro de um `código` virar formatação por engano. */
function inline(text){
  const codes = [];
  let out = String(text).replace(/`([^`]+)`/g, function (_, c){
    codes.push(escapeHtml(c));
    return MARK + (codes.length - 1) + MARK;
  });
  out = escapeHtml(out);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  out = out.replace(new RegExp(MARK + '(\\d+)' + MARK, 'g'), function (_, i){
    return '<code>' + codes[+i] + '</code>';
  });
  return out;
}

/* Bloco a bloco: títulos (#/##/###), citação (>), listas (-/1.), código
   cercado (```), régua (---) e parágrafo (linhas soltas, uma ou mais). */
function render(md){
  if (!md) return '';
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let i = 0;

  let paraBuf = [];
  const flushPara = () => {
    if (paraBuf.length){ html += '<p>' + paraBuf.map(inline).join(' ') + '</p>'; paraBuf = []; }
  };
  let listBuf = null; // {type:'ul'|'ol', items:[]}
  const flushList = () => {
    if (listBuf){
      html += '<' + listBuf.type + '>' + listBuf.items.map(it => '<li>' + it + '</li>').join('') + '</' + listBuf.type + '>';
      listBuf = null;
    }
  };
  let quoteBuf = null;
  const flushQuote = () => {
    if (quoteBuf){ html += '<blockquote>' + quoteBuf.map(inline).join(' ') + '</blockquote>'; quoteBuf = null; }
  };
  const flushAll = () => { flushPara(); flushList(); flushQuote(); };

  while (i < lines.length){
    const raw = lines[i];
    const t = raw.trim();

    if (t === ''){ flushAll(); i++; continue; }

    if (/^```/.test(t)){
      flushAll();
      const code = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())){ code.push(lines[i]); i++; }
      i++; // pula a cerca de fechamento
      html += '<pre><code>' + escapeHtml(code.join('\n')) + '</code></pre>';
      continue;
    }

    let m;
    if ((m = t.match(/^(#{1,3})\s+(.*)$/))){
      flushAll();
      const nivel = m[1].length + 2; // markdown # começa em h3 — h1/h2 já são o título do slide
      html += '<h' + nivel + '>' + inline(m[2]) + '</h' + nivel + '>';
      i++; continue;
    }

    if (t === '---'){
      flushAll();
      html += '<hr>';
      i++; continue;
    }

    if ((m = t.match(/^>\s?(.*)$/))){
      flushPara(); flushList();
      if (!quoteBuf) quoteBuf = [];
      quoteBuf.push(m[1]);
      i++; continue;
    }

    if ((m = t.match(/^[-*]\s+(.*)$/))){
      flushPara(); flushQuote();
      if (!listBuf || listBuf.type !== 'ul'){ flushList(); listBuf = {type:'ul', items:[]}; }
      listBuf.items.push(inline(m[1]));
      i++; continue;
    }

    if ((m = t.match(/^\d+\.\s+(.*)$/))){
      flushPara(); flushQuote();
      if (!listBuf || listBuf.type !== 'ol'){ flushList(); listBuf = {type:'ol', items:[]}; }
      listBuf.items.push(inline(m[1]));
      i++; continue;
    }

    flushList(); flushQuote();
    paraBuf.push(t);
    i++;
  }
  flushAll();
  return html;
}

global.AulaEngine = global.AulaEngine || {};
global.AulaEngine.markdown = { render, inline, escapeHtml };

})(window);
