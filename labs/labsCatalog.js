export const labsCatalog = [
  [
  {
    id: 'gh-lab00',
    labId: 'LAB-00',
    title: 'Tu identidad profesional',
    level: 'Beginner',
    xp: 40,
    repo: null,
    story:
      'Es tu primer día en ACME Tech. Antes de asignarte cualquier tarea, Roberto —tu jefe técnico— te detiene: “Aquí todo pasa por GitHub. Si no tienes identidad digital, no existes para el equipo”. Tu primera misión no es técnica: es prepararte para entrar al mundo profesional.',
    objective:
      'Crear una cuenta de GitHub configurada para un entorno profesional.',
    validationType: 'manual',
    validates:
      'Existencia de cuenta GitHub, perfil completo y 2FA habilitado.',
    doesNotValidate:
      'Commits, repositorios o Pull Requests.',
    rules: [
      'Crear una cuenta de GitHub.',
      'Configurar nombre visible, bio y foto.',
      'Habilitar autenticación en dos pasos (2FA).'
    ],
    deliverable:
      'Perfil de GitHub configurado. El Lab se marca manualmente como completado.',
    manualValidation: true
  },
  {
    id: 'gh-lab01',
    labId: 'LAB-01',
    title: 'Preparar tu entorno local',
    level: 'Beginner',
    xp: 50,
    repo: null,
    story:
      'Roberto te envía un mensaje: “Antes de tocar cualquier repo, asegúrate de que tu máquina esté lista. Nadie quiere perder horas por un Git mal configurado”. Tu entorno local es ahora parte del equipo.',
    objective:
      'Instalar y configurar Git en tu entorno local.',
    validationType: 'manual',
    validates:
      'Configuración básica de Git (user.name y user.email).',
    doesNotValidate:
      'Repositorios remotos o pushes.',
    rules: [
      'Instalar Git.',
      'Configurar nombre y correo.',
      'Verificar instalación con git --version.'
    ],
    deliverable:
      'Entorno local listo para trabajar con Git.',
    manualValidation: true
  },

  {
    id: 'gh-lab02',
    labId: 'LAB-02',
    title: 'Crear tu primer repositorio',
    level: 'Beginner',
    xp: 60,
    repo: null,
    story:
      '“Crea tu espacio de trabajo”, te dice Roberto. No es un repo cualquiera: será donde practicarás sin romper nada del equipo. Aquí empiezas a dejar rastro.',
    objective:
      'Crear un repositorio público propio siguiendo buenas prácticas.',
    validationType: 'repo-existence',
    validates:
      'Existencia de un repositorio público con nombre y archivos requeridos.',
    doesNotValidate:
      'Pull Requests o forks.',
    rules: [
      'Repositorio público.',
      'Debe incluir README.md.',
      'Debe incluir LICENSE.'
    ],
    deliverable:
      'Repositorio propio creado y accesible públicamente.'
  },

  {
    id: 'gh-lab03',
    labId: 'LAB-03',
    title: 'Tu primer commit',
    level: 'Beginner',
    xp: 60,
    repo: null,
    story:
      'Roberto revisa tu repo y comenta: “Un repo sin commits no cuenta como trabajo”. Es hora de registrar tu primer cambio como profesional.',
    objective:
      'Realizar commits locales claros y con sentido.',
    validationType: 'local-commit',
    validates:
      'Existencia de commits con mensajes claros en el repositorio propio.',
    doesNotValidate:
      'Push al remoto o PR.',
    rules: [
      'Al menos un commit.',
      'Mensaje descriptivo.'
    ],
    deliverable:
      'Repositorio con historial de commits inicial.'
  },

  {
    id: 'gh-lab04',
    labId: 'LAB-04',
    title: 'Publicar tu trabajo',
    level: 'Beginner',
    xp: 70,
    repo: null,
    story:
      '“Si no está en remoto, no existe”, te recuerda Roberto. Es momento de publicar tu trabajo y hacerlo visible para otros.',
    objective:
      'Subir tus commits al repositorio remoto.',
    validationType: 'push',
    validates:
      'Commits correctamente empujados al remoto.',
    doesNotValidate:
      'Uso de ramas o PR.',
    rules: [
      'Push exitoso a GitHub.',
      'Repositorio actualizado.'
    ],
    deliverable:
      'Repositorio remoto con commits visibles.'
  },

  {
    id: 'gh-lab05',
    labId: 'LAB-05',
    title: 'Trabajar con ramas',
    level: 'Beginner',
    xp: 80,
    repo: null,
    story:
      'Roberto te detiene antes de seguir: “Nunca trabajamos directo en main”. Aprendes que las ramas existen para proteger al equipo.',
    objective:
      'Crear y trabajar en una rama separada.',
    validationType: 'branch',
    validates:
      'Existencia de rama distinta a main con commits.',
    doesNotValidate:
      'Pull Requests.',
    rules: [
      'Crear una rama.',
      'Commits realizados fuera de main.'
    ],
    deliverable:
      'Repositorio con rama activa y cambios separados.'
  },

  {
    id: 'gh-lab06',
    labId: 'LAB-06',
    title: 'Colaborar mediante forks',
    level: 'Beginner',
    xp: 90,
    repo: 'lanedu-org/lanedu-lab-06-fork',
    story:
      'Ahora trabajas en un proyecto que no es del equipo. “Aquí no tienes permisos directos”, explica Roberto. Debes usar forks como en el mundo real.',
    objective:
      'Crear un fork y trabajar con upstream.',
    validationType: 'fork',
    validates:
      'Fork correcto y sincronización con upstream.',
    doesNotValidate:
      'Validación automática.',
    rules: [
      'Fork del repositorio base.',
      'Configuración de upstream.'
    ],
    deliverable:
      'Fork con cambios listos.'
  },

  {
    id: 'gh-lab07',
    labId: 'LAB-07',
    title: 'Tu primer Pull Request',
    level: 'Beginner',
    xp: 100,
    repo: 'lanedu-org/lanedu-lab-07-pr',
    story:
      'Última prueba del onboarding. Roberto es claro: “Este PR se evalúa como producción”. Todo cuenta.',
    objective:
      'Crear un Pull Request válido siguiendo las reglas del equipo.',
    validationType: 'pull-request',
    validates:
      'Pull Request con título, descripción y cambios requeridos.',
    doesNotValidate:
      'Automatización avanzada.',
    rules: [
      'PR con formato correcto.',
      'Cambios mínimos requeridos.'
    ],
    deliverable:
      'Pull Request válido contra el repo base.'
  },

  {
    id: 'gh-lab08',
    labId: 'LAB-08',
    title: 'Conectar GitHub a LANEDU',
    level: 'Beginner',
    xp: 120,
    repo: null,
    story:
      'Roberto asiente: “Ya sabes trabajar. Ahora automatizamos”. Es el momento de conectar tu cuenta para validaciones reales.',
    objective:
      'Conectar tu cuenta de GitHub a LANEDU para validación automática.',
    validationType: 'automatic',
    validates:
      'Lectura de Pull Requests mediante token u OAuth.',
    doesNotValidate:
      'Contenido de código.',
    rules: [
      'Conectar cuenta GitHub.',
      'Permisos de solo lectura.'
    ],
    deliverable:
      'Cuenta conectada y lista para validaciones automáticas.'
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
