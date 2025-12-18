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
  getAllProfiles,
  updateIdentity,
  recordTokenUsage
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
  displayName: '',
  role: '',
  githubHandle: '',
  currentProfile: null,
  githubToken: null,
  githubUser: null,
  githubTokenMeta: { status: 'disconnected', last4: null, lastValidated: null, lastUsed: null },
  progress: {},
  selectedLab: null,
  checking: false,
  routes: [],
  selectedRoute: null,
  routesLoaded: false,
  activeView: 'dashboard'
};

let pendingVerificationLabId = null;

function decodeStoredToken(stored) {
  if (!stored) return null;
  try {
    return atob(stored);
  } catch (err) {
    return stored;
  }
}

function formatDate(value) {
  if (!value) return 'Nunca usado';
  try {
    return new Date(value).toLocaleString('es-CL');
  } catch (e) {
    return value;
  }
}

function getVisualStatus(labId) {
  const progress = state.progress[labId];
  if (progress?.status === 'completed') return { label: 'COMPLETED', cls: 'completed' };
  if (progress?.status === 'checking') return { label: 'IN REVIEW', cls: 'review' };
  const unlocked = isUnlocked(labId);
  if (unlocked) return { label: 'AVAILABLE', cls: 'available' };
  return { label: 'LOCKED', cls: 'locked' };
}

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
  state.displayName = profile?.displayName || '';
  state.role = profile?.role || '';
  state.githubHandle = profile?.githubHandle || '';
  state.progress = profile?.progress || {};
  state.githubToken = decodeStoredToken(profile?.githubToken) || null;
  state.githubUser = profile?.githubUser || null;
  state.githubTokenMeta = profile?.githubTokenMeta || {
    status: 'disconnected',
    last4: null,
    lastValidated: null,
    lastUsed: null
  };
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
  switchView('dashboard');
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
  return getVisualStatus(labId).label;
}

