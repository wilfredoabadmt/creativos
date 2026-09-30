/**
 * COMUNICA DIGITAL - GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
 * Controlador Principal del Prototipo Funcional Interactivo
 * Dirección de Comunicación (DICOM)
 */

// ESTADO GLOBAL DE LA APLICACIÓN
const state = {
  currentRole: 'SUPERVISOR', // 'SOLICITANTE' | 'DISENADOR' | 'SUPERVISOR' | 'ADMIN'
  currentStep: 1,
  activeFilter: 'TODOS',
  solicitudes: [
    {
      id: 'sol-01',
      codigo_tramite: 'SOL-2026-0038',
      secretaria: 'Secretaría Municipal de Salud (SMS)',
      direccion: 'Dirección de Redes de Salud - Distrito 8',
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
      secretaria: 'Secretaría Municipal de Infraestructura Pública (SMIP)',
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
      disenador_asignado: 'Lic. Marco A. Choque (Senior)',
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'EL ALTO DE PIE: Entregamos el moderno Paso a Desnivel Río Seco. Más fluidez, seguridad y progreso para nuestra gran ciudad.',
      archivos: ['foto_render_obra_alta.jpg', 'logo_gamea.png']
    },
    {
      id: 'sol-03',
      codigo_tramite: 'SOL-2026-0040',
      secretaria: 'Secretaría Municipal de Educación y Cultura (SMEC)',
      direccion: 'Dirección de Culturas y Turismo',
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
      disenador_asignado: 'Diseñadora Jimena Quispe',
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'VIVE NUESTRA IDENTIDAD. Festival y entrada autóctona de la Morenada Alteña. Música en vivo y fraternidades invitadas.',
      archivos: ['logo_culturas.png', 'texto_revisado.docx']
    },
    {
      id: 'sol-04',
      codigo_tramite: 'SOL-2026-0041',
      secretaria: 'Secretaría Municipal de Desarrollo Económico (SMDE)',
      direccion: 'Dirección de Promoción de Artesanos y PYMES',
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
      disenador_asignado: 'Lic. Carlos Mamani',
      rondas_cambios_usadas: 1, // 1 Ronda Usada
      historial_cambios: [
        {
          ronda: 1,
          fecha: '2026-09-26 14:20',
          usuario: 'Lic. René Condori (Solicitante SMDE)',
          motivo: 'Corregir fecha de inicio al jueves 5 de noviembre y agregar logotipo de la Asociación de Productores en Cuero.'
        }
      ],
      texto_aprobado: 'LO MEJOR DE NUESTRAS MANOS. Feria Huayna Fex 2026. Más de 200 productores alteños te esperan.',
      archivos: ['logo_huaynafex.png', 'logo_asociacion.png']
    },
    {
      id: 'sol-05',
      codigo_tramite: 'SOL-2026-0042',
      secretaria: 'Secretaría Municipal de Seguridad Ciudadana (SMSC)',
      direccion: 'Dirección de Prevención Vecinal',
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
      disenador_asignado: 'Lic. Marco A. Choque',
      rondas_cambios_usadas: 2, // 2 Rondas usadas (Agotadas)
      historial_cambios: [
        {
          ronda: 1,
          fecha: '2026-09-21 11:15',
          usuario: 'Dr. Edwin Huanca (SMSC)',
          motivo: 'Aclarar paso 3 sobre el código QR para descarga de la app vecinal.'
        },
        {
          ronda: 2,
          fecha: '2026-09-24 16:40',
          usuario: 'Dr. Edwin Huanca (SMSC)',
          motivo: 'Reemplazar número de teléfono de emergencia por el 110 municipal unificado.'
        }
      ],
      texto_aprobado: 'VECINDARIO SEGURO: Guía de uso de alarmas vecinales conectadas al Centro de Monitoreo Bol-110 El Alto.',
      archivos: ['diagrama_pasos.pdf', 'escudo_smsc.png']
    },
    {
      id: 'sol-06',
      codigo_tramite: 'SOL-2026-0043',
      secretaria: 'Secretaría Municipal de Gestión Institucional (SMGI)',
      direccion: 'Dirección de Protocolo',
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
      disenador_asignado: 'Diseñadora Jimena Quispe',
      rondas_cambios_usadas: 0,
      historial_cambios: [],
      texto_aprobado: 'La Alcaldesa de El Alto se complace en invitar a usted a la Solemne Sesión de Honor.',
      archivos: ['texto_protocolar_visado.pdf']
    }
  ]
};

