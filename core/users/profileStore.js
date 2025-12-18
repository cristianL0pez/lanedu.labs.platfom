import { STORAGE_KEYS, LEGACY_STORAGE_KEYS } from '../../config/constants.js';

const baseProfile = (alias) => ({
  alias,
  displayName: '',
  email: '',
  role: '',
  githubHandle: '',
  githubToken: null,
  githubTokenMeta: { status: 'disconnected', last4: null, lastValidated: null, lastUsed: null },
  githubUser: null,
  progress: {},
  status: 'new',
  auth: { provider: null, secret: null }
});

function normalizeProfile(profile, alias) {
  if (!profile) return baseProfile(alias);
  return {
    ...baseProfile(profile.alias || alias),
    ...profile,
    githubTokenMeta: {
      ...baseProfile(alias).githubTokenMeta,
      ...(profile.githubTokenMeta || {})
    }
  };
}

function loadProfiles() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles) || '{}');
}

function persistProfiles(profiles) {
  localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles));
}

export function migrateLegacyProfiles() {
  const legacyAlias = localStorage.getItem(LEGACY_STORAGE_KEYS.user);
  if (!legacyAlias) return null;

  const profiles = loadProfiles();
  const legacyProgress = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEYS.progress) || '{}');
  const fromLegacy = normalizeProfile(profiles[legacyAlias], legacyAlias);
  fromLegacy.progress = legacyProgress[legacyAlias] || {};
  fromLegacy.githubToken = localStorage.getItem(LEGACY_STORAGE_KEYS.token) || null;
  fromLegacy.githubUser = localStorage.getItem(LEGACY_STORAGE_KEYS.githubUser) || null;
  fromLegacy.status = fromLegacy.status || 'active';
  profiles[legacyAlias] = fromLegacy;
  persistProfiles(profiles);
  setActiveProfileAlias(legacyAlias);

  Object.values(LEGACY_STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  return fromLegacy;
}

export function getActiveProfileAlias() {
  return localStorage.getItem(STORAGE_KEYS.activeProfile);
}

export function setActiveProfileAlias(alias) {
  if (alias) {
    localStorage.setItem(STORAGE_KEYS.activeProfile, alias);
  } else {
    localStorage.removeItem(STORAGE_KEYS.activeProfile);
  }
}

export function getAllProfiles() {
  const profiles = loadProfiles();
  Object.keys(profiles).forEach((key) => {
    profiles[key] = normalizeProfile(profiles[key], key);
  });
  return profiles;
}

export function ensureProfile(alias) {
  if (!alias) return null;
  const profiles = loadProfiles();
  if (!profiles[alias]) {
    profiles[alias] = baseProfile(alias);
  } else {
    profiles[alias] = normalizeProfile(profiles[alias], alias);
  }
  persistProfiles(profiles);
  return profiles[alias];
}

export function getActiveProfile() {
  const alias = getActiveProfileAlias();
  if (!alias) return null;
  const profiles = loadProfiles();
  if (!profiles[alias]) {
    profiles[alias] = baseProfile(alias);
  } else {
    profiles[alias] = normalizeProfile(profiles[alias], alias);
  }
  persistProfiles(profiles);
  return profiles[alias];
}

function updateProfile(alias, updater) {
  if (!alias) return null;
  const profiles = loadProfiles();
  const current = normalizeProfile(profiles[alias], alias);
  const updated = { ...current, ...updater(current) };
  profiles[alias] = updated;
  persistProfiles(profiles);
  return updated;
}

export function updateActiveProfile(updater) {
  const alias = getActiveProfileAlias();
  if (!alias) return null;
  return updateProfile(alias, updater);
}

export function setGithubCredentials(token, username) {
  const last4 = token ? token.slice(-4) : null;
  const encoded = token ? btoa(token) : null;
  return updateActiveProfile((profile) => ({
    githubToken: encoded,
    githubTokenMeta: {
      ...profile.githubTokenMeta,
      status: token ? 'connected' : 'disconnected',
      last4,
      lastValidated: token ? new Date().toISOString() : null,
      lastUsed: token ? new Date().toISOString() : null
    },
    githubUser: username || profile.githubUser,
    status: profile.status === 'new' ? 'active' : profile.status
  }));
}

export function clearGithubCredentials() {
  return updateActiveProfile((profile) => ({
    githubToken: null,
    githubUser: null,
    githubTokenMeta: { status: 'revoked', last4: null, lastValidated: null, lastUsed: null }
  }));
}

export function saveProgress(progress) {
  return updateActiveProfile((profile) => ({ progress, status: 'active' }));
}

export function recordLabProgress(labId, payload) {
  return updateActiveProfile((profile) => ({
    progress: { ...profile.progress, [labId]: payload },
    status: profile.status || 'active'
  }));
}

export function updateIdentity(payload) {
  return updateActiveProfile((profile) => ({
    displayName: payload.displayName ?? profile.displayName,
    email: payload.email ?? profile.email,
    role: payload.role ?? profile.role,
    githubHandle: payload.githubHandle ?? profile.githubHandle,
    githubUser: payload.githubUser ?? profile.githubUser,
    status: profile.status || 'active'
  }));
}

export function setAccountCredentials(payload) {
  const secret = payload.password ? btoa(payload.password) : null;
  return updateActiveProfile((profile) => ({
    email: payload.email ?? profile.email,
    auth: {
      provider: secret ? 'local' : profile.auth?.provider || null,
      secret: secret ?? profile.auth?.secret ?? null
    },
    status: 'active'
  }));
}

export function recordTokenUsage() {
  return updateActiveProfile((profile) => ({
    githubTokenMeta: { ...profile.githubTokenMeta, lastUsed: new Date().toISOString(), status: 'connected' }
  }));
}

export function clearActiveProfile() {
  setActiveProfileAlias(null);
}
