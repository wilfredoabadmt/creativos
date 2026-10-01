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
    nombre: 'Despacho del Alcalde',
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

// Alias para compatibilidad institucional
const ORGANIGRAMA_OFICIAL = ORGANIGRAMA_GAMEA;

// ==============================================================================
// 2. USUARIOS OFICIALES POR DIRECCIÓN (SISTEMA DE AUTENTICACIÓN Y ROLES)
// ==============================================================================
const USUARIOS_DIRECCIONES = {
  'dir.salud@elalto.gob.bo': {
    id: 'b0000001-0000-0000-0000-000000000001',
    email: 'dir.salud@elalto.gob.bo',
    nombres: 'Dra. Patricia',
    apellidos: 'Mendoza Limachi',
    cargo: 'Directora de Gestión en Salud',
    secretaria: 'Secretaría Municipal de Salud',
    secretaria_id: 9,
    direccion: 'Dirección de Gestión en Salud',
    direccion_id: 23,
    telefono: '78900001',
    rol: 'SOLICITANTE',
    badge: '🩺 Salud (SMS)'
  },
  'dir.obras@elalto.gob.bo': {
    id: 'b0000001-0000-0000-0000-000000000002',
    email: 'dir.obras@elalto.gob.bo',
    nombres: 'Ing. Roberto',
    apellidos: 'Mamani Condori',
    cargo: 'Director de Obras Municipales',
    secretaria: 'Secretaría Municipal de Infraestructura Pública',
    secretaria_id: 10,
    direccion: 'Dirección de Obras Municipales',
    direccion_id: 30,
    telefono: '78900002',
    rol: 'SOLICITANTE',
    badge: '🏗️ Obras (SMIP)'
  },
  'dir.cultura@elalto.gob.bo': {
    id: 'b0000001-0000-0000-0000-000000000003',
    email: 'dir.cultura@elalto.gob.bo',
    nombres: 'Lic. Marcelo',
    apellidos: 'Paredes Choque',
    cargo: 'Director de Cultura',
    secretaria: 'Secretaría Municipal de Educación y Cultura',
    secretaria_id: 6,
    direccion: 'Dirección de Cultura',
    direccion_id: 15,
    telefono: '78900003',
    rol: 'SOLICITANTE',
    badge: '🎭 Cultura (SMEC)'
  },
  'dir.seguridad@elalto.gob.bo': {
    id: 'b0000001-0000-0000-0000-000000000004',
    email: 'dir.seguridad@elalto.gob.bo',
    nombres: 'Cap. Edwin',
    apellidos: 'Huanca Laura',
    cargo: 'Director de Seguridad Pública',
    secretaria: 'Secretaría Municipal de Seguridad Ciudadana',
    secretaria_id: 8,
    direccion: 'Dirección de Seguridad Pública, Programas y Soluciones Tecnológicas',
    direccion_id: 20,
    telefono: '78900004',
    rol: 'SOLICITANTE',
    badge: '🛡️ Seguridad (SMSC)'
  },
  'dir.finanzas@elalto.gob.bo': {
    id: 'b0000001-0000-0000-0000-000000000005',
    email: 'dir.finanzas@elalto.gob.bo',
    nombres: 'Lic. Carmen',
    apellidos: 'Villavicencio',
    cargo: 'Directora Administrativa',
    secretaria: 'Secretaría Municipal de Administración y Finanzas',
    secretaria_id: 3,
    direccion: 'Dirección Administrativa',
    direccion_id: 6,
    telefono: '78900005',
    rol: 'SOLICITANTE',
    badge: '🏢 Finanzas (SMAF)'
  },
  'dir.artesanias@elalto.gob.bo': {
    id: 'b0000001-0000-0000-0000-000000000006',
    email: 'dir.artesanias@elalto.gob.bo',
    nombres: 'Lic. René',
    apellidos: 'Condori Huallpa',
    cargo: 'Director de Promoción Artesanal',
    secretaria: 'Secretaría Municipal de Desarrollo Económico',
    secretaria_id: 12,
    direccion: 'Dirección de Desarrollo Productivo Artesanal',
    direccion_id: 36,
    telefono: '78900006',
    rol: 'SOLICITANTE',
    badge: '💼 Desarrollo Económico'
  },
  'disenador.marco@elalto.gob.bo': {
    id: 'a0000001-0000-0000-0000-000000000002',
    email: 'disenador.marco@elalto.gob.bo',
    nombres: 'Lic. Marco Antonio',
    apellidos: 'Choque Callisaya',
    cargo: 'Diseñador Creativo Senior',
    secretaria: 'Secretaría Municipal de Gestión Institucional',
    secretaria_id: 2,
    direccion: 'Dirección de Comunicación',
    direccion_id: 4,
    telefono: '77210002',
    rol: 'DISENADOR',
    badge: '🎨 Diseñador DICOM'
  },
  'director.dicom@elalto.gob.bo': {
    id: 'a0000001-0000-0000-0000-000000000001',
    email: 'director.dicom@elalto.gob.bo',
    nombres: 'Lic. Roxana',
    apellidos: 'Vargas Quispe',
    cargo: 'Directora de Comunicación',
    secretaria: 'Secretaría Municipal de Gestión Institucional',
    secretaria_id: 2,
    direccion: 'Dirección de Comunicación',
    direccion_id: 4,
    telefono: '77210001',
    rol: 'SUPERVISOR',
    badge: '⭐ Directora DICOM'
  },
  'admin@elalto.gob.bo': {
    id: 'a0000001-0000-0000-0000-000000000003',
    email: 'admin@elalto.gob.bo',
    nombres: 'Ing. Wilfredo',
    apellidos: 'Abad Mancilla',
    cargo: 'Administrador General de Sistemas',
    secretaria: 'Despacho del Alcalde',
    secretaria_id: 1,
    direccion: 'Dirección General de Asesoría Legal / Sistemas',
    direccion_id: 1,
    telefono: '77210000',
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
  showOnlyMyDirection: true, // Para Solicitantes: alterna vista propia vs vista institucional completa
  usuariosState: {
    pagina: 1,
    limite: 10,
    total: 0,
    paginas: 1,
    filtroRol: '',
    filtroSecretaria: '',
    filtroEstado: 'todos',
    busqueda: '',
    subtabActual: 'usuarios',
    usuarios: [],
    roles: []
  },
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
      texto_aprobado: 'El Alcalde de El Alto se complace en invitar a usted a la Solemne Sesión de Honor.',
      archivos: ['texto_protocolar_visado.pdf']
    }
  ]
};

