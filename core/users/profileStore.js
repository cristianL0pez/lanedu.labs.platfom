import { STORAGE_KEYS, LEGACY_STORAGE_KEYS } from '../../config/constants.js';

const baseProfile = (alias) => ({
  alias,
  githubToken: null,
  githubUser: null,
  progress: {},
  status: 'new'
});

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
  const fromLegacy = profiles[legacyAlias] || baseProfile(legacyAlias);
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
  return loadProfiles();
}

export function ensureProfile(alias) {
  if (!alias) return null;
  const profiles = loadProfiles();
  if (!profiles[alias]) {
    profiles[alias] = baseProfile(alias);
    persistProfiles(profiles);
  }
  return profiles[alias];
}

export function getActiveProfile() {
  const alias = getActiveProfileAlias();
  if (!alias) return null;
  const profiles = loadProfiles();
  if (!profiles[alias]) {
    profiles[alias] = baseProfile(alias);
    persistProfiles(profiles);
  }
  return profiles[alias];
}

function updateProfile(alias, updater) {
  if (!alias) return null;
  const profiles = loadProfiles();
  const current = profiles[alias] || baseProfile(alias);
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
  return updateActiveProfile((profile) => ({
    githubToken: token,
    githubUser: username || profile.githubUser,
    status: profile.status === 'new' ? 'active' : profile.status
  }));
}

export function clearGithubCredentials() {
  return updateActiveProfile((profile) => ({ githubToken: null, githubUser: null }));
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

export function clearActiveProfile() {
  setActiveProfileAlias(null);
}
