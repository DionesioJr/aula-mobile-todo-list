/* =========================================================================
   AULA PLAYER: motor de apresentação de aulas de código
   ---------------------------------------------------------------------------
   Reutilizável em qualquer aula: ele não sabe nada sobre React Native, Snack
   ou Todo List. Recebe um objeto de aula (metadados + dependências + etapas)
   e cuida de: navegação por teclado, animação de digitação e progresso,
   usando os módulos de aula/player/: highlight.js, icons.js, virtual-fs.js
   e markup.js (todos expostos em window.AulaEngine).

   Uso:
     <link rel="stylesheet" href="player/player.css">
     <script src="aulas/minha-aula.js"></script>
     <script src="player/highlight.js"></script>
     <script src="player/icons.js"></script>
     <script src="player/virtual-fs.js"></script>
     <script src="player/markup.js"></script>
     <script src="player/player.js"></script>
     <script>AulaPlayer.iniciar(MINHA_AULA);</script>

   Formato do objeto de aula, veja aulas/todo-list-react-native.js:
     meta:    {titulo, projeto, subtitulo, vazio}
     inicial: {entries:[{path,type}], files:{path:conteudo}}   (opcional)
     deps:    {titulo, desde, lista:[{name,ver}]}              (opcional)
     steps:   [{part, op, ...}]

   Operações de etapa (op):
     intro | note | outro  → slide em tela cheia (sidebar, abas e editor somem;
                              o conteúdo vai no campo `md`, em Markdown, ver
                              player/markdown.js. `title`/`eyebrow` continuam
                              fora do markdown, como cabeçalho do slide)
     challenge              → mesmo slide em tela cheia, com sotaque roxo: para
                               a aula, propõe um exercício para a turma resolver
                               sozinha (`md` + `time` opcional, ex.: '5 min',
                               mostrado como selo). A resolução "oficial"
                               continua sendo as próximas etapas code/insert;
                               quem apresenta revela depois que a turma tentou.
     folder {target}       → cria pasta
     file   {target}       → cria arquivo vazio e abre
     code   {file, code}   → digita código no fim do arquivo
     insert {file, code, after|before} → digita código em um ponto do arquivo
     clear  {target}       → esvazia o arquivo
     delete {target}       → apaga arquivo ou pasta
     rename {from, to}     → renomeia
   ========================================================================= */
