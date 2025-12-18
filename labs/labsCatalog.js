// labsCatalog.js (ES module válido)

export const labsCatalog = [
  {
    id: 'gh-lab0',
    labId: 'LAB-00',
    title: 'Crear cuenta GitHub',
    level: 'Beginner',
    xp: 40,
    repo: 'lanedu-org/lanedu-lab-00-github-account',
    story:
      'Antes de cualquier pipeline o PR, necesitas tu identidad. Abre tu cuenta, configura 2FA y deja listo tu perfil.',
    objective:
      'Crear una cuenta de GitHub lista para trabajo real: usuario, foto, bio profesional y autenticacion en dos pasos.',
    rules: [
      'Habilita 2FA en tu cuenta.',
      'Configura un perfil claro (bio, nombre visible).',
      'Captura tu URL de perfil para validacion.',
      'Este Lab puede marcarse manualmente como completado.'
    ],
    deliverable:
      'Completa la configuracion de tu cuenta. Presiona "Verificar progreso" para marcarlo manualmente.',
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
      'Primera mision: crear tu repo base de trabajo para todo lo que viene.',
    objective:
      'Crear un repositorio publico con README y licencia, y preparar un primer commit.',
    rules: [
      'Incluye README.md con proposito del repo.',
      'Agrega LICENSE.',
      'Crea al menos un commit inicial.',
      'Entrega se valida con Pull Request.'
    ],
    deliverable:
      'Pull Request hacia el repo base con el repositorio inicial listo.'
  },
  {
    id: 'gh-lab2',
    labId: 'LAB-02',
    title: 'Clonar y modificar un repositorio',
    level: 'Beginner',
    xp: 60,
    repo: 'lanedu-org/lanedu-lab-02-clone-edit',
    story:
      'Recibes un repo ya creado. Debes clonarlo, hacer cambios minimos y proponerlos.',
    objective:
      'Clonar un repo, crear rama, modificar un archivo y preparar cambios para PR.',
    rules: [
      'Incluye instrucciones reproducibles en el README.',
      'Crea al menos un cambio visible.',
      'Entrega mediante PR.'
    ],
    deliverable:
      'Pull Request con los cambios aplicados y documentados.'
  },
  {
    id: 'gh-lab3',
    labId: 'LAB-03',
    title: 'Commits con sentido',
    level: 'Beginner',
    xp: 70,
    repo: 'lanedu-org/lanedu-lab-03-meaningful-commits',
    story:
      'Tu lead exige mensajes de commit claros. Debes demostrar disciplina de versionado.',
    objective:
      'Realizar commits atomicos con mensajes tipo convencional, incluyendo contexto.',
    rules: [
      'Usa mensajes descriptivos (ej. feat:, fix:, chore:).',
      'Agrupa cambios coherentes en commits separados.',
      'Incluye un log de cambios en el PR.'
    ],
    deliverable:
      'Pull Request con commits claros y revision lista.'
  },
  {
    id: 'gh-lab4',
    labId: 'LAB-04',
    title: 'Push al repositorio remoto',
    level: 'Beginner',
    xp: 70,
    repo: 'lanedu-org/lanedu-lab-04-push-remote',
    story:
      'Tienes cambios locales listos. Debes empujarlos correctamente al remoto sin romper nada.',
    objective:
      'Configurar remoto, hacer push y dejar un PR preparado con la rama publicada.',
    rules: [
      'Incluye screenshot o log del push.',
      'Asegura que la rama remota este limpia.',
      'Entrega mediante PR.'
    ],
    deliverable:
      'Pull Request demostrando que el push y la rama remota estan correctos.'
  },
  {
    id: 'gh-lab5',
    labId: 'LAB-05',
    title: 'Fork de un repositorio',
    level: 'Beginner',
    xp: 80,
    repo: 'lanedu-org/lanedu-lab-05-fork',
    story:
      'Debes colaborar en un repo que no es tuyo. Practica el flujo completo con fork.',
    objective:
      'Crear un fork, sincronizar con upstream y preparar cambios en tu copia.',
    rules: [
      'Configura remoto upstream.',
      'Documenta como sincronizas con upstream.',
      'Entrega mediante PR desde tu fork.'
    ],
    deliverable:
      'Pull Request desde tu fork al repo base con cambios minimos.'
  },
  {
    id: 'gh-lab6',
    labId: 'LAB-06',
    title: 'Crear un Pull Request valido',
    level: 'Beginner',
    xp: 100,
    repo: 'lanedu-org/lanedu-lab-06-pr-valid',
    story:
      'Debes abrir tu primer PR real siguiendo buenas practicas: descripcion, checklist y archivos requeridos.',
    objective:
      'Abrir un PR con titulo correcto, checklist y cambios minimos exigidos.',
    rules: [
      'Incluye plantilla de PR rellenada.',
      'Modifica al menos los archivos requeridos definidos en rules.json.',
      'El PR debe estar abierto o mergeado.'
    ],
    deliverable:
      'Pull Request valido contra el repo base, cumpliendo las reglas definidas.'
  },
  {
    id: 'lab1',
    labId: 'LAB-01',
    title: 'El jefe necesita el archivo YA',
    level: 'Beginner',
    xp: 100,
    repo: 'lanedu-org/lanedu-lab-01-backup-logs',
    story:
      'Tu lead te escribio por chat: "necesito un backup limpio de logs antes de las 18:00, el auditor esta aqui".',
    objective:
      'Crear un script que comprima los logs de /var/log (o carpeta simulada) y genere un archivo con fecha.',
    rules: [
      'No borres archivos originales.',
      'Incluye comandos o snippets que usaste.',
      'Adjunta evidencia (capturas o salida del comando).'
    ],
    deliverable:
      'Crea un Pull Request contra el repo base con el script de backup.'
  },
  {
    id: 'lab2',
    labId: 'LAB-02',
    title: 'Terminal limpia, mente limpia',
    level: 'Beginner',
    xp: 120,
    repo: 'lanedu-labs/lab-02-history-review',
    story:
      'Llegas a una maquina con historial caotico. Quieren saber que comandos se ejecutaron para un incidente.',
    objective:
      'Analizar el historial (.bash_history o similar) y resumir en un reporte que comandos sospechosos encontraste.',
    rules: [
      'No edites el historial original.',
      'Incluye timestamps si estan disponibles.',
      'Entrega un resumen de 5-10 lineas.'
    ],
    deliverable:
      'Pull Request con tu reporte y comandos en el repo base.'
  },
  {
    id: 'lab3',
    labId: 'LAB-03',
    title: 'Automatiza el onboarding',
    level: 'Beginner',
    xp: 130,
    repo: 'lanedu-labs/lab-03-onboarding',
    story:
      'Un companero nuevo llega y no hay manual. Necesita ambiente listo en 10 minutos.',
    objective:
      'Crear un script que instale dependencias (ej. git, curl), configure alias y muestre mensaje de bienvenida.',
    rules: [
      'Debe ser idempotente (si ya esta instalado, no rompe).',
      'Usa variables y comentarios claros.',
      'Incluye pasos para revertir cambios.'
    ],
    deliverable:
      'Pull Request con el script y evidencias en el repo base.'
  },
  {
    id: 'lab4',
    labId: 'LAB-04',
    title: 'Mini API sin servidor',
    level: 'Beginner',
    xp: 140,
    repo: 'lanedu-labs/lab-04-mock-api',
    story:
      'Te piden simular una API interna para probar un frontend mientras llega el backend real.',
    objective:
      'Crear un mock de API con JSON local (puede ser usando fetch a un archivo) y responder datos de usuarios.',
    rules: [
      'No necesitas servidor; usa archivos o funciones.',
      'Debe permitir filtrar o buscar usuarios.',
      'Incluye ejemplo de consumo en JS.'
    ],
    deliverable:
      'Pull Request con el mock y la demo listos.'
  },
  {
    id: 'lab5',
    labId: 'LAB-05',
    title: 'Checklist de despliegue',
    level: 'Beginner',
    xp: 150,
    repo: 'lanedu-labs/lab-05-deploy-checklist',
    story:
      'Antes de desplegar, tu squad necesita una checklist que evite sustos.',
    objective:
      'Construir una checklist interactiva (HTML/JS) que marque tareas y calcule porcentaje.',
    rules: [
      'Debe persistir estado localmente.',
      'Incluye al menos 8 items criticos.',
      'Muestra un resumen visual (barra o texto).'
    ],
    deliverable:
      'Pull Request con la checklist funcional en el repo base.'
  },
  {
    id: 'lab6',
    labId: 'LAB-06',
    title: 'Cron jobs bajo control',
    level: 'Intermediate',
    xp: 200,
    repo: 'lanedu-labs/lab-06-cron-audit',
    story:
      'La empresa perdio trazabilidad de sus cron jobs. Necesitan inventario rapido.',
    objective:
      'Levantar un inventario de cron jobs de un sistema (real o simulado) y proponer alertas basicas.',
    rules: [
      'Documenta comandos usados para listar crons.',
      'Propon validaciones para saber si fallan.',
      'Entrega tabla con dueno, comando y horario.'
    ],
    deliverable:
      'Pull Request con inventario y propuestas en el repo base.'
  },
  {
    id: 'lab7',
    labId: 'LAB-07',
    title: 'Responder un incidente',
    level: 'Intermediate',
    xp: 220,
    repo: 'lanedu-labs/lab-07-incident',
    story:
      'Alguien subio una llave SSH publica no autorizada. Debes reaccionar como responderias en guardia.',
    objective:
      'Disenar y documentar un playbook de respuesta: deteccion, contencion, erradicacion y recuperacion.',
    rules: [
      'Incluye comandos concretos de verificacion.',
      'Define responsables y tiempos estimados.',
      'Agrega checklist de verificacion final.'
    ],
    deliverable:
      'Pull Request con el playbook y evidencias.'
  },
  {
    id: 'lab8',
    labId: 'LAB-08',
    title: 'Pipeline saludable',
    level: 'Intermediate',
    xp: 240,
    repo: 'lanedu-labs/lab-08-pipeline',
    story:
      'El pipeline CI falla sin logs claros. Debes estabilizarlo antes de la demo.',
    objective:
      'Crear un pipeline minimo (o simulado) con pasos de build, test y notificaciones, y registrar logs legibles.',
    rules: [
      'Muestra variables de entorno sensibles como secretos (no en claro).',
      'Incluye al menos una prueba automatizada falsa o real.',
      'Entrega un tablero de estado o reporte de runs.'
    ],
    deliverable:
      'Pull Request con pipeline, logs y reporte.'
  },
  {
    id: 'lab9',
    labId: 'LAB-09',
    title: 'Blue Team vs Ransomware',
    level: 'Advanced',
    xp: 400,
    repo: 'lanedu-labs/lab-09-ransomware',
    story:
      'Un servidor muestra actividad de cifrado masivo. Necesitas actuar como analista SOC.',
    objective:
      'Disenar un kit de contencion rapida: checklist, scripts de aislamiento y plan de comunicacion.',
    rules: [
      'Prioriza pasos de contencion en menos de 15 minutos.',
      'Incluye scripts o comandos listos para ejecutar.',
      'Agrega indicadores para monitorear propagacion.'
    ],
    deliverable:
      'Pull Request con el kit de respuesta y documentacion.'
  }
];

