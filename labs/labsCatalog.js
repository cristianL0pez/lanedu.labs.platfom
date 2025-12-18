export const labsCatalog = [
  {
    id: 'gh-lab0',
    labId: 'LAB-00',
    title: 'Crear cuenta GitHub y presentarte',
    level: 'Beginner',
    xp: 40,
    repo: 'lanedu-org/lanedu-lab-00-github-account',
    story: `Es tu primer día en ACME Tech. Llegas con el pase temporal y Roberto, tu jefe técnico, te recuerda que sin identidad clara no hay acceso a los repos ni a las salas de incidentes. Necesitan saber quién eres antes de asignarte tareas: una cuenta de GitHub con 2FA, foto profesional y bio con tu enfoque. No se revisa código aquí; se valida que puedas pararte frente al equipo como alguien confiable. Imagina que luego usarán tu cuenta para asignarte tickets, revisar PRs y darte permisos. Si fallas, seguirás como visitante, sin teclado dedicado ni onboarding real. Tómalo como la puerta de entrada a una empresa que exige orden desde el minuto uno.`,
    objective:
      'Abrir una cuenta de GitHub con 2FA, foto profesional y bio que indique tu rol objetivo. Deja la URL lista.',
    validation: {
      type: 'manual',
      requiresToken: false,
      criteria: { checklist: ['Cuenta activa', '2FA habilitado', 'Bio y foto listas'] },
      exclusions: ['No se revisa código ni PR.']
    },
    validationType: 'manual',
    validationRules: { type: 'manual', checklist: ['Cuenta activa', '2FA habilitado', 'Bio y foto listas'] },
    validationChecks: [
      'Cuenta creada con usuario profesional y foto.',
      '2FA habilitado y documentado.',
      'Bio con tu foco y enlace público.'
    ],
    validationExclusions: ['No se revisa código ni PR.'],
    rules: [
      'Anota tu URL de perfil.',
      'Habilita 2FA antes de continuar.',
      'Este Lab se marca manualmente (sin token).'
    ],
    deliverable: 'Checklist completado y perfil listo. Marca manualmente cuando esté completo.'
  },
  {
    id: 'gh-lab1',
    labId: 'LAB-01',
    title: 'Identidad interna y rol',
    level: 'Beginner',
    xp: 50,
    repo: 'lanedu-org/lanedu-lab-01-create-repo',
    story: `Roberto te presenta al equipo por chat corporativo. Antes de darte acceso a las máquinas de staging, te pide completar tu ficha interna: nombre visible, objetivo profesional y cómo encontrarte en GitHub. El equipo de SRE y seguridad automatiza permisos leyendo estos datos; si están incompletos, tu usuario queda en modo “solo lectura” y no podrás avanzar a las siguientes rutas. En ACME Tech, mostrar tu objetivo (Frontend, DevOps, Data) ayuda a asignarte pares de apoyo y labs relevantes. Esta tarea simula ese paso formal: actualizar tu perfil para que las herramientas internas sepan quién eres sin pedirte el token todavía.`,
    objective: 'Completar tu perfil interno con nombre visible, username/URL GitHub y rol u objetivo.',
    validation: {
      type: 'profile-check',
      requiresToken: false,
      criteria: { requiredFields: ['displayName', 'githubHandle', 'githubUrl', 'role'] },
      exclusions: ['No se valida PR ni repos aún.']
    },
    validationType: 'profile-check',
    validationRules: { type: 'profile-check', requiredFields: ['displayName', 'githubHandle'] },
    validationChecks: ['Nombre y GitHub configurados en el perfil.', 'Rol u objetivo declarado.', 'Sin token obligatorio.'],
    validationExclusions: ['No se valida PR ni repos aún.'],
    rules: [
      'Mantén el mismo alias en todos los sistemas.',
      'Declara un rol/objetivo claro para asignaciones.',
      'No se solicita token en este paso.'
    ],
    deliverable: 'Guarda la identidad en la página de Perfil y marca el Lab.'
  },
  {
    id: 'gh-lab2',
    labId: 'LAB-02',
    title: 'Crear un repositorio propio',
    level: 'Beginner',
    xp: 60,
    repo: 'lanedu-org/lanedu-lab-02-commits-locales',
    story: `A media mañana, Roberto te asigna tu primer entregable real: un repositorio que usarás para experimentos internos. La empresa requiere que cada repo tenga README y LICENSE antes de permitir integraciones o pipelines. No es opcional; los auditores preguntan por propiedad y propósito. Te explica que, aunque este repo es tuyo, servirá como referencia para tu madurez: nombre profesional, primer commit con mensaje comprensible y estructura mínima. En entornos corporativos, la prolijidad inicial reduce deuda futura y evita tickets de seguridad. Este lab emula esa expectativa: crea tu propio repo con orden y déjalo listo para futuras tareas.`,
    objective: 'Crear un repositorio público con nombre profesional, README y LICENSE con commit inicial.',
    validation: {
      type: 'repo-existence',
      requiresToken: false,
      criteria: {
        expectedRepoName: 'lanedu-lab-02-commits-locales',
        requiredFiles: ['README.md'],
        requirePublic: true,
        minUserCommits: 1
      },
      exclusions: ['No se valida PR ni token.']
    },
    validationType: 'repo-existence',
    validationRules: { type: 'repo-existence', requires: ['README.md'] },
    validationChecks: ['Repo creado con README y LICENSE.', 'Commit inicial visible.', 'Nombre profesional.'],
    validationExclusions: ['No se valida PR ni token.'],
    rules: ['Incluye propósito en README.', 'Primer commit con mensaje claro.', 'Sin PR todavía.'],
    deliverable: 'Repo propio listo y documentado. Marca el lab cuando exista.'
  },
  {
    id: 'gh-lab3',
    labId: 'LAB-03',
    title: 'Estructura de archivos base',
    level: 'Beginner',
    xp: 70,
    repo: 'lanedu-org/lanedu-lab-03-primer-push',
    story: `El equipo de plataforma comparte un checklist de higiene mínima: todo repo productivo debe tener README, LICENSE y un .gitignore que proteja secretos y archivos temporales. Roberto te envía un mensaje: “Antes de tocar pipelines, demuestra que sabes cuidar la casa”. Quiere ver que configuras un .gitignore acorde al stack, documentas dependencias y organizas tu repo para que otro dev pueda clonar y entender en minutos. No hay PR aún, pero sí criterio profesional: evitar subir basura, explicar qué hace el proyecto y dejar instrucciones rápidas. Este paso simula la revisión silenciosa que hace el equipo de seguridad sobre cualquier repo nuevo.`,
    objective: 'Agregar .gitignore, reforzar README con instrucciones y mantener LICENSE en tu repo personal.',
    validation: {
      type: 'commit-history',
      requiresToken: false,
      criteria: { expectedRepoName: 'lanedu-onboarding', minCommits: 2, messagePattern: '^(feat|fix|chore):' },
      exclusions: ['No se revisa contenido de código.']
    },
    validationType: 'commit-history',
    validationRules: { type: 'commit-history', minCommits: 2 },
    validationChecks: ['.gitignore alineado a tu stack.', 'README con instrucciones de uso.', 'LICENSE vigente.'],
    validationExclusions: ['No se revisa contenido de código.'],
    rules: ['Documenta por qué elegiste ese .gitignore.', 'Incluye comandos de instalación rápidos.', 'Validación manual.'],
    deliverable: 'Repo personal con archivos base listos. Marca manualmente el avance.'
  },
  {
    id: 'gh-lab4',
    labId: 'LAB-04',
    title: 'Commits con intención',
    level: 'Beginner',
    xp: 80,
    repo: 'lanedu-org/lanedu-lab-04-branches',
    story: `Roberto revisa tu historial y quiere ver disciplina. En ACME Tech, cada commit debe contar una historia pequeña y reversible. Te asigna mejorar un README y agregar un script corto, pero con commits atómicos, mensajes en formato imperativo y sin ruido. También te pide capturas de git log --oneline para probar que entendiste. El objetivo es demostrar que puedes trabajar localmente sin depender de CI, manteniendo el repo limpio y con mensajes que cualquier revisor entienda en segundos. Este paso prepara tu mente para flujos de revisión reales donde los mensajes de commit son evidencia auditada.`,
    objective: 'Generar 3 commits atómicos y legibles en tu repo personal con mensajes claros.',
    validation: {
      type: 'push',
      requiresToken: false,
      criteria: { expectedRepoName: 'lanedu-onboarding', requireBranch: true },
      exclusions: ['No se exige PR ni revisión de CI.']
    },
    validationType: 'push',
    validationRules: { type: 'push', requireBranch: true },
    validationChecks: ['Commits atómicos y en imperativo.', 'Historial limpio sin revert innecesario.', 'README actualizado.'],
    validationExclusions: ['No se exige push ni PR.'],
    rules: ['Guarda evidencia de git log.', 'Mensajes sin emojis ni ruido.', 'Validación manual.'],
    deliverable: 'Historial local documentado. Marca el lab al completar el checklist.'
  },
  {
    id: 'gh-lab5',
    labId: 'LAB-05',
    title: 'Push remoto controlado',
    level: 'Beginner',
    xp: 90,
    repo: 'lanedu-org/lanedu-lab-05-fork-upstream',
    story: `ACME Tech habilitará tu acceso a un remoto compartido. Antes, Roberto te pide demostrar que puedes hacer push sin romper main. Debes configurar origin, crear una rama feature y subirla, dejando trazabilidad del comando y resultados. Imagina que estás en guardia nocturna y no puedes fallar: el push debe ser reproducible, sin archivos enormes, y con notas claras para quien revisa. Este ejercicio es la antesala a colaborar con otros; si no puedes empujar código limpio, no te asignarán incidentes críticos.`,
    objective: 'Configurar remoto, crear rama de feature y hacer push exitoso con evidencia.',
    validation: {
      type: 'branch',
      requiresToken: false,
      criteria: { expectedRepoName: 'lanedu-onboarding', requiresMerge: true },
      exclusions: ['No se revisa CI ni PR.']
    },
    validationType: 'branch',
    validationRules: { type: 'branch', requiresMerge: true },
    validationChecks: ['Rama remota creada.', 'Push registrado con salida de consola.', 'Sin archivos binarios innecesarios.'],
    validationExclusions: ['No se revisa CI ni PR.'],
    rules: ['Captura el comando de push.', 'Documenta la rama creada.', 'Validación manual.'],
    deliverable: 'Push documentado en tu repo remoto. Marca el lab manualmente.'
  },
  {
    id: 'gh-lab6',
    labId: 'LAB-06',
    title: 'Ramas y merges sin dolor',
    level: 'Beginner',
    xp: 100,
    repo: 'lanedu-org/lanedu-lab-06-pr-valid',
    story: `El equipo de features te asigna una tarea pequeña pero sensible: crear una rama, trabajar ahí y mergear de forma limpia, dejando trazabilidad de cómo resolverías un conflicto. Roberto quiere ver que dominas git merge o rebase, que sabes proteger main y que puedes documentar decisiones. En empresas reales, los playbooks de incidentes exigen este tipo de disciplina. En este lab, simulas esa presión: haz la rama, completa el cambio, mergea con limpieza y deja notas de lo que harías si se presentara un conflicto real.`,
    objective: 'Crear una rama de feature, completar cambios y mergear a main con historial claro.',
    validation: {
      type: 'fork',
      requiresToken: false,
      criteria: { parentRepo: 'lanedu-org/lanedu-lab-06-pr-valid' },
      exclusions: ['No se exige PR externo aún.']
    },
    validationType: 'fork',
    validationRules: { type: 'fork', requiresUpstream: true },
    validationChecks: ['Rama de feature creada y mergeada.', 'Historial documentado.', 'Notas de resolución de conflictos.'],
    validationExclusions: ['No se exige PR externo aún.'],
    rules: ['Describe tu flujo en README.', 'Incluye gráfico de git log --graph.', 'Validación manual.'],
    deliverable: 'Rama mergeada con evidencia y checklist. Marca el lab manualmente.'
  },
  {
    id: 'gh-lab7',
    labId: 'LAB-07',
    title: 'Fork y upstream en producción',
    level: 'Beginner',
    xp: 110,
    repo: 'lanedu-org/lanedu-lab-07-automatic-verify',
    story: `Llega una petición de un repositorio externo crítico. Debes trabajar desde tu fork y mantenerlo sincronizado con upstream para no romper la rama principal del proveedor. Roberto quiere evidencia de que configuraste el remoto upstream, que sabes hacer fetch y rebase/merge sin dejar commits de más y que documentas el flujo para otros juniors. En la empresa, esto evita que los forks se queden obsoletos y que los PR lleguen con sorpresas. Tu misión es preparar ese flujo como si la auditoría pasara mañana.`,
    objective: 'Crear un fork, añadir remoto upstream y sincronizarlo documentando comandos.',
    validation: {
      type: 'pull-request',
      requiresToken: true,
      criteria: { titleIncludes: 'LAB-07', requiredFiles: ['README.md'] },
      exclusions: ['No se valida calidad de código ni CI.']
    },
    validationType: 'pull-request',
    validationRules: { type: 'pull-request', titleIncludes: 'LAB-07', requiredFiles: ['README.md'] },
    validationChecks: ['Fork en tu cuenta.', 'Upstream configurado y sincronizado.', 'Comandos documentados.'],
    validationExclusions: ['No se exige PR todavía.'],
    rules: ['Incluye comandos para fetch/merge.', 'Demuestra que tu fork está alineado.', 'Validación manual.'],
    deliverable: 'Fork sincronizado con upstream. Marca manualmente el avance.'
  },
  {
    id: 'gh-lab8',
    labId: 'LAB-08',
    title: 'Pull Request completo (sin token)',
    level: 'Beginner',
    xp: 125,
    repo: 'lanedu-org/lanedu-lab-08-pr-collab',
    story: `Roberto por fin te deja abrir un PR real contra un repo de ACME Tech. Quiere que demuestres el ritual completo: rama limpia, checklist de PR, título con identificador del lab y cambios mínimos que toquen los archivos correctos. Todavía no te pide token; asume que puedes abrir el PR manualmente y dejar la URL visible. La meta es entrenarte en la etiqueta de colaboración antes de pasar a automatizaciones. Si tu PR es claro, el equipo confiará en ti para incidentes nocturnos. Si es caótico, te devolverán a simulaciones.`,
    objective: 'Abrir un PR válido con título del lab y archivos requeridos modificados.',
    validation: {
      type: 'pull-request',
      requiresToken: false,
      criteria: { titleIncludes: 'LAB-08', requiredFiles: ['README.md'] },
      exclusions: ['No se valida calidad de código ni CI.']
    },
    validationType: 'pull-request',
    validationRules: { type: 'pull-request', titleIncludes: 'LAB-08', requiredFiles: ['README.md'] },
    validationChecks: ['PR abierto/mergeado con título correcto.', 'Archivos requeridos tocados.', 'Checklist de PR marcada.'],
    validationExclusions: ['No se valida calidad de código ni CI.'],
    rules: ['Sigue la plantilla de PR.', 'Toca solo archivos requeridos.', 'Token aún no obligatorio.'],
    deliverable: 'PR abierto y visible. Marca el lab tras completarlo.'
  },
  {
    id: 'gh-lab9',
    labId: 'LAB-09',
    title: 'Validación automática con token',
    level: 'Beginner',
    xp: 140,
    repo: 'lanedu-org/lanedu-lab-09-auto-verify',
    story: `Cierre del onboarding. Roberto te invita a la sala de control para mostrarte el sistema de validación automática de ACME Tech. Aquí ya no basta con decir que hiciste el PR: el sistema leerá rules.json, verificará el título, los archivos modificados y usará tu token para consultar la API. Debes conectar el token desde la nueva página de Perfil, entender que solo se usa para lectura y ejecutar un PR completo. Esta es la prueba final antes de abrirte las demás rutas. Si pasas, el resto del equipo sabe que puedes operar como miembro de guardia en escenarios reales sin que te tomen de la mano.`,
    objective:
      'Conectar tu token desde el Perfil, abrir un PR cumpliendo rules.json y validar automáticamente con el sistema.',
    validation: {
      type: 'automatic',
      requiresToken: true,
      criteria: { titleIncludes: 'LAB-09', requiredFiles: ['.lanedu/rules.json'] },
      exclusions: ['No se ejecuta código ni CI.']
    },
    validationType: 'automatic',
    validationRules: { type: 'automatic', titleIncludes: 'LAB-09', requiredFiles: ['.lanedu/rules.json'] },
    validationChecks: [
      'Token GitHub almacenado en tu perfil.',
      'PR abierto o mergeado con título del Lab.',
      'Archivos requeridos tocados según rules.json.'
    ],
    validationExclusions: ['No se ejecuta código ni CI.'],
    rules: [
      'Conecta tu token antes de validar.',
      'Abre PR contra el repo base cumpliendo rules.json.',
      'Debe haber al menos un archivo requerido modificado.'
    ],
    deliverable: 'Pull Request validado automáticamente con tu token conectado.',
    requiresGithub: true
  },
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
