// Datos base de Labs con integraciones GitHub
const labs = [
  {
    id: 'lab1',
    labId: 'LAB-01',
    title: 'El jefe necesita el archivo YA',
    level: 'Beginner',
    xp: 100,
    // Ajuste específico para LAB-01: repositorio oficial en lanedu-org
    repo: 'lanedu-org/lanedu-lab-01-backup-logs',
    story:
      'Tu lead te escribió por chat: “necesito un backup limpio de logs antes de las 18:00, el auditor está aquí”.',
    objective: 'Crear un script que comprima los logs de /var/log (o carpeta simulada) y genere un archivo con fecha.',
    rules: [
      'No borres archivos originales.',
      'Incluye comandos o snippets que usaste.',
      'Adjunta evidencia (capturas o salida del comando).'
    ],
    deliverable: 'Crea un Pull Request contra el repo base con el script de backup.'
  },
  {
    id: 'lab2',
    labId: 'LAB-02',
    title: 'Terminal limpia, mente limpia',
    level: 'Beginner',
    xp: 120,
    repo: 'lanedu-labs/lab-02-history-review',
    story: 'Llegas a una máquina con historial caótico. Quieren saber qué comandos se ejecutaron para un incidente.',
    objective: 'Analizar el historial (.bash_history o similar) y resumir en un reporte qué comandos sospechosos encontraste.',
    rules: [
      'No edites el historial original.',
      'Incluye timestamps si están disponibles.',
      'Entrega un resumen de 5-10 líneas.'
    ],
    deliverable: 'Pull Request con tu reporte y comandos en el repo base.'
  },
  {
    id: 'lab3',
    labId: 'LAB-03',
    title: 'Automatiza el onboarding',
    level: 'Beginner',
    xp: 130,
    repo: 'lanedu-labs/lab-03-onboarding',
    story: 'Un compañero nuevo llega y no hay manual. Necesita ambiente listo en 10 minutos.',
    objective: 'Crear un script que instale dependencias (ej. git, curl), configure alias y muestre mensaje de bienvenida.',
    rules: [
      'Debe ser idempotente (si ya está instalado, no rompe).',
      'Usa variables y comentarios claros.',
      'Incluye pasos para revertir cambios.'
    ],
    deliverable: 'Pull Request con el script y evidencias en el repo base.'
  },
  {
    id: 'lab4',
    labId: 'LAB-04',
    title: 'Mini API sin servidor',
    level: 'Beginner',
    xp: 140,
    repo: 'lanedu-labs/lab-04-mock-api',
    story: 'Te piden simular una API interna para probar un frontend mientras llega el backend real.',
    objective: 'Crear un mock de API con JSON local (puede ser usando fetch a un archivo) y responder datos de usuarios.',
    rules: [
      'No necesitas servidor; usa archivos o funciones.',
      'Debe permitir filtrar o buscar usuarios.',
      'Incluye ejemplo de consumo en JS.'
    ],
    deliverable: 'Pull Request con el mock y la demo listos.'
  },
  {
    id: 'lab5',
    labId: 'LAB-05',
    title: 'Checklist de despliegue',
    level: 'Beginner',
    xp: 150,
    repo: 'lanedu-labs/lab-05-deploy-checklist',
    story: 'Antes de desplegar, tu squad necesita una checklist que evite sustos.',
    objective: 'Construir una checklist interactiva (HTML/JS) que marque tareas y calcule porcentaje.',
    rules: [
      'Debe persistir estado localmente.',
      'Incluye al menos 8 ítems críticos.',
      'Muestra un resumen visual (barra o texto).'
    ],
    deliverable: 'Pull Request con la checklist funcional en el repo base.'
  },
  {
    id: 'lab6',
    labId: 'LAB-06',
    title: 'Cron jobs bajo control',
    level: 'Intermediate',
    xp: 200,
    repo: 'lanedu-labs/lab-06-cron-audit',
    story: 'La empresa perdió trazabilidad de sus cron jobs. Necesitan inventario rápido.',
    objective: 'Levantar un inventario de cron jobs de un sistema (real o simulado) y proponer alertas básicas.',
    rules: [
      'Documenta comandos usados para listar crons.',
      'Propón validaciones para saber si fallan.',
      'Entrega tabla con dueño, comando y horario.'
    ],
    deliverable: 'Pull Request con inventario y propuestas en el repo base.'
  },
  {
    id: 'lab7',
    labId: 'LAB-07',
    title: 'Responder un incidente',
    level: 'Intermediate',
    xp: 220,
    repo: 'lanedu-labs/lab-07-incident',
    story:
      'Alguien subió una llave SSH pública no autorizada. Debes reaccionar como responderías en guardia.',
    objective: 'Diseñar y documentar un playbook de respuesta: detección, contención, erradicación y recuperación.',
    rules: [
      'Incluye comandos concretos de verificación.',
      'Define responsables y tiempos estimados.',
      'Agrega checklist de verificación final.'
    ],
    deliverable: 'Pull Request con el playbook y evidencias.'
  },
  {
    id: 'lab8',
    labId: 'LAB-08',
    title: 'Pipeline saludable',
    level: 'Intermediate',
    xp: 240,
    repo: 'lanedu-labs/lab-08-pipeline',
    story: 'El pipeline CI falla sin logs claros. Debes estabilizarlo antes de la demo.',
    objective: 'Crear un pipeline mínimo (o simulado) con pasos de build, test y notificaciones, y registrar logs legibles.',
    rules: [
      'Muestra variables de entorno sensibles como secretos (no en claro).',
      'Incluye al menos una prueba automatizada falsa o real.',
      'Entrega un tablero de estado o reporte de runs.'
    ],
    deliverable: 'Pull Request con pipeline, logs y reporte.'
  },
  {
    id: 'lab9',
    labId: 'LAB-09',
    title: 'Blue Team vs Ransomware',
    level: 'Advanced',
    xp: 400,
    repo: 'lanedu-labs/lab-09-ransomware',
    story: 'Un servidor muestra actividad de cifrado masivo. Necesitas actuar como analista SOC.',
    objective: 'Diseñar un kit de contención rápida: checklist, scripts de aislamiento y plan de comunicación.',
    rules: [
      'Prioriza pasos de contención en < 15 minutos.',
      'Incluye scripts o comandos listos para ejecutar.',
      'Agrega indicadores para monitorear propagación.'
    ],
    deliverable: 'Pull Request con el kit de respuesta y documentación.'
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
  token: 'laneduToken',
  progress: 'laneduProgress'
};

const state = {
  currentUser: null,
  githubToken: null,
  progress: {},
  selectedLab: null,
  checking: false,
  routes: [],
  selectedRoute: null,
  routesLoaded: false
};

async function loadRoutes() {
  try {
    const response = await fetch('routes.json');
    const data = await response.json();
    state.routes = data.routes || [];
    state.routes.forEach((route) => {
      const syncRepo = (entry) => {
        const labData = labs.find((l) => l.labId === entry.lab_id);
        if (labData && entry.repo) {
          // Mantener los repos base alineados con la metadata central de rutas
          labData.repo = entry.repo;
        }
      };
      (route.labs || []).forEach(syncRepo);
      (route.subroutes || []).forEach((sub) => (sub.labs || []).forEach(syncRepo));
    });
    state.selectedRoute = state.routes[0]?.id || null;
    state.routesLoaded = true;
    renderAll();
  } catch (error) {
    console.error('No se pudieron cargar las rutas de aprendizaje', error);
  }
}

function loadSession() {
  const storedUser = localStorage.getItem(storageKeys.user);
  const storedToken = localStorage.getItem(storageKeys.token);
  const allProgress = JSON.parse(localStorage.getItem(storageKeys.progress) || '{}');
  if (storedUser && storedToken) {
    state.currentUser = storedUser;
    state.githubToken = storedToken;
    state.progress = allProgress[storedUser] || {};
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
  const previousProgress = state.progress[previousLab.id];
  return Boolean(previousProgress && previousProgress.status === 'completed');
}

function getRouteLabs(routeId) {
  const route = state.routes.find((r) => r.id === routeId);
  if (!route) return [];

  const collected = [];
  const pushLab = (entry, subrouteName = null) => {
    const labData = labs.find((l) => l.labId === entry.lab_id);
    if (labData) {
      collected.push({ lab: labData, meta: { ...entry, subroute: subrouteName } });
    }
  };

  (route.labs || []).forEach((lab) => pushLab(lab));
  (route.subroutes || []).forEach((sub) => {
    (sub.labs || []).forEach((lab) => pushLab(lab, sub.name));
  });

  return collected.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
}

function getCurrentRouteLabs() {
  if (!state.selectedRoute) return [];
  return getRouteLabs(state.selectedRoute);
}

function getRouteProgress(routeId) {
  const labsInRoute = getRouteLabs(routeId);
  const total = labsInRoute.length;
  const completed = labsInRoute.filter(({ lab }) => state.progress[lab.id]?.status === 'completed').length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

function getLabStatus(labId) {
  const progress = state.progress[labId];
  if (!progress) return 'Pendiente';
  if (progress.status === 'completed') return 'Completado';
  if (progress.status === 'checking') return 'En revisión';
  return progress.status || 'Pendiente';
}

function renderRoutes() {
  const container = document.getElementById('routes-list');
  if (!container) return;
  container.innerHTML = '';

  if (!state.routesLoaded) {
    container.innerHTML = '<p class="mini-hint">Cargando rutas...</p>';
    return;
  }

  if (!state.routes.length) {
    container.innerHTML = '<p class="mini-hint">No hay rutas configuradas aún.</p>';
    return;
  }

  state.routes.forEach((route) => {
    const progress = getRouteProgress(route.id);
    const card = document.createElement('div');
    card.className = `route-card ${state.selectedRoute === route.id ? 'active' : ''}`;
    card.innerHTML = `
      <h3>${route.name}</h3>
      <div class="route-meta">
        <span class="pill">${progress.completed}/${progress.total} labs</span>
        <span class="pill soft">${route.levels?.join(' › ') || 'Secuencia'}</span>
      </div>
      <div class="route-progress"><span style="width:${progress.percent}%;"></span></div>
      <p class="mini-hint">Ruta ${progress.percent}% completa</p>
    `;
    card.addEventListener('click', () => {
      state.selectedRoute = route.id;
      const labsInRoute = getCurrentRouteLabs();
      if (state.selectedLab && !labsInRoute.some((item) => item.lab.id === state.selectedLab)) {
        state.selectedLab = labsInRoute[0]?.lab.id || null;
      }
      renderRoutes();
      renderLabs();
    });
    container.appendChild(card);
  });
}

function renderLabs() {
  const list = document.getElementById('labs-list');
  list.innerHTML = '';
  const routeLabs = getCurrentRouteLabs();
  const route = state.routes.find((r) => r.id === state.selectedRoute);

  const routeLabel = document.getElementById('current-route-label');
  const progressPill = document.getElementById('route-progress-pill');

  if (route) {
    const progress = getRouteProgress(route.id);
    if (routeLabel) routeLabel.textContent = `${route.name} · ${route.levels?.join(' › ') || 'Secuencia lineal'}`;
    if (progressPill) progressPill.textContent = `${progress.percent}% ruta`;
  } else {
    if (routeLabel) routeLabel.textContent = 'Selecciona una ruta para ver los Labs ordenados.';
    if (progressPill) progressPill.textContent = '0% ruta';
  }

  if (!routeLabs.length) {
    list.innerHTML = '<p class="mini-hint">Selecciona una ruta para visualizar sus labs.</p>';
    return;
  }

  let currentSubroute = null;
  let currentContainer = list;

  const ensureSelection = () => {
    const ids = routeLabs.map((item) => item.lab.id);
    if (!state.selectedLab && ids.length) {
      state.selectedLab = ids[0];
    }
    if (state.selectedLab && !ids.includes(state.selectedLab) && ids.length) {
      state.selectedLab = ids[0];
    }
  };

  routeLabs.forEach(({ lab, meta }) => {
    if (meta.subroute && meta.subroute !== currentSubroute) {
      currentSubroute = meta.subroute;
      const block = document.createElement('div');
      block.className = 'subroute-block';
      const title = document.createElement('h4');
      title.textContent = `Subruta: ${meta.subroute}`;
      block.appendChild(title);
      const inner = document.createElement('div');
      inner.className = 'labs-list';
      block.appendChild(inner);
      list.appendChild(block);
      currentContainer = inner;
    } else if (!meta.subroute) {
      currentSubroute = null;
      currentContainer = list;
    }

    const completed = state.progress[lab.id]?.status === 'completed';
    const unlocked = isUnlocked(labs.findIndex((l) => l.id === lab.id));
    const card = document.createElement('div');
    card.className = `lab-card ${unlocked ? '' : 'locked'}`;
    card.innerHTML = `
      <div class="lab-meta">
        <span class="tag ${lab.level.toLowerCase()}">${meta.difficulty || lab.level}</span>
        <span class="pill">${lab.xp} XP</span>
      </div>
      <h3>${lab.labId} · ${lab.title}</h3>
      <p class="mini-hint">${completed ? 'Completado' : unlocked ? 'Disponible' : 'Bloqueado'} · Orden ${meta.order || '-'}</p>
    `;
    if (unlocked) {
      card.addEventListener('click', () => selectLab(lab.id));
    }
    currentContainer.appendChild(card);
  });

  ensureSelection();
  if (state.selectedLab) {
    selectLab(state.selectedLab);
  }
}

function selectLab(id) {
  const lab = labs.find((l) => l.id === id);
  if (!lab) return;
  state.selectedLab = lab.id;
  const unlocked = isUnlocked(labs.findIndex((l) => l.id === id));
  const completed = state.progress[lab.id]?.status === 'completed';
  document.getElementById('lab-title').textContent = `${lab.labId} · ${lab.title}`;
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
  document.getElementById('verify-btn').disabled = !unlocked || state.checking;
  const chip = document.getElementById('lab-status-chip');
  chip.textContent = getLabStatus(lab.id);
  chip.classList.toggle('pill', true);
  const validationBox = document.getElementById('validation-message');
  validationBox.className = 'status-box hidden';
  validationBox.textContent = '';
}

function calculateXP() {
  return labs.reduce((acc, lab) => {
    return acc + (state.progress[lab.id]?.status === 'completed' ? lab.xp : 0);
  }, 0);
}

function renderStats() {
  const xp = calculateXP();
  const lvl = levelFromXP(xp);
  document.getElementById('xp-total').textContent = xp;
  document.getElementById('level-name').textContent = lvl.name;
  document.getElementById('labs-completed').textContent = Object.values(state.progress).filter(
    (p) => p.status === 'completed'
  ).length;
  document.getElementById('player-name').textContent = state.currentUser || 'Jugador';
  document.getElementById('player-level').textContent = lvl.label;
}

function renderRanking() {
  const ranking = [...fakeUsers, { name: state.currentUser || 'tú', xp: calculateXP() }];
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
  renderRoutes();
  renderLabs();
  renderStats();
  renderRanking();
}

function showValidationMessage(type, message) {
  const box = document.getElementById('validation-message');
  box.className = `status-box ${type}`;
  box.textContent = message;
}

async function fetchGitHub(url, options = {}) {
  const headers = options.headers || {};
  const merged = {
    ...options,
    headers: {
      ...headers,
      Authorization: `Bearer ${state.githubToken}`,
      Accept: 'application/vnd.github+json'
    }
  };
  const response = await fetch(url, merged);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API ${response.status}: ${text}`);
  }
  return response.json();
}

async function fetchRules(lab) {
  const url = `https://raw.githubusercontent.com/${lab.repo}/main/.lanedu/rules.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('No se encontró rules.json en el repo del Lab');
  return response.json();
}

async function validatePullRequest(lab, rules) {
  const prs = await fetchGitHub(
    `https://api.github.com/repos/${lab.repo}/pulls?state=all&per_page=50`
  );
  const userPRs = prs.filter((pr) => pr.user?.login?.toLowerCase() === state.currentUser?.toLowerCase());
  if (!userPRs.length) {
    return { ok: false, reason: 'No se encontró PR para este Lab.' };
  }

  const matchingPR = userPRs.find((pr) => {
    const titleMatch = pr.title.toUpperCase().includes((rules.pr_title_contains || lab.labId).toUpperCase());
    const statusOk = pr.state === 'open' || pr.merged_at;
    return titleMatch && statusOk;
  });

  if (!matchingPR) {
    return {
      ok: false,
      reason: 'El PR existe pero no cumple título o no está abierto/mergeado.'
    };
  }

  const files = await fetchGitHub(
    `https://api.github.com/repos/${lab.repo}/pulls/${matchingPR.number}/files?per_page=100`
  );
  const filenames = files.map((f) => f.filename);

  const missingRequired = (rules.required_files || []).filter((req) => !filenames.includes(req));
  if (missingRequired.length) {
    return { ok: false, reason: 'No se modificaron archivos requeridos: ' + missingRequired.join(', ') };
  }

  const minChanged = rules.min_changed_files || 1;
  if (filenames.length < minChanged) {
    return { ok: false, reason: `Se esperaban al menos ${minChanged} archivos modificados.` };
  }

  return { ok: true, pr: matchingPR };
}

async function verifyCurrentLab() {
  if (!state.selectedLab) return alert('Selecciona un lab primero.');
  const lab = labs.find((l) => l.id === state.selectedLab);
  const unlocked = isUnlocked(labs.findIndex((l) => l.id === lab.id));
  if (!unlocked) return alert('Este lab está bloqueado. Completa el anterior.');
  if (!state.githubToken) return alert('Conecta tu cuenta de GitHub primero.');

  state.checking = true;
  document.getElementById('verify-btn').disabled = true;
  showValidationMessage('info', 'Consultando GitHub y reglas del Lab...');
  state.progress[lab.id] = { status: 'checking' };
  saveProgress();
  renderStats();
  document.getElementById('lab-status-chip').textContent = 'En revisión';

  try {
    const rules = await fetchRules(lab);
    const validation = await validatePullRequest(lab, rules);
    if (validation.ok) {
      state.progress[lab.id] = {
        status: 'completed',
        prNumber: validation.pr.number,
        prUrl: validation.pr.html_url,
        completedAt: new Date().toISOString()
      };
      saveProgress();
      renderAll();
      showValidationMessage('success', '¡PR válido! Lab completado y XP acreditado.');
      document.getElementById('lab-status-chip').textContent = 'Completado';
    } else {
      state.progress[lab.id] = { status: 'pending' };
      saveProgress();
      renderStats();
      showValidationMessage('error', validation.reason);
      document.getElementById('lab-status-chip').textContent = 'Pendiente';
    }
  } catch (err) {
    state.progress[lab.id] = { status: 'pending' };
    saveProgress();
    renderStats();
    showValidationMessage('error', err.message || 'Error al verificar PR');
    document.getElementById('lab-status-chip').textContent = 'Pendiente';
  } finally {
    state.checking = false;
    document.getElementById('verify-btn').disabled = false;
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const token = document.getElementById('github-token').value.trim();
  if (!token) return;
  try {
    const user = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    });
    if (!user.ok) throw new Error('Token inválido o sin permisos.');
    const data = await user.json();
    state.currentUser = data.login;
    state.githubToken = token;
    const allProgress = JSON.parse(localStorage.getItem(storageKeys.progress) || '{}');
    state.progress = allProgress[data.login] || {};
    localStorage.setItem(storageKeys.user, data.login);
    localStorage.setItem(storageKeys.token, token);
    hideLogin();
    renderAll();
  } catch (error) {
    alert(error.message || 'No se pudo iniciar sesión con GitHub');
  }
}

function setupEvents() {
  document.getElementById('login-form').addEventListener('submit', handleLogin);

  document.getElementById('verify-btn').addEventListener('click', () => {
    verifyCurrentLab();
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem(storageKeys.user);
    localStorage.removeItem(storageKeys.token);
    state.currentUser = null;
    state.githubToken = null;
    state.progress = {};
    showLogin();
  });
}

setupEvents();
loadSession();
loadRoutes();
