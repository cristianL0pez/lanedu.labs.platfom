import { labsCatalog } from '../labs/labsCatalog.js';

function mapEntryToLab(entry) {
  if (entry.lab_key) return labsCatalog.find((l) => l.id === entry.lab_key);
  if (entry.lab_id) return labsCatalog.find((l) => l.labId === entry.lab_id);
  return null;
}

export function collectRouteLabs(route) {
  const collected = [];
  const pushLab = (entry, subroute = null) => {
    const lab = mapEntryToLab(entry);
    if (lab) {
      collected.push({ lab, meta: { ...entry, subroute } });
    }
  };

  (route.labs || []).forEach((labEntry) => pushLab(labEntry));
  (route.subroutes || []).forEach((sub) => (sub.labs || []).forEach((labEntry) => pushLab(labEntry, sub.name)));

  return collected.sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0));
}

export function hydrateRouteRepos(routes) {
  routes.forEach((route) => {
    const syncRepo = (entry) => {
      const lab = mapEntryToLab(entry);
      if (lab && entry.repo) {
        lab.repo = entry.repo;
      }
    };
    (route.labs || []).forEach(syncRepo);
    (route.subroutes || []).forEach((sub) => (sub.labs || []).forEach(syncRepo));
  });
  return routes;
}

export async function loadRoutesCatalog() {
  const response = await fetch('routes/routes.json');
  const data = await response.json();
  const routes = data.routes || [];
  hydrateRouteRepos(routes);
  return routes;
}

export function findRouteForLab(labId, routes) {
  return routes.find((route) => collectRouteLabs(route).some(({ lab }) => lab.id === labId));
}

export function getRouteLabs(routeId, routes) {
  const route = routes.find((r) => r.id === routeId);
  if (!route) return [];
  return collectRouteLabs(route);
}

export function findLabForRouteEntry(entry) {
  return mapEntryToLab(entry);
}
