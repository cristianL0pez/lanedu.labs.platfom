function buildHeaders(token) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchGithubUser(token) {
  const response = await fetch('https://api.github.com/user', {
    headers: buildHeaders(token)
  });
  if (!response.ok) throw new Error('Token inválido o sin permisos.');
  return response.json();
}

export async function fetchRulesDefinition(repo) {
  const url = `https://raw.githubusercontent.com/${repo}/main/.lanedu/rules.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('No se encontró rules.json en el repo del Lab');
  return response.json();
}

export async function fetchPullRequestsForLab(repo, token) {
  const response = await fetch(`https://api.github.com/repos/${repo}/pulls?state=all&per_page=50`, {
    headers: buildHeaders(token)
  });
  if (!response.ok) throw new Error('No se pudieron leer los Pull Requests.');
  return response.json();
}

export async function fetchFilesForPR(repo, prNumber, token) {
  const response = await fetch(`https://api.github.com/repos/${repo}/pulls/${prNumber}/files?per_page=100`, {
    headers: buildHeaders(token)
  });
  if (!response.ok) throw new Error('No se pudieron leer los archivos del PR.');
  return response.json();
}

export async function fetchRepoMetadata(fullName, token) {
  const response = await fetch(`https://api.github.com/repos/${fullName}`, {
    headers: buildHeaders(token)
  });
  if (!response.ok) throw new Error('No se pudo leer el repositorio indicado.');
  return response.json();
}

export async function fetchRepoFile(fullName, path, token) {
  const response = await fetch(`https://api.github.com/repos/${fullName}/contents/${path}`, {
    headers: buildHeaders(token)
  });
  if (!response.ok) throw new Error(`Archivo requerido no encontrado: ${path}`);
  return response.json();
}

export async function fetchCommits(fullName, params = {}, token) {
  const url = new URL(`https://api.github.com/repos/${fullName}/commits`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  const response = await fetch(url.toString(), { headers: buildHeaders(token) });
  if (!response.ok) throw new Error('No se pudieron leer los commits.');
  return response.json();
}

export async function fetchBranches(fullName, token) {
  const response = await fetch(`https://api.github.com/repos/${fullName}/branches?per_page=100`, {
    headers: buildHeaders(token)
  });
  if (!response.ok) throw new Error('No se pudieron leer las ramas.');
  return response.json();
}
