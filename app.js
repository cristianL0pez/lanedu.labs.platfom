// Datos base de Labs
const labs = [
  {
    id: 'lab1',
    title: 'El jefe necesita el archivo YA',
    level: 'Beginner',
    xp: 100,
    story: 'Tu lead te escribió por chat: “necesito un backup limpio de logs antes de las 18:00, el auditor está aquí”.',
    objective: 'Crear un script que comprima los logs de /var/log (o carpeta simulada) y genere un archivo con fecha.',
    rules: [
      'No borres archivos originales.',
      'Incluye comandos o snippets que usaste.',
      'Adjunta evidencia (capturas o salida del comando).'
    ],
    deliverable: 'Repositorio o nota con el script y ejemplo de ejecución.'
  },
  {
    id: 'lab2',
    title: 'Terminal limpia, mente limpia',
    level: 'Beginner',
    xp: 120,
    story: 'Llegas a una máquina con historial caótico. Quieren saber qué comandos se ejecutaron para un incidente.',
    objective: 'Analizar el historial (.bash_history o similar) y resumir en un reporte qué comandos sospechosos encontraste.',
    rules: [
      'No edites el historial original.',
      'Incluye timestamps si están disponibles.',
      'Entrega un resumen de 5-10 líneas.'
    ],
    deliverable: 'Link a reporte breve con hallazgos y comandos de análisis.'
  },
  {
    id: 'lab3',
    title: 'Automatiza el onboarding',
    level: 'Beginner',
    xp: 130,
    story: 'Un compañero nuevo llega y no hay manual. Necesita ambiente listo en 10 minutos.',
    objective: 'Crear un script que instale dependencias (ej. git, curl), configure alias y muestre mensaje de bienvenida.',
    rules: [
      'Debe ser idempotente (si ya está instalado, no rompe).',
      'Usa variables y comentarios claros.',
      'Incluye pasos para revertir cambios.'
    ],
    deliverable: 'Documento o repo con el script y pruebas.'
  },
  {
    id: 'lab4',
    title: 'Mini API sin servidor',
    level: 'Beginner',
    xp: 140,
    story: 'Te piden simular una API interna para probar un frontend mientras llega el backend real.',
    objective: 'Crear un mock de API con JSON local (puede ser usando fetch a un archivo) y responder datos de usuarios.',
    rules: [
      'No necesitas servidor; usa archivos o funciones.',
      'Debe permitir filtrar o buscar usuarios.',
      'Incluye ejemplo de consumo en JS.'
    ],
    deliverable: 'Repositorio o gist con mock y demo de consulta.'
  },
  {
    id: 'lab5',
    title: 'Checklist de despliegue',
    level: 'Beginner',
    xp: 150,
    story: 'Antes de desplegar, tu squad necesita una checklist que evite sustos.',
    objective: 'Construir una checklist interactiva (HTML/JS) que marque tareas y calcule porcentaje.',
    rules: [
      'Debe persistir estado localmente.',
      'Incluye al menos 8 ítems críticos.',
      'Muestra un resumen visual (barra o texto).'
    ],
    deliverable: 'Link a demo o documento con la checklist funcionando.'
  },
  {
    id: 'lab6',
    title: 'Cron jobs bajo control',
    level: 'Intermediate',
    xp: 200,
    story: 'La empresa perdió trazabilidad de sus cron jobs. Necesitan inventario rápido.',
    objective: 'Levantar un inventario de cron jobs de un sistema (real o simulado) y proponer alertas básicas.',
    rules: [
      'Documenta comandos usados para listar crons.',
      'Propón validaciones para saber si fallan.',
      'Entrega tabla con dueño, comando y horario.'
    ],
    deliverable: 'Reporte estructurado (tabla + recomendaciones).'
  },
  {
    id: 'lab7',
    title: 'Responder un incidente',
    level: 'Intermediate',
    xp: 220,
    story: 'Alguien subió una llave SSH pública no autorizada. Debes reaccionar como responderías en guardia.',
    objective: 'Diseñar y documentar un playbook de respuesta: detección, contención, erradicación y recuperación.',
    rules: [
      'Incluye comandos concretos de verificación.',
      'Define responsables y tiempos estimados.',
      'Agrega checklist de verificación final.'
    ],
    deliverable: 'Playbook publicado (Notion, Markdown, repo).'
  },
  {
    id: 'lab8',
    title: 'Pipeline saludable',
    level: 'Intermediate',
    xp: 240,
    story: 'El pipeline CI falla sin logs claros. Debes estabilizarlo antes de la demo.',
    objective: 'Crear un pipeline mínimo (o simulado) con pasos de build, test y notificaciones, y registrar logs legibles.',
    rules: [
      'Muestra variables de entorno sensibles como secretos (no en claro).',
      'Incluye al menos una prueba automatizada falsa o real.',
      'Entrega un tablero de estado o reporte de runs.'
    ],
    deliverable: 'Repo o gist con pipeline y evidencia de ejecución.'
  },
  {
    id: 'lab9',
    title: 'Blue Team vs Ransomware',
    level: 'Advanced',
    xp: 400,
    story: 'Un servidor muestra actividad de cifrado masivo. Necesitas actuar como analista SOC.',
    objective: 'Diseñar un kit de contención rápida: checklist, scripts de aislamiento y plan de comunicación.',
    rules: [
      'Prioriza pasos de contención en < 15 minutos.',
      'Incluye scripts o comandos listos para ejecutar.',
      'Agrega indicadores para monitorear propagación.'
    ],
    deliverable: 'Documento táctico listo para compartir con el equipo.'
  }
];

