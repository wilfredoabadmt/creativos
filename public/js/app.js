/**
 * COMUNICA DIGITAL - GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
 * Controlador Principal del Sistema Adaptado al Organigrama D.M. N° 200
 * Dirección de Comunicación (DICOM)
 */

// ==============================================================================
// 1. ESTRUCTURA ORGANIZACIONAL OFICIAL GAMEA (D.M. N° 200 - GESTIÓN 2026)
// ==============================================================================
const ORGANIGRAMA_GAMEA = [
  {
    id: 1,
    codigo: 'DESPACHO',
    nombre: 'Despacho de la Alcaldesa',
    sigla: 'DESPACHO',
    direcciones: [
      { id: 1, codigo: 'DGAL', nombre: 'Dirección General de Asesoría Legal', sigla: 'DGAL' },
      { id: 2, codigo: 'DRI', nombre: 'Dirección de Relaciones Internacionales', sigla: 'DRI' },
      { id: 3, codigo: 'URPP', nombre: 'Unidad de Relaciones Públicas y Protocolo', sigla: 'URPP' }
    ]
  },
  {
    id: 2,
    codigo: 'SMGI',
    nombre: 'Secretaría Municipal de Gestión Institucional',
    sigla: 'SMGI',
    direcciones: [
      { id: 4, codigo: 'DICOM', nombre: 'Dirección de Comunicación', sigla: 'DICOM' },
      { id: 5, codigo: 'DAC', nombre: 'Dirección de Atención Ciudadana', sigla: 'DAC' }
    ]
  },
  {
    id: 3,
    codigo: 'SMAF',
    nombre: 'Secretaría Municipal de Administración y Finanzas',
    sigla: 'SMAF',
    direcciones: [
      { id: 6, codigo: 'DIR-ADM', nombre: 'Dirección Administrativa', sigla: 'DIR-ADM' },
      { id: 7, codigo: 'DIR-CONT', nombre: 'Dirección de Contrataciones', sigla: 'DIR-CONT' },
      { id: 8, codigo: 'DIR-TES', nombre: 'Dirección del Tesoro Municipal', sigla: 'DIR-TES' },
      { id: 9, codigo: 'DIR-ATM', nombre: 'Dirección de Administración Tributaria Municipal', sigla: 'DATM' },
      { id: 10, codigo: 'DIR-TH', nombre: 'Dirección de Talento Humano', sigla: 'DTH' }
    ]
  },
  {
    id: 4,
    codigo: 'SMP',
    nombre: 'Secretaría Municipal de Planificación',
    sigla: 'SMP',
    direcciones: [
      { id: 11, codigo: 'DIR-PLAN', nombre: 'Dirección de Planificación', sigla: 'DIPLAN' },
      { id: 12, codigo: 'DIR-ATC', nombre: 'Dirección de Administración Territorial y Catastro', sigla: 'DATC' }
    ]
  },
  {
    id: 5,
    codigo: 'SMMU',
    nombre: 'Secretaría Municipal de Movilidad Urbana',
    sigla: 'SMMU',
    direcciones: [
      { id: 13, codigo: 'DIR-RMU', nombre: 'Dirección de Regulación de la Movilidad Urbana', sigla: 'DRMU' },
      { id: 14, codigo: 'DIR-BUS', nombre: 'Dirección Municipal de Transporte Público – Bus Municipal', sigla: 'DMTP-BUS' }
    ]
  },
  {
    id: 6,
    codigo: 'SMEC',
    nombre: 'Secretaría Municipal de Educación y Cultura',
    sigla: 'SMEC',
    direcciones: [
      { id: 15, codigo: 'DIR-CULT', nombre: 'Dirección de Cultura', sigla: 'DICCULT' },
      { id: 16, codigo: 'DIR-DEP', nombre: 'Dirección de Deportes', sigla: 'DIR-DEP' },
      { id: 17, codigo: 'DIR-ASE', nombre: 'Dirección de Atención y Servicios de Educación', sigla: 'DASE' }
    ]
  },
  {
    id: 7,
    codigo: 'SMDHSI',
    nombre: 'Secretaría Municipal de Desarrollo Humano y Social Integral',
    sigla: 'SMDHSI',
    direcciones: [
      { id: 18, codigo: 'DIR-NGAS', nombre: 'Dirección de Niñez, Género y Atención Social', sigla: 'DNGAS' },
      { id: 19, codigo: 'DIR-DI', nombre: 'Dirección de Desarrollo Integral', sigla: 'DDI' }
    ]
  },
  {
    id: 8,
    codigo: 'SMSC',
    nombre: 'Secretaría Municipal de Seguridad Ciudadana',
    sigla: 'SMSC',
    direcciones: [
      { id: 20, codigo: 'DIR-SP', nombre: 'Dirección de Seguridad Pública, Programas y Soluciones Tecnológicas', sigla: 'DSPPST' },
      { id: 21, codigo: 'INT-GUARD', nombre: 'Intendencia, Guardia y Banda Municipal', sigla: 'IGBM' },
      { id: 22, codigo: 'DIR-FM', nombre: 'Dirección de Ferias y Mercados', sigla: 'DFM' }
    ]
  },
  {
    id: 9,
    codigo: 'SMS',
    nombre: 'Secretaría Municipal de Salud',
    sigla: 'SMS',
    direcciones: [
      { id: 23, codigo: 'DIR-GS', nombre: 'Dirección de Gestión en Salud', sigla: 'DGS' },
      { id: 24, codigo: 'DIR-GSSND', nombre: 'Dirección de Gestión Servicios de Salud Nivel Desconcentrado', sigla: 'DGSSND' },
      { id: 25, codigo: 'DIR-ESPN', nombre: 'Dirección de Establecimientos de Salud de Primer Nivel', sigla: 'DESPN' },
      { id: 26, codigo: 'HOSP-MUN', nombre: 'Red de Hospitales Municipales (Holandés, Los Andes, Corea, Qullañ Uta, Japonés)', sigla: 'HOSP-MUN' }
    ]
  },
  {
    id: 10,
    codigo: 'SMIP',
    nombre: 'Secretaría Municipal de Infraestructura Pública',
    sigla: 'SMIP',
    direcciones: [
      { id: 27, codigo: 'DIR-PM', nombre: 'Dirección de Proyectos Municipales', sigla: 'DPM' },
      { id: 28, codigo: 'DIR-SO', nombre: 'Dirección de Supervisión de Obras', sigla: 'DSO' },
      { id: 29, codigo: 'DIR-FO', nombre: 'Dirección de Fiscalización de Obras', sigla: 'DFO' },
      { id: 30, codigo: 'DIR-OM', nombre: 'Dirección de Obras Municipales', sigla: 'DOM' },
      { id: 31, codigo: 'DIR-AP', nombre: 'Dirección de Alumbrado Público', sigla: 'DAP' }
    ]
  },
  {
    id: 11,
    codigo: 'SMASGAR',
    nombre: 'Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos',
    sigla: 'SMASGAR',
    direcciones: [
      { id: 32, codigo: 'DIR-GIR', nombre: 'Dirección de Gestión Integral de Residuos', sigla: 'DGIR' },
      { id: 33, codigo: 'DIR-SBRHCA', nombre: 'Dirección de Saneamiento Básico, Recursos Hídricos y Control Ambiental', sigla: 'DSBRHCA' },
      { id: 34, codigo: 'DIR-GR', nombre: 'Dirección de Gestión de Riesgos', sigla: 'DGR' },
      { id: 35, codigo: 'DIR-FAP', nombre: 'Dirección de Forestación y Áreas Protegidas', sigla: 'DFAP' }
    ]
  },
  {
    id: 12,
    codigo: 'SMDE',
    nombre: 'Secretaría Municipal de Desarrollo Económico',
    sigla: 'SMDE',
    direcciones: [
      { id: 36, codigo: 'DIR-DPA', nombre: 'Dirección de Desarrollo Productivo Artesanal', sigla: 'DDPA' },
      { id: 37, codigo: 'DIR-ASA', nombre: 'Dirección de Agropecuaria y Seguridad Alimentaria', sigla: 'DASA' },
      { id: 38, codigo: 'DIR-DPPYME', nombre: 'Dirección de Desarrollo Productivo de Pequeñas y Medianas Empresas', sigla: 'DDPPYME' },
      { id: 39, codigo: 'DIR-SMEI', nombre: 'Dirección de Servicios Municipales e Iniciativas Económicas', sigla: 'DSMEI' }
    ]
  },
  {
    id: 13,
    codigo: 'SUBALCALDIAS',
    nombre: 'Subalcaldías Municipales (Distritos 1 al 14)',
    sigla: 'SUB-D1-14',
    direcciones: [
      { id: 40, codigo: 'SUB-D1-7', nombre: 'Subalcaldías Distritos Urbanos (D-1 al D-7)', sigla: 'SUB-URB1' },
      { id: 41, codigo: 'SUB-D8-14', nombre: 'Subalcaldías Distritos Urbanos y Rurales (D-8 al D-14)', sigla: 'SUB-URB2' }
    ]
  },
  {
    id: 14,
    codigo: 'DESCENTRALIZADO',
    nombre: 'Nivel Descentralizado y Empresas Municipales',
    sigla: 'DESCENTRALIZADO',
    direcciones: [
      { id: 42, codigo: 'TERM-MET', nombre: 'Terminal Metropolitana El Alto', sigla: 'TMEA' },
      { id: 43, codigo: 'LAB-OXIG', nombre: 'Laboratorio Industrial de Oxígeno Medicinal – G.A.M.E.A.', sigla: 'LIOM-GAMEA' }
    ]
  }
];

