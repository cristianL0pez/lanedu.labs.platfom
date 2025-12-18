# Diseño de Perfil y Ruta 0 (Onboarding Git + GitHub)

## 1. Pantalla de Perfil (nueva, separada del flujo de Labs)
- **Nombre visible** (texto libre, requerido).
- **Rol / objetivo** (opcional, sugerencias: DevOps, Backend, Data, SecOps).
- **Enlace a GitHub** (username o URL; se valida formato básico, no bloquea flujo de Labs).
- **Estado de token GitHub**: `no conectado`, `conectado`, `permiso insuficiente`.
- **Token GitHub (OAuth o PAT)**: input seguro, se almacena cifrado en localStorage (solo huella parcial visible: últimos 4 caracteres). Acciones: `Conectar`, `Revalidar`, `Revocar`. Mensaje explícito: "Este Lab requiere acceso de solo lectura a tus repositorios".
- **Sección de razones** para el token: bullets claros de por qué se necesita (validar PRs, leer rules.json, revisar archivos) y cuándo NO se usa (navegar, labs manuales, labs de perfil).
- **UX**: pantalla full dark, tipografía principal moderna; monospace en campos/token; botones con estados: `ACCESS GRANTED` (verde), `TOKEN REQUIRED` (cian), `REVOKED` (gris). Mensajes estilo terminal: "INITIALIZING PROFILE...", "TOKEN STORED (HASHED)", "REVALIDATION NEEDED".
- **Comportamiento**:
  - La app inicia en el dashboard sin pedir token. El perfil es accesible desde una pestaña/acción "Perfil".
  - Los Labs que requieren validación automática enlazan a esta pantalla para conectar el token si falta o está inválido.
  - Revocar elimina el token cifrado pero mantiene progreso y datos del perfil.
  - Revalidar vuelve a solicitar autorización y actualiza el estado.

## 2. Sistema de validaciones flexible (metadata por Lab)
Cada Lab define `validationType` y `validationRules` (objeto simple) sin modificar la arquitectura actual.

Tipos soportados y ejemplos de reglas:
- **manual**: `checklist` (array de ítems confirmables por el usuario).
- **profile-check**: `fieldsRequired` (ej: [`githubHandle`]), `notes` sobre lo que NO se valida.
- **repo-existence**: `repoName`, `mustBePrivate` (bool), `requiredFiles` (opc.).
- **repo-link**: `urlPattern`, `requiredFiles`, `notes`.
- **file-existence**: `repoName`, `filePath`, `branch`.
- **commit-history**: `repoName`, `minCommits`, `messagePattern` opcional.
- **push**: `repoName`, `branch`, `requiresRemote` (true) para confirmar que hay commits enviados.
- **branch**: `repoName`, `branchName`, `requiresMerge` (bool) para validar workflow básico.
- **fork**: `upstreamRepo`, `forkName`, `requiresSync` opcional.
- **pull-request**: `upstreamRepo`, `prTitleContains`, `requiredFiles`, `minChangedFiles` (usa rules.json existente).
- **automatic**: requiere token; `scopesNeeded`, `validationScript` o reglas de lectura GitHub (solo lectura para MVP).

Reglas clave:
- Cada Lab declara explícitamente **qué valida** y **qué NO valida** (ej: no se revisa estilo de código, no se evalúa contenido de README), para transparencia al usuario.
- Labs sin token deben operar con validaciones que el usuario pueda confirmar o que dependan de datos públicos.
- Labs con token solo bloquean la verificación automática, nunca la navegación ni el onboarding.

## 3. Nueva Ruta 0 (Onboarding Git + GitHub) con validaciones progresivas
- **Principio**: una responsabilidad nueva por Lab. El token se introduce solo en el último Lab.
- **Estructura**: 10 Labs (00 a 09), cada uno con objetivo, historia >500 caracteres, tipo y reglas de validación.

### Lab 00 — "Primer día en ACME Tech"
- **Objetivo**: Entender el contexto de la empresa y aceptar el onboarding. Confirmar checklist inicial.
- **Tipo de validación**: `manual` (checklist personal).
- **Qué valida**: que el usuario leyó la guía de acceso, firmó NDA ficticio y configuró su equipo básico.
- **Qué NO valida**: no revisa cuentas ni repos.
- **Historia** (≈560+ caracteres): Roberto, tu jefe técnico en ACME Tech, te da la bienvenida a tu primer día. Te explica que el equipo está migrando a un modelo de trabajo distribuido y que la empresa confía en la autonomía del equipo para mantener la seguridad y la trazabilidad de los cambios. Antes de tocar código, debes asegurarte de tener tu equipo listo: acceso a correo corporativo, cliente Git instalado, llaves SSH generadas y un espacio de notas para documentar cada paso. Roberto recalca que este onboarding imita el rigor de un equipo de producción: nadie avanzará por ti y cada decisión quedará registrada. Tu tarea es confirmar que entendiste las reglas, que leíste el manual interno y que estás listo para recibir las siguientes misiones. Marca tu checklist con honestidad: aquí comienza tu reputación en el equipo.

