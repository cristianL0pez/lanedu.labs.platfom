import { labsCatalog } from './labs/labsCatalog.js';
import { fakeUsers } from './config/fakeUsers.js';
import { ROUTE_ZERO_ID } from './config/constants.js';
import {
  loadRoutesCatalog,
  findRouteForLab,
  getRouteLabs
} from './routes/routesProvider.js';
import {
  migrateLegacyProfiles,
  getActiveProfile,
  getActiveProfileAlias,
  ensureProfile,
  setActiveProfileAlias,
  saveProgress as persistProgress,
  recordLabProgress,
  setGithubCredentials,
  clearGithubCredentials,
  clearActiveProfile,
  getAllProfiles
} from './core/users/profileStore.js';
import {
  fetchGithubUser,
  fetchRulesDefinition,
  fetchPullRequestsForLab,
  fetchFilesForPR
} from './core/auth/githubAuth.js';

const labs = labsCatalog;
const state = {
  currentUser: null,
  currentProfile: null,
  githubToken: null,
  githubUser: null,
  progress: {},
  selectedLab: null,
  checking: false,
  routes: [],
  selectedRoute: null,
  routesLoaded: false
};

let pendingVerificationLabId = null;

function isRouteZeroComplete() {
  const progress = getRouteProgress(ROUTE_ZERO_ID);
  return progress.total > 0 && progress.completed === progress.total;
}

function isRouteUnlocked(routeId) {
  if (!routeId) return false;
  if (routeId === ROUTE_ZERO_ID) return true;
  return isRouteZeroComplete();
}

function isUnlocked(labId) {
  const route = findRouteForLab(labId, state.routes);
  if (!route) return false;
  if (!isRouteUnlocked(route.id)) return false;

  const routeLabs = getRouteLabs(route.id, state.routes);
  const indexInRoute = routeLabs.findIndex(({ lab }) => lab.id === labId);
  if (indexInRoute === -1) return false;
  if (indexInRoute === 0) return true;

  const previousLab = routeLabs[indexInRoute - 1].lab;
  const previousProgress = state.progress[previousLab.id];
  return Boolean(previousProgress && previousProgress.status === 'completed');
}