// ==============================================================================
// 2. USUARIOS OFICIALES POR DIRECCIÓN (SISTEMA DE AUTENTICACIÓN Y ROLES)
// ==============================================================================
const USUARIOS_DIRECCIONES = {
  'dir.salud@elalto.gob.bo': {
    nombres: 'Dra. Patricia',
    apellidos: 'Mendoza Limachi',
    cargo: 'Directora de Gestión en Salud',
    secretaria: 'Secretaría Municipal de Salud',
    secretaria_id: 9,
    direccion: 'Dirección de Gestión en Salud',
    direccion_id: 23,
    rol: 'SOLICITANTE',
    badge: '🩺 Salud (SMS)'
  },
  'dir.obras@elalto.gob.bo': {
    nombres: 'Ing. Roberto',
    apellidos: 'Mamani Condori',
    cargo: 'Director de Obras Municipales',
    secretaria: 'Secretaría Municipal de Infraestructura Pública',
    secretaria_id: 10,
    direccion: 'Dirección de Obras Municipales',
    direccion_id: 30,
    rol: 'SOLICITANTE',
    badge: '🏗️ Obras (SMIP)'
  },
  'dir.cultura@elalto.gob.bo': {
    nombres: 'Lic. Marcelo',
    apellidos: 'Paredes Choque',
    cargo: 'Director de Cultura',
    secretaria: 'Secretaría Municipal de Educación y Cultura',
    secretaria_id: 6,
    direccion: 'Dirección de Cultura',
    direccion_id: 15,
    rol: 'SOLICITANTE',
    badge: '🎭 Cultura (SMEC)'
  },
  'dir.seguridad@elalto.gob.bo': {
    nombres: 'Cap. Edwin',
    apellidos: 'Huanca Laura',
    cargo: 'Director de Seguridad Pública',
    secretaria: 'Secretaría Municipal de Seguridad Ciudadana',
    secretaria_id: 8,
    direccion: 'Dirección de Seguridad Pública, Programas y Soluciones Tecnológicas',
    direccion_id: 20,
    rol: 'SOLICITANTE',
    badge: '🛡️ Seguridad (SMSC)'
  },
  'dir.finanzas@elalto.gob.bo': {
    nombres: 'Lic. Carmen',
    apellidos: 'Villavicencio',
    cargo: 'Directora Administrativa',
    secretaria: 'Secretaría Municipal de Administración y Finanzas',
    secretaria_id: 3,
    direccion: 'Dirección Administrativa',
    direccion_id: 6,
    rol: 'SOLICITANTE',
    badge: '🏢 Finanzas (SMAF)'
  },
  'dir.artesanias@elalto.gob.bo': {
    nombres: 'Lic. René',
    apellidos: 'Condori Huallpa',
    cargo: 'Director de Promoción Artesanal',
    secretaria: 'Secretaría Municipal de Desarrollo Económico',
    secretaria_id: 12,
    direccion: 'Dirección de Desarrollo Productivo Artesanal',
    direccion_id: 36,
    rol: 'SOLICITANTE',
    badge: '💼 Desarrollo Económico'
  },
  'disenador.marco@elalto.gob.bo': {
    nombres: 'Lic. Marco Antonio',
    apellidos: 'Choque Callisaya',
    cargo: 'Diseñador Creativo Senior',
    secretaria: 'Secretaría Municipal de Gestión Institucional',
    secretaria_id: 2,
    direccion: 'Dirección de Comunicación',
    direccion_id: 4,
    rol: 'DISENADOR',
    badge: '🎨 Diseñador DICOM'
  },
  'director.dicom@elalto.gob.bo': {
    nombres: 'Lic. Roxana',
    apellidos: 'Vargas Quispe',
    cargo: 'Directora de Comunicación',
    secretaria: 'Secretaría Municipal de Gestión Institucional',
    secretaria_id: 2,
    direccion: 'Dirección de Comunicación',
    direccion_id: 4,
    rol: 'SUPERVISOR',
    badge: '⭐ Directora DICOM'
  },
  'admin@elalto.gob.bo': {
    nombres: 'Ing. Wilfredo',
    apellidos: 'Abad Mancilla',
    cargo: 'Administrador General de Sistemas',
    secretaria: 'Despacho de la Alcaldesa',
    secretaria_id: 1,
    direccion: 'Dirección General de Asesoría Legal / Sistemas',
    direccion_id: 1,
    rol: 'ADMIN',
    badge: '🛡️ Administrador Sistemas'
  }
};