### Lab 01 — "Identidad técnica"
- **Objetivo**: Registrar tu identidad profesional en la plataforma y vincular tu handle de GitHub (sin token).
- **Tipo de validación**: `profile-check`.
- **Qué valida**: que guardaste nombre visible y handle/URL de GitHub en el Perfil.
- **Qué NO valida**: no revisa token ni repos.
- **Historia** (≈520+ caracteres): Roberto te pide construir tu ficha técnica. ACME Tech trabaja con equipos distribuidos y los líderes quieren saber quién es quién antes de asignar tareas sensibles. Necesitan un nombre visible consistente, un rol u objetivo que refleje tus intereses y un identificador público en GitHub para rastrear tu trabajo abierto. Aún no se exige token ni acceso a repos; solo se espera que declares tu identidad con precisión. Roberto te recuerda que en incidentes reales, la trazabilidad inicia con saber quién hizo qué y por qué. Completar este paso te hará parte del directorio interno del equipo y desbloqueará instrucciones más prácticas.

### Lab 02 — "Tu primer repositorio propio"
- **Objetivo**: Crear un repo personal llamado `lanedu-onboarding` en tu espacio.
- **Tipo de validación**: `repo-existence`.
- **Qué valida**: existencia del repo con nombre exacto y README.md inicial.
- **Qué NO valida**: contenido del README ni configuración avanzada.
- **Historia** (≈540+ caracteres): Roberto te asigna una tarea sencilla pero simbólica: crear tu primer repositorio en tu espacio personal llamado `lanedu-onboarding`. El equipo quiere ver que sabes moverte en la consola o en la UI de GitHub para crear proyectos desde cero. Debes incluir un README.md que explique el propósito del repo: documentar tu viaje de onboarding. Roberto aclara que, en ACME Tech, todos los experimentos empiezan con un repo explícito para garantizar orden y propiedad. Este paso comprueba que puedes levantar infraestructura mínima sin depender de plantillas ni de otros compañeros. No necesitas token aún; todo es público y visible.

### Lab 03 — "Evidencias de archivos"
- **Objetivo**: Añadir un archivo `evidencias/proof.txt` al repo `lanedu-onboarding`.
- **Tipo de validación**: `file-existence`.
- **Qué valida**: presencia del archivo en la rama principal.
- **Qué NO valida**: contenido del archivo.
- **Historia** (≈520+ caracteres): Tras crear el repo, Roberto quiere saber si puedes estructurar evidencias. En ACME Tech, los auditores piden rastros mínimos en carpetas estándar. Debes crear un directorio `evidencias/` y dentro un `proof.txt` con notas de lo que configuraste. No revisarán el texto, solo la existencia y ubicación. Esta tarea reproduce cómo los equipos devops demuestran pasos críticos sin depender de memoria. Con esto, Roberto evalúa tu disciplina para mantener orden desde el inicio y preparar el terreno para revisiones futuras. Aún no necesitas token: el repositorio es tuyo y público.

### Lab 04 — "Commits con intención"
- **Objetivo**: Registrar al menos 3 commits con mensajes claros en `lanedu-onboarding`.
- **Tipo de validación**: `commit-history`.
- **Qué valida**: mínimo 3 commits y mensajes descriptivos (no genéricos tipo "update").
- **Qué NO valida**: estilo de código o contenido exacto.
- **Historia** (≈540+ caracteres): Roberto revisa tu historial y detecta que muchos novatos hacen commits masivos y crípticos. En ACME Tech, cada cambio debe contar una historia breve: qué hiciste y por qué. Tu tarea es realizar al menos tres commits separados, cada uno con un mensaje que explique claramente la intención (ej: "Agrega check de prerequisitos en README" o "Documenta setup SSH"). No importa si los cambios son pequeños; importa que sean atómicos y legibles. Este ejercicio imita revisiones de auditoría y facilita revertir o cherry-pickear cambios. Sin token todavía: todo ocurre en tu repo local/remoto controlado por ti.

### Lab 05 — "Push de confianza"
- **Objetivo**: Empujar los commits a remoto en la rama `main` de `lanedu-onboarding`.
- **Tipo de validación**: `push`.
- **Qué valida**: que los commits estén en remoto (comparando contra el repo público).
- **Qué NO valida**: políticas de protección ni pipelines.
- **Historia** (≈520+ caracteres): Roberto te llama porque, aunque tus commits son buenos, el equipo no puede verlos si no viven en remoto. En ACME Tech, la regla es clara: "si no está en remoto, no existe". Debes configurar correctamente el remoto (HTTPS o SSH) y hacer push de tu historial a `main`. Esto comprueba que entiendes autenticación básica con GitHub y que tus credenciales locales funcionan. El equipo de observabilidad busca este hábito para evitar pérdida de trabajo y para habilitar revisiones asíncronas. Todavía no necesitas token en la plataforma, porque el repo es tuyo y público.