function getRouteProgress(routeId) {
  const labsInRoute = getRouteLabs(routeId, state.routes);
  const total = labsInRoute.length;
  const completed = labsInRoute.filter(({ lab }) => state.progress[lab.id]?.status === 'completed').length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

async function loadRoutes() {
  try {
    const routes = await loadRoutesCatalog();
    state.routes = routes;
    state.selectedRoute = state.selectedRoute || routes[0]?.id || null;
    state.routesLoaded = true;
    renderAll();
  } catch (error) {
    console.error('No se pudieron cargar las rutas de aprendizaje', error);
  }
}

function syncStateWithProfile(profile, alias) {
  state.currentUser = alias;
  state.currentProfile = profile;
  state.progress = profile?.progress || {};
  state.githubToken = profile?.githubToken || null;
  state.githubUser = profile?.githubUser || null;
}

function loadSession() {
  migrateLegacyProfiles();
  const activeAlias = getActiveProfileAlias();
  const profile = getActiveProfile();
  if (!activeAlias || !profile) {
    showLogin();
    return;
  }
  syncStateWithProfile(profile, activeAlias);
  hideLogin();
  renderAll();
}

function saveProgress() {
  persistProgress(state.progress);
}

function showLogin() {
  document.getElementById('login-screen').classList.remove('hidden');
  hideGithubConnect();
}

function hideLogin() {
  document.getElementById('login-screen').classList.add('hidden');
}

function showGithubConnect() {
  document.getElementById('github-connect').classList.remove('hidden');
}

function hideGithubConnect() {
  document.getElementById('github-connect').classList.add('hidden');
}

function levelFromXP(xp) {
  if (xp >= 1200) return { name: 'Arquitecto', label: 'Nivel 5' };
  if (xp >= 800) return { name: 'Estratega', label: 'Nivel 4' };
  if (xp >= 500) return { name: 'Operador', label: 'Nivel 3' };
  if (xp >= 250) return { name: 'Field Agent', label: 'Nivel 2' };
  return { name: 'Becario en llamas', label: 'Nivel 1' };
}

function getCurrentRouteLabs() {
  if (!state.selectedRoute) return [];
  return getRouteLabs(state.selectedRoute, state.routes);
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
    const locked = !isRouteUnlocked(route.id);
    const card = document.createElement('div');
    card.className = `route-card ${state.selectedRoute === route.id ? 'active' : ''} ${
      locked ? 'locked' : ''
    }`;
    card.innerHTML = `
      <h3>${route.name}</h3>
      <div class="route-meta">
        <span class="pill">${progress.completed}/${progress.total} labs</span>
        <span class="pill soft">${route.levels?.join(' › ') || 'Secuencia'}</span>
      </div>
      <div class="route-progress"><span style="width:${progress.percent}%;"></span></div>
      <p class="mini-hint">${
        locked
          ? 'Completa la Ruta 0 para desbloquear'
          : `Ruta ${progress.percent}% completa`
      }</p>
    `;
    if (!locked) {
      card.addEventListener('click', () => {
        state.selectedRoute = route.id;
        const labsInRoute = getCurrentRouteLabs();
        if (state.selectedLab && !labsInRoute.some((item) => item.lab.id === state.selectedLab)) {
          state.selectedLab = labsInRoute[0]?.lab.id || null;
        }
        renderRoutes();
        renderLabs();
      });
    }
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

  const lockedRoute = route && !isRouteUnlocked(route.id);

  if (lockedRoute) {
    list.innerHTML =
      '<p class="mini-hint warning">Completa la Ruta 0 para desbloquear el acceso a esta ruta. Cada lab se habilita progresivamente.</p>';
    return;
  }

  if (!routeLabs.length) {
    list.innerHTML =
      '<p class="mini-hint">Selecciona una ruta para visualizar sus labs.</p>';
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
    const unlocked = isUnlocked(lab.id);
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
  const unlocked = isUnlocked(lab.id);
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

function calculateXPFromProgress(progressMap) {
  return labs.reduce((acc, lab) => {
    return acc + (progressMap[lab.id]?.status === 'completed' ? lab.xp : 0);
  }, 0);
}

function calculateXP() {
  return calculateXPFromProgress(state.progress);
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
  const allProfiles = getAllProfiles();
  const profileEntries = Object.values(allProfiles).map((profile) => ({
    name: profile.alias,
    xp: calculateXPFromProgress(profile.progress || {})
  }));
  const ranking = [...fakeUsers, ...profileEntries];
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

async function validatePullRequest(lab, rules) {
  const prs = await fetchPullRequestsForLab(lab.repo, state.githubToken);
  const githubLogin = (state.githubUser || state.currentUser || '').toLowerCase();
  const userPRs = prs.filter((pr) => pr.user?.login?.toLowerCase() === githubLogin);
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

  const files = await fetchFilesForPR(lab.repo, matchingPR.number, state.githubToken);
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
  const unlocked = isUnlocked(lab.id);
  if (!unlocked) return alert('Este lab está bloqueado. Completa el anterior.');

  if (lab.manualValidation) {
    recordLabProgress(lab.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      note: 'Validado manualmente (Ruta 0)'
    });
    state.progress[lab.id] = { status: 'completed' };
    saveProgress();
    renderAll();
    showValidationMessage('success', 'Ruta 0 · Progreso marcado manualmente.');
    document.getElementById('lab-status-chip').textContent = 'Completado';
    return;
  }

  if (!state.githubToken) {
    pendingVerificationLabId = lab.id;
    showGithubConnect();
    return showValidationMessage('info', 'Conecta GitHub para validar este Lab con tu PR.');
  }

  state.checking = true;
  document.getElementById('verify-btn').disabled = true;
  showValidationMessage('info', 'Consultando GitHub y reglas del Lab...');
  state.progress[lab.id] = { status: 'checking' };
  saveProgress();
  renderStats();
  document.getElementById('lab-status-chip').textContent = 'En revisión';

  try {
    const rules = await fetchRulesDefinition(lab.repo);
    const validation = await validatePullRequest(lab, rules);
    if (validation.ok) {
      state.progress[lab.id] = {
        status: 'completed',
        prNumber: validation.pr.number,
        prUrl: validation.pr.html_url,
        completedAt: new Date().toISOString()
      };
      recordLabProgress(lab.id, state.progress[lab.id]);
      saveProgress();
      renderAll();
      showValidationMessage('success', '¡PR válido! Lab completado y XP acreditado.');
      document.getElementById('lab-status-chip').textContent = 'Completado';
    } else {
      state.progress[lab.id] = { status: 'pending' };
      recordLabProgress(lab.id, state.progress[lab.id]);
      saveProgress();
      renderStats();
      showValidationMessage('error', validation.reason);
      document.getElementById('lab-status-chip').textContent = 'Pendiente';
    }
  } catch (err) {
    state.progress[lab.id] = { status: 'pending' };
    recordLabProgress(lab.id, state.progress[lab.id]);
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
  const alias = document.getElementById('player-alias').value.trim();
  if (!alias) return;
  const profile = ensureProfile(alias);
  setActiveProfileAlias(alias);
  syncStateWithProfile(profile, alias);
  hideLogin();
  renderAll();
}

async function handleGithubConnect(event) {
  event.preventDefault();
  const token = document.getElementById('github-token').value.trim();
  if (!token) return;
  try {
    const data = await fetchGithubUser(token);
    state.githubToken = token;
    state.githubUser = data.login;
    setGithubCredentials(token, data.login);
    hideGithubConnect();
    showValidationMessage('success', 'GitHub conectado. Continúa validando tu Lab.');
    const pendingLab = pendingVerificationLabId;
    pendingVerificationLabId = null;
    if (pendingLab && pendingLab === state.selectedLab) {
      verifyCurrentLab();
    }
  } catch (error) {
    alert(error.message || 'No se pudo conectar con GitHub');
  }
}

function handleLogout() {
  clearGithubCredentials();
  clearActiveProfile();
  state.currentUser = null;
  state.currentProfile = null;
  state.githubToken = null;
  state.githubUser = null;
  state.progress = {};
  showLogin();
}

function setupEvents() {
  document.getElementById('login-form').addEventListener('submit', handleLogin);

  document.getElementById('github-connect-form').addEventListener('submit', handleGithubConnect);
  document.getElementById('cancel-github-connect').addEventListener('click', () => {
    pendingVerificationLabId = null;
    hideGithubConnect();
    showValidationMessage('info', 'Puedes conectar GitHub cuando quieras validar un Lab.');
  });

  document.getElementById('verify-btn').addEventListener('click', () => {
    verifyCurrentLab();
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    handleLogout();
  });
}

setupEvents();
loadSession();
loadRoutes();
