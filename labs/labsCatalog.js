export const labsCatalog = [
  {
  id: 'gh-lab0',
  labId: 'LAB-00',
  title: 'Crear cuenta GitHub',
  level: 'Beginner',
  xp: 40,
  repo: 'lanedu-org/lanedu-lab-00-github-account',
  story:
    'Es tu primer día en **ACME Tech**. Aún no has escrito una sola línea de código cuando Roberto, tu jefe técnico, te detiene en el onboarding. “Antes de tocar cualquier repo, necesitamos que existas como profesional”, te dice. En esta empresa todo vive en GitHub: tareas, revisiones, historial y decisiones. Tu identidad digital es tu primera herramienta de trabajo.',
  objective:
    'Crear una cuenta de GitHub lista para un entorno profesional: usuario definido, foto, bio clara y autenticación en dos pasos habilitada.',
  rules: [
    'Habilita 2FA en tu cuenta.',
    'Configura un perfil claro (bio, nombre visible).',
    'Captura tu URL de perfil para validación.',
    'Este Lab puede marcarse manualmente como completado.'
  ],
  deliverable: 'Completa la configuración de tu cuenta. Presiona “Verificar progreso” para marcarlo manualmente.',
  manualValidation: true
},
{
  id: 'gh-lab1',
  labId: 'LAB-01',
  title: 'Crear un repositorio',
  level: 'Beginner',
  xp: 60,
  repo: 'lanedu-org/lanedu-lab-01-create-repo',
  story:
    'Con tu cuenta lista, Roberto vuelve a hablar contigo. “Vamos a crear tu espacio de trabajo”, te explica. Te pide que inicies un repositorio desde cero, como lo haría cualquier miembro del equipo. No es solo crear un repo: es demostrar que sabes iniciar un proyecto con orden, documentación y responsabilidad.',
  objective:
    'Crear un repositorio público preparado para trabajo real, con documentación inicial, licencia y un primer commit limpio.',
  rules: [
    'Incluye README.md con propósito del repo.',
    'Agrega LICENSE.',
    'Crea al menos un commit inicial.',
    'Entrega se valida con Pull Request.'
  ],
  deliverable: 'Pull Request hacia el repo base con el repositorio inicial listo.'
},
{
  id: 'gh-lab2',
  labId: 'LAB-02',
  title: 'Clonar y modificar un repositorio',
  level: 'Beginner',
  xp: 60,
  repo: 'lanedu-org/lanedu-lab-02-clone-edit',
  story:
    'Al día siguiente, Roberto te asigna tu primera tarea real. “Este repo ya existe, alguien más lo creó. Tu trabajo es continuarlo sin romper nada”, te dice. Debes clonar el repositorio, entender su estructura y proponer un cambio mínimo, como lo harías en cualquier equipo profesional.',
  objective:
    'Clonar un repositorio, crear una rama de trabajo, modificar un archivo y preparar los cambios para revisión.',
  rules: [
    'Incluye instrucciones reproducibles en el README.',
    'Crea al menos un cambio visible.',
    'Entrega mediante PR.'
  ],
  deliverable: 'Pull Request con los cambios aplicados y documentados.'
},
{
  id: 'gh-lab3',
  labId: 'LAB-03',
  title: 'Commits con sentido',
  level: 'Beginner',
  xp: 70,
  repo: 'lanedu-org/lanedu-lab-03-meaningful-commits',
  story:
    'Tras revisar tu PR, Roberto deja un comentario: “El cambio está bien, pero tus commits dicen poco”. En ACME Tech el historial importa. Cada commit debe contar qué hiciste y por qué. Ahora debes demostrar que entiendes cómo escribir commits que otros puedan leer y entender meses después.',
  objective:
    'Realizar commits atómicos y bien escritos, siguiendo convenciones profesionales.',
  rules: [
    'Usa mensajes descriptivos (ej. feat:, fix:, chore:).',
    'Agrupa cambios coherentes en commits separados.',
    'Incluye un log de cambios en el PR.'
  ],
  deliverable: 'Pull Request con commits claros y revisión lista.'
},
{
  id: 'gh-lab4',
  labId: 'LAB-04',
  title: 'Push al repositorio remoto',
  level: 'Beginner',
  xp: 70,
  repo: 'lanedu-org/lanedu-lab-04-push-remote',
  story:
    'Ya trabajaste localmente y tus commits están listos, pero Roberto te recuerda algo clave: “Si no está en el remoto, no existe”. Tu tarea ahora es empujar correctamente tus cambios, asegurarte de que la rama esté bien publicada y lista para revisión del equipo.',
  objective:
    'Configurar el remoto, hacer push correctamente y dejar una rama lista para revisión.',
  rules: [
    'Incluye screenshot o log del push.',
    'Asegura que la rama remota esté limpia.',
    'Entrega mediante PR.'
  ],
  deliverable: 'Pull Request demostrando que el push y la rama remota están correctos.'
},
{
  id: 'gh-lab5',
  labId: 'LAB-05',
  title: 'Fork de un repositorio',
  level: 'Beginner',
  xp: 80,
  repo: 'lanedu-org/lanedu-lab-05-fork',
  story:
    'Ahora el desafío cambia. Roberto te asigna colaborar en un proyecto que no pertenece directamente al equipo. “Aquí no tienes permisos directos”, te explica. “Trabajamos con forks y upstreams, como en open source”. Debes seguir el flujo completo sin romper la sincronización.',
  objective:
    'Crear un fork, sincronizarlo con el repositorio original y preparar cambios desde tu copia.',
  rules: [
    'Configura remoto upstream.',
    'Documenta cómo sincronizas con upstream.',
    'Entrega mediante PR desde tu fork.'
  ],
  deliverable: 'Pull Request desde tu fork al repo base con cambios mínimos.'
},
{
  id: 'gh-lab6',
  labId: 'LAB-06',
  title: 'Crear un Pull Request válido',
  level: 'Beginner',
  xp: 100,
  repo: 'lanedu-org/lanedu-lab-06-pr-valid',
  story:
    'Última prueba del onboarding. Roberto te dice: “Este PR será evaluado como si fuera producción”. Todo cuenta: el título, la descripción, la checklist y los archivos modificados. Si apruebas este paso, quedas oficialmente habilitado para trabajar como parte del equipo.',
  objective:
    'Abrir un Pull Request completo y válido, siguiendo todas las reglas definidas por el equipo.',
  rules: [
    'Incluye plantilla de PR rellenada.',
    'Modifica al menos los archivos requeridos definidos en rules.json.',
    'El PR debe estar abierto o mergeado.'
  ],
  deliverable: 'Pull Request válido contra el repo base, cumpliendo las reglas definidas.'
}
,
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