### Lab 06 — "Ramas con propósito"
- **Objetivo**: Crear y usar una rama de feature (ej: `feature/docs`) y fusionarla a `main`.
- **Tipo de validación**: `branch`.
- **Qué valida**: existencia de la rama, al menos un commit en ella y merge hacia `main`.
- **Qué NO valida**: estrategia de merge (fast-forward vs merge commit) ni CI.
- **Historia** (≈540+ caracteres): Roberto prepara tu siguiente evaluación: demostrar que entiendes el flujo de ramas. En ACME Tech, ningún cambio significativo va directo a `main`. Debes crear una rama de feature, realizar al menos un commit allí y luego integrarla de vuelta a `main` con un merge limpio. Esto simula revisiones internas y te obliga a manejar divergencias simples. El objetivo es comprobar que puedes aislar trabajo, probarlo y consolidarlo sin romper la línea principal. Todavía no requerimos token: trabajas en tu propio repo y con permisos completos.

### Lab 07 — "Fork y upstream"
- **Objetivo**: Forquear el repo oficial `lanedu-org/lanedu-lab-01-backup-logs` y sincronizarlo.
- **Tipo de validación**: `fork`.
- **Qué valida**: existencia del fork en tu espacio y, opcionalmente, que hiciste `sync` con upstream.
- **Qué NO valida**: contenido de cambios.
- **Historia** (≈560+ caracteres): Roberto te asigna tu primera tarea colaborativa real. El equipo mantiene un repositorio base `lanedu-org/lanedu-lab-01-backup-logs` y necesitas crear tu fork para trabajar sin permisos directos. Debes asegurarte de que tu fork existe y que puedes sincronizarlo con upstream. Esta dinámica refleja el modelo interno de ACME Tech para contribuciones de contratistas: no se escribe en el repo central hasta pasar revisiones. Con este ejercicio se mide que dominas las relaciones upstream/fork, algo crítico cuando varios equipos colaboran sin acceso directo. Todavía no necesitas token en la plataforma; el fork es visible públicamente.

### Lab 08 — "Pull Request profesional"
- **Objetivo**: Crear un PR desde tu fork hacia `lanedu-org/lanedu-lab-01-backup-logs` con título que incluya `LAB-08` y al menos un archivo modificado requerido por rules.json.
- **Tipo de validación**: `pull-request`.
- **Qué valida**: existencia del PR (abierto o mergeado) con título correcto y archivos requeridos.
- **Qué NO valida**: calidad del código o pipelines.
- **Historia** (≈560+ caracteres): Roberto ahora quiere ver tu capacidad de colaboración formal. Debes preparar cambios en tu fork y abrir un Pull Request hacia el repo oficial, respetando las reglas de título y archivos definidos en `.lanedu/rules.json`. El propósito es simular una entrega real con criterios mínimos de revisión. El equipo de ACME Tech utiliza estos PRs para auditar trazabilidad y asegurar que cada contribución sigue el estándar interno. Este paso te coloca en el ciclo de revisión usado en producción. Aún no es necesario el token dentro de la plataforma porque el PR puede verificarse de forma pública.

### Lab 09 — "Validación automática y credenciales"
- **Objetivo**: Conectar tu token GitHub en la pantalla de Perfil y superar la validación automática del lab (lectura de PR y archivos requeridos).
- **Tipo de validación**: `automatic` (requiere token).
- **Qué valida**: token con scopes de solo lectura, PR válido según rules.json y archivos requeridos; permite revalidar.
- **Qué NO valida**: ejecución de código ni CI/CD.
- **Historia** (≈600+ caracteres): Roberto prepara el cierre del onboarding con un ejercicio idéntico al que usa ACME Tech para dar accesos productivos. Debes conectar tu token GitHub desde la pantalla de Perfil, permitiendo solo permisos de lectura. Con ese token, la plataforma validará automáticamente tu Pull Request y verificará los archivos definidos en `.lanedu/rules.json`. La narrativa: has completado todo el flujo manual, pero en la empresa real la automatización asegura cumplimiento continuo. Roberto necesita confirmar que puedes operar con credenciales personales de forma segura, revocar y revalidar cuando cambian tus permisos. Este paso desbloquea el acceso al resto de rutas y demuestra que estás listo para interactuar con pipelines y auditorías internas.

## 4. Justificación del token al final
- El token aparece únicamente en el Lab 09 porque toda la progresión previa es pública o manual; así se elimina fricción de onboarding y se evita pedir credenciales a usuarios que aún no saben si continuarán.
- Mantener el token para el cierre reduce riesgos (se solicita cuando el usuario ya entiende el valor y el alcance de los permisos) y mantiene la plataforma navegable sin bloqueo.
- La experiencia mejora porque el usuario puede practicar todo el flujo Git sin interrupciones y solo conecta GitHub cuando necesita validación automática de PRs.
- Las rutas adicionales permanecen bloqueadas hasta completar la Ruta 0, pero no se desbloquean los Labs internos automáticamente: cada ruta sigue su progresión propia.