const fakeUsers = [
  { name: 'rootedFox', xp: 820 },
  { name: 'shellKid', xp: 640 },
  { name: 'cronMaster', xp: 420 },
  { name: 'packetNinja', xp: 300 }
];

const storageKeys = {
  user: 'laneduUser',
  progress: 'laneduProgress'
};

const state = {
  currentUser: null,
  progress: {}
};

// Utilidades de progresión
function loadSession() {
  const user = localStorage.getItem(storageKeys.user);
  const progress = JSON.parse(localStorage.getItem(storageKeys.progress) || '{}');
  if (user) {
    state.currentUser = user;
    state.progress = progress[user] || {};
    hideLogin();
    renderAll();
  } else {
    showLogin();
  }
}

function saveProgress() {
  const all = JSON.parse(localStorage.getItem(storageKeys.progress) || '{}');
  all[state.currentUser] = state.progress;
  localStorage.setItem(storageKeys.progress, JSON.stringify(all));
}

function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
}

function hideLogin() {
  document.getElementById('login-screen').classList.add('hidden');
}

function levelFromXP(xp) {
  if (xp >= 1200) return { name: 'Arquitecto', label: 'Nivel 5' };
  if (xp >= 800) return { name: 'Estratega', label: 'Nivel 4' };
  if (xp >= 500) return { name: 'Operador', label: 'Nivel 3' };
  if (xp >= 250) return { name: 'Field Agent', label: 'Nivel 2' };
  return { name: 'Becario en llamas', label: 'Nivel 1' };
}

function isUnlocked(labIndex) {
  if (labIndex === 0) return true;
  const previousLab = labs[labIndex - 1];
  return Boolean(state.progress[previousLab.id]);
}

function renderLabs() {
  const list = document.getElementById('labs-list');
  list.innerHTML = '';
  labs.forEach((lab, index) => {
    const completed = Boolean(state.progress[lab.id]);
    const unlocked = isUnlocked(index);
    const card = document.createElement('div');
    card.className = `lab-card ${unlocked ? '' : 'locked'}`;
    card.innerHTML = `
      <div class="lab-meta">
        <span class="tag ${lab.level.toLowerCase()}">${lab.level}</span>
        <span class="pill">${lab.xp} XP</span>
      </div>
      <h3>${lab.title}</h3>
      <p class="mini-hint">${completed ? 'Completado' : unlocked ? 'Disponible' : 'Bloqueado'}</p>
    `;
    if (unlocked) {
      card.addEventListener('click', () => selectLab(lab.id));
    }
    list.appendChild(card);
  });
}