(function (global) {
'use strict';

const { highlight } = global.AulaEngine.highlight;
const { iconFor } = global.AulaEngine.icons;
const { pontoDeInsercao, snapshot, buildTree } = global.AulaEngine.fs;
const { esqueleto, PILL } = global.AulaEngine.markup;
const { render: renderMarkdown } = global.AulaEngine.markdown;

/* cps = caracteres por segundo. O padrão (1x) é bem mais lento que digitação
   real, para dar tempo de o aluno acompanhar e copiar. */
const SPEEDS = [
  {label:'0.25x', cps:8},
  {label:'0.5x',  cps:15},
  {label:'1x',    cps:30},
  {label:'1.5x',  cps:50},
  {label:'2x',    cps:80},
  {label:'4x',    cps:200},
];
const SPEED_PADRAO = 2;

const LINHA = 20, TOPO = 14; // altura da linha e topo do código, em px

/* =========================================================================
   PLAYER: uma instância por aula
   ========================================================================= */
function criar(aula, opcoes){
  const cfg   = opcoes || {};
  const meta  = aula.meta || {};
  const steps = aula.steps || [];
  const inicial = aula.inicial || {entries:[], files:{}};
  const deps  = aula.deps || null;

  if (!steps.length) throw new Error('AulaPlayer: a aula não tem etapas (steps).');

  const raiz = typeof cfg.raiz === 'string' ? document.querySelector(cfg.raiz)
             : (cfg.raiz || document.getElementById('app'));
  if (!raiz) throw new Error('AulaPlayer: elemento raiz não encontrado.');

  if (meta.titulo) document.title = meta.titulo;
  raiz.classList.add('aula-player');
  raiz.innerHTML = esqueleto(meta);

  const el = {};
  raiz.querySelectorAll('[data-el]').forEach(n => { el[n.getAttribute('data-el')] = n; });

  let idx = 0;
  let speedIdx = SPEED_PADRAO;
  let anim = null;
  let viewingFile = null; // arquivo escolhido a dedo na árvore; null = segue o arquivo da etapa atual

  /* ---------- Editor ---------- */
  /* caretAt = posição do cursor (null = sem cursor). O corte é sempre em
     fim de linha, então dá para realçar as duas metades separadamente. */
  function paint(text, caretAt){
    if (text === '' && caretAt == null){
      el.code.innerHTML = '<span class="empty-hint">// arquivo vazio</span>';
      el.gutter.textContent = '1';
      return;
    }
    el.code.innerHTML = (caretAt == null)
      ? highlight(text)
      : highlight(text.slice(0, caretAt)) + '<span class="caret"></span>' + highlight(text.slice(caretAt));

    const linhas = text.split('\n').length;
    let g = '';
    for (let i = 1; i <= linhas; i++) g += i + '\n';
    el.gutter.textContent = g;
  }
  /* Mantém o cursor visível (funciona tanto para escrita no fim quanto no meio) */
  /* Etapas que viram slide de texto em tela cheia, em vez de código digitado. */
  const OPS_SLIDE = ['intro', 'note', 'outro', 'challenge'];
  function ehSlide(step){ return OPS_SLIDE.indexOf(step.op) !== -1; }

  function scrollAte(text, pos){
    const linha = text.slice(0, pos).split('\n').length;
    const y = TOPO + (linha - 1) * LINHA;
    const h = el.codewrap.clientHeight || 400;
    if (y < el.codewrap.scrollTop + 60 || y > el.codewrap.scrollTop + h - 80){
      el.codewrap.scrollTop = Math.max(0, y - h / 2);
    }
  }

  /* ---------- Árvore de arquivos ---------- */
  function renderTree(state, newPaths, highlightPath){
    el.tree.innerHTML = '';
    if (state.entries.length === 0){
      el.tree.innerHTML = '<div class="vazio">' + (meta.vazio || 'Projeto vazio.') + '</div>';
      el.fileCount.textContent = '0 arquivos';
      return;
    }
    const root = buildTree(state.entries);
    const walk = (node, depth) => {
      const kids = [...node.children.values()];
      kids.sort((a,b) => (a.type === b.type) ? 0 : (a.type === 'dir' ? -1 : 1));
      kids.forEach(k => {
        const row = document.createElement('div');
        row.className = 'row ' + (k.type === 'dir' ? 'dir' : 'file');
        if (k.path === highlightPath) row.classList.add('active');
        if (newPaths.has(k.path)) row.classList.add('new');
        const escrito = k.type === 'file' && (state.files[k.path] || '').length > 0;
        const ico = iconFor(k);
        const indent = '<span class="indent">' + '<i></i>'.repeat(depth) + '</span>';
        row.innerHTML = indent + '<span class="ico ' + ico.cls + '">' + ico.svg + '</span><span>' + k.name + '</span>' +
                        (escrito ? '<span class="tick"></span>' : '');
        if (k.type === 'file'){
          row.addEventListener('click', () => {
            viewingFile = k.path;
            render(false);
          });
        }
        el.tree.appendChild(row);
        if (k.children.size) walk(k, depth+1);
      });
    };
    walk(root, 0);
    const nFiles = state.entries.filter(e => e.type === 'file').length;
    const nDirs  = state.entries.filter(e => e.type === 'dir').length;
    el.fileCount.textContent = nFiles + ' arquivos · ' + nDirs + ' pastas';
  }

  /* ---------- Cabeçalhos: aba, faixa de ação, nota ---------- */
  function renderHeader(step, state, displayPath){
    el.tabs.innerHTML = '';
    const t = document.createElement('div');
    if (displayPath){
      t.className = 'tab on';
      t.innerHTML = '<span class="dot"></span>' + displayPath +
                    (displayPath !== state.active ? ' <small class="tab-preview">(visualizando)</small>' : '');
    } else {
      t.className = 'tab';
      t.textContent = 'nenhum arquivo aberto';
    }
    el.tabs.appendChild(t);

    const par = PILL[step.op] || ['info','Etapa'];
    const alvo = step.target || step.file || '';
    el.strip.innerHTML =
      '<span class="pill ' + par[0] + '">' + par[1] + '</span>' +
      '<span><b>' + step.title + '</b>' + (alvo ? ' &nbsp;·&nbsp; <code>' + alvo + '</code>' : '') + '</span>';

    el.note.innerHTML = '<span class="q">Nota</span><span>' + (step.explain || step.lead || '') + '</span>';
  }
  /* Reinicia uma animação CSS: tira a classe, força o reflow, devolve a classe */
  function replayAnim(node, cls){
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
  }
  /* Etapas intro/note/outro/challenge viram um slide em TELA CHEIA: sidebar,
     abas e faixa de ação somem (classe .slide-mode na raiz) e o conteúdo
     ocupa o espaço todo, assim uma explicação longa nunca "quebra" o layout
     de editor+sidebar, que é pensado pra código, não pra texto corrido. O
     corpo do slide é Markdown (campo `md`), convertido por
     AulaEngine.markdown: títulos, listas, código e citação (usada como
     caixa de destaque/dica) sem precisar escrever HTML na mão.
     Continua dentro do próprio .codewrap (que já sabe rolar) em vez de um
     modal centralizado por cima: dá scroll normal e o zoom do navegador não
     quebra o layout (flex + align-items:center + overflow tem esse bug em
     vários browsers quando o conteúdo cresce mais que a viewport). */
  function renderConcept(step){
    const isConcept = ehSlide(step);
    raiz.classList.toggle('slide-mode', isConcept);
    el.codewrap.classList.toggle('concept-mode', isConcept);
    if (!isConcept){
      el.concept.classList.remove('fade-in');
      el.concept.innerHTML = '';
      return;
    }
    const isChallenge = step.op === 'challenge';
    const tag = step.op === 'intro' ? 'h1' : 'h2';
    const corpo = step.md ? renderMarkdown(step.md) :
      /* compatibilidade com etapas antigas (lead/bullets/tip) que ainda não
         foram convertidas para `md` */
      ((step.lead ? '<p>' + step.lead + '</p>' : '') +
       (step.bullets ? '<ul>' + step.bullets.map(b => '<li>' + b + '</li>').join('') + '</ul>' : '') +
       (step.tip ? '<blockquote><b>' + (isChallenge ? 'Dica' : 'Observação') + ':</b> ' + step.tip + '</blockquote>' : ''));
    el.concept.innerHTML = '<div class="concept-inner' + (isChallenge ? ' challenge' : '') + '">' +
      '<div class="eyebrow">' + (step.eyebrow || (isChallenge ? '🧩 Desafio · ' + (step.part||'') : step.part)) +
        (isChallenge && step.time ? '<span class="time-chip">' + step.time + '</span>' : '') +
      '</div>' +
      '<' + tag + '>' + step.title + '</' + tag + '>' +
      '<div class="md-body">' + corpo + '</div>' +
    '</div>';
    el.codewrap.scrollTop = 0;
    replayAnim(el.concept, 'fade-in');
  }

  /* ---------- Dependências (opcional) ---------- */
  let depsColapsado = false;
  function renderDeps(i){
    if (!deps || !deps.lista || !deps.lista.length){ el.depsBox.style.display = 'none'; return; }
    el.depsTitle.textContent = deps.titulo || 'Dependências';
    const ativo = i >= (deps.desde || 0);
    el.deps.innerHTML = deps.lista.map(d =>
      '<div class="dep' + (ativo ? '' : ' off') + '">' +
        '<i></i>' +
        d.name + (d.ver ? ' <span class="ver">' + d.ver + '</span>' : '') +
      '</div>'
    ).join('');
  }
  function toggleDeps(){
    depsColapsado = !depsColapsado;
    el.depsBox.classList.toggle('colapsado', depsColapsado);
    el.depsToggle.textContent = depsColapsado ? '+' : '−';
  }

  /* ---------- Progresso ---------- */
  function renderProgress(i){
    const p = Math.round(((i+1) / steps.length) * 100);
    el.pfill.style.width = p + '%';
    el.pct.textContent = p + '%';
    el.stepNum.textContent = i + 1;
    el.stepTotal.textContent = steps.length;
    el.partName.textContent = steps[i].part || '';
    el.partBadge.textContent = steps[i].part || '';
    el.prevBtn.disabled = i === 0;
    el.nextBtn.disabled = i === steps.length - 1;
  }
  function buildTicks(){
    const counts = [];
    steps.forEach(s => {
      const last = counts[counts.length-1];
      if (last && last.name === s.part) last.n++;
      else counts.push({name:s.part, n:1});
    });
    el.pticks.innerHTML = counts.map(c => '<i style="width:' + (c.n / steps.length * 100) + '%"></i>').join('');
  }

  /* ---------- Tema claro/escuro ---------- */
  const TEMA_CHAVE = 'aulaPlayerTema';
  function lerTemaSalvo(){
    try { return localStorage.getItem(TEMA_CHAVE); } catch (e) { return null; }
  }
  function gravarTemaSalvo(t){
    try { localStorage.setItem(TEMA_CHAVE, t); } catch (e) { /* file://, sem storage: ignora */ }
  }
  function temaInicial(){
    const salvo = lerTemaSalvo();
    if (salvo === 'light' || salvo === 'dark') return salvo;
    return 'light';
  }
  function aplicarTema(t){
    document.documentElement.setAttribute('data-theme', t);
    el.themeToggle.textContent = t === 'light' ? '◑' : '◐';
    el.themeToggle.title = t === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro';
  }
  function toggleTema(){
    const atual = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const novo = atual === 'light' ? 'dark' : 'light';
    gravarTemaSalvo(novo);
    aplicarTema(novo);
  }

  /* ---------- Explorer (mostrar/ocultar sidebar) ---------- */
  const SIDEBAR_CHAVE = 'aulaPlayerSidebarOculto';
  function lerSidebarSalvo(){
    try { return localStorage.getItem(SIDEBAR_CHAVE) === '1'; } catch (e) { return false; }
  }
  function gravarSidebarSalvo(oculto){
    try { localStorage.setItem(SIDEBAR_CHAVE, oculto ? '1' : '0'); } catch (e) { /* file://, sem storage: ignora */ }
  }
  function aplicarSidebar(oculto){
    el.sidebar.classList.toggle('hidden', oculto);
    el.sidebarToggle.textContent = oculto ? '◨' : '◧';
    el.sidebarToggle.title = oculto ? 'Mostrar Explorer' : 'Ocultar Explorer';
  }
  function toggleSidebar(){
    const oculto = !el.sidebar.classList.contains('hidden');
    gravarSidebarSalvo(oculto);
    aplicarSidebar(oculto);
  }

  /* ---------- Cabeçalho (recolher a topbar em telas pequenas) ---------- */
  /* "Recolher" e não "ocultar": some só a marca do projeto, o selo da parte
     e a dica de teclas; os botões de controle (Explorer, tema, velocidade e
     estes dois toggles) continuam à mostra, senão não teria como reabrir. */
  const HEADER_CHAVE = 'aulaPlayerHeaderColapsado';
  function lerHeaderSalvo(){
    try { return localStorage.getItem(HEADER_CHAVE) === '1'; } catch (e) { return false; }
  }
  function gravarHeaderSalvo(colapsado){
    try { localStorage.setItem(HEADER_CHAVE, colapsado ? '1' : '0'); } catch (e) { /* file://, sem storage: ignora */ }
  }
  function aplicarHeader(colapsado){
    raiz.classList.toggle('header-collapsed', colapsado);
    el.headerToggle.textContent = colapsado ? '⤓' : '⤒';
    el.headerToggle.title = colapsado ? 'Expandir cabeçalho' : 'Recolher cabeçalho';
  }
  function toggleHeader(){
    const colapsado = !raiz.classList.contains('header-collapsed');
    gravarHeaderSalvo(colapsado);
    aplicarHeader(colapsado);
  }

  /* ---------- Nota didática (ocultar o rodapé em telas pequenas) ---------- */
  /* Diferente do cabeçalho, o rodapé não tem controle nenhum dentro dele,
     só o texto de apoio, então some por completo; o botão pra trazer de
     volta mora na topbar, não no próprio rodapé. */
  const NOTE_CHAVE = 'aulaPlayerNoteOculta';
  function lerNoteSalvo(){
    try { return localStorage.getItem(NOTE_CHAVE) === '1'; } catch (e) { return false; }
  }
  function gravarNoteSalvo(oculta){
    try { localStorage.setItem(NOTE_CHAVE, oculta ? '1' : '0'); } catch (e) { /* file://, sem storage: ignora */ }
  }
  function aplicarNote(oculta){
    raiz.classList.toggle('note-hidden', oculta);
    el.noteToggle.textContent = oculta ? '⤒' : '⤓';
    el.noteToggle.title = oculta ? 'Mostrar nota didática' : 'Ocultar nota didática';
  }
  function toggleNote(){
    const oculta = !raiz.classList.contains('note-hidden');
    gravarNoteSalvo(oculta);
    aplicarNote(oculta);
  }

  /* ---------- Velocidade da digitação ---------- */
  function renderSpeed(){
    el.speedVal.textContent = SPEEDS[speedIdx].label;
    el.speedCps.textContent = SPEEDS[speedIdx].cps + ' c/s';
    el.slowerBtn.disabled = speedIdx === 0;
    el.fasterBtn.disabled = speedIdx === SPEEDS.length - 1;
  }
  function changeSpeed(delta){
    speedIdx = Math.max(0, Math.min(SPEEDS.length-1, speedIdx + delta));
    renderSpeed();
  }

  /* ---------- Animação de digitação (baseada em tempo) ---------- */
  const nowMs = () => (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

  function stopAnim(finish){
    if (!anim) return;
    const alvo = anim.target;
    cancelAnimationFrame(anim.raf);
    anim = null;
    if (finish) paint(alvo, null);
  }
  /* base = conteúdo antes da etapa | full = depois | at = onde o texto novo entra */
  function typeInto(base, full, at){
    stopAnim(false);
    if (base === full){ paint(full, null); return; }
    const cauda = base.slice(at);
    const novos = full.length - base.length;
    let escritos = 0;
    let last = nowMs();
    let acc = 0;
    anim = {target:full, raf:0};

    const desenha = () => {
      const texto = full.slice(0, at + escritos) + cauda;
      paint(texto, at + escritos);
      scrollAte(texto, at + escritos);
    };
    desenha();

    const tick = () => {
      if (!anim) return;
      const t = nowMs();
      acc += Math.min(0.2, (t - last) / 1000) * SPEEDS[speedIdx].cps;
      last = t;
      if (acc >= 1){
        escritos = Math.min(novos, escritos + Math.floor(acc));
        acc -= Math.floor(acc);
        desenha();
      }
      if (escritos < novos){
        anim.raf = requestAnimationFrame(tick);
      } else {
        paint(full, null);
        anim = null;
      }
    };
    anim.raf = requestAnimationFrame(tick);
  }

  /* ---------- Render principal ---------- */
  function render(animate){
    const step = steps[idx];
    const prev = idx > 0 ? snapshot(steps, inicial, idx-1) : {entries:[], files:{}, active:null};
    const cur  = snapshot(steps, inicial, idx);

    const prevPaths = new Set(prev.entries.map(e => e.path));
    const newPaths  = new Set(cur.entries.map(e => e.path).filter(p => !prevPaths.has(p)));

    // arquivo escolhido a dedo na árvore, se ainda existir; senão segue a etapa atual
    const displayPath = (viewingFile != null && cur.files.hasOwnProperty(viewingFile))
      ? viewingFile : cur.active;
    const emPreview = displayPath !== cur.active;

    renderTree(cur, newPaths, displayPath);
    renderHeader(step, cur, displayPath);
    renderConcept(step);
    renderDeps(idx);
    renderProgress(idx);

    const texto = displayPath != null ? (cur.files[displayPath] || '') : '';
    if (!emPreview && animate && (step.op === 'code' || step.op === 'insert')){
      const antes = prev.files[step.file] || '';
      typeInto(antes, texto, pontoDeInsercao(step, antes));
    } else {
      stopAnim(false);
      paint(texto, null);
      /* Slide sempre começa do topo: sem esta guarda, o scrollAte abaixo rolaria
         o .codewrap até o fim do código do arquivo ativo (invisível no slide) e
         desfaria o scrollTop=0 do renderConcept: o slide abria no meio. */
      if (ehSlide(step) || (!emPreview && (step.op === 'clear' || step.op === 'file'))) el.codewrap.scrollTop = 0;
      else if (!emPreview && (step.op === 'code' || step.op === 'insert')){
        /* Pulando direto pra esta etapa (barra de progresso, Home/End): mostra o
           trecho que ela escreve, não o fim do arquivo: um `insert` no meio de
           um arquivo grande ficava fora da tela. */
        const antes = prev.files[step.file] || '';
        scrollAte(texto, pontoDeInsercao(step, antes) + (step.code || '').length);
      }
      else scrollAte(texto, texto.length);
    }
  }

  function go(delta){
    // se ainda está digitando, a primeira seta completa o bloco na hora
    if (delta > 0 && anim){ stopAnim(true); return; }
    const next = idx + delta;
    if (next < 0 || next >= steps.length) return;
    idx = next;
    viewingFile = null; // ao navegar, volta a seguir o arquivo da etapa
    render(delta > 0);
  }
  function jump(i){
    idx = Math.max(0, Math.min(steps.length-1, i));
    viewingFile = null;
    render(false);
  }

  /* ---------- Eventos ---------- */
  const onKey = (e) => {
    switch (e.key){
      case 'ArrowRight': case ' ': case 'PageDown': case 'Enter':
        e.preventDefault(); go(1); break;
      case 'ArrowLeft': case 'PageUp': case 'Backspace':
        e.preventDefault(); go(-1); break;
      case 'ArrowUp':   e.preventDefault(); changeSpeed(1); break;
      case 'ArrowDown': e.preventDefault(); changeSpeed(-1); break;
      case 'Home': e.preventDefault(); jump(0); break;
      case 'End':  e.preventDefault(); jump(steps.length-1); break;
      case 'c': case 'C': toggleHeader(); break;
      case 'r': case 'R': toggleNote(); break;
    }
  };
  document.addEventListener('keydown', onKey);
  el.nextBtn.addEventListener('click', () => go(1));
  el.prevBtn.addEventListener('click', () => go(-1));
  el.slowerBtn.addEventListener('click', () => changeSpeed(-1));
  el.fasterBtn.addEventListener('click', () => changeSpeed(1));
  el.ptrack.addEventListener('click', (e) => {
    const r = el.ptrack.getBoundingClientRect();
    jump(Math.floor(((e.clientX - r.left) / r.width) * steps.length));
  });
  el.depsToggle.addEventListener('click', toggleDeps);
  el.themeToggle.addEventListener('click', toggleTema);
  el.sidebarToggle.addEventListener('click', toggleSidebar);
  el.sidebarCollapseBtn.addEventListener('click', toggleSidebar);
  el.headerToggle.addEventListener('click', toggleHeader);
  el.noteToggle.addEventListener('click', toggleNote);

  /* ---------- Start ---------- */
  aplicarTema(temaInicial());
  aplicarSidebar(lerSidebarSalvo());
  aplicarHeader(lerHeaderSalvo());
  aplicarNote(lerNoteSalvo());
  buildTicks();
  renderSpeed();
  if (typeof cfg.etapaInicial === 'number') idx = Math.max(0, Math.min(steps.length-1, cfg.etapaInicial));
  render(false);

  /* API pública da instância: útil para controlar a aula de fora */
  return {
    proxima: () => go(1),
    anterior: () => go(-1),
    irPara: jump,
    velocidade: changeSpeed,
    etapaAtual: () => idx,
    total: () => steps.length,
    estado: () => snapshot(steps, inicial, idx),
    destruir: () => { stopAnim(false); document.removeEventListener('keydown', onKey); raiz.innerHTML = ''; },
  };
}

global.AulaPlayer = {
  iniciar: criar,
  // expostos para testes ou ferramentas próprias
  snapshot, highlight, SPEEDS,
};

})(window);