// ==============================================================================
// 3. ESTADO GLOBAL DE LA APLICACIÓN
// ==============================================================================
const state = {
  currentUser: null, // Si es null, está en modo PÚBLICO (formulario y bandeja protegidos)
  currentStep: 1,
  activeFilter: 'TODOS',
  solicitudes: [
    {
      id: 'sol-01',
      codigo_tramite: 'SOL-2026-0038',
      secretaria: 'Secretaría Municipal de Salud',
      direccion: 'Dirección de Gestión en Salud',
      nombre_evento: 'Gran Campaña de Vacunación Canina y Felina El Alto',
      fecha_evento: '2026-10-24',
      hora_evento: '08:30',
      lugar_evento: 'Plaza Central Senkata, Distrito 8',
      publico_objetivo: 'Familias alteñas y dueños de mascotas',
      objetivo_mensaje: 'Concientizar y promover la vacunación antirrábica gratuita para proteger a la comunidad.',
      tipo_pieza: 'Afiche',
      estilo_visual: 'Institucional',
      material: 'Ambos',
      orientacion: 'Vertical',
      plataformas: ['Facebook', 'WhatsApp', 'Pantallas'],
      estado: 'PENDIENTE',
      fecha_recepcion: '2026-10-01 09:15',
      fecha_limite: '2026-10-10 18:00',
      disenador_asignado: null,
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'VACUNA A TU MASCOTA, PROTEGE A TU FAMILIA. Campaña masiva de vacunación gratuita este sábado 24 de octubre en todos los centros de salud del Distrito 8. Horario: 08:30 a 16:00. Organiza: GAM El Alto y SEDES La Paz.',
      archivos: ['logo_gamea_vector.svg', 'brief_firmado_salud.pdf']
    },
    {
      id: 'sol-02',
      codigo_tramite: 'SOL-2026-0039',
      secretaria: 'Secretaría Municipal de Infraestructura Pública',
      direccion: 'Dirección de Obras Municipales',
      nombre_evento: 'Entrega del Paso a Desnivel Río Seco',
      fecha_evento: '2026-10-18',
      hora_evento: '10:00',
      lugar_evento: 'Distribuidor Río Seco, Distrito 4',
      publico_objetivo: 'Vecinos de El Alto, transportistas y medios de prensa',
      objetivo_mensaje: 'Anunciar la conclusión e inauguración de la megaobra vial que descongestiona el norte alteño.',
      tipo_pieza: 'Gigantografía / Banner',
      estilo_visual: 'Moderno',
      material: 'Impreso',
      orientacion: 'Horizontal',
      plataformas: ['Facebook', 'Web', 'Pantallas'],
      estado: 'EN_REVISION',
      fecha_recepcion: '2026-09-28 11:30',
      fecha_limite: '2026-10-07 18:00',
      disenador_asignado: 'Lic. Marco Antonio Choque',
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'EL ALTO DE PIE: Entregamos el moderno Paso a Desnivel Río Seco. Más fluidez, seguridad y progreso para nuestra gran ciudad.',
      archivos: ['foto_render_obra_alta.jpg', 'logo_gamea.png']
    },
    {
      id: 'sol-03',
      codigo_tramite: 'SOL-2026-0040',
      secretaria: 'Secretaría Municipal de Educación y Cultura',
      direccion: 'Dirección de Cultura',
      nombre_evento: 'Festival de la Morenada Alteña 2026',
      fecha_evento: '2026-10-30',
      hora_evento: '14:00',
      lugar_evento: 'Avenida Cívica (El Prado Alteño)',
      publico_objetivo: 'Juventud, fraternidades folclóricas y ciudadanía',
      objetivo_mensaje: 'Revalorizar el patrimonio dancístico y cultural de El Alto.',
      tipo_pieza: 'Redes Sociales',
      estilo_visual: 'Cultural',
      material: 'Digital',
      orientacion: 'Vertical',
      plataformas: ['Facebook', 'Instagram', 'TikTok'],
      estado: 'DISENO_PROCESO',
      fecha_recepcion: '2026-09-25 15:40',
      fecha_limite: '2026-10-06 18:00',
      disenador_asignado: 'Lic. Marco Antonio Choque',
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'VIVE NUESTRA IDENTIDAD. Festival y entrada autóctona de la Morenada Alteña. Música en vivo y fraternidades invitadas.',
      archivos: ['logo_culturas.png', 'texto_revisado.docx']
    },
    {
      id: 'sol-04',
      codigo_tramite: 'SOL-2026-0041',
      secretaria: 'Secretaría Municipal de Desarrollo Económico',
      direccion: 'Dirección de Desarrollo Productivo Artesanal',
      nombre_evento: 'Feria Huayna Fex 2026: Producción Alteña',
      fecha_evento: '2026-11-05',
      hora_evento: '09:00',
      lugar_evento: 'Campo Ferial de El Alto',
      publico_objetivo: 'Emprendedores, microempresarios y familias',
      objetivo_mensaje: 'Impulsar el consumo de manufactura, calzado y textiles hechos en El Alto.',
      tipo_pieza: 'Flyer',
      estilo_visual: 'Colorido',
      material: 'Ambos',
      orientacion: 'Vertical',
      plataformas: ['Facebook', 'WhatsApp'],
      estado: 'AJUSTES',
      fecha_recepcion: '2026-09-22 10:00',
      fecha_limite: '2026-10-02 18:00',
      disenador_asignado: 'Lic. Marco Antonio Choque',
      rondas_cambios_usadas: 1,
      historial_cambios: [
        {
          ronda: 1,
          fecha: '2026-09-26 14:20',
          usuario: 'Lic. René Condori (SMDE)',
          motivo: 'Corregir fecha de inicio al jueves 5 de noviembre y agregar logotipo de la Asociación de Productores en Cuero.'
        }
      ],
      texto_aprobado: 'LO MEJOR DE NUESTRAS MANOS. Feria Huayna Fex 2026. Más de 200 productores alteños te esperan.',
      archivos: ['logo_huaynafex.png', 'logo_asociacion.png']
    },
    {
      id: 'sol-05',
      codigo_tramite: 'SOL-2026-0042',
      secretaria: 'Secretaría Municipal de Seguridad Ciudadana',
      direccion: 'Dirección de Seguridad Pública, Programas y Soluciones Tecnológicas',
      nombre_evento: 'Talleres de Alarmas Vecinales Inteligentes',
      fecha_evento: '2026-10-15',
      hora_evento: '18:30',
      lugar_evento: 'Sede Social Villa Adela, Distrito 3',
      publico_objetivo: 'Presidentes de junta vecinal y vecinos',
      objetivo_mensaje: 'Instruir sobre la activación del sistema de alarma comunitaria conectada a la Policía Boliviana.',
      tipo_pieza: 'Tríptico',
      estilo_visual: 'Educativo',
      material: 'Impreso',
      orientacion: 'Horizontal',
      plataformas: ['Facebook'],
      estado: 'APROBADO',
      fecha_recepcion: '2026-09-18 09:00',
      fecha_limite: '2026-09-27 18:00',
      disenador_asignado: 'Lic. Marco Antonio Choque',
      rondas_cambios_usadas: 2,
      historial_cambios: [
        {
          ronda: 1,
          fecha: '2026-09-21 11:15',
          usuario: 'Cap. Edwin Huanca (SMSC)',
          motivo: 'Aclarar paso 3 sobre el código QR para descarga de la app vecinal.'
        },
        {
          ronda: 2,
          fecha: '2026-09-24 16:40',
          usuario: 'Cap. Edwin Huanca (SMSC)',
          motivo: 'Reemplazar número de teléfono de emergencia por el 110 municipal unificado.'
        }
      ],
      texto_aprobado: 'VECINDARIO SEGURO: Guía de uso de alarmas vecinales conectadas al Centro de Monitoreo Bol-110 El Alto.',
      archivos: ['diagrama_pasos.pdf', 'escudo_smsc.png']
    },
    {
      id: 'sol-06',
      codigo_tramite: 'SOL-2026-0043',
      secretaria: 'Secretaría Municipal de Gestión Institucional',
      direccion: 'Dirección de Comunicación',
      nombre_evento: 'Sesión de Honor Aniversario de La Paz',
      fecha_evento: '2026-07-16',
      hora_evento: '08:00',
      lugar_evento: 'Teatro Municipal Raúl Salmón de la Barra',
      publico_objetivo: 'Autoridades nacionales y cuerpo diplomático',
      objetivo_mensaje: 'Invitación oficial solemne protocolar.',
      tipo_pieza: 'Invitación',
      estilo_visual: 'Institucional',
      material: 'Impreso',
      orientacion: 'Vertical',
      plataformas: ['Web'],
      estado: 'FINALIZADO',
      fecha_recepcion: '2026-07-01 10:00',
      fecha_limite: '2026-07-10 18:00',
      disenador_asignado: 'Lic. Marco Antonio Choque',
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'La Alcaldesa de El Alto se complace en invitar a usted a la Solemne Sesión de Honor.',
      archivos: ['texto_protocolar_visado.pdf']
    }
  ]
};

