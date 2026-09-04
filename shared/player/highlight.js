/* =========================================================================
   AULA ENGINE: realce de sintaxe (TS/TSX)
   ---------------------------------------------------------------------------
   Recebe uma string de código e devolve HTML com <span> por tipo de token.
   Puro: não toca no DOM.
   ========================================================================= */
(function (global) {
'use strict';

const KEYWORDS = 'import|from|export|default|function|const|let|var|return|if|else|for|while|new|type|interface|extends|async|await|true|false|null|undefined|typeof|as|void|string|number|boolean';
const TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*)' +
  '|(\\/\\*[\\s\\S]*?\\*\\/)' +
  '|(\'(?:[^\'\\\\\\n]|\\\\.)*\'|"(?:[^"\\\\\\n]|\\\\.)*"|`(?:[^`\\\\]|\\\\.)*`)' +
  '|(=&gt;)' +
  '|(&lt;\\/?[A-Za-z][\\w.]*|\\/?&gt;)' +
  '|\\b(' + KEYWORDS + ')\\b' +
  '|\\b(\\d+(?:\\.\\d+)?)\\b' +
  '|\\b([A-Z][A-Za-z0-9_]*)\\b' +
  '|\\b([a-zA-Z_$][\\w$]*)(?=\\()',
  'g'
);

function escapeHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlight(src){
  return escapeHtml(src).replace(TOKEN_RE, (m, c1, c2, str, arrow, tag, kw, num, type, fn) => {
    if (c1 || c2) return '<span class="t-com">' + m + '</span>';
    if (str)      return '<span class="t-str">' + m + '</span>';
    if (arrow)    return '<span class="t-arrow">' + m + '</span>';
    if (tag)      return '<span class="t-tag">' + m + '</span>';
    if (kw)       return '<span class="t-kw">' + m + '</span>';
    if (num)      return '<span class="t-num">' + m + '</span>';
    if (type)     return '<span class="t-type">' + m + '</span>';
    if (fn)       return '<span class="t-fn">' + m + '</span>';
    return m;
  });
}

global.AulaEngine = global.AulaEngine || {};
global.AulaEngine.highlight = { highlight, escapeHtml };

})(window);
