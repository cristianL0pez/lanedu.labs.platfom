export async function fetchGithubUser(token) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
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
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  if (!response.ok) throw new Error('No se pudieron leer los Pull Requests.');
  return response.json();
}

export async function fetchFilesForPR(repo, prNumber, token) {
  const response = await fetch(
    `https://api.github.com/repos/${repo}/pulls/${prNumber}/files?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json'
      }
    }
  );
  if (!response.ok) throw new Error('No se pudieron leer los archivos del PR.');
  return response.json();
}