// ==============================================================================
// 4. OBJETO PRINCIPAL DE LA APLICACIÓN
// ==============================================================================
const app = {
  async init() {
    this.bindEvents();
    this.updateCurrentDate();
    this.populateSecretariasSelect();

    // Restaurar sesión institucional persistente si existe
    try {
      const savedEmail = localStorage.getItem('creativos_user_email');
      if (savedEmail && USUARIOS_DIRECCIONES[savedEmail.toLowerCase()]) {
        state.currentUser = USUARIOS_DIRECCIONES[savedEmail.toLowerCase()];
      }
    } catch (e) {
      console.warn('localStorage no disponible');
    }

    await this.loadSolicitudesFromApi();
    this.applyUserConstraintsToForm();
    this.calculateSlaPreview();
    this.updateCounts();
    this.updateAuthUI();
  },

  async loadSolicitudesFromApi() {
    try {
      const res = await fetch('/api/solicitudes');
      if (res.ok) {
        const json = await res.json();
        if (json.exito && Array.isArray(json.data)) {
          state.solicitudes = json.data;
          this.renderRequests();
          this.updateCounts();
          this.renderDashboard();
        }
      }
    } catch (err) {
      console.warn('⚠️ No se pudo cargar solicitudes de la base de datos:', err);
    }
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

    // Subtabs del módulo de usuarios
    document.querySelectorAll('.usuarios-subtabs .subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const subtab = e.currentTarget.getAttribute('data-subtab');
        this.switchUsuariosSubtab(subtab);
      });
    });

    // Botón Nuevo Usuario
    const btnNuevoUsuario = document.getElementById('btnNuevoUsuario');
    if (btnNuevoUsuario) {
      btnNuevoUsuario.addEventListener('click', () => this.openModalUsuario());
    }

    // Filtros de usuarios
    const filterRol = document.getElementById('filterUsuarioRol');
    if (filterRol) {
      filterRol.addEventListener('change', (e) => {
        state.usuariosState.filtroRol = e.target.value;
        state.usuariosState.pagina = 1;
        this.loadUsuarios();
      });
    }

    const filterSec = document.getElementById('filterUsuarioSecretaria');
    if (filterSec) {
      filterSec.addEventListener('change', (e) => {
        state.usuariosState.filtroSecretaria = e.target.value;
        state.usuariosState.pagina = 1;
        this.loadUsuarios();
      });
    }

    const filterEstado = document.getElementById('filterUsuarioEstado');
    if (filterEstado) {
      filterEstado.addEventListener('change', (e) => {
        state.usuariosState.filtroEstado = e.target.value;
        state.usuariosState.pagina = 1;
        this.loadUsuarios();
      });
    }

    const searchInput = document.getElementById('searchUsuario');
    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.usuariosState.busqueda = e.target.value.trim();
          state.usuariosState.pagina = 1;
          this.loadUsuarios();
        }, 300);
      });
    }

    // Eventos Modal Usuario
    const btnCerrarModal = document.getElementById('btnCerrarModalUsuario');
    const btnCancelarModal = document.getElementById('btnCancelarUsuario');
    if (btnCerrarModal) btnCerrarModal.addEventListener('click', () => this.closeModalUsuario());
    if (btnCancelarModal) btnCancelarModal.addEventListener('click', () => this.closeModalUsuario());

    const formUsuario = document.getElementById('formUsuario');
    if (formUsuario) {
      formUsuario.addEventListener('submit', (e) => this.handleUsuarioSubmit(e));
    }

    const selectModalSec = document.getElementById('usuarioSecretaria');
    if (selectModalSec) {
      selectModalSec.addEventListener('change', (e) => {
        this.onUsuarioSecretariaModalChange(e.target.value);
      });
    }

    // Modal Reset Password
    const btnCerrarReset = document.getElementById('btnCerrarResetPass');
    if (btnCerrarReset) btnCerrarReset.addEventListener('click', () => this.closeModalResetPass());

    const btnCopyPass = document.getElementById('btnCopyPassword');
    if (btnCopyPass) {
      btnCopyPass.addEventListener('click', () => this.copyResetPassword());
    }

    // ESC para cerrar modales
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
        this.closeLoginModal();
        this.closeModalUsuario();
        this.closeModalResetPass();
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
    if (tabName === 'usuarios') {
      if (!state.currentUser) {
        this.openLoginModal(
          '⚠️ Acceso Restringido: Inicie sesión como Administrador para acceder a la Gestión de Usuarios.'
        );
        return;
      }
      if (state.currentUser.rol !== 'ADMIN' && state.currentUser.rol_id !== 1) {
        this.showToast('Acceso denegado: solo el Administrador General puede gestionar usuarios.', 'error');
        return;
      }
    } else if (!state.currentUser && (tabName === 'solicitud' || tabName === 'bandeja' || tabName === 'dashboard')) {
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
    try {
      localStorage.setItem('creativos_user_email', email.toLowerCase());
    } catch (e) {}

    this.closeLoginModal();
    this.updateAuthUI();
    this.applyUserConstraintsToForm();
    this.renderRequests();
    this.updateCounts();

    this.showToast(`✅ Bienvenido, ${user.nombres} ${user.apellidos} (${user.direccion})`, 'success');
    this.showTab('bandeja');
  },

  logout() {
    state.currentUser = null;
    try {
      localStorage.removeItem('creativos_user_email');
    } catch (e) {}
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

      protectedBtns.forEach(btn => {
        if (btn.classList.contains('nav-btn-admin')) {
          btn.style.display = (state.currentUser.rol === 'ADMIN' || state.currentUser.rol_id === 1) ? 'inline-flex' : 'none';
        } else {
          btn.style.display = 'inline-flex';
        }
      });

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
          <button class="btn-nav-login" onclick="app.openLoginModal()">
            <span>🔐</span> Ingresar al Sistema
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
        // Bloquear al Solicitante en su propia Secretaría y Dirección institucional
        selectSec.value = state.currentUser.secretaria_id;
        this.onSecretariaChange(state.currentUser.secretaria_id);
        selectDir.value = state.currentUser.direccion_id;

        selectSec.disabled = true;
        selectDir.disabled = true;
      } else {
        // Directores, Supervisores o Admins pueden seleccionar cualquiera
        selectSec.disabled = false;
        selectDir.disabled = false;
        if (!selectSec.value && state.currentUser.secretaria_id) {
          selectSec.value = state.currentUser.secretaria_id;
          this.onSecretariaChange(state.currentUser.secretaria_id);
          if (state.currentUser.direccion_id) selectDir.value = state.currentUser.direccion_id;
        }
      }
    }

    // Autocompletar datos del solicitante (Sección 5)
    const nomInput = document.getElementById('campoSolicitanteNombre');
    const cargoInput = document.getElementById('campoSolicitanteCargo');
    const telInput = document.getElementById('campoSolicitanteTelefono');
    if (nomInput) {
      nomInput.value = `${state.currentUser.nombres} ${state.currentUser.apellidos}`;
    }
    if (cargoInput) {
      cargoInput.value = state.currentUser.cargo || 'Funcionario Municipal';
    }
    if (telInput && state.currentUser.telefono) {
      telInput.value = state.currentUser.telefono;
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
    selectDir.innerHTML = `<option value="">-- Seleccione Dirección / Unidad Solicitante --</option>` +
      sec.direcciones.map(dir => `
        <option value="${dir.id}">${dir.nombre} (${dir.sigla})</option>
      `).join('');
  },

  showTab(tabName) {
    if (tabName === 'usuarios') {
      if (!state.currentUser || (state.currentUser.rol !== 'ADMIN' && state.currentUser.rol_id !== 1)) {
        this.showToast('Acceso denegado: solo el Administrador General puede acceder a la Gestión de Usuarios.', 'error');
        return;
      }
    } else if (!state.currentUser && (tabName === 'solicitud' || tabName === 'bandeja' || tabName === 'dashboard')) {
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
      'dashboard': 'viewDashboard',
      'usuarios': 'viewUsuarios'
    }[tabName];

    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) el.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (tabName === 'solicitud') {
      this.applyUserConstraintsToForm();
    } else if (tabName === 'bandeja') {
      this.renderRequests();
      this.updateCounts();
    } else if (tabName === 'usuarios') {
      this.renderUsersView();
    }
  },

  // ==============================================================================
  // 7. STEPPER DEL FORMULARIO DIGITAL (FICHA TÉCNICA DICOM - 5 PASOS / 6 SECCIONES)
  // ==============================================================================
  toggleOtroTipoPieza(show) {
    const wrap = document.getElementById('wrapperTipoPiezaOtro');
    if (wrap) wrap.style.display = show ? 'block' : 'none';
  },

  toggleOtroEstiloVisual(show) {
    const wrap = document.getElementById('wrapperEstiloVisualOtro');
    if (wrap) wrap.style.display = show ? 'block' : 'none';
  },

  toggleMaterialImpreso(isImpreso) {
    const wrap = document.getElementById('wrapperTamanoImpreso');
    if (wrap) wrap.style.display = isImpreso ? 'block' : 'none';
  },

  toggleOtraPlataforma(checked) {
    const wrap = document.getElementById('wrapperPlataformaOtro');
    if (wrap) wrap.style.display = checked ? 'block' : 'none';
  },

  nextStep(currentStep) {
    if (currentStep === 1) {
      const sec = document.getElementById('campoSecretaria')?.value;
      const dir = document.getElementById('campoDireccionSelect')?.value;
      const nom = document.getElementById('campoNombreEvento')?.value.trim();
      const fec = document.getElementById('campoFechaEvento')?.value;
      const lug = document.getElementById('campoLugarEvento')?.value.trim();
      const pub = document.getElementById('campoPublicoObjetivo')?.value.trim();
      const obj = document.getElementById('campoObjetivoMensaje')?.value.trim();

      const hasSec = sec || (state.currentUser && state.currentUser.secretaria_id);
      const hasDir = dir || (state.currentUser && state.currentUser.direccion_id);

      if (!hasSec || !hasDir || !nom || !fec || !lug || !pub || !obj) {
        this.showToast('Por favor complete todos los campos obligatorios (*) de la Sección 1.', 'error');
        return;
      }
    } else if (currentStep === 2) {
      const radioOtroTipo = document.getElementById('radioTipoOtro');
      if (radioOtroTipo && radioOtroTipo.checked) {
        const otroTipoVal = document.getElementById('campoTipoPiezaOtro').value.trim();
        if (!otroTipoVal) {
          this.showToast('Por favor especifique el tipo de diseño en el campo "Otro".', 'error');
          return;
        }
      }
      const radioOtroEstilo = document.getElementById('radioEstiloOtro');
      if (radioOtroEstilo && radioOtroEstilo.checked) {
        const otroEstiloVal = document.getElementById('campoEstiloVisualOtro').value.trim();
        if (!otroEstiloVal) {
          this.showToast('Por favor especifique el estilo visual en el campo "Otro".', 'error');
          return;
        }
      }
    } else if (currentStep === 3) {
      const mat = document.querySelector('input[name="material"]:checked')?.value;
      if (mat === 'Impreso' || mat === 'Ambos') {
        const tam = document.getElementById('campoTamanoImpreso').value.trim();
        if (!tam) {
          this.showToast('Por favor indique el tamaño de impresión requerido (ej. Carta, A3, 2x1m).', 'error');
          return;
        }
      }
      const formatoReq = document.getElementById('campoFormatoRequerido').value.trim();
      if (!formatoReq) {
        this.showToast('Por favor indique el formato técnico requerido (ej. PDF imprenta, JPG alta calidad).', 'error');
        return;
      }
    } else if (currentStep === 4) {
      const chkTexto = document.getElementById('checkTextoAprobado').checked;
      const chkLogos = document.getElementById('checkLogosCalidad').checked;
      const brief = document.getElementById('campoTextoAprobado').value.trim();

      if (!chkTexto || !chkLogos) {
        this.showToast('Debe marcar las casillas obligatorias de Texto y Logotipos revisados en el checklist.', 'error');
        return;
      }
      if (!brief) {
        this.showToast('Por favor pegue el texto oficial revisado y aprobado para la pieza gráfica.', 'error');
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
    for (let i = 1; i <= 5; i++) {
      const content = document.getElementById(`stepContent${i}`);
      const indicator = document.getElementById(`stepIndicator${i}`);
      const dot = indicator ? indicator.querySelector('.step-dot') : null;
      const line = document.getElementById(`stepLine${i}`);
      
      if (content && indicator) {
        content.classList.toggle('active', i === stepNumber);
        indicator.classList.toggle('active', i === stepNumber);
        
        if (i < stepNumber) {
          indicator.classList.add('completed');
          if (dot) dot.innerHTML = '✓';
        } else {
          indicator.classList.remove('completed');
          if (dot) dot.textContent = i;
        }
      }
      
      if (line) {
        line.classList.toggle('completed', i < stepNumber);
      }
    }
    const formBox = document.querySelector('.card-box');
    if (formBox) {
      const topOffset = formBox.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
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
    document.getElementById('campoPublicoObjetivo').value = 'Vecinas y vecinos del Distrito 4 con mascotas (perros y gatos)';
    document.getElementById('campoObjetivoMensaje').value = 'Sensibilizar a la ciudadanía sobre la importancia de la vacunación antirrábica anual obligatoria para preservar la salud pública.';
    document.getElementById('campoInfoAdicional').value = 'Tel: 2834567, WhatsApp: 71512345, requisitos: llevar carnet de vacunas y animales con correa.';
    
    // Sección 3: Formato
    const radioAmbos = document.querySelector('input[name="material"][value="Ambos"]');
    if (radioAmbos) {
      radioAmbos.checked = true;
      this.toggleMaterialImpreso(true);
    }
    const tamInput = document.getElementById('campoTamanoImpreso');
    if (tamInput) tamInput.value = 'Doble Carta (28x43 cm) y Afiche A3';
    
    const formatoInput = document.getElementById('campoFormatoRequerido');
    if (formatoInput) formatoInput.value = 'PDF imprenta 300 DPI y JPG alta resolución para redes';

    // Sección 4: Material
    document.getElementById('checkTextoAprobado').checked = true;
    document.getElementById('checkLogosCalidad').checked = true;
    document.getElementById('checkFotografias').checked = true;
    document.getElementById('checkQrEnlaces').checked = true;
    document.getElementById('campoTextoAprobado').value = '¡POR UN EL ALTO SIN RABIA! El Gobierno Autónomo Municipal de El Alto y la Secretaría de Salud invitan a la Gran Jornada de Vacunación Antirrábica Gratuita. Trae a tu mascota a partir de los 3 meses de edad. Lugar: Centro de Salud Villa Cooperativa. Horario: 08:30 a 16:00. ¡Vacunarlos es cuidarnos!';

    // Sección 5: Solicitante
    document.getElementById('campoSolicitanteNombre').value = 'Dra. Patricia Mendoza Limachi';
    document.getElementById('campoSolicitanteCargo').value = 'Directora de Gestión en Salud (SMS)';
    document.getElementById('campoSolicitanteTelefono').value = '71544332';
    document.getElementById('checkVoBo').checked = true;

    this.showToast('✅ Ficha técnica autocompletada conforme a la normativa oficial', 'success');
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

  async handleFormSubmit(e) {
    e.preventDefault();

    if (!state.currentUser) {
      this.openLoginModal('Debe autenticarse antes de enviar su solicitud.');
      return;
    }

    const secSelect = document.getElementById('campoSecretaria');
    const dirSelect = document.getElementById('campoDireccionSelect');

    const secId = state.currentUser?.rol === 'SOLICITANTE'
      ? state.currentUser.secretaria_id
      : (parseInt(secSelect?.value, 10) || state.currentUser?.secretaria_id || 2);

    const dirId = state.currentUser?.rol === 'SOLICITANTE'
      ? state.currentUser.direccion_id
      : (parseInt(dirSelect?.value, 10) || state.currentUser?.direccion_id || 4);

    const secText = (state.currentUser?.rol === 'SOLICITANTE' && state.currentUser.secretaria)
      ? state.currentUser.secretaria
      : (secSelect && secSelect.selectedIndex >= 0 && secSelect.options[secSelect.selectedIndex]
          ? secSelect.options[secSelect.selectedIndex].text
          : (state.currentUser?.secretaria || 'Secretaría Municipal de Gestión Institucional'));

    const dirText = (state.currentUser?.rol === 'SOLICITANTE' && state.currentUser.direccion)
      ? state.currentUser.direccion
      : (dirSelect && dirSelect.selectedIndex >= 0 && dirSelect.options[dirSelect.selectedIndex]
          ? dirSelect.options[dirSelect.selectedIndex].text
          : (state.currentUser?.direccion || 'Dirección de Comunicación'));

    const nom = document.getElementById('campoNombreEvento').value.trim();
    const fec = document.getElementById('campoFechaEvento').value;
    const hor = document.getElementById('campoHoraEvento').value;
    const lug = document.getElementById('campoLugarEvento').value.trim();
    const pub = document.getElementById('campoPublicoObjetivo').value.trim();
    const obj = document.getElementById('campoObjetivoMensaje').value.trim();
    const infoAdicional = document.getElementById('campoInfoAdicional').value.trim();

    if (!nom || !fec || !lug || !pub || !obj) {
      this.showToast('Por favor complete todos los datos obligatorios (*) del evento en el Paso 1.', 'error');
      this.goToStep(1);
      return;
    }

    let tipoPieza = document.querySelector('input[name="tipoPieza"]:checked')?.value || 'Afiche informativo';
    let tipoPiezaOtro = null;
    if (tipoPieza === 'Otro') {
      tipoPiezaOtro = document.getElementById('campoTipoPiezaOtro').value || 'Otro diseño especificado';
    }

    let estilo = document.querySelector('input[name="estiloVisual"]:checked')?.value || 'Institucional / formal';
    let estiloOtro = null;
    if (estilo === 'Otro') {
      estiloOtro = document.getElementById('campoEstiloVisualOtro').value || 'Otro estilo especificado';
    }

    const material = document.querySelector('input[name="material"]:checked')?.value || 'Digital';
    const tamanoImpreso = document.getElementById('campoTamanoImpreso')?.value || null;
    const orientacion = document.querySelector('input[name="orientacion"]:checked')?.value || 'Vertical';
    
    const plataformas = [];
    document.querySelectorAll('input[name="plataformas"]:checked').forEach(c => {
      if (c.value === 'Otro') {
        const otraPlat = document.getElementById('campoPlataformaOtro')?.value;
        if (otraPlat) plataformas.push(otraPlat);
      } else {
        plataformas.push(c.value);
      }
    });

    const formatoRequerido = document.getElementById('campoFormatoRequerido').value;
    const brief = document.getElementById('campoTextoAprobado').value;

    const solicitanteNombre = document.getElementById('campoSolicitanteNombre').value;
    const solicitanteCargo = document.getElementById('campoSolicitanteCargo').value;
    const solicitanteTelefono = document.getElementById('campoSolicitanteTelefono').value;
    const vobo = document.getElementById('checkVoBo').checked;

    if (!vobo) {
      this.showToast('Debe otorgar el V.º B.º y firma de conformidad para enviar la solicitud.', 'error');
      return;
    }

    const payload = {
      secretaria: secText,
      secretaria_id: secId,
      direccion: dirText,
      direccion_id: dirId,
      nombre_evento: nom,
      fecha_evento: fec,
      hora_evento: hor || '09:00',
      lugar_evento: lug,
      publico_objetivo: pub,
      objetivo_mensaje: obj,
      datos_adicionales: infoAdicional,
      tipo_pieza: tipoPieza,
      tipo_pieza_otro: tipoPiezaOtro,
      estilo_visual: estilo,
      estilo_otro: estiloOtro,
      material: material,
      tamano_impreso: tamanoImpreso,
      orientacion: orientacion,
      plataformas: plataformas.length ? plataformas : ['Facebook'],
      formato_requerido: formatoRequerido,
      texto_aprobado: brief,
      solicitante: {
        nombre: solicitanteNombre,
        cargo: solicitanteCargo,
        telefono: solicitanteTelefono
      },
      solicitante_id: state.currentUser ? state.currentUser.id : null,
      check_fotografias: document.querySelector('input[name="insumosCheck"][value="fotos"]')?.checked || false,
      check_qr_enlaces: document.querySelector('input[name="insumosCheck"][value="qr"]')?.checked || false,
      check_otros_elementos: document.querySelector('input[name="insumosCheck"][value="otros"]')?.checked || false
    };

    let correlativoGenerado = `SOL-${new Date().getFullYear()}-0001`;

    try {
      this.showToast('⏳ Registrando ficha técnica en PostgreSQL...', 'info');
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      if (result.exito) {
        correlativoGenerado = result.data?.codigo_tramite || correlativoGenerado;
        this.showToast(`🎉 ¡${result.mensaje || 'Ficha técnica guardada en PostgreSQL'}!`, 'success');

        // Insertar inmediatamente en la lista para visualización instantánea
        const nuevaSolicitud = {
          id: result.data?.id || `sol-${Date.now()}`,
          codigo_tramite: correlativoGenerado,
          secretaria: secText,
          direccion: dirText,
          nombre_evento: nom,
          fecha_evento: fec,
          hora_evento: hor || '09:00',
          lugar_evento: lug,
          publico_objetivo: pub,
          objetivo_mensaje: obj,
          informacion_adicional: infoAdicional,
          tipo_pieza: tipoPieza,
          estilo_visual: estilo,
          material: material,
          tamano_impreso: tamanoImpreso,
          orientacion: orientacion,
          plataformas: plataformas.length ? plataformas : ['Facebook'],
          formato_requerido: formatoRequerido,
          texto_aprobado: brief,
          solicitante: {
            nombre: solicitanteNombre,
            cargo: solicitanteCargo,
            telefono: solicitanteTelefono
          },
          vobo_aceptado: true,
          estado_codigo: 'PENDIENTE',
          estado: '🟡 Pendiente',
          estado_color: '#EAB308',
          fecha_recepcion: result.data?.fecha_recepcion || new Date().toISOString().replace('T', ' ').substring(0, 16),
          fecha_limite: result.data?.fecha_limite || 'SLA: 7 días hábiles',
          disenador_asignado: 'Por Asignar',
          rondas_cambios_usadas: 0,
          historial_cambios: [],
          archivos: ['logo_gamea_oficial.png', 'brief_firmado.pdf'],
          created_at: new Date().toISOString()
        };

        state.solicitudes.unshift(nuevaSolicitud);
        this.renderRequests();
        this.updateCounts();
        await this.loadSolicitudesFromApi();
      } else {
        throw new Error(result.error || result.mensaje);
      }
    } catch (err) {
      console.warn('⚠️ Guardado local temporal (PostgreSQL en reconexión):', err.message);
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
        datos_adicionales: infoAdicional,
        tipo_pieza: tipoPieza,
        estilo_visual: estilo,
        material: material,
        tamano_impreso: tamanoImpreso,
        orientacion: orientacion,
        plataformas: plataformas.length ? plataformas : ['Facebook'],
        formato_requerido: formatoRequerido,
        texto_aprobado: brief,
        solicitante: {
          nombre: solicitanteNombre,
          cargo: solicitanteCargo,
          telefono: solicitanteTelefono
        },
        vobo_aprobado: true,
        estado: 'PENDIENTE',
        fecha_recepcion: new Date().toISOString().replace('T', ' ').substring(0, 16),
        fecha_limite: 'SLA: 7 días hábiles',
        disenador_asignado: null,
        rondas_cambios_usadas: 0,
        historial_cambios: [],
        archivos: ['brief_oficial_firmado.pdf', 'logo_institucional.png']
      };
      state.solicitudes.unshift(nuevaSolicitud);
      this.renderRequests();
      this.updateCounts();
    }

    document.getElementById('formSolicitud').reset();
    this.applyUserConstraintsToForm();
    this.goToStep(1);
    this.showTab('bandeja');
  },

  // ==============================================================================
  // 8. BANDEJA DE TRÁMITES Y CONTROL DE ACCESO
  // ==============================================================================
  toggleTrayFilter(onlyMine) {
    state.showOnlyMyDirection = onlyMine;
    this.renderRequests();
    this.updateCounts();
  },

  setFilter(filterName) {
    document.querySelectorAll('.filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === filterName);
    });
    state.activeFilter = filterName;
    this.renderRequests();
  },

  renderRequests() {
    const container = document.getElementById('solicitudesContainer');
    if (!container) return;

    const noticeContainer = document.getElementById('trayFilterNotice');
    let items = state.solicitudes || [];

    // Comprobar rol de solicitante para filtro contextual
    const isSolicitante = state.currentUser && state.currentUser.rol === 'SOLICITANTE';

    if (noticeContainer) {
      if (isSolicitante) {
        noticeContainer.style.display = 'flex';
        if (state.showOnlyMyDirection) {
          noticeContainer.innerHTML = `
            <div>
              <span>🏛️ <strong>Filtrado por tu dependencia:</strong> ${state.currentUser.direccion}</span>
            </div>
            <button type="button" class="btn btn-sm btn-outline" style="border-color:#3B82F6; color:#1E40AF; background:#fff;" onclick="app.toggleTrayFilter(false)">
              🌐 Ver todas las solicitudes del municipio
            </button>
          `;
        } else {
          noticeContainer.innerHTML = `
            <div>
              <span>🌐 <strong>Vista Global:</strong> Mostrando solicitudes de todas las dependencias del GAM El Alto</span>
            </div>
            <button type="button" class="btn btn-sm btn-outline" style="border-color:#3B82F6; color:#1E40AF; background:#fff;" onclick="app.toggleTrayFilter(true)">
              🏛️ Filtrar solo mi dependencia (${state.currentUser.badge || state.currentUser.direccion})
            </button>
          `;
        }
      } else if (state.currentUser) {
        noticeContainer.style.display = 'flex';
        noticeContainer.innerHTML = `
          <div>
            <span>⭐ <strong>Bandeja Central DICOM:</strong> Vista institucional para supervisión, asignación y control técnico</span>
          </div>
          <span class="badge-role" style="background:var(--gamea-blue); color:#fff; padding:4px 10px; border-radius:12px; font-size:0.8rem; font-weight:600;">${state.currentUser.badge || state.currentUser.cargo}</span>
        `;
      } else {
        noticeContainer.style.display = 'none';
      }
    }

    if (isSolicitante && state.showOnlyMyDirection) {
      const userDir = (state.currentUser.direccion || '').toLowerCase();
      const userSec = (state.currentUser.secretaria || '').toLowerCase();
      items = items.filter(s => {
        const sDir = (s.direccion || '').toLowerCase();
        const sSec = (s.secretaria || '').toLowerCase();
        return sDir.includes(userDir) || userDir.includes(sDir) || sSec.includes(userSec);
      });
    }

    if (state.activeFilter !== 'TODOS') {
      items = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === state.activeFilter);
    }

    if (items.length === 0) {
      if (isSolicitante && state.showOnlyMyDirection) {
        container.innerHTML = `
          <div class="card-box p-4 text-center" style="grid-column: 1 / -1; background:#ffffff; border-radius:12px; border:1px dashed #CBD5E1; padding: 40px 20px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">📋</div>
            <h4 style="color: var(--gamea-blue); margin-bottom: 8px;">No hay solicitudes registradas para tu dependencia</h4>
            <p class="text-muted" style="max-width: 550px; margin: 0 auto 20px; font-size: 0.95rem;">
              Tu unidad (<strong>${state.currentUser.direccion}</strong>) aún no tiene solicitudes con este estado.
            </p>
            <div class="d-flex justify-center gap-2 flex-wrap">
              <button class="btn btn-primary" onclick="app.showTab('solicitud')">
                <span>➕</span> Crear Nueva Solicitud
              </button>
              <button class="btn btn-outline" onclick="app.toggleTrayFilter(false)">
                🌐 Ver todas las solicitudes del municipio
              </button>
            </div>
          </div>`;
      } else {
        container.innerHTML = `
          <div class="card-box p-4 text-center" style="grid-column: 1 / -1; background:#ffffff; border-radius:12px; border:1px dashed #CBD5E1; padding: 40px 20px;">
            <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
            <h4 style="color: var(--gamea-blue); margin-bottom: 8px;">No se encontraron solicitudes</h4>
            <p class="text-muted" style="margin-bottom: 16px;">No hay trámites para el filtro seleccionado (${state.activeFilter}).</p>
            <button class="btn btn-outline btn-sm" onclick="app.setFilter('TODOS')">
              Mostrar todas las solicitudes
            </button>
          </div>`;
      }
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

  normalizeEstado(estado) {
    if (!estado) return 'PENDIENTE';
    const s = estado.toString().toUpperCase();
    if (s.includes('PENDIENT')) return 'PENDIENTE';
    if (s.includes('REVISI')) return 'EN_REVISION';
    if (s.includes('PROCES')) return 'DISENO_PROCESO';
    if (s.includes('AJUST')) return 'AJUSTES';
    if (s.includes('APROBAD')) return 'APROBADO';
    if (s.includes('FINALIZ')) return 'FINALIZADO';
    return s;
  },

  getStatusBadge(estado) {
    const norm = this.normalizeEstado(estado);
    const badges = {
      'PENDIENTE': { label: '🟡 Pendiente', class: 'status-amarillo' },
      'EN_REVISION': { label: '🔵 En revisión', class: 'status-azul' },
      'DISENO_PROCESO': { label: '🟣 Diseño en proceso', class: 'status-morado' },
      'AJUSTES': { label: '🟠 Ajustes', class: 'status-naranja' },
      'APROBADO': { label: '🟢 Aprobado', class: 'status-verde' },
      'FINALIZADO': { label: '⚫ Finalizado', class: 'status-gris' }
    };
    return badges[norm] || { label: estado || '🟡 Pendiente', class: 'status-amarillo' };
  },

  updateCounts() {
    let items = state.solicitudes || [];
    const isSolicitante = state.currentUser && state.currentUser.rol === 'SOLICITANTE';

    if (isSolicitante && state.showOnlyMyDirection) {
      const userDir = (state.currentUser.direccion || '').toLowerCase();
      const userSec = (state.currentUser.secretaria || '').toLowerCase();
      items = items.filter(s => {
        const sDir = (s.direccion || '').toLowerCase();
        const sSec = (s.secretaria || '').toLowerCase();
        return sDir.includes(userDir) || userDir.includes(sDir) || sSec.includes(userSec);
      });
    }

    const total = items.length;
    const pen = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === 'PENDIENTE').length;
    const rev = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === 'EN_REVISION').length;
    const pro = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === 'DISENO_PROCESO').length;
    const aju = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === 'AJUSTES').length;
    const apr = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === 'APROBADO').length;
    const fin = items.filter(s => this.normalizeEstado(s.estado || s.estado_codigo) === 'FINALIZADO').length;

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
    try {
      const sol = state.solicitudes.find(s => String(s.id) === String(solicitudId) || s.codigo_tramite === solicitudId);
      if (!sol) {
        console.warn('Solicitud no encontrada con ID:', solicitudId);
        this.showToast('No se encontró el detalle del trámite seleccionado.', 'warning');
        return;
      }

      const modalBackdrop = document.getElementById('modalDetalleBackdrop');
      const codEl = document.getElementById('modalCodigoTramite');
      const titEl = document.getElementById('modalTituloEvento');
      const bodyEl = document.getElementById('modalContentBody');

      if (!modalBackdrop || !bodyEl) {
        console.error('Elementos del modal no encontrados en el DOM');
        return;
      }

      const estadoObj = this.getStatusBadge(sol.estado || sol.estado_codigo);
      if (codEl) codEl.textContent = `${sol.codigo_tramite || 'SOL-2026'} • ${estadoObj.label}`;
      if (titEl) titEl.textContent = sol.nombre_evento || 'Detalle del Requerimiento';

      const rondasUsadas = Number(sol.rondas_cambios_usadas) || 0;
      const rondasDisponibles = Math.max(0, 2 - rondasUsadas);
      const puedeSolicitarCambio = rondasDisponibles > 0;

      const plataformasText = Array.isArray(sol.plataformas)
        ? sol.plataformas.join(', ')
        : (sol.plataformas || 'Redes Sociales Institucionales (Facebook, Instagram, TikTok)');

      const archivosList = Array.isArray(sol.archivos) && sol.archivos.length > 0
        ? sol.archivos
        : ['logo_gamea_oficial.png', 'brief_aprobado_sms.pdf'];

      const historialCambios = Array.isArray(sol.historial_cambios)
        ? sol.historial_cambios
        : [];

      const solicitanteInfo = typeof sol.solicitante === 'object' && sol.solicitante !== null
        ? `${sol.solicitante.nombre || 'Servidor Público'} (${sol.solicitante.cargo || 'Responsable'}) — 📞 Tel/WhatsApp: ${sol.solicitante.telefono || 'S/N'}`
        : `${sol.solicitante_nombre || 'Servidor Público'} (${sol.solicitante_cargo || 'Responsable'}) — 📞 Tel/WhatsApp: ${sol.solicitante_telefono || 'S/N'}`;

      const datosAdicionales = sol.informacion_adicional || sol.datos_adicionales || '';
      const orientacionText = sol.orientacion ? String(sol.orientacion).toUpperCase() : 'VERTICAL';
      const materialText = sol.material ? String(sol.material).toUpperCase() : 'DIGITAL';
      const tamanoText = sol.tamano_impreso ? `(Tamaño: ${sol.tamano_impreso})` : '';

      bodyEl.innerHTML = `
        <div class="modal-info-section mb-3">
          <h4 style="font-size:1.05rem; font-weight:700; color:var(--gamea-blue-dark); margin-bottom:8px;">
            📋 Ficha Técnica Institucional (D.M. N° 200)
          </h4>
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:14px; font-size:0.88rem;">
            <p><strong>1. Dependencia:</strong> ${sol.secretaria || 'GAM El Alto'} — ${sol.direccion || 'Dirección Solicitante'}</p>
            <p><strong>Lugar y Fecha:</strong> 📍 ${sol.lugar_evento || 'Ciudad de El Alto'} | 📅 ${sol.fecha_evento || 'Fecha por confirmar'} a las ${sol.hora_evento || '09:00'}</p>
            <p><strong>Público Objetivo:</strong> ${sol.publico_objetivo || 'Población en general'}</p>
            <p><strong>Objetivo del Mensaje:</strong> ${sol.objetivo_mensaje || 'Difusión institucional'}</p>
            ${datosAdicionales ? `<p><strong>Datos Adicionales:</strong> ${datosAdicionales}</p>` : ''}
            <hr style="margin:8px 0; border:0; border-top:1px solid #E2E8F0;">
            <p><strong>2. Características:</strong> ${sol.tipo_pieza || 'Pieza Gráfica'} • Estilo: ${sol.estilo_visual || 'Institucional'}</p>
            <p><strong>3. Formato y Difusión:</strong> Material: ${materialText} ${tamanoText} • Orientación: ${orientacionText}</p>
            <p><strong>Plataformas:</strong> ${plataformasText} • <strong>Formato Requerido:</strong> ${sol.formato_requerido || 'PDF imprenta / JPG alta'}</p>
            <hr style="margin:8px 0; border:0; border-top:1px solid #E2E8F0;">
            <p><strong>4. Texto Aprobado (Brief Oficial):</strong></p>
            <blockquote style="background:#FFFFFF; border-left:3px solid var(--gamea-red); padding:8px 12px; margin:6px 0; font-style:italic;">
              "${sol.texto_aprobado || 'Brief institucional sin observaciones.'}"
            </blockquote>
            <p><strong>Recursos Insumo Adjuntos:</strong> ${archivosList.map(a => `📎 ${a}`).join('  |  ')}</p>
            <hr style="margin:8px 0; border:0; border-top:1px solid #E2E8F0;">
            <p><strong>5. Solicitante Responsable:</strong> ${solicitanteInfo}</p>
            <p><strong>6. Conformidad:</strong> <span class="badge-count" style="background:#16A34A; color:#fff;">✓ V.º B.º Aprobado</span> — <em>Sujeto a normas DICOM</em></p>
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
              ${rondasUsadas} de 2 Rondas Usadas (${rondasDisponibles} disponible${rondasDisponibles === 1 ? '' : 's'})
            </span>
          </div>

          <!-- HISTORIAL DE OBSERVACIONES -->
          <div class="mb-3">
            <strong style="font-size:0.82rem; color:#78350F; text-transform:uppercase;">Historial de Observaciones Previas:</strong>
            ${historialCambios.length === 0 ? 
              `<p class="text-sm text-muted mt-1" style="font-style:italic;">No se han emitido observaciones hasta el momento.</p>` :
              historialCambios.map(c => `
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
                Emitir Observación de Cambio (Ronda ${rondasUsadas + 1} de 2):
              </label>
              <textarea id="txtObservacionCambio" rows="2" class="form-control" placeholder="Describa con precisión los ajustes solicitados (agrupe todas las observaciones en una sola solicitud)..."></textarea>
              <div class="d-flex justify-between align-center mt-2 flex-wrap gap-2">
                <span class="text-sm text-muted">⚠️ Esta acción consumirá la Ronda ${rondasUsadas + 1}.</span>
                <button class="btn btn-sm btn-primary" onclick="app.submitCambio('${sol.id}')">
                  Enviar Observaciones (Ronda ${rondasUsadas + 1})
                </button>
              </div>
            </div>
          ` : `
            <div style="background:#FEE2E2; padding:12px; border-radius:8px; border:1px solid #FCA5A5; color:#991B1B; font-size:0.85rem;">
              🛑 <strong>LÍMITE ALCANZADO:</strong> Se han agotado las 2 rondas de cambios permitidas. Para cualquier ajuste adicional se requiere autorización expresa de la Dirección de Comunicación.
            </div>
          `}
        </div>

        <!-- FLUJO DE ESTADOS DEL TRÁMITE (TRANSICIONES DIRECTAS) -->
        <div class="mt-4 p-3" style="background:#F8FAFC; border:1px solid #CBD5E1; border-radius:8px;">
          <div class="d-flex justify-between align-center mb-2 flex-wrap gap-2">
            <strong style="font-size:0.83rem; color:#1E293B; text-transform:uppercase;">
              🔄 Transición de Estados (Flujo de Producción Creativa DICOM):
            </strong>
            <span class="text-sm">Estado actual: <strong>${estadoObj.label}</strong></span>
          </div>
          <p class="text-xs text-muted mb-2">Haga clic en cualquiera de las fases para cambiar el estado del trámite en tiempo real:</p>
          <div class="d-flex gap-2 flex-wrap">
            <button type="button" class="btn btn-xs ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'PENDIENTE' ? 'btn-amarillo-active' : 'btn-outline'}" 
              onclick="app.cambiarEstado('${sol.id}', 'PENDIENTE')" title="Marcar como Pendiente">
              🟡 1. Pendiente
            </button>
            <button type="button" class="btn btn-xs ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'EN_REVISION' ? 'btn-azul-active' : 'btn-outline'}" 
              onclick="app.cambiarEstado('${sol.id}', 'EN_REVISION')" title="Revisión técnica de insumos y asignación">
              🔵 2. En revisión
            </button>
            <button type="button" class="btn btn-xs ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'DISENO_PROCESO' ? 'btn-morado-active' : 'btn-outline'}" 
              onclick="app.cambiarEstado('${sol.id}', 'DISENO_PROCESO')" title="Diseñador elaborando arte">
              🟣 3. En proceso
            </button>
            <button type="button" class="btn btn-xs ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'AJUSTES' ? 'btn-naranja-active' : 'btn-outline'}" 
              onclick="app.cambiarEstado('${sol.id}', 'AJUSTES')" title="Ronda de modificaciones">
              🟠 4. Ajustes
            </button>
            <button type="button" class="btn btn-xs ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'APROBADO' ? 'btn-verde-active' : 'btn-outline'}" 
              onclick="app.cambiarEstado('${sol.id}', 'APROBADO')" title="Aprobación formal del solicitante">
              🟢 5. Aprobado
            </button>
            <button type="button" class="btn btn-xs ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'FINALIZADO' ? 'btn-gris-active' : 'btn-outline'}" 
              onclick="app.cambiarEstado('${sol.id}', 'FINALIZADO')" title="Arte final entregado">
              ⚫ 6. Finalizado
            </button>
          </div>
        </div>

        <!-- ACCIONES OPERATIVAS SEGÚN FASE -->
        <div class="mt-3 pt-3 d-flex justify-between align-center flex-wrap gap-2" style="border-top:1px solid #E2E8F0;">
          <div class="d-flex gap-2 flex-wrap">
            ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'PENDIENTE' ? `
              <button class="btn btn-sm" style="background:#2563EB; color:#fff;" onclick="app.cambiarEstado('${sol.id}', 'EN_REVISION')">
                🔵 Pasar a 'En revisión' (Validar Insumos)
              </button>
              <button class="btn btn-sm btn-outline" onclick="app.asignarDisenadorPrompt('${sol.id}')">
                👤 Asignar Diseñador y Pasar a Revisión
              </button>
            ` : ''}

            ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'EN_REVISION' ? `
              <button class="btn btn-sm" style="background:#8B5CF6; color:#fff;" onclick="app.cambiarEstado('${sol.id}', 'DISENO_PROCESO')">
                🟣 Iniciar 'Diseño en Proceso'
              </button>
              <button class="btn btn-sm btn-outline" onclick="app.asignarDisenadorPrompt('${sol.id}')">
                👤 Reasignar Diseñador DICOM
              </button>
            ` : ''}

            ${(this.normalizeEstado(sol.estado || sol.estado_codigo) === 'DISENO_PROCESO' || this.normalizeEstado(sol.estado || sol.estado_codigo) === 'AJUSTES') ? `
              <button class="btn btn-sm btn-gold" onclick="app.cambiarEstado('${sol.id}', 'APROBADO')">
                ✅ Aprobar Propuesta (Visto Bueno)
              </button>
            ` : ''}

            ${this.normalizeEstado(sol.estado || sol.estado_codigo) === 'APROBADO' ? `
              <button class="btn btn-sm btn-primary" onclick="app.cambiarEstado('${sol.id}', 'FINALIZADO')">
                📦 Entregar y Finalizar Trámite
              </button>
            ` : ''}
          </div>

          <button class="btn btn-sm btn-outline" onclick="app.closeModal()">Cerrar Ventana</button>
        </div>
      `;

      modalBackdrop.classList.add('active');
    } catch (err) {
      console.error('Error abriendo modal de detalle:', err);
      this.showToast('Error al visualizar los detalles del trámite: ' + err.message, 'error');
    }
  },

  closeModal() {
    const modalBackdrop = document.getElementById('modalDetalleBackdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  },

  async submitCambio(solicitudId) {
    const sol = state.solicitudes.find(s => String(s.id) === String(solicitudId));
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

    try {
      const res = await fetch(`/api/solicitudes/${solicitudId}/cambios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          motivo_cambio: txt,
          rondas_actuales: sol.rondas_cambios_usadas,
          solicitado_por: state.currentUser ? `${state.currentUser.nombres} ${state.currentUser.apellidos}` : 'Solicitante Municipal',
          solicitante_id: state.currentUser?.id
        })
      });

      const json = await res.json();
      if (json.exito) {
        await this.loadSolicitudesFromApi();
        this.openDetailModal(solicitudId);
        this.showToast(`✅ ${json.mensaje}`, 'success');
        return;
      } else {
        this.showToast(`⚠️ ${json.mensaje}`, 'error');
      }
    } catch (err) {
      console.warn('Fallback local para cambios:', err);
      sol.rondas_cambios_usadas++;
      sol.estado = 'AJUSTES';
      if (!sol.historial_cambios) sol.historial_cambios = [];
      sol.historial_cambios.push({
        ronda: sol.rondas_cambios_usadas,
        fecha: new Date().toISOString().replace('T', ' ').substring(0, 16),
        usuario: `${state.currentUser ? state.currentUser.nombres + ' ' + state.currentUser.apellidos : 'Solicitante'}`,
        motivo: txt
      });
      this.renderRequests();
      this.updateCounts();
      this.openDetailModal(solicitudId);
      this.showToast(`✅ Ronda de cambios ${sol.rondas_cambios_usadas} de 2 registrada en memoria.`, 'success');
    }
  },

  async cambiarEstado(solicitudId, nuevoEstado) {
    try {
      this.showToast(`⏳ Actualizando a ${this.getStatusBadge(nuevoEstado).label}...`, 'info');
      await fetch(`/api/solicitudes/${solicitudId}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_estado: nuevoEstado })
      });
      await this.loadSolicitudesFromApi();
      this.showToast(`✅ Estado actualizado a: ${this.getStatusBadge(nuevoEstado).label}`, 'success');
    } catch (err) {
      console.warn('Error conectando a API para cambio de estado:', err);
      const sol = state.solicitudes.find(s => String(s.id) === String(solicitudId));
      if (sol) {
        sol.estado = nuevoEstado;
        sol.estado_codigo = nuevoEstado;
      }
      this.renderRequests();
      this.updateCounts();
    }
    this.openDetailModal(solicitudId);
  },

  async asignarDisenadorPrompt(solicitudId) {
    const dis = prompt('Ingrese el nombre del Diseñador Gráfico de DICOM asignado:', 'Lic. Marco Antonio Choque');
    if (dis) {
      try {
        this.showToast('⏳ Asignando diseñador en PostgreSQL...', 'info');
        await fetch(`/api/solicitudes/${solicitudId}/estado`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            codigo_estado: 'EN_REVISION',
            disenador_nombre: dis,
            disenador_asignado_id: 'a0000001-0000-0000-0000-000000000002'
          })
        });
        await this.loadSolicitudesFromApi();
        this.openDetailModal(solicitudId);
        this.showToast(`✅ Diseñador asignado (${dis}) y trámite pasado a 🔵 En revisión`, 'success');
      } catch (err) {
        console.warn('Fallback local para asignación:', err);
        const sol = state.solicitudes.find(s => String(s.id) === String(solicitudId));
        if (sol) {
          sol.disenador_asignado = dis;
          sol.estado = 'EN_REVISION';
          sol.estado_codigo = 'EN_REVISION';
          this.renderRequests();
          this.updateCounts();
          this.openDetailModal(solicitudId);
          this.showToast(`Asignado a: ${dis}`, 'success');
        }
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
  },

  // ==============================================================================
  // 15. MÓDULO DE GESTIÓN DE USUARIOS Y ROLES (Feature 013-SDD)
  // ==============================================================================
  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  populateUsuarioSecretariasSelects() {
    const filterSec = document.getElementById('filterUsuarioSecretaria');
    const modalSec = document.getElementById('usuarioSecretaria');
    const lista = typeof ORGANIGRAMA_GAMEA !== 'undefined' ? ORGANIGRAMA_GAMEA : [];

    if (filterSec && filterSec.options.length <= 1) {
      filterSec.innerHTML = '<option value="">Todas las secretarías</option>';
      lista.forEach(sec => {
        const opt = document.createElement('option');
        opt.value = sec.id;
        opt.textContent = sec.sigla ? `${sec.sigla} - ${sec.nombre}` : sec.nombre;
        filterSec.appendChild(opt);
      });
    }

    if (modalSec && modalSec.options.length <= 1) {
      modalSec.innerHTML = '<option value="">Seleccione secretaría...</option>';
      lista.forEach(sec => {
        const opt = document.createElement('option');
        opt.value = sec.id;
        opt.textContent = sec.sigla ? `${sec.sigla} - ${sec.nombre}` : sec.nombre;
        modalSec.appendChild(opt);
      });
    }
  },

  onUsuarioSecretariaModalChange(secretariaId) {
    const dirSelect = document.getElementById('usuarioDireccion');
    if (!dirSelect) return;
    dirSelect.innerHTML = '<option value="">Seleccione dirección...</option>';
    if (!secretariaId) return;

    const lista = typeof ORGANIGRAMA_GAMEA !== 'undefined' ? ORGANIGRAMA_GAMEA : [];
    const sec = lista.find(s => String(s.id) === String(secretariaId));
    if (sec && Array.isArray(sec.direcciones)) {
      sec.direcciones.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.sigla ? `${d.sigla} - ${d.nombre}` : d.nombre;
        dirSelect.appendChild(opt);
      });
    }
  },

  switchUsuariosSubtab(subtab) {
    state.usuariosState.subtabActual = subtab;
    const btnUsuarios = document.getElementById('subtabUsuarios');
    const btnRoles = document.getElementById('subtabRoles');
    const panelUsuarios = document.getElementById('panelUsuarios');
    const panelRoles = document.getElementById('panelRoles');

    if (btnUsuarios && btnRoles && panelUsuarios && panelRoles) {
      if (subtab === 'usuarios') {
        btnUsuarios.classList.add('active');
        btnRoles.classList.remove('active');
        panelUsuarios.style.display = 'block';
        panelRoles.style.display = 'none';
        this.loadUsuarios();
      } else {
        btnUsuarios.classList.remove('active');
        btnRoles.classList.add('active');
        panelUsuarios.style.display = 'none';
        panelRoles.style.display = 'block';
        this.loadRoles();
      }
    }
  },

  async renderUsersView() {
    try {
      this.populateUsuarioSecretariasSelects();
      this.switchUsuariosSubtab(state.usuariosState.subtabActual || 'usuarios');
    } catch (e) {
      console.error('Error renderUsersView:', e);
      this.loadUsuariosFallback();
    }
  },

  async loadUsuarios() {
    const tbody = document.getElementById('tbodyUsuarios');
    const emptyState = document.getElementById('usuariosEmptyState');
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4" style="color: #94a3b8;">⏳ Cargando usuarios institucionales...</td></tr>`;
    }

    try {
      const params = new URLSearchParams();
      params.append('page', state.usuariosState.pagina);
      params.append('limit', state.usuariosState.limite);
      if (state.usuariosState.filtroRol) params.append('rol', state.usuariosState.filtroRol);
      if (state.usuariosState.filtroSecretaria) params.append('secretaria_id', state.usuariosState.filtroSecretaria);
      if (state.usuariosState.filtroEstado !== 'todos') params.append('activo', state.usuariosState.filtroEstado);
      if (state.usuariosState.busqueda) params.append('buscar', state.usuariosState.busqueda);

      const res = await fetch(`/api/usuarios?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.exito && json.data) {
          const rows = Array.isArray(json.data) ? json.data : (json.data.usuarios || []);
          const total = typeof json.total === 'number' ? json.total : (json.data.paginacion?.total || rows.length);
          const paginas = typeof json.totalPages === 'number' ? json.totalPages : (json.data.paginacion?.paginas || Math.max(1, Math.ceil(total / state.usuariosState.limite)));

          // Si el servidor retornó lista vacía o está en contingencia 'Sin BD', usamos catálogo precargado
          if (rows.length === 0 && (!json.fuente || json.fuente === 'Sin BD' || total === 0)) {
            this.loadUsuariosFallback();
            return;
          }

          state.usuariosState.usuarios = rows;
          state.usuariosState.total = total;
          state.usuariosState.paginas = paginas;
          this.renderUsuariosTable(rows);
          this.renderUsuariosPagination();
          return;
        }
      }
      throw new Error('Respuesta inválida del servidor');
    } catch (err) {
      console.warn('⚠️ Error al cargar usuarios desde API, usando fallback institucional:', err);
      this.loadUsuariosFallback();
    }
  },

  loadUsuariosFallback() {
    let list = Object.values(USUARIOS_DIRECCIONES).map((u, idx) => ({
      id: u.id || `local-${idx}`,
      nombres: u.nombres,
      apellidos: u.apellidos,
      cargo: u.cargo || '',
      email: u.email,
      telefono: u.telefono || '',
      rol_codigo: u.rol,
      rol_nombre: u.rol === 'ADMIN' ? 'Administrador General' : (u.rol === 'SUPERVISOR' ? 'Supervisor / Directora DICOM' : (u.rol === 'DISENADOR' ? 'Diseñador Gráfico' : 'Solicitante Municipal')),
      secretaria_nombre: u.secretaria,
      direccion_nombre: u.direccion,
      secretaria_id: u.secretaria_id,
      direccion_id: u.direccion_id,
      activo: true
    }));

    if (state.usuariosState.filtroRol) {
      list = list.filter(u => u.rol_codigo === state.usuariosState.filtroRol);
    }
    if (state.usuariosState.filtroSecretaria) {
      list = list.filter(u => String(u.secretaria_id) === String(state.usuariosState.filtroSecretaria));
    }
    if (state.usuariosState.busqueda) {
      const q = state.usuariosState.busqueda.toLowerCase();
      list = list.filter(u => `${u.nombres} ${u.apellidos} ${u.email} ${u.cargo}`.toLowerCase().includes(q));
    }

    state.usuariosState.usuarios = list;
    state.usuariosState.total = list.length;
    state.usuariosState.paginas = Math.max(1, Math.ceil(list.length / state.usuariosState.limite));
    this.renderUsuariosTable(list);
    this.renderUsuariosPagination();
  },

  renderUsuariosTable(usuarios) {
    const tbody = document.getElementById('tbodyUsuarios');
    const emptyState = document.getElementById('usuariosEmptyState');
    if (!tbody) return;

    if (!usuarios || usuarios.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tbody.innerHTML = usuarios.map(u => {
      const iniciales = `${(u.nombres || '').charAt(0)}${(u.apellidos || '').charAt(0)}`.toUpperCase() || 'U';
      const rolClass = (u.rol_codigo || '').toLowerCase();
      const rolBadge = rolClass === 'admin' ? 'badge-admin' : (rolClass === 'supervisor' ? 'badge-supervisor' : (rolClass === 'disenador' ? 'badge-disenador' : 'badge-solicitante'));
      const avatarClass = rolClass === 'admin' ? 'avatar-admin' : (rolClass === 'supervisor' ? 'avatar-supervisor' : (rolClass === 'disenador' ? 'avatar-disenador' : 'avatar-solicitante'));

      const isCurrentAdmin = state.currentUser && (state.currentUser.id === u.id || state.currentUser.email === u.email);

      return `
        <tr>
          <td data-label="Avatar">
            <div class="user-avatar ${avatarClass}" title="${this.escapeHtml(u.nombres + ' ' + u.apellidos)}">${iniciales}</div>
          </td>
          <td data-label="Nombre Completo">
            <div class="user-name-cell">
              <span class="user-fullname">${this.escapeHtml(u.nombres)} ${this.escapeHtml(u.apellidos)}</span>
              <span class="user-cargo">${this.escapeHtml(u.cargo || 'Funcionario')}</span>
            </div>
          </td>
          <td data-label="Email">
            <code style="color:#D4AF37;">${this.escapeHtml(u.email)}</code>
            ${u.telefono ? `<div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">📱 ${this.escapeHtml(u.telefono)}</div>` : ''}
          </td>
          <td data-label="Rol">
            <span class="role-badge ${rolBadge}">${this.escapeHtml(u.rol_nombre || u.rol_codigo)}</span>
          </td>
          <td data-label="Dependencia">
            <div class="user-org-cell">
              <span class="org-secretaria">${this.escapeHtml(u.secretaria_nombre || 'Despacho Municipal')}</span>
              <span class="org-direccion">${this.escapeHtml(u.direccion_nombre || '')}</span>
            </div>
          </td>
          <td data-label="Estado">
            <span class="status-badge ${u.activo ? 'status-activo' : 'status-inactivo'}">
              <span class="status-dot"></span>
              ${u.activo ? 'Activo' : 'Inactivo'}
            </span>
          </td>
          <td data-label="Acciones">
            <div class="action-btns">
              <button class="btn-action btn-edit" title="Editar datos" onclick="app.openModalUsuario('${u.id}')">
                ✏️
              </button>
              <button class="btn-action btn-reset" title="Resetear contraseña" onclick="app.resetUsuarioPassword('${u.id}', '${this.escapeHtml(u.email)}')">
                🔑
              </button>
              ${isCurrentAdmin ? `
                <button class="btn-action" title="No puede desactivar su propia cuenta" disabled style="opacity:0.4; cursor:not-allowed;">
                  🚫
                </button>
              ` : `
                <button class="btn-action ${u.activo ? 'btn-toggle-off' : 'btn-toggle-on'}" 
                        title="${u.activo ? 'Desactivar usuario' : 'Activar usuario'}" 
                        onclick="app.toggleUsuarioEstado('${u.id}', ${!u.activo}, '${this.escapeHtml(u.nombres + ' ' + u.apellidos)}')">
                  ${u.activo ? '🚫' : '✅'}
                </button>
              `}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderUsuariosPagination() {
    const container = document.getElementById('usuariosPagination');
    if (!container) return;

    const { pagina, paginas, total } = state.usuariosState;
    if (paginas <= 1 && total <= state.usuariosState.limite) {
      container.innerHTML = `<span style="font-size:0.82rem; color:#64748b;">Total: ${total} usuario(s)</span>`;
      return;
    }

    let html = `
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%; flex-wrap:wrap; gap:10px;">
        <span style="font-size:0.84rem; color:#94a3b8;">
          Página <strong>${pagina}</strong> de <strong>${paginas}</strong> (${total} usuarios)
        </span>
        <div style="display:flex; gap:6px;">
          <button class="pag-btn" ${pagina <= 1 ? 'disabled' : ''} onclick="app.changeUsuariosPage(${pagina - 1})">
            ◀ Anterior
          </button>
    `;

    for (let p = 1; p <= paginas; p++) {
      if (p === 1 || p === paginas || (p >= pagina - 1 && p <= pagina + 1)) {
        html += `<button class="pag-btn ${p === pagina ? 'active' : ''}" onclick="app.changeUsuariosPage(${p})">${p}</button>`;
      } else if (p === pagina - 2 || p === pagina + 2) {
        html += `<span style="color:#64748b; padding:4px 6px;">...</span>`;
      }
    }

    html += `
          <button class="pag-btn" ${pagina >= paginas ? 'disabled' : ''} onclick="app.changeUsuariosPage(${pagina + 1})">
            Siguiente ▶
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  changeUsuariosPage(newPage) {
    if (newPage < 1 || newPage > state.usuariosState.paginas) return;
    state.usuariosState.pagina = newPage;
    this.loadUsuarios();
  },

  async loadRoles() {
    const grid = document.getElementById('rolesGrid');
    if (!grid) return;
    grid.innerHTML = '<div style="color:#94a3b8; padding:20px;">⏳ Cargando roles del sistema...</div>';

    try {
      const res = await fetch('/api/roles');
      if (res.ok) {
        const json = await res.json();
        if (json.exito && Array.isArray(json.data)) {
          state.usuariosState.roles = json.data;
          this.renderRolesGrid(json.data);
          return;
        }
      }
      throw new Error('No se pudo cargar roles');
    } catch (err) {
      console.warn('Fallback local para roles:', err);
      const defaultRoles = [
        { id: 1, codigo: 'ADMIN', nombre: 'Administrador General', descripcion: 'Control total de la plataforma, usuarios, auditoría y catálogos institucionales.', total_usuarios: 1 },
        { id: 2, codigo: 'SUPERVISOR', nombre: 'Supervisor / Directora DICOM', descripcion: 'Priorización, control de SLA, asignación a creativos y aprobación final.', total_usuarios: 1 },
        { id: 3, codigo: 'DISENADOR', nombre: 'Diseñador Gráfico Institucional', descripcion: 'Atención de solicitudes asignadas, subida de propuestas gráficas y atención de cambios.', total_usuarios: 1 },
        { id: 4, codigo: 'SOLICITANTE', nombre: 'Solicitante Municipal', descripcion: 'Creación de fichas técnicas oficiales y seguimiento de solicitudes de su Dirección.', total_usuarios: 6 }
      ];
      state.usuariosState.roles = defaultRoles;
      this.renderRolesGrid(defaultRoles);
    }
  },

  renderRolesGrid(roles) {
    const grid = document.getElementById('rolesGrid');
    if (!grid) return;

    const icons = {
      ADMIN: { icon: '🛡️', class: 'icon-admin' },
      SUPERVISOR: { icon: '⭐', class: 'icon-supervisor' },
      DISENADOR: { icon: '🎨', class: 'icon-disenador' },
      SOLICITANTE: { icon: '✍️', class: 'icon-solicitante' }
    };

    grid.innerHTML = roles.map(r => {
      const ic = icons[r.codigo] || { icon: '👤', class: 'icon-admin' };
      return `
        <div class="role-card">
          <div class="role-card-header">
            <div class="role-card-icon ${ic.class}">${ic.icon}</div>
            <div>
              <div class="role-card-name">${this.escapeHtml(r.nombre)}</div>
              <div class="role-card-code">CÓDIGO: ${this.escapeHtml(r.codigo)}</div>
            </div>
          </div>
          <div class="role-card-count">
            👥 ${r.total_usuarios || 0} usuarios activos asignados
          </div>
          <div class="role-card-desc" id="roleDescBox_${r.id}">
            <p id="roleDescText_${r.id}">${this.escapeHtml(r.descripcion || 'Sin descripción.')}</p>
          </div>
          <div class="role-card-actions">
            <button class="btn btn-sm btn-outline" onclick="app.toggleEditRoleDescription(${r.id})">
              ✏️ Editar Descripción
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  toggleEditRoleDescription(roleId) {
    const descBox = document.getElementById(`roleDescBox_${roleId}`);
    const currentTextEl = document.getElementById(`roleDescText_${roleId}`);
    if (!descBox || !currentTextEl) return;

    const currentText = currentTextEl.textContent;
    descBox.innerHTML = `
      <textarea id="roleDescInput_${roleId}" class="form-control" style="font-size:0.84rem; min-height:70px; margin-bottom:6px;">${this.escapeHtml(currentText)}</textarea>
      <div style="display:flex; justify-content:flex-end; gap:6px;">
        <button class="btn btn-xs btn-secondary" onclick="app.loadRoles()">Cancelar</button>
        <button class="btn btn-xs btn-gold" onclick="app.saveRoleDescription(${roleId})">💾 Guardar</button>
      </div>
    `;
  },

  async saveRoleDescription(roleId) {
    const input = document.getElementById(`roleDescInput_${roleId}`);
    if (!input) return;
    const newDesc = input.value.trim();

    try {
      const res = await fetch(`/api/roles/${roleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion: newDesc })
      });
      const json = await res.json();
      if (json.exito) {
        this.showToast('✅ Descripción del rol actualizada', 'success');
        this.loadRoles();
      } else {
        this.showToast(json.mensaje || 'Error al actualizar rol', 'error');
      }
    } catch (err) {
      this.showToast('Error de red al actualizar rol', 'error');
    }
  },

  openModalUsuario(usuarioId = null) {
    try {
      this.populateUsuarioSecretariasSelects();
      const modal = document.getElementById('modalUsuarioBackdrop');
      const form = document.getElementById('formUsuario');
      const titulo = document.getElementById('modalUsuarioTitulo');
      const inputId = document.getElementById('usuarioEditId');
      const grupoPass = document.getElementById('grupoPassword');
      const grupoPassConf = document.getElementById('grupoPasswordConfirm');
      const inputEmail = document.getElementById('usuarioEmail');
      const passInput = document.getElementById('usuarioPassword');
      const passConfInput = document.getElementById('usuarioPasswordConfirm');

      if (!modal) {
        console.error('Modal usuario backdrop no encontrado');
        return;
      }

      if (form) form.reset();

      if (usuarioId) {
        // MODO EDICIÓN
        if (titulo) titulo.textContent = '✏️ Editar Usuario Institucional';
        if (inputId) inputId.value = usuarioId;
        if (inputEmail) {
          inputEmail.readOnly = true;
          inputEmail.style.backgroundColor = 'rgba(255,255,255,0.05)';
        }
        if (grupoPass) grupoPass.style.display = 'none';
        if (grupoPassConf) grupoPassConf.style.display = 'none';
        if (passInput) passInput.required = false;
        if (passConfInput) passConfInput.required = false;

        const user = state.usuariosState.usuarios.find(u => String(u.id) === String(usuarioId));
        if (user) {
          this.populateModalUsuarioFields(user);
        } else {
          fetch(`/api/usuarios/${usuarioId}`)
            .then(r => r.json())
            .then(json => {
              if (json.exito && json.data) {
                this.populateModalUsuarioFields(json.data);
              }
            })
            .catch(e => console.warn('Error fetching usuario:', e));
        }
      } else {
        // MODO CREACIÓN
        if (titulo) titulo.textContent = '➕ Nuevo Usuario Institucional';
        if (inputId) inputId.value = '';
        if (inputEmail) {
          inputEmail.readOnly = false;
          inputEmail.style.backgroundColor = '';
        }
        if (grupoPass) grupoPass.style.display = 'block';
        if (grupoPassConf) grupoPassConf.style.display = 'block';
        if (passInput) passInput.required = true;
        if (passConfInput) passConfInput.required = true;
        this.onUsuarioSecretariaModalChange(null);
      }

      modal.classList.add('active');
      modal.style.display = 'flex';
    } catch (err) {
      console.error('Error al abrir modal usuario:', err);
      this.showToast('No se pudo abrir el modal: ' + err.message, 'error');
    }
  },

  populateModalUsuarioFields(user) {
    document.getElementById('usuarioNombres').value = user.nombres || '';
    document.getElementById('usuarioApellidos').value = user.apellidos || '';
    document.getElementById('usuarioCargo').value = user.cargo || '';
    document.getElementById('usuarioEmail').value = user.email || '';
    document.getElementById('usuarioTelefono').value = user.telefono || '';
    document.getElementById('usuarioRol').value = user.rol_id || (user.rol_codigo === 'ADMIN' ? '1' : (user.rol_codigo === 'SUPERVISOR' ? '2' : (user.rol_codigo === 'DISENADOR' ? '3' : '4')));
    
    const secSelect = document.getElementById('usuarioSecretaria');
    if (secSelect && user.secretaria_id) {
      secSelect.value = user.secretaria_id;
      this.onUsuarioSecretariaModalChange(user.secretaria_id);
      const dirSelect = document.getElementById('usuarioDireccion');
      if (dirSelect && user.direccion_id) {
        dirSelect.value = user.direccion_id;
      }
    }
  },

  closeModalUsuario() {
    const modal = document.getElementById('modalUsuarioBackdrop');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  },

  async handleUsuarioSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('usuarioEditId').value.trim();
    const nombres = document.getElementById('usuarioNombres').value.trim();
    const apellidos = document.getElementById('usuarioApellidos').value.trim();
    const cargo = document.getElementById('usuarioCargo').value.trim();
    const email = document.getElementById('usuarioEmail').value.trim();
    const telefono = document.getElementById('usuarioTelefono').value.trim();
    const rol_id = document.getElementById('usuarioRol').value;
    const secretaria_id = document.getElementById('usuarioSecretaria').value || null;
    const direccion_id = document.getElementById('usuarioDireccion').value || null;

    if (!nombres || nombres.length < 2) {
      this.showToast('El nombre debe tener al menos 2 caracteres.', 'error');
      return;
    }
    if (!apellidos || apellidos.length < 2) {
      this.showToast('Los apellidos deben tener al menos 2 caracteres.', 'error');
      return;
    }
    if (!email || !email.includes('@')) {
      this.showToast('Ingrese un correo electrónico válido.', 'error');
      return;
    }
    if (!rol_id) {
      this.showToast('Debe seleccionar un rol para el usuario.', 'error');
      return;
    }

    const payload = {
      nombres,
      apellidos,
      cargo,
      email,
      telefono,
      rol_id: parseInt(rol_id, 10),
      secretaria_id: secretaria_id ? parseInt(secretaria_id, 10) : null,
      direccion_id: direccion_id ? parseInt(direccion_id, 10) : null
    };

    if (!id) {
      // CREACIÓN
      const password = document.getElementById('usuarioPassword').value;
      const confirm = document.getElementById('usuarioPasswordConfirm').value;

      if (!password || password.length < 8) {
        this.showToast('La contraseña debe tener mínimo 8 caracteres.', 'error');
        return;
      }
      if (!/[A-Z]/.test(password)) {
        this.showToast('La contraseña debe incluir al menos una letra mayúscula.', 'error');
        return;
      }
      if (!/[0-9]/.test(password)) {
        this.showToast('La contraseña debe incluir al menos un número.', 'error');
        return;
      }
      if (password !== confirm) {
        this.showToast('Las contraseñas no coinciden.', 'error');
        return;
      }

      payload.password = password;

      try {
        const res = await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.exito) {
          this.showToast(`✅ Usuario creado: ${nombres} ${apellidos}`, 'success');
          this.closeModalUsuario();
          this.loadUsuarios();
        } else {
          this.showToast(`Error: ${json.mensaje || 'No se pudo crear el usuario'}`, 'error');
        }
      } catch (err) {
        this.showToast('Error de conexión con el servidor', 'error');
      }
    } else {
      // EDICIÓN
      try {
        const res = await fetch(`/api/usuarios/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.exito) {
          this.showToast('✅ Usuario actualizado exitosamente', 'success');
          this.closeModalUsuario();
          this.loadUsuarios();

          if (state.currentUser && (state.currentUser.id === id || state.currentUser.email === email)) {
            state.currentUser.nombres = nombres;
            state.currentUser.apellidos = apellidos;
            state.currentUser.cargo = cargo;
            state.currentUser.telefono = telefono;
            this.updateAuthUI();
          }
        } else {
          this.showToast(`Error: ${json.mensaje || 'No se pudo actualizar'}`, 'error');
        }
      } catch (err) {
        this.showToast('Error de conexión con el servidor', 'error');
      }
    }
  },

  async toggleUsuarioEstado(id, nuevoEstado, nombre) {
    const accion = nuevoEstado ? 'activar' : 'desactivar';
    const conf = confirm(`¿Está seguro de que desea ${accion} al usuario "${nombre}"?`);
    if (!conf) return;

    try {
      const res = await fetch(`/api/usuarios/${id}/estado`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activo: nuevoEstado,
          requesting_user_id: state.currentUser ? state.currentUser.id : null
        })
      });
      const json = await res.json();
      if (json.exito) {
        if (json.advertencia) {
          this.showToast(`⚠️ ${json.advertencia}`, 'warning');
        }
        this.showToast(`✅ ${json.mensaje}`, 'success');
        this.loadUsuarios();
      } else {
        this.showToast(`🛑 ${json.mensaje}`, 'error');
      }
    } catch (err) {
      this.showToast('Error de red al actualizar estado del usuario', 'error');
    }
  },

  async resetUsuarioPassword(id, email) {
    const conf = confirm(`¿Está seguro de restablecer la contraseña para "${email}"?\nSe generará una contraseña temporal aleatoria segura.`);
    if (!conf) return;

    try {
      const res = await fetch(`/api/usuarios/${id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const json = await res.json();
      if (json.exito && json.password_temporal) {
        const modal = document.getElementById('modalResetPassBackdrop');
        const emailEl = document.getElementById('resetPassEmail');
        const passEl = document.getElementById('resetPassValue');

        if (emailEl) emailEl.textContent = email;
        if (passEl) passEl.textContent = json.password_temporal;

        if (modal) {
          modal.classList.add('active');
          modal.style.display = 'flex';
        }
        this.showToast('🔑 Contraseña restablecida exitosamente', 'success');
      } else {
        this.showToast(`🛑 ${json.mensaje || 'Error al restablecer contraseña'}`, 'error');
      }
    } catch (err) {
      this.showToast('Error de red al restablecer la contraseña', 'error');
    }
  },

  closeModalResetPass() {
    const modal = document.getElementById('modalResetPassBackdrop');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  },

  copyResetPassword() {
    const passEl = document.getElementById('resetPassValue');
    if (!passEl) return;
    const pass = passEl.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pass).then(() => {
        this.showToast('📋 Contraseña copiada al portapapeles', 'success');
      }).catch(() => {
        this.fallbackCopyText(pass);
      });
    } else {
      this.fallbackCopyText(pass);
    }
  },

  fallbackCopyText(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      this.showToast('📋 Contraseña copiada al portapapeles', 'success');
    } catch (e) {
      this.showToast('Seleccione y copie la contraseña manualmente', 'info');
    }
    document.body.removeChild(ta);
  }
};

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