// ==============================================================================
// 4. OBJETO PRINCIPAL DE LA APLICACIÓN
// ==============================================================================
const app = {
  init() {
    this.bindEvents();
    this.updateCurrentDate();
    this.populateSecretariasSelect();
    this.renderRequests();
    this.calculateSlaPreview();
    this.updateCounts();
    this.updateAuthUI();
  },

  bindEvents() {
    // Selector de navegación por pestañas con GUARDIA DE AUTENTICACIÓN
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.navigateWithAuthGuard(tab);
      });
    });

    // Botones de filtro de estado
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.activeFilter = e.currentTarget.getAttribute('data-filter');
        this.renderRequests();
      });
    });

    // Cambio en el selector de Secretaría (cascada de Direcciones)
    const selectSec = document.getElementById('campoSecretaria');
    if (selectSec) {
      selectSec.addEventListener('change', (e) => {
        this.onSecretariaChange(parseInt(e.target.value, 10));
      });
    }

    // Botón de autocompletar demo
    const btnFillDemo = document.getElementById('btnFillDemo');
    if (btnFillDemo) {
      btnFillDemo.addEventListener('click', () => this.fillDemoData());
    }

    // Envío del formulario
    const form = document.getElementById('formSolicitud');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Drag and Drop simulation
    const dropZone = document.getElementById('dropZoneInsumos');
    const fileInput = document.getElementById('fileInputInsumos');
    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => this.handleFilesSelected(e));
    }

    // Formulario de Login
    const formLogin = document.getElementById('formLoginInstitucional');
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        this.login(email);
      });
    }

    // ESC para cerrar modales
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeLoginModal();
      }
    });
  },

  updateCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('es-ES', options);
    const dateEl = document.getElementById('currentDateDisplay');
    if (dateEl) {
      dateEl.textContent = `El Alto, ${today}`;
    }
  },

  // ==============================================================================
  // 5. CONTROL DE AUTENTICACIÓN Y PRIVACIDAD DEL SISTEMA
  // ==============================================================================
  navigateWithAuthGuard(tabName) {
    // Si intenta acceder a pestañas privadas sin sesión
    if (!state.currentUser && (tabName === 'solicitud' || tabName === 'bandeja' || tabName === 'dashboard')) {
      this.openLoginModal(
        '⚠️ Acceso Restringido: Inicie sesión con la cuenta de su Dirección Municipal para acceder a las solicitudes y seguimiento.'
      );
      return;
    }
    this.showTab(tabName);
  },

  openLoginModal(noticeMessage = null) {
    const modal = document.getElementById('modalLoginBackdrop');
    const noticeEl = document.getElementById('loginNoticeText');
    if (noticeEl) {
      noticeEl.textContent = noticeMessage || 'Identifíquese con las credenciales de su Dirección para continuar.';
      noticeEl.style.display = noticeMessage ? 'block' : 'none';
    }
    if (modal) modal.classList.add('active');
  },

  closeLoginModal() {
    const modal = document.getElementById('modalLoginBackdrop');
    if (modal) modal.classList.remove('active');
  },

  login(email) {
    const user = USUARIOS_DIRECCIONES[email.toLowerCase()];
    if (!user) {
      this.showToast('Credenciales incorrectas o correo institucional no registrado.', 'error');
      return;
    }

    state.currentUser = user;
    this.closeLoginModal();
    this.updateAuthUI();
    this.applyUserConstraintsToForm();
    this.renderRequests();
    this.updateCounts();

    this.showToast(`✅ Bienvenido, ${user.nombres} ${user.apellidos} (${user.direccion})`, 'success');
    this.showTab('bandeja');
  },

  logout() {
    const prevUser = state.currentUser;
    state.currentUser = null;
    this.updateAuthUI();
    this.showTab('landing');
    this.showToast('Sesión institucional cerrada exitosamente.', 'info');
  },

  quickLogin(email) {
    this.login(email);
  },

  updateAuthUI() {
    const authControls = document.getElementById('authNavControls');
    const protectedBtns = document.querySelectorAll('.nav-btn-protected');
    const authNoticeBanner = document.getElementById('authNoticeBanner');

    if (state.currentUser) {
      // Usuario autenticado
      if (authControls) {
        authControls.innerHTML = `
          <div class="user-auth-pill">
            <div class="user-avatar-mini">${state.currentUser.nombres.charAt(0)}</div>
            <div class="user-info-text">
              <span class="user-name-label">${state.currentUser.nombres} ${state.currentUser.apellidos}</span>
              <span class="user-dir-label">${state.currentUser.direccion}</span>
            </div>
            <button type="button" class="btn-logout" onclick="app.logout()" title="Cerrar Sesión">✕ Salir</button>
          </div>
        `;
      }

      protectedBtns.forEach(btn => btn.style.display = 'inline-flex');

      if (authNoticeBanner) {
        authNoticeBanner.innerHTML = `
          <div class="auth-lock-card">
            <div>
              <h5>🔐 Solicitud Oficial Registrada por: ${state.currentUser.nombres} ${state.currentUser.apellidos}</h5>
              <p>Dependencia Orgánica: <strong>${state.currentUser.direccion}</strong> (${state.currentUser.secretaria})</p>
            </div>
            <span class="organigrama-badge-tag">D.M. N° 200 Aprobado</span>
          </div>
        `;
      }
    } else {
      // Visitante anónimo / Modo público
      if (authControls) {
        authControls.innerHTML = `
          <button class="btn btn-sm btn-gold font-semibold" onclick="app.openLoginModal()">
            🔐 Ingresar al Sistema
          </button>
        `;
      }

      protectedBtns.forEach(btn => btn.style.display = 'none');

      if (authNoticeBanner) {
        authNoticeBanner.innerHTML = `
          <div class="auth-lock-card" style="background:#EFF6FF; border-color:#BFDBFE;">
            <div>
              <h5 style="color:#1E40AF;">🔒 Acceso Restringido a Servidores Públicos del GAMEA</h5>
              <p style="color:#1E3A8A;">Debe iniciar sesión con el usuario oficial de su Dirección para enviar solicitudes a DICOM.</p>
            </div>
            <button class="btn btn-sm btn-primary" onclick="app.openLoginModal()">Ingresar Ahora</button>
          </div>
        `;
      }
    }
  },

  applyUserConstraintsToForm() {
    if (!state.currentUser) return;

    const selectSec = document.getElementById('campoSecretaria');
    const selectDir = document.getElementById('campoDireccionSelect');

    if (selectSec && selectDir) {
      if (state.currentUser.rol === 'SOLICITANTE') {
        // Bloquear al Solicitante en su propia Secretaría y Dirección
        selectSec.value = state.currentUser.secretaria_id;
        this.onSecretariaChange(state.currentUser.secretaria_id);
        selectDir.value = state.currentUser.direccion_id;

        selectSec.disabled = true;
        selectDir.disabled = true;
      } else {
        // Directores, Supervisores o Admins pueden seleccionar cualquiera
        selectSec.disabled = false;
        selectDir.disabled = false;
      }
    }
  },

  // ==============================================================================
  // 6. CASCADA DINÁMICA DE SECRETARÍAS Y DIRECCIONES (ORGANIGRAMA D.M. N° 200)
  // ==============================================================================
  populateSecretariasSelect() {
    const selectSec = document.getElementById('campoSecretaria');
    if (!selectSec) return;

    selectSec.innerHTML = `<option value="">-- Seleccione Secretaría Municipal u Órgano --</option>` +
      ORGANIGRAMA_GAMEA.map(sec => `
        <option value="${sec.id}">${sec.nombre} (${sec.sigla})</option>
      `).join('');
  },

  onSecretariaChange(secretariaId) {
    const selectDir = document.getElementById('campoDireccionSelect');
    if (!selectDir) return;

    if (!secretariaId) {
      selectDir.innerHTML = `<option value="">-- Primero seleccione una Secretaría --</option>`;
      selectDir.disabled = true;
      return;
    }

    const sec = ORGANIGRAMA_GAMEA.find(s => s.id === secretariaId);
    if (!sec || !sec.direcciones || sec.direcciones.length === 0) {
      selectDir.innerHTML = `<option value="">-- Sin direcciones disponibles --</option>`;
      return;
    }

    selectDir.disabled = false;
    selectDir.innerHTML = `<option value="">-- Seleccione Dirección / Unidad Ejecutora --</option>` +
      sec.direcciones.map(dir => `
        <option value="${dir.id}">${dir.nombre} (${dir.sigla})</option>
      `).join('');
  },

  showTab(tabName) {
    if (!state.currentUser && (tabName === 'solicitud' || tabName === 'bandeja' || tabName === 'dashboard')) {
      this.openLoginModal(
        '⚠️ Acceso Restringido: Inicie sesión con la cuenta de su Dirección Municipal para acceder a las solicitudes y seguimiento.'
      );
      return;
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = {
      'landing': 'viewLanding',
      'solicitud': 'viewSolicitud',
      'bandeja': 'viewBandeja',
      'dashboard': 'viewDashboard'
    }[tabName];

    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) el.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  // ==============================================================================
  // 7. STEPPER DEL FORMULARIO DIGITAL (FICHA TÉCNICA DICOM)
  // ==============================================================================
  nextStep(currentStep) {
    if (currentStep === 1) {
      const sec = document.getElementById('campoSecretaria').value;
      const dir = document.getElementById('campoDireccionSelect').value;
      const nom = document.getElementById('campoNombreEvento').value.trim();
      const fec = document.getElementById('campoFechaEvento').value;
      const lug = document.getElementById('campoLugarEvento').value.trim();
      const pub = document.getElementById('campoPublicoObjetivo').value.trim();
      const obj = document.getElementById('campoObjetivoMensaje').value.trim();

      if (!sec || !dir || !nom || !fec || !lug || !pub || !obj) {
        this.showToast('Por favor complete todos los campos obligatorios (*) de la Sección 1.', 'error');
        return;
      }
    }

    this.goToStep(currentStep + 1);
  },

  prevStep(currentStep) {
    this.goToStep(currentStep - 1);
  },

  goToStep(stepNumber) {
    state.currentStep = stepNumber;
    for (let i = 1; i <= 4; i++) {
      const content = document.getElementById(`stepContent${i}`);
      const indicator = document.getElementById(`stepIndicator${i}`);
      if (content && indicator) {
        content.classList.toggle('active', i === stepNumber);
        indicator.classList.toggle('active', i === stepNumber);
        if (i < stepNumber) {
          indicator.classList.add('completed');
        } else {
          indicator.classList.remove('completed');
        }
      }
    }
    window.scrollTo({ top: 180, behavior: 'smooth' });
  },

  calculateSlaPreview() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    const recStr = now.toLocaleDateString('es-ES', options);
    const recEl = document.getElementById('previewFechaRecepcion');
    if (recEl) recEl.textContent = `${recStr} (Hoy)`;

    let businessDays = 7;
    let deadline = new Date(now);
    while (businessDays > 0) {
      deadline.setDate(deadline.getDate() + 1);
      const day = deadline.getDay();
      if (day !== 0 && day !== 6) {
        businessDays--;
      }
    }

    const deadStr = deadline.toLocaleDateString('es-ES', options);
    const deadEl = document.getElementById('previewFechaLimite');
    if (deadEl) deadEl.textContent = `${deadStr} (7 días hábiles)`;
  },

  fillDemoData() {
    // Autocompletar con caso real de la Secretaría de Salud
    const secSelect = document.getElementById('campoSecretaria');
    secSelect.value = '9'; // SMS
    this.onSecretariaChange(9);

    const dirSelect = document.getElementById('campoDireccionSelect');
    dirSelect.value = '23'; // Dirección de Gestión en Salud

    document.getElementById('campoNombreEvento').value = 'Campaña Masiva de Vacunación Canina Distrito 4';
    
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 15);
    document.getElementById('campoFechaEvento').value = futureDate.toISOString().split('T')[0];
    
    document.getElementById('campoHoraEvento').value = '09:00';
    document.getElementById('campoLugarEvento').value = 'Centro de Salud Villa Cooperativa, Distrito 4';
    document.getElementById('campoPublicoObjetivo').value = 'Vecinas y vecinos del Distrito 4 con perros y gatos';
    document.getElementById('campoObjetivoMensaje').value = 'Sensibilizar a la ciudadanía sobre la importancia de la vacunación antirrábica obligatoria anual para preservar la salud pública.';
    document.getElementById('campoInfoAdicional').value = 'Participarán brigadas móviles en plazas y unidades educativas.';
    document.getElementById('campoTextoAprobado').value = '¡POR UN EL ALTO SIN RABIA! El Gobierno Autónomo Municipal de El Alto y la Secretaría de Salud invitan a la Gran Jornada de Vacunación Antirrábica Gratuita. Trae a tu perrito o gatito a partir de los 3 meses de edad. Lugar: Centro de Salud Villa Cooperativa. ¡Vacunarlos es amarlos!';

    this.showToast('✅ Formulario autocompletado con caso oficial del GAMEA', 'success');
  },

  handleFilesSelected(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const container = document.getElementById('attachedFilesContainer');
    if (!container) return;

    for (let file of files) {
      const chip = document.createElement('div');
      chip.className = 'file-chip';
      chip.innerHTML = `<span>📌 ${file.name} (${Math.round(file.size / 1024)} KB)</span>
        <button type="button" class="btn-remove-file" onclick="this.parentElement.remove()">×</button>`;
      container.appendChild(chip);
    }

    this.showToast(`${files.length} archivo(s) agregado(s) a la solicitud`, 'info');
  },

  handleFormSubmit(e) {
    e.preventDefault();

    if (!state.currentUser) {
      this.openLoginModal('Debe autenticarse antes de enviar su solicitud.');
      return;
    }

    const secSelect = document.getElementById('campoSecretaria');
    const secText = secSelect.options[secSelect.selectedIndex].text;

    const dirSelect = document.getElementById('campoDireccionSelect');
    const dirText = dirSelect.options[dirSelect.selectedIndex].text;

    const nom = document.getElementById('campoNombreEvento').value;
    const fec = document.getElementById('campoFechaEvento').value;
    const hor = document.getElementById('campoHoraEvento').value;
    const lug = document.getElementById('campoLugarEvento').value;
    const pub = document.getElementById('campoPublicoObjetivo').value;
    const obj = document.getElementById('campoObjetivoMensaje').value;
    const brief = document.getElementById('campoTextoAprobado').value;

    const tipoPieza = document.querySelector('input[name="tipoPieza"]:checked')?.value || 'Afiche';
    const estilo = document.querySelector('input[name="estiloVisual"]:checked')?.value || 'Institucional';
    const material = document.querySelector('input[name="material"]:checked')?.value || 'Digital';
    const orientacion = document.querySelector('input[name="orientacion"]:checked')?.value || 'Vertical';
    
    const plataformas = [];
    document.querySelectorAll('input[name="plataformas"]:checked').forEach(c => plataformas.push(c.value));

    const anio = new Date().getFullYear();
    const correlativo = `SOL-${anio}-00${state.solicitudes.length + 39}`;

    const nuevaSolicitud = {
      id: `sol-${Date.now()}`,
      codigo_tramite: correlativo,
      secretaria: secText,
      direccion: dirText,
      nombre_evento: nom,
      fecha_evento: fec,
      hora_evento: hor || '09:00',
      lugar_evento: lug,
      publico_objetivo: pub,
      objetivo_mensaje: obj,
      tipo_pieza: tipoPieza,
      estilo_visual: estilo,
      material: material,
      orientacion: orientacion,
      plataformas: plataformas.length ? plataformas : ['Facebook'],
      estado: 'PENDIENTE',
      fecha_recepcion: new Date().toISOString().replace('T', ' ').substring(0, 16),
      fecha_limite: 'SLA: 7 días hábiles',
      disenador_asignado: null,
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: brief,
      archivos: ['brief_oficial_firmado.pdf', 'logo_institucional.png']
    };

    state.solicitudes.unshift(nuevaSolicitud);
    this.renderRequests();
    this.updateCounts();

    document.getElementById('formSolicitud').reset();
    this.goToStep(1);
    this.showTab('bandeja');
    this.showToast(`🎉 ¡Solicitud ${correlativo} registrada exitosamente por ${dirText}!`, 'success');
  },

  // ==============================================================================
  // 8. BANDEJA DE TRÁMITES Y CONTROL DE ACCESO
  // ==============================================================================
  renderRequests() {
    const container = document.getElementById('solicitudesContainer');
    if (!container) return;

    let items = state.solicitudes;

    // Si el usuario es SOLICITANTE, filtrar por su Dirección para privacidad
    if (state.currentUser && state.currentUser.rol === 'SOLICITANTE') {
      items = items.filter(s => s.direccion.includes(state.currentUser.direccion) || s.secretaria.includes(state.currentUser.secretaria));
    }

    if (state.activeFilter !== 'TODOS') {
      items = items.filter(s => s.estado === state.activeFilter);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="card-box p-4 text-center" style="grid-column: 1 / -1;">
          <p class="text-muted">No se encontraron solicitudes registradas para este filtro o dependencia.</p>
        </div>`;
      return;
    }

    container.innerHTML = items.map(sol => {
      const badgeInfo = this.getStatusBadge(sol.estado);
      
      return `
        <div class="request-card">
          <div>
            <div class="card-top">
              <span class="tramite-code">${sol.codigo_tramite}</span>
              <span class="status-badge ${badgeInfo.class}">${badgeInfo.label}</span>
            </div>

            <h3 class="tramite-title">${sol.nombre_evento}</h3>
            <p class="tramite-secretaria">${sol.secretaria}</p>
            <p style="font-size:0.75rem; color:var(--gamea-blue); margin-bottom:10px; font-weight:600;">
              🏛️ ${sol.direccion}
            </p>

            <div class="tramite-meta-grid">
              <div class="tramite-meta-item">
                <strong>Pieza / Formato</strong>
                <span>${sol.tipo_pieza} (${sol.orientacion})</span>
              </div>
              <div class="tramite-meta-item">
                <strong>Fecha Evento</strong>
                <span>📅 ${sol.fecha_evento}</span>
              </div>
              <div class="tramite-meta-item">
                <strong>Diseñador DICOM</strong>
                <span>${sol.disenador_asignado ? '🎨 ' + sol.disenador_asignado : '<em class="text-muted">Sin Asignar</em>'}</span>
              </div>
              <div class="tramite-meta-item">
                <strong>Rondas de Cambio</strong>
                <span class="${sol.rondas_cambios_usadas >= 2 ? 'text-gamea-red font-semibold' : ''}">
                  ${sol.rondas_cambios_usadas} de 2 ${sol.rondas_cambios_usadas >= 2 ? '(Agotadas)' : 'disponibles'}
                </span>
              </div>
            </div>
          </div>

          <div class="tramite-footer">
            <span class="text-sm text-muted">SLA: ${sol.fecha_limite}</span>
            <button class="btn btn-sm btn-primary" onclick="app.openDetailModal('${sol.id}')">
              Ver Detalle / Acciones ➔
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  getStatusBadge(estado) {
    const badges = {
      'PENDIENTE': { label: '🟡 Pendiente', class: 'status-amarillo' },
      'EN_REVISION': { label: '🔵 En revisión', class: 'status-azul' },
      'DISENO_PROCESO': { label: '🟣 Diseño en proceso', class: 'status-morado' },
      'AJUSTES': { label: '🟠 Ajustes', class: 'status-naranja' },
      'APROBADO': { label: '🟢 Aprobado', class: 'status-verde' },
      'FINALIZADO': { label: '⚫ Finalizado', class: 'status-gris' }
    };
    return badges[estado] || { label: estado, class: 'status-gris' };
  },

  updateCounts() {
    let items = state.solicitudes;
    if (state.currentUser && state.currentUser.rol === 'SOLICITANTE') {
      items = items.filter(s => s.direccion.includes(state.currentUser.direccion) || s.secretaria.includes(state.currentUser.secretaria));
    }

    const total = items.length;
    const pen = items.filter(s => s.estado === 'PENDIENTE').length;
    const rev = items.filter(s => s.estado === 'EN_REVISION').length;
    const pro = items.filter(s => s.estado === 'DISENO_PROCESO').length;
    const aju = items.filter(s => s.estado === 'AJUSTES').length;
    const apr = items.filter(s => s.estado === 'APROBADO').length;
    const fin = items.filter(s => s.estado === 'FINALIZADO').length;

    const el = (id) => document.getElementById(id);
    if (el('tramitesCount')) el('tramitesCount').textContent = total;
    if (el('countTodos')) el('countTodos').textContent = total;
    if (el('countPendiente')) el('countPendiente').textContent = pen;
    if (el('countRevision')) el('countRevision').textContent = rev;
    if (el('countProceso')) el('countProceso').textContent = pro;
    if (el('countAjustes')) el('countAjustes').textContent = aju;
    if (el('countAprobado')) el('countAprobado').textContent = apr;
    if (el('countFinalizado')) el('countFinalizado').textContent = fin;
  },

  // ==============================================================================
  // 9. MODAL DE DETALLE Y CONTROL DE MODIFICACIONES (CAMBIOS)
  // ==============================================================================
  openDetailModal(solicitudId) {
    const sol = state.solicitudes.find(s => s.id === solicitudId);
    if (!sol) return;

    const modalBackdrop = document.getElementById('modalDetalleBackdrop');
    const codEl = document.getElementById('modalCodigoTramite');
    const titEl = document.getElementById('modalTituloEvento');
    const bodyEl = document.getElementById('modalContentBody');

    codEl.textContent = `${sol.codigo_tramite} • ${this.getStatusBadge(sol.estado).label}`;
    titEl.textContent = sol.nombre_evento;

    const rondasDisponibles = 2 - sol.rondas_cambios_usadas;
    const puedeSolicitarCambio = rondasDisponibles > 0;

    bodyEl.innerHTML = `
      <div class="modal-info-section mb-3">
        <h4 style="font-size:1.05rem; font-weight:700; color:var(--gamea-blue-dark); margin-bottom:8px;">
          📋 Ficha Técnica Institucional (D.M. N° 200)
        </h4>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:14px; font-size:0.88rem;">
          <p><strong>Secretaría Solicitante:</strong> ${sol.secretaria}</p>
          <p><strong>Dirección Ejecutora:</strong> ${sol.direccion}</p>
          <p><strong>Lugar y Fecha:</strong> 📍 ${sol.lugar_evento} | 📅 ${sol.fecha_evento} a las ${sol.hora_evento}</p>
          <p><strong>Público Objetivo:</strong> ${sol.publico_objetivo}</p>
          <p><strong>Objetivo del Mensaje:</strong> ${sol.objetivo_mensaje}</p>
          <p><strong>Formato y Estilo:</strong> ${sol.tipo_pieza} • Estilo ${sol.estilo_visual} • Material ${sol.material}</p>
          <p><strong>Plataformas:</strong> ${sol.plataformas.join(', ')}</p>
          <hr style="margin:10px 0; border:0; border-top:1px solid #E2E8F0;">
          <p><strong>Texto Aprobado (Brief Oficial):</strong></p>
          <blockquote style="background:#FFFFFF; border-left:3px solid var(--gamea-red); padding:8px 12px; margin:6px 0; font-style:italic;">
            "${sol.texto_aprobado}"
          </blockquote>
          <p><strong>Recursos Insumo Adjuntos:</strong> ${sol.archivos.map(a => `📎 ${a}`).join('  |  ')}</p>
        </div>
      </div>

      <!-- MÓDULO DE CONTROL DE MODIFICACIONES -->
      <div class="cambios-box">
        <div class="cambios-header-info">
          <div>
            <h4 style="font-size:1rem; font-weight:700; color:#92400E;">
              🔄 Módulo Oficial de Control de Modificaciones
            </h4>
            <p style="font-size:0.8rem; color:#78350F;">Regla Institucional GAMEA: Máximo 2 rondas de cambios por solicitud.</p>
          </div>
          <span class="rondas-indicator ${rondasDisponibles === 0 ? 'agotadas' : ''}">
            ${sol.rondas_cambios_usadas} de 2 Rondas Usadas (${rondasDisponibles} disponible${rondasDisponibles === 1 ? '' : 's'})
          </span>
        </div>

        <!-- HISTORIAL DE OBSERVACIONES -->
        <div class="mb-3">
          <strong style="font-size:0.82rem; color:#78350F; text-transform:uppercase;">Historial de Observaciones Previas:</strong>
          ${sol.historial_cambios.length === 0 ? 
            `<p class="text-sm text-muted mt-1" style="font-style:italic;">No se han emitido observaciones hasta el momento.</p>` :
            sol.historial_cambios.map(c => `
              <div class="historial-cambios-item mt-1">
                <div class="d-flex justify-between text-sm">
                  <strong>Ronda ${c.ronda} • Solicitado por: ${c.usuario}</strong>
                  <span class="text-muted">${c.fecha}</span>
                </div>
                <p class="mt-1" style="color:#334155;">"${c.motivo}"</p>
              </div>
            `).join('')
          }
        </div>

        <!-- FORMULARIO DE NUEVA OBSERVACIÓN -->
        ${puedeSolicitarCambio ? `
          <div style="background:#FFFFFF; padding:14px; border-radius:8px; border:1px solid #FDE68A;">
            <label style="font-size:0.85rem; font-weight:700; display:block; margin-bottom:6px; color:#92400E;">
              Emitir Observación de Cambio (Ronda ${sol.rondas_cambios_usadas + 1} de 2):
            </label>
            <textarea id="txtObservacionCambio" rows="2" class="form-control" placeholder="Describa con precisión los ajustes solicitados (agrupe todas las observaciones en una sola solicitud)..."></textarea>
            <div class="d-flex justify-between align-center mt-2">
              <span class="text-sm text-muted">⚠️ Esta acción consumirá la Ronda ${sol.rondas_cambios_usadas + 1}.</span>
              <button class="btn btn-sm btn-primary" onclick="app.submitCambio('${sol.id}')">
                Enviar Observaciones (Ronda ${sol.rondas_cambios_usadas + 1})
              </button>
            </div>
          </div>
        ` : `
          <div style="background:#FEE2E2; padding:12px; border-radius:8px; border:1px solid #FCA5A5; color:#991B1B; font-size:0.85rem;">
            🛑 <strong>LÍMITE ALCANZADO:</strong> Se han agotado las 2 rondas de cambios permitidas. Para cualquier ajuste adicional se requiere autorización expresa de la Dirección de Comunicación.
          </div>
        `}
      </div>

      <!-- ACCIONES OPERATIVAS SEGÚN ROL -->
      <div class="mt-4 pt-3 d-flex justify-between align-center flex-wrap gap-2" style="border-top:1px solid #E2E8F0;">
        <div class="d-flex gap-2">
          ${sol.estado !== 'APROBADO' && sol.estado !== 'FINALIZADO' ? `
            <button class="btn btn-sm btn-gold" onclick="app.cambiarEstado('${sol.id}', 'APROBADO')">
              ✅ Aprobar Propuesta (Visto Bueno)
            </button>
          ` : ''}

          ${sol.estado === 'APROBADO' ? `
            <button class="btn btn-sm btn-primary" onclick="app.cambiarEstado('${sol.id}', 'FINALIZADO')">
              📦 Entregar y Finalizar Trámite
            </button>
          ` : ''}

          ${sol.estado === 'PENDIENTE' && (state.currentUser?.rol === 'SUPERVISOR' || state.currentUser?.rol === 'ADMIN') ? `
            <button class="btn btn-sm btn-outline" onclick="app.asignarDisenadorPrompt('${sol.id}')">
              👤 Asignar Diseñador
            </button>
          ` : ''}

          ${(sol.estado === 'EN_REVISION' || sol.estado === 'AJUSTES') && (state.currentUser?.rol === 'DISENADOR' || state.currentUser?.rol === 'SUPERVISOR') ? `
            <button class="btn btn-sm btn-outline" onclick="app.cambiarEstado('${sol.id}', 'DISENO_PROCESO')">
              🎨 Marcar 'En Proceso Creativo'
            </button>
          ` : ''}
        </div>

        <button class="btn btn-sm btn-outline" onclick="app.closeModal()">Cerrar Ventana</button>
      </div>
    `;

    modalBackdrop.classList.add('active');
  },

  closeModal() {
    const modalBackdrop = document.getElementById('modalDetalleBackdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  },

  submitCambio(solicitudId) {
    const sol = state.solicitudes.find(s => s.id === solicitudId);
    if (!sol) return;

    if (sol.rondas_cambios_usadas >= 2) {
      this.showToast('Límite de 2 rondas de cambios alcanzado. Acción bloqueada.', 'error');
      return;
    }

    const txt = document.getElementById('txtObservacionCambio').value.trim();
    if (!txt) {
      this.showToast('Debe ingresar el detalle técnico del cambio solicitado.', 'error');
      return;
    }

    sol.rondas_cambios_usadas++;
    sol.estado = 'AJUSTES';
    sol.historial_cambios.push({
      ronda: sol.rondas_cambios_usadas,
      fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
      usuario: `${state.currentUser ? state.currentUser.nombres + ' ' + state.currentUser.apellidos : 'Solicitante'}`,
      motivo: txt
    });

    this.renderRequests();
    this.updateCounts();
    this.openDetailModal(solicitudId);
    this.showToast(`✅ Ronda de cambios ${sol.rondas_cambios_usadas} de 2 registrada. Solicitud enviada a Ajustes.`, 'success');
  },

  cambiarEstado(solicitudId, nuevoEstado) {
    const sol = state.solicitudes.find(s => s.id === solicitudId);
    if (!sol) return;

    sol.estado = nuevoEstado;
    this.renderRequests();
    this.updateCounts();
    this.openDetailModal(solicitudId);
    this.showToast(`Estado actualizado a: ${this.getStatusBadge(nuevoEstado).label}`, 'success');
  },

  asignarDisenadorPrompt(solicitudId) {
    const dis = prompt('Ingrese el nombre del Diseñador Gráfico asignado:', 'Lic. Marco Antonio Choque');
    if (dis) {
      const sol = state.solicitudes.find(s => s.id === solicitudId);
      if (sol) {
        sol.disenador_asignado = dis;
        sol.estado = 'EN_REVISION';
        this.renderRequests();
        this.updateCounts();
        this.openDetailModal(solicitudId);
        this.showToast(`Asignado exitosamente a: ${dis}`, 'success');
      }
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : (type === 'error' ? '🛑' : 'ℹ️');
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
