export const labsCatalog = [
  {
    id: 'gh-lab0',
    labId: 'LAB-00',
    title: 'Crear cuenta GitHub',
    level: 'Beginner',
    xp: 40,
    repo: 'lanedu-org/lanedu-lab-00-github-account',
    story:
      'Llegas a la empresa sin credenciales. Seguridad te pide tener identidad y 2FA antes de darte acceso a nada.',
    objective:
      'Abrir una cuenta de GitHub, activar 2FA y dejar un perfil profesional listo para trabajar.',
    validationType: 'Manual (checklist personal)',
    validationChecks: [
      'Cuenta creada con usuario y avatar profesional.',
      '2FA habilitado.',
      'Perfil con bio y nombre visibles.'
    ],
    validationExclusions: ['No se revisa código ni PR.'],
    rules: [
      'Anota tu URL de perfil.',
      'Habilita 2FA antes de continuar.',
      'Este Lab se marca manualmente (sin token).' 
    ],
    deliverable: 'Checklist completado. Marca manualmente cuando tengas tu cuenta lista.',
    manualValidation: true
  },
  {
    id: 'gh-lab1',
    labId: 'LAB-01',
    title: 'Crear un repositorio propio',
    level: 'Beginner',
    xp: 55,
    repo: 'lanedu-org/lanedu-lab-01-create-repo',
    story: 'IT te pide un repo base para tus tareas. Debe existir con README y licencia antes de darte más accesos.',
    objective: 'Crear un repositorio público con README, LICENSE y commit inicial coherente.',
    validationType: 'Evidencia de repositorio propio',
    validationChecks: [
      'Repo creado con nombre solicitado.',
      'README y LICENSE presentes.',
      'Commit inicial visible en la rama principal.'
    ],
    validationExclusions: ['No se valida PR ni token.'],
    rules: [
      'Usa un nombre de repo profesional.',
      'Incluye README con propósito.',
      'No necesitas PR todavía. Validación es declarativa.'
    ],
    deliverable: 'Marca como completado cuando tu repo exista con README y LICENSE.',
    manualValidation: true
  },
  {
    id: 'gh-lab2',
    labId: 'LAB-02',
    title: 'Commits locales con intención',
    level: 'Beginner',
    xp: 60,
    repo: 'lanedu-org/lanedu-lab-02-commits-locales',
    story: 'Tu lead quiere ver disciplina antes de tocar remoto. Trabaja localmente y documenta tus commits.',
    objective: 'Crear cambios locales y generar 2-3 commits atómicos con mensajes claros.',
    validationType: 'Evidencia local (sin remoto)',
    validationChecks: [
      'Commits atómicos con mensajes descriptivos.',
      'Historial limpio (sin commit vacíos).',
      'README actualizado con el propósito de los cambios.'
    ],
    validationExclusions: ['No se valida push ni PR.'],
    rules: [
      'Simula el repo base localmente.',
      'Guarda evidencias de git log y diffs.',
      'Marcar manualmente cuando tengas la evidencia.'
    ],
    deliverable: 'Sube tus commits locales a tu repo personal y marca el lab con tu checklist completado.',
    manualValidation: true
  },
  {
    id: 'gh-lab3',
    labId: 'LAB-03',
    title: 'Primer push remoto',
    level: 'Beginner',
    xp: 70,
    repo: 'lanedu-org/lanedu-lab-03-primer-push',
    story: 'Ahora sí debes publicar. El equipo espera que subas tu rama sin romper la principal.',
    objective: 'Configurar remoto, subir una rama feature y dejar trazabilidad del push.',
    validationType: 'Evidencia de push a remoto',
    validationChecks: [
      'Rama remota creada correctamente.',
      'Logs o capturas del push exitoso.',
      'README indica cómo reproducir el push.'
    ],
    validationExclusions: ['No se revisa contenido del código.'],
    rules: [
      'Prepara un push limpio (sin archivos binarios innecesarios).',
      'No necesitas abrir PR todavía.',
      'Marca manualmente cuando confirmes el push.'
    ],
    deliverable: 'Evidencia de push remoto documentada. Marca el lab cuando quede lista.',
    manualValidation: true
  },
  {
    id: 'gh-lab4',
    labId: 'LAB-04',
    title: 'Trabajo en ramas',
    level: 'Beginner',
    xp: 80,
    repo: 'lanedu-org/lanedu-lab-04-branches',
    story: 'Se activa una nueva funcionalidad. Debes aislar cambios en una rama y mantener main intacta.',
    objective: 'Crear, usar y cerrar una rama de feature con merge limpio en tu repo.',
    validationType: 'Evidencia de flujo con ramas',
    validationChecks: [
      'Rama de feature creada y mergeada a main.',
      'Historial de commits en la rama documentado.',
      'Notas de cómo resolviste conflictos (si hubo).'
    ],
    validationExclusions: ['No se valida PR hacia repos externos.'],
    rules: [
      'Describe tu flujo git en el README.',
      'Captura comando o salida de git log --graph.',
      'Validación manual con checklist.'
    ],
    deliverable: 'Checklist + evidencia de ramas mergeadas. Marca el lab manualmente.',
    manualValidation: true
  },
  {
    id: 'gh-lab5',
    labId: 'LAB-05',
    title: 'Fork y upstream',
    level: 'Beginner',
    xp: 90,
    repo: 'lanedu-org/lanedu-lab-05-fork-upstream',
    story: 'Necesitas colaborar en un repo externo. Debes trabajar desde tu fork y mantenerlo sincronizado.',
    objective: 'Crear un fork, agregar remoto upstream y sincronizarlo antes de proponer cambios.',
    validationType: 'Evidencia de fork + upstream',
    validationChecks: [
      'Fork creado en tu cuenta.',
      'Remoto upstream configurado.',
      'Sync con upstream ejecutado y documentado.'
    ],
    validationExclusions: ['No se exige PR aún.'],
    rules: [
      'Documenta comandos para fetch/merge desde upstream.',
      'Incluye evidencia de ramas sincronizadas.',
      'Validación manual vía checklist.'
    ],
    deliverable: 'Checklist de fork y sincronización completada. Marca manualmente el lab.',
    manualValidation: true
  },
  {
    id: 'gh-lab6',
    labId: 'LAB-06',
    title: 'Pull Request completo',
    level: 'Beginner',
    xp: 110,
    repo: 'lanedu-org/lanedu-lab-06-pr-valid',
    story:
      'Ahora sí debes colaborar formalmente. Abre un PR con plantilla, checklist y cambios mínimos en tu fork.',
    objective: 'Crear un PR válido desde tu fork al repo base siguiendo rules.json.',
    validationType: 'Pull Request (sin token si usas dispositivo con sesión)',
    validationChecks: [
      'PR abierto o mergeado con título correcto.',
      'Archivos requeridos modificados.',
      'Checklist del PR completada.'
    ],
    validationExclusions: ['No se evalúa calidad de código.'],
    rules: [
      'Incluye plantilla de PR rellenada.',
      'Modifica al menos los archivos requeridos definidos en rules.json.',
      'El PR debe estar abierto o mergeado.'
    ],
    deliverable: 'Pull Request válido contra el repo base. Conectar GitHub solo si la API lo solicita.',
    requiresGithub: true
  },
  {
    id: 'gh-lab7',
    labId: 'LAB-07',
    title: 'Validación automática con token',
    level: 'Beginner',
    xp: 130,
    repo: 'lanedu-org/lanedu-lab-07-automatic-verify',
    story:
      'Último paso de onboarding: conectar tu token para que el sistema valide tu PR y rules.json sin intervención.',
    objective:
      'Conectar GitHub desde tu perfil, abrir un PR cumpliendo rules.json y dejar trazabilidad para la automatización.',
    validationType: 'Validación automática (requiere token GitHub)',
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