function updateDetailStatus(labId) {
  const status = getVisualStatus(labId);
  const statusNode = document.getElementById('lab-status');
  if (statusNode) statusNode.textContent = status.label;
  const chip = document.getElementById('lab-status-chip');
  if (chip) {
    chip.textContent = status.label;
    chip.className = `status-flag ${status.cls}`;
  }
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
    const status = getVisualStatus(lab.id);
    const card = document.createElement('div');
    card.className = `lab-card ${unlocked ? '' : 'locked'}`;
    card.innerHTML = `
      <div class="lab-meta">
        <span class="tag ${lab.level.toLowerCase()}">${meta.difficulty || lab.level}</span>
        <span class="status-flag ${status.cls}">${status.label}</span>
      </div>
      <h3>${lab.labId} · ${lab.title}</h3>
      <p class="mini-hint">${status.label} · ${lab.xp} XP · Orden ${meta.order || '-'}</p>
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
  document.getElementById('lab-title').textContent = `${lab.labId} · ${lab.title}`;
  updateDetailStatus(lab.id);
  document.getElementById('lab-story').textContent = lab.story;
  document.getElementById('lab-objective').textContent = lab.objective;
  document.getElementById('lab-validation-type').textContent = lab.validationType || 'Validación por PR';
  const checksList = document.getElementById('lab-validation-checks');
  checksList.innerHTML = '';
  (lab.validationChecks || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    checksList.appendChild(li);
  });
  const exclusionsList = document.getElementById('lab-validation-exclusions');
  exclusionsList.innerHTML = '';
  (lab.validationExclusions || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    exclusionsList.appendChild(li);
  });
  document.getElementById('lab-deliverable').textContent = lab.deliverable;
  const rulesList = document.getElementById('lab-rules');
  rulesList.innerHTML = '';
  lab.rules.forEach((rule) => {
    const li = document.createElement('li');
    li.textContent = rule;
    rulesList.appendChild(li);
  });
  document.getElementById('verify-btn').disabled = !unlocked || state.checking;
  const validationBox = document.getElementById('validation-message');
  validationBox.className = 'status-box hidden';
  validationBox.textContent = '';
  const validationHint = document.getElementById('validation-hint');
  if (lab.manualValidation) {
    validationHint.textContent = 'Validación manual o declarativa. No necesitas conectar GitHub para este lab.';
  } else if (lab.requiresGithub) {
    validationHint.textContent = 'Este lab se valida con tu PR y rules.json. Conecta GitHub solo cuando vayas a verificar.';
  } else {
    validationHint.textContent = 'La validación depende del lab; sigue las instrucciones y marca tu progreso.';
  }
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
  document.getElementById('player-name').textContent = state.displayName || state.currentUser || 'Jugador';
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

function showProfileMessage(type, message) {
  const box = document.getElementById('profile-message');
  if (!box) return;
  box.className = `status-box ${type}`;
  box.textContent = message;
}

function renderIdentitySection() {
  const nameInput = document.getElementById('profile-name');
  if (!nameInput) return;
  const handleInput = document.getElementById('profile-handle');
  const roleInput = document.getElementById('profile-role');
  nameInput.value = state.displayName || state.currentUser || '';
  handleInput.value = state.githubHandle || state.githubUser || '';
  roleInput.value = state.role || '';

  const identityStatus = document.getElementById('identity-status');
  const complete = Boolean(nameInput.value && handleInput.value);
  identityStatus.textContent = complete ? 'COMPLETO' : 'INCOMPLETO';
  identityStatus.className = `status-badge ${complete ? 'success' : 'warning'}`;
}

function renderTechnicalStatus() {
  const list = document.getElementById('technical-status-list');
  if (!list) return;
  list.innerHTML = '';

  const statuses = [
    {
      label: 'Cuenta GitHub vinculada',
      ok: Boolean(state.githubHandle || state.githubUser),
      description: state.githubHandle || state.githubUser || 'Sin username declarado'
    },
    {
      label: 'Token GitHub conectado',
      ok: Boolean(state.githubToken),
      description: state.githubToken ? 'Conectado, listo para validar PRs.' : 'Pendiente hasta que un Lab lo requiera.'
    },
    {
      label: 'Permisos del token',
      ok: state.githubTokenMeta?.status === 'connected',
      warning: state.githubTokenMeta?.status === 'revoked',
      description:
        state.githubTokenMeta?.status === 'connected'
          ? 'Lectura de repos habilitada.'
          : 'Conecta un token con permisos de solo lectura a repos.'
    },
    {
      label: 'Rutas desbloqueadas',
      ok: isRouteZeroComplete(),
      description: isRouteZeroComplete()
        ? 'Ruta 0 completada. Puedes avanzar en otras rutas.'
        : 'Completa Ruta 0 para habilitar el resto de rutas.'
    }
  ];

  statuses.forEach((item) => {
    const badgeClass = item.ok ? 'success' : item.warning ? 'error' : 'warning';
    const row = document.createElement('div');
    row.className = 'status-row';
    row.innerHTML = `
      <div>
        <p class="label">${item.label}</p>
        <p class="mini-hint">${item.description}</p>
      </div>
      <span class="status-badge ${badgeClass}">${item.ok ? 'OK' : 'PENDIENTE'}</span>
    `;
    list.appendChild(row);
  });
}

function renderTokenCard() {
  const masked = state.githubTokenMeta?.last4 ? `•••• ${state.githubTokenMeta.last4}` : 'Sin token conectado';
  const tokenStatus = document.getElementById('token-status');
  const maskNode = document.getElementById('token-mask');
  if (maskNode) maskNode.textContent = masked;
  if (tokenStatus) {
    const cls = state.githubTokenMeta?.status === 'connected' ? 'success' : state.githubTokenMeta?.status === 'revoked' ? 'error' : 'warning';
    tokenStatus.className = `status-badge ${cls}`;
    tokenStatus.textContent = state.githubTokenMeta?.status || 'disconnected';
  }

  const lastValidated = document.getElementById('token-last-validated');
  const lastUsed = document.getElementById('token-last-used');
  if (lastValidated) lastValidated.textContent = formatDate(state.githubTokenMeta?.lastValidated);
  if (lastUsed) lastUsed.textContent = formatDate(state.githubTokenMeta?.lastUsed);
}

function renderProfileView() {
  renderIdentitySection();
  renderTechnicalStatus();
  renderTokenCard();
}

function renderAll() {
  renderRoutes();
  renderLabs();
  renderStats();
  renderRanking();
  renderProfileView();
}

function switchView(view) {
  state.activeView = view;
  const dashboard = document.getElementById('dashboard-view');
  const profile = document.getElementById('profile-view');
  const navDashboard = document.getElementById('nav-dashboard');
  const navProfile = document.getElementById('nav-profile');
  if (dashboard) dashboard.classList.toggle('hidden', view !== 'dashboard');
  if (profile) profile.classList.toggle('hidden', view !== 'profile');
  if (navDashboard) navDashboard.classList.toggle('active', view === 'dashboard');
  if (navProfile) navProfile.classList.toggle('active', view === 'profile');
}

function showValidationMessage(type, message) {
  const box = document.getElementById('validation-message');
  box.className = `status-box ${type}`;
  box.textContent = message;
}

async function validatePullRequest(lab, rules) {
  const prs = await fetchPullRequestsForLab(lab.repo, state.githubToken);
  const githubLogin = (state.githubUser || state.githubHandle || state.currentUser || '').toLowerCase();
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
    updateDetailStatus(lab.id);
    return;
  }

  if (lab.requiresGithub && !state.githubToken) {
    pendingVerificationLabId = lab.id;
    showGithubConnect();
    return showValidationMessage('info', 'Conecta GitHub para validar este Lab con tu PR.');
  }

  if (lab.requiresGithub && state.githubToken) {
    recordTokenUsage();
    state.githubTokenMeta = { ...state.githubTokenMeta, lastUsed: new Date().toISOString(), status: 'connected' };
  }

  state.checking = true;
  document.getElementById('verify-btn').disabled = true;
  showValidationMessage('info', 'Consultando GitHub y reglas del Lab...');
  state.progress[lab.id] = { status: 'checking' };
  saveProgress();
  renderStats();
  updateDetailStatus(lab.id);

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
      updateDetailStatus(lab.id);
    } else {
      state.progress[lab.id] = { status: 'pending' };
      recordLabProgress(lab.id, state.progress[lab.id]);
      saveProgress();
      renderStats();
      showValidationMessage('error', validation.reason);
      updateDetailStatus(lab.id);
    }
  } catch (err) {
    state.progress[lab.id] = { status: 'pending' };
    recordLabProgress(lab.id, state.progress[lab.id]);
    saveProgress();
    renderStats();
    showValidationMessage('error', err.message || 'Error al verificar PR');
    updateDetailStatus(lab.id);
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
  if (!profile.displayName) {
    updateIdentity({ displayName: alias });
  }
  const refreshed = getActiveProfile();
  syncStateWithProfile(refreshed, alias);
  hideLogin();
  switchView('dashboard');
  renderAll();
}

async function handleGithubConnect(event) {
  event.preventDefault();
  const token = document.getElementById('github-token').value.trim();
  if (!token) return;
  try {
    const data = await fetchGithubUser(token);
    const updatedProfile = setGithubCredentials(token, data.login);
    state.githubToken = token;
    state.githubUser = data.login;
    state.githubTokenMeta = updatedProfile.githubTokenMeta || state.githubTokenMeta;
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

async function handleProfileTokenSubmit(event) {
  event.preventDefault();
  const token = document.getElementById('profile-token').value.trim();
  if (!token) return;
  try {
    const data = await fetchGithubUser(token);
    const updatedProfile = setGithubCredentials(token, data.login);
    state.githubToken = token;
    state.githubUser = data.login;
    state.githubTokenMeta = updatedProfile.githubTokenMeta || state.githubTokenMeta;
    renderProfileView();
    showProfileMessage('success', 'GitHub conectado. Usaremos solo permisos de lectura para validar PRs.');
  } catch (error) {
    showProfileMessage('error', error.message || 'Token inválido o sin permisos.');
  }
}

function handleTokenRevoke() {
  clearGithubCredentials();
  state.githubToken = null;
  state.githubUser = null;
  state.githubTokenMeta = { status: 'revoked', last4: null, lastValidated: null, lastUsed: null };
  renderProfileView();
  showProfileMessage('info', 'Acceso revocado. Podrás conectar GitHub cuando un Lab lo requiera.');
}

function handleIdentitySave(event) {
  event.preventDefault();
  const displayName = document.getElementById('profile-name').value.trim();
  const githubHandle = document.getElementById('profile-handle').value.trim();
  const role = document.getElementById('profile-role').value.trim();
  updateIdentity({ displayName, githubHandle, role });
  state.displayName = displayName || state.currentUser;
  state.githubHandle = githubHandle;
  state.role = role;
  renderProfileView();
  renderStats();
  showProfileMessage('success', 'Identidad actualizada.');
}

function handleLogout() {
  clearGithubCredentials();
  clearActiveProfile();
  state.currentUser = null;
  state.displayName = '';
  state.role = '';
  state.githubHandle = '';
  state.currentProfile = null;
  state.githubToken = null;
  state.githubUser = null;
  state.githubTokenMeta = { status: 'disconnected', last4: null, lastValidated: null, lastUsed: null };
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

  const navDashboard = document.getElementById('nav-dashboard');
  const navProfile = document.getElementById('nav-profile');
  if (navDashboard) navDashboard.addEventListener('click', () => switchView('dashboard'));
  if (navProfile)
    navProfile.addEventListener('click', () => {
      window.location.href = 'perfil.html';
    });

  const identityForm = document.getElementById('identity-form');
  if (identityForm) identityForm.addEventListener('submit', handleIdentitySave);

  const tokenForm = document.getElementById('profile-token-form');
  if (tokenForm) tokenForm.addEventListener('submit', handleProfileTokenSubmit);

  const revokeBtn = document.getElementById('revoke-token-btn');
  if (revokeBtn) revokeBtn.addEventListener('click', handleTokenRevoke);
}

setupEvents();
loadSession();
loadRoutes();