function selectLab(id) {
  const lab = labs.find((l) => l.id === id);
  if (!lab) return;
  state.selectedLab = lab.id;
  const unlocked = isUnlocked(labs.findIndex((l) => l.id === id));
  const completed = Boolean(state.progress[lab.id]);
  document.getElementById('lab-title').textContent = lab.title;
  document.getElementById('lab-status').textContent = completed
    ? 'Completado'
    : unlocked
    ? 'Disponible'
    : 'Bloqueado';
  document.getElementById('lab-story').textContent = lab.story;
  document.getElementById('lab-objective').textContent = lab.objective;
  document.getElementById('lab-deliverable').textContent = lab.deliverable;
  const rulesList = document.getElementById('lab-rules');
  rulesList.innerHTML = '';
  lab.rules.forEach((rule) => {
    const li = document.createElement('li');
    li.textContent = rule;
    rulesList.appendChild(li);
  });
  const linkInput = document.getElementById('lab-link');
  linkInput.value = completed ? state.progress[lab.id].link : '';
  linkInput.disabled = !unlocked;
  document.getElementById('complete-btn').disabled = !unlocked;
}

function calculateXP() {
  return labs.reduce((acc, lab) => {
    return acc + (state.progress[lab.id] ? lab.xp : 0);
  }, 0);
}

function renderStats() {
  const xp = calculateXP();
  const lvl = levelFromXP(xp);
  document.getElementById('xp-total').textContent = xp;
  document.getElementById('level-name').textContent = lvl.name;
  document.getElementById('labs-completed').textContent = Object.keys(state.progress).length;
  document.getElementById('player-name').textContent = state.currentUser || 'Jugador';
  document.getElementById('player-level').textContent = lvl.label;
}

function renderRanking() {
  const ranking = [...fakeUsers, { name: state.currentUser, xp: calculateXP() }];
  ranking.sort((a, b) => b.xp - a.xp);
  const list = document.getElementById('ranking-list');
  list.innerHTML = '';
  ranking.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'ranking-item';
    row.innerHTML = `
      <div class="name">${index + 1}. ${item.name}${item.name === state.currentUser ? ' (tú)' : ''}</div>
      <div class="xp">${item.xp} XP</div>
    `;
    list.appendChild(row);
  });
}

function renderAll() {
  renderLabs();
  renderStats();
  renderRanking();
  if (state.selectedLab) selectLab(state.selectedLab);
}

function handleCompletion() {
  if (!state.selectedLab) return alert('Selecciona un lab primero.');
  const lab = labs.find((l) => l.id === state.selectedLab);
  const link = document.getElementById('lab-link').value.trim();
  const unlocked = isUnlocked(labs.findIndex((l) => l.id === state.selectedLab));
  if (!unlocked) return alert('Este lab aún está bloqueado. Completa el anterior primero.');
  if (!link) return alert('Debes pegar el link de tu documentación.');
  state.progress[lab.id] = { link, completedAt: new Date().toISOString() };
  saveProgress();
  renderAll();
  selectLab(lab.id);
  alert('¡Lab completado! XP acreditado.');
}

function setupEvents() {
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (!username) return;
    localStorage.setItem(storageKeys.user, username);
    state.currentUser = username;
    state.progress = JSON.parse(localStorage.getItem(storageKeys.progress) || '{}')[username] || {};
    hideLogin();
    renderAll();
  });

  document.getElementById('complete-btn').addEventListener('click', handleCompletion);
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem(storageKeys.user);
    state.currentUser = null;
    state.progress = {};
    showLogin();
  });
}

// Inicio
setupEvents();
loadSession();
renderLabs();
