# Ruta 0 · Validación automática progresiva (propuesta)

Diseño para mantener la arquitectura actual (Labs con repos base y rules.json) agregando validaciones automáticas y declarativas por Lab sin romper el flujo existente. Solo LAB-00 sigue siendo manual; el resto se valida mediante datos de perfil o GitHub, solicitando token solo cuando el Lab lo requiere.

## Resumen de reglas por Lab

| Lab | Tipo de validación | Qué se valida | Qué NO se valida | Token requerido |
| --- | --- | --- | --- | --- |
| LAB-00 | manual | El usuario confirma creación de cuenta GitHub y 2FA. | Repos, PRs, token, commits. | No |
| LAB-01 | profile-check | Campos de perfil LANEDU: nombre visible, username GitHub, URL perfil, rol/objetivo. | Existencia real del repo, token, commits. | No |
| LAB-02 | repo-existence | Repo público con nombre exacto definido; contiene README.md y LICENSE. | Historial de commits, mensajes. | No (API pública) |
| LAB-03 | commit-history | Repo existe; ≥2 commits; mensajes siguen patrón `(feat|fix|chore):`. | Calidad de código, CI, PR. | No (API pública) |
| LAB-04 | push | Último commit posterior a la fecha de inicio del Lab; rama principal actualizada. | Mensajes, CI, PR. | No (API pública) |
| LAB-05 | branch | Repo con al menos una rama ≠ main; commits presentes en esa rama. | Estrategia de merge/rebase, CI. | No (API pública) |
| LAB-06 | fork | Repo forkeado; relación fork → upstream configurada. | Calidad de código, CI. | No (API pública) |
| LAB-07 | pull-request | PR abierto o mergeado; título cumple patrón; archivos requeridos modificados. | Contenido del código, CI. | Sí (solo aquí) |

## Mecanismo y endpoints sugeridos

- **manual**: marcado en UI, sin llamadas externas.
- **profile-check**: lectura de `profileStore` (campos `displayName`, `githubHandle`, `githubUrl`, `role`).
- **repo-existence**: `GET https://api.github.com/repos/{owner}/{repo}` y `GET .../contents/README.md`, `LICENSE` (sin token si el repo es público).
- **commit-history**: `GET .../commits?per_page=10` para contar y evaluar prefijos de mensaje; sin token mientras no haya rate limit.
- **push**: `GET .../commits?per_page=1` y comparación de `commit.author.date` contra `labStartDate` guardada en progreso.
- **branch**: `GET .../branches` y `GET .../commits?sha={branch}` para verificar actividad en ramas distintas a main.
- **fork**: `GET .../repos/{owner}/{repo}` para chequear `fork: true` y `parent.full_name`; opcional `GET .../compare/{parent}/{default_branch}...{fork}/{default_branch}` para frescura.
- **pull-request**: `GET .../pulls?state=all&head={user}:{branch}` filtrando por autor y `titleIncludes`; `GET .../pulls/{number}/files` para archivos requeridos. Usa token por requerir autenticación estable y scopes `repo:read`.

## Requerimiento de token

- Solo **LAB-07** solicita token GitHub. Al entrar a la validación se muestra: “Este Lab requiere conectar tu cuenta GitHub para validación automática.”
- Si no hay token, la UI debe ofrecer conectar/revalidar sin bloquear Labs previos.
- Token se almacena cifrado en el perfil y solo se muestra con los últimos 4 caracteres.

## Ajustes mínimos en rules.json (compatibles)

Agregar campos opcionales bajo la clave existente (sin romper compatibilidad):
```json
{
  "lab_id": "LAB-03",
  "validation": {
    "type": "commit-history",
    "required_commits": 2,
    "message_pattern": "^(feat|fix|chore):"
  },
  "required_files": ["README.md", "LICENSE"],
  "min_changed_files": 1,
  "pr_title_contains": "LAB-03"
}
```
- `validation.type` indica la estrategia (manual, profile-check, repo-existence, commit-history, push, branch, fork, pull-request, automatic).
- Para Labs sin PR, se ignoran `pr_title_contains` y `min_changed_files` si no aplican.
- Labs con PR mantienen los campos actuales (`required_files`, `pr_title_contains`) y añaden `validation.type: "pull-request"`.

## Compatibilidad y comportamiento

- No se modifican rutas ni desbloqueos existentes: Ruta 0 sigue siendo obligatoria, y las demás rutas solo se desbloquean al completarla.
- La arquitectura de validación por PR permanece para los Labs que lo necesitan; se extiende con verificaciones declarativas que pueden consultarse vía GitHub API pública.
- Sin token: el usuario puede completar LAB-00 a LAB-06 usando validaciones basadas en perfil o API pública. LAB-07 pide token justo antes de validar.
- Mensajería sugerida en UI: “La conexión GitHub se solicita únicamente en Labs que la requieren. Para este Lab: {{state}}.”
