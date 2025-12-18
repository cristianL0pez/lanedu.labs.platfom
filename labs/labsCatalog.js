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
  }
]