// OBJETO PRINCIPAL DE LA APLICACIÓN
const app = {
  init() {
    this.bindEvents();
    this.updateCurrentDate();
    this.renderRequests();
    this.calculateSlaPreview();
    this.updateCounts();
  },

  bindEvents() {
    // Selector de navegación por pestañas
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.showTab(tab);
      });
    });

    // Selector de roles
    const roleSelect = document.getElementById('roleSelect');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        state.currentRole = e.target.value;
        this.showToast(`Modo cambiado a: ${this.getRoleName(state.currentRole)}`, 'info');
        this.renderRequests();
      });
    }

    // Botones de filtro de estado
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.activeFilter = e.currentTarget.getAttribute('data-filter');
        this.renderRequests();
      });
    });

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

    // ESC para cerrar modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
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

  showTab(tabName) {
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

  getRoleName(role) {
    const roles = {
      'SOLICITANTE': '👤 Solicitante Municipal',
      'DISENADOR': '🎨 Diseñador Gráfico DICOM',
      'SUPERVISOR': '⭐ Supervisor / Director DICOM',
      'ADMIN': '🛡️ Administrador General'
    };
    return roles[role] || role;
  },

  // CONTROL DEL STEPPER DEL FORMULARIO
  nextStep(currentStep) {
    // Validaciones por paso
    if (currentStep === 1) {
      const sec = document.getElementById('campoSecretaria').value;
      const dir = document.getElementById('campoDireccion').value.trim();
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

  // CÁLCULO DE FECHAS SLA EN VIVO (7 DÍAS HÁBILES)
  calculateSlaPreview() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    
    // Fecha recepción
    const recStr = now.toLocaleDateString('es-ES', options);
    const recEl = document.getElementById('previewFechaRecepcion');
    if (recEl) recEl.textContent = `${recStr} (Hoy)`;

    // Cálculo de 7 días hábiles
    let businessDays = 7;
    let deadline = new Date(now);
    while (businessDays > 0) {
      deadline.setDate(deadline.getDate() + 1);
      const day = deadline.getDay();
      if (day !== 0 && day !== 6) { // Ignora sábado y domingo
        businessDays--;
      }
    }

    const deadStr = deadline.toLocaleDateString('es-ES', options);
    const deadEl = document.getElementById('previewFechaLimite');
    if (deadEl) deadEl.textContent = `${deadStr} (7 días hábiles)`;
  },

  fillDemoData() {
    document.getElementById('campoSecretaria').value = '1';
    document.getElementById('campoDireccion').value = 'Dirección de Redes de Salud - Unidad de Zoonosis';
    document.getElementById('campoNombreEvento').value = 'Campaña Masiva de Vacunación Canina Distrito 4';
    
    // Fecha a 15 días adelante
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

    const secSelect = document.getElementById('campoSecretaria');
    const secText = secSelect.options[secSelect.selectedIndex].text;
    const dir = document.getElementById('campoDireccion').value;
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

    // Generar correlativo
    const anio = new Date().getFullYear();
    const correlativo = `SOL-${anio}-00${state.solicitudes.length + 39}`;

    const nuevaSolicitud = {
      id: `sol-${Date.now()}`,
      codigo_tramite: correlativo,
      secretaria: secText,
      direccion: dir,
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

    // Reset y switch a bandeja
    document.getElementById('formSolicitud').reset();
    this.goToStep(1);
    this.showTab('bandeja');
    this.showToast(`🎉 ¡Solicitud ${correlativo} registrada exitosamente en DICOM!`, 'success');
  },

  // RENDERIZADO DE BANDEJA DE TRÁMITES
  renderRequests() {
    const container = document.getElementById('solicitudesContainer');
    if (!container) return;

    let items = state.solicitudes;
    if (state.activeFilter !== 'TODOS') {
      items = items.filter(s => s.estado === state.activeFilter);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="card-box p-4 text-center" style="grid-column: 1 / -1;">
          <p class="text-muted">No se encontraron solicitudes con el filtro seleccionado.</p>
        </div>`;
      return;
    }

    container.innerHTML = items.map(sol => {
      const badgeInfo = this.getStatusBadge(sol.estado);
      const isUrgent = sol.estado === 'AJUSTES' || sol.estado === 'PENDIENTE';
      
      return `
        <div class="request-card">
          <div>
            <div class="card-top">
              <span class="tramite-code">${sol.codigo_tramite}</span>
              <span class="status-badge ${badgeInfo.class}">${badgeInfo.label}</span>
            </div>

            <h3 class="tramite-title">${sol.nombre_evento}</h3>
            <p class="tramite-secretaria">${sol.secretaria}</p>

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
                <strong>Diseñador</strong>
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
    const total = state.solicitudes.length;
    const pen = state.solicitudes.filter(s => s.estado === 'PENDIENTE').length;
    const rev = state.solicitudes.filter(s => s.estado === 'EN_REVISION').length;
    const pro = state.solicitudes.filter(s => s.estado === 'DISENO_PROCESO').length;
    const aju = state.solicitudes.filter(s => s.estado === 'AJUSTES').length;
    const apr = state.solicitudes.filter(s => s.estado === 'APROBADO').length;
    const fin = state.solicitudes.filter(s => s.estado === 'FINALIZADO').length;

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

  // MODAL DE DETALLE Y CONTROL DE MODIFICACIONES
  openDetailModal(solicitudId) {
    const sol = state.solicitudes.find(s => s.id === solicitudId);
    if (!sol) return;

    const modalBackdrop = document.getElementById('modalDetalleBackdrop');
    const codEl = document.getElementById('modalCodigoTramite');
    const titEl = document.getElementById('modalTituloEvento');
    const bodyEl = document.getElementById('modalContentBody');

    codEl.textContent = `${sol.codigo_tramite} • ${this.getStatusBadge(sol.estado).label}`;
    titEl.textContent = sol.nombre_evento;

    // Construcción del contenido del modal con ficha y sistema de cambios
    const rondasDisponibles = 2 - sol.rondas_cambios_usadas;
    const puedeSolicitarCambio = rondasDisponibles > 0;

    bodyEl.innerHTML = `
      <div class="modal-info-section mb-3">
        <h4 style="font-size:1.05rem; font-weight:700; color:var(--gamea-blue-dark); margin-bottom:8px;">
          📋 Ficha Técnica Institucional
        </h4>
        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:14px; font-size:0.88rem;">
          <p><strong>Secretaría Solicitante:</strong> ${sol.secretaria}</p>
          <p><strong>Dirección / Unidad:</strong> ${sol.direccion}</p>
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

      <!-- MÓDULO DE CONTROL DE MODIFICACIONES / CAMBIOS -->
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

        <!-- FORMULARIO DE NUEVA OBSERVACIÓN (SI TIENE RONDAS DISPONIBLES) -->
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
            🛑 <strong>LÍMITE ALCANZADO:</strong> Se han agotado las 2 rondas de cambios permitidas. Para cualquier ajuste adicional se requiere autorización expresa y resolución de la Dirección de Comunicación.
          </div>
        `}
      </div>

      <!-- ACCIONES OPERATIVAS POR ROL -->
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

          ${sol.estado === 'PENDIENTE' && (state.currentRole === 'SUPERVISOR' || state.currentRole === 'ADMIN') ? `
            <button class="btn btn-sm btn-outline" onclick="app.asignarDisenadorPrompt('${sol.id}')">
              👤 Asignar Diseñador
            </button>
          ` : ''}

          ${(sol.estado === 'EN_REVISION' || sol.estado === 'AJUSTES') && (state.currentRole === 'DISENADOR' || state.currentRole === 'SUPERVISOR') ? `
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
      usuario: `${this.getRoleName(state.currentRole)}`,
      motivo: txt
    });

    this.renderRequests();
    this.updateCounts();
    this.openDetailModal(solicitudId); // Actualizar modal
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
    const dis = prompt('Ingrese el nombre del Diseñador Gráfico asignado:', 'Lic. Carlos Mamani');
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

// INICIALIZAR CUANDO CARGUE EL DOM
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
