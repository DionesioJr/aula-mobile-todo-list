/* =========================================================================
   AULA ENGINE: sistema de arquivos virtual
   ---------------------------------------------------------------------------
   Puro, sem DOM: reconstrói o estado do projeto (entries + files + arquivo
   ativo) aplicando as etapas da aula, e monta a árvore usada pela sidebar.
   ========================================================================= */
(function (global) {
'use strict';

/* Onde o texto de uma etapa 'code'/'insert' entra no arquivo */
function pontoDeInsercao(step, conteudo){
  if (step.op === 'insert'){
    if (step.after){
      const i = conteudo.indexOf(step.after);
      if (i >= 0){
        const fim = conteudo.indexOf('\n', i);
        return fim < 0 ? conteudo.length : fim + 1;
      }
    }
    if (step.before){
      const i = conteudo.indexOf(step.before);
      if (i >= 0) return i;
    }
  }
  return conteudo.length; // 'code' sempre acrescenta no fim
}

/* Reconstrói o estado do projeto aplicando as etapas 0..upto */
function snapshot(steps, inicial, upto){
  const entries = (inicial.entries || []).map(e => ({...e}));
  const files = {...(inicial.files || {})};
  let active = null;

  const addEntry = (path, type) => {
    if (entries.some(e => e.path === path)) return;
    const parts = path.split('/');
    for (let i = 1; i < parts.length; i++){
      const dir = parts.slice(0, i).join('/');
      if (!entries.some(e => e.path === dir)) entries.push({path:dir, type:'dir'});
    }
    entries.push({path, type});
  };

  for (let i = 0; i <= upto && i < steps.length; i++){
    const s = steps[i];
    switch (s.op){
      case 'folder': addEntry(s.target, 'dir'); break;
      case 'file':   addEntry(s.target, 'file'); files[s.target] = ''; active = s.target; break;
      case 'code':   files[s.file] = (files[s.file] || '') + s.code; active = s.file; break;
      case 'insert': {
        const atual = files[s.file] || '';
        const pos = pontoDeInsercao(s, atual);
        files[s.file] = atual.slice(0, pos) + s.code + atual.slice(pos);
        active = s.file;
        break;
      }
      case 'clear':  files[s.target] = ''; active = s.target; break;
      case 'delete': {
        for (let k = entries.length - 1; k >= 0; k--){
          const p = entries[k].path;
          if (p === s.target || p.startsWith(s.target + '/')){ entries.splice(k,1); delete files[p]; }
        }
        if (active === s.target) active = null;
        break;
      }
      case 'rename': {
        const e = entries.find(x => x.path === s.from);
        if (e) e.path = s.to;
        files[s.to] = files[s.from]; delete files[s.from];
        if (active === s.from) active = s.to;
        break;
      }
      default: break;
    }
    if (s.file && s.op !== 'code' && s.op !== 'insert') active = s.file;
  }
  return {entries, files, active};
}

function buildTree(entries){
  const root = {children:new Map()};
  entries.forEach(e => {
    const parts = e.path.split('/');
    let node = root;
    parts.forEach((p, i) => {
      const full = parts.slice(0, i+1).join('/');
      if (!node.children.has(p)){
        node.children.set(p, {name:p, path:full, type:(i === parts.length-1 ? e.type : 'dir'), children:new Map()});
      }
      node = node.children.get(p);
    });
  });
  return root;
}

global.AulaEngine = global.AulaEngine || {};
global.AulaEngine.fs = { pontoDeInsercao, snapshot, buildTree };

})(window);
