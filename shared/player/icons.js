/* =========================================================================
   AULA ENGINE — ícones de pasta/arquivo
   ---------------------------------------------------------------------------
   SVGs de traço — a cor vem do CSS (currentColor), por extensão.
   ========================================================================= */
(function (global) {
'use strict';

const SVG = (d) =>
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" ' +
  'stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round">' + d + '</svg>';

const ICO_DIR  = SVG('<path d="M1.9 12.6V3.4h3.9l1.4 1.9h6.9v7.3a.6.6 0 0 1-.6.6H2.5a.6.6 0 0 1-.6-.6Z"/>');
const ICO_FILE = SVG('<path d="M3.4 2.4a.6.6 0 0 1 .6-.6h4.9l3.7 3.7v8.1a.6.6 0 0 1-.6.6H4a.6.6 0 0 1-.6-.6Z"/>' +
                     '<path d="M8.9 1.8v3.7h3.7"/>');

/* Extensões que ganham cor própria (o SVG é o mesmo de arquivo). */
const EXT_CLS = ['tsx','ts','js','jsx','json','md'];

/* Devolve {svg, classe} do ícone da linha */
function iconFor(e){
  if (e.type === 'dir') return {svg:ICO_DIR, cls:'dir'};
  const ext = e.path.split('.').pop();
  return {svg:ICO_FILE, cls:EXT_CLS.indexOf(ext) >= 0 ? ext : 'def'};
}

global.AulaEngine = global.AulaEngine || {};
global.AulaEngine.icons = { iconFor };

})(window);
