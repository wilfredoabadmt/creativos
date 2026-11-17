-- ==============================================================================
-- COMUNICA DIGITAL GAM El Alto
-- Script DDL de Base de Datos PostgreSQL 16
-- Plataforma Digital de Gestión Creativa Institucional
-- ==============================================================================

-- 1. Extensiones del Sistema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Esquema y Tipos Enumerados
DROP SCHEMA IF EXISTS comunica CASCADE;
CREATE SCHEMA comunica;
SET search_path TO comunica, public;

CREATE TYPE tipo_material AS ENUM ('IMPRESO', 'DIGITAL', 'AMBOS');
CREATE TYPE orientacion_diseno AS ENUM ('VERTICAL', 'HORIZONTAL', 'CUADRADO', 'PANORAMICO');
CREATE TYPE prioridad_solicitud AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'URGENTE');

-- 3. Tabla: Roles del Sistema
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(30) UNIQUE NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla: Secretarías Municipales (Nivel 1)
CREATE TABLE secretarias (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    sigla VARCHAR(30),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla: Direcciones Municipales (Nivel 2)
CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    secretaria_id INT NOT NULL REFERENCES secretarias(id) ON DELETE RESTRICT,
    codigo VARCHAR(20) NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    sigla VARCHAR(30),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_secretaria_direccion UNIQUE (secretaria_id, codigo)
);

-- 6. Tabla: Unidades y Jefaturas (Nivel 3)
CREATE TABLE unidades (
    id SERIAL PRIMARY KEY,
    direccion_id INT NOT NULL REFERENCES direcciones(id) ON DELETE RESTRICT,
    nombre VARCHAR(200) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabla: Estados del Ciclo de Vida
CREATE TABLE estados (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(30) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    color_hex VARCHAR(10) NOT NULL,
    orden INT NOT NULL,
    descripcion TEXT
);

-- 8. Tabla: Catálogo de Tipos de Diseño
CREATE TABLE tipos_diseno (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

-- 9. Tabla: Usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rol_id INT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    secretaria_id INT REFERENCES secretarias(id) ON DELETE SET NULL,
    direccion_id INT REFERENCES direcciones(id) ON DELETE SET NULL,
    unidad_id INT REFERENCES unidades(id) ON DELETE SET NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    cargo VARCHAR(150),
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono_contacto VARCHAR(30),
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    ultimo_acceso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Tabla Central: Solicitudes Creativas
CREATE TABLE solicitudes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_tramite VARCHAR(30) UNIQUE NOT NULL, -- Ej: SOL-2026-0001
    solicitante_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    disenador_asignado_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    supervisor_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    estado_id INT NOT NULL REFERENCES estados(id) ON DELETE RESTRICT,
    
    -- Sección 1: Datos del Evento o Actividad
    secretaria_id INT NOT NULL REFERENCES secretarias(id) ON DELETE RESTRICT,
    direccion_id INT REFERENCES direcciones(id) ON DELETE RESTRICT,
    unidad_id INT REFERENCES unidades(id) ON DELETE SET NULL,
    nombre_evento VARCHAR(250) NOT NULL,
    fecha_evento DATE NOT NULL,
    hora_evento TIME,
    lugar_evento VARCHAR(250) NOT NULL,
    publico_objetivo TEXT NOT NULL,
    objetivo_mensaje TEXT NOT NULL,
    informacion_adicional TEXT,
    
    -- Sección 2: Características del Diseño
    tipo_diseno_id INT NOT NULL REFERENCES tipos_diseno(id) ON DELETE RESTRICT,
    tipo_diseno_otro VARCHAR(150),
    estilo_visual VARCHAR(50) NOT NULL, -- Institucional, Moderno, Juvenil, Colorido, Minimalista, Educativo, Cultural, Otro
    estilo_otro VARCHAR(150),

    -- Sección 3: Formato y Difusión
    material tipo_material NOT NULL DEFAULT 'DIGITAL',
    tamano_impreso VARCHAR(100), -- Si es impreso, tamaño: Carta, Oficio, A3, etc.
    orientacion orientacion_diseno NOT NULL DEFAULT 'VERTICAL',
    plataformas_difusion TEXT[] NOT NULL DEFAULT ARRAY['REDES_SOCIALES'], -- Facebook, Instagram, TikTok, WhatsApp, Web, Pantallas, Otro
    plataforma_otro VARCHAR(150),
    formato_requerido VARCHAR(150), -- Formato requerido: PDF imprenta, JPG, PNG, etc.

    -- Sección 4: Material que debe entregar la unidad solicitante (Checklist)
    check_texto_aprobado BOOLEAN NOT NULL DEFAULT TRUE,
    check_logos_calidad BOOLEAN NOT NULL DEFAULT TRUE,
    check_fotografias BOOLEAN NOT NULL DEFAULT FALSE,
    check_qr_enlaces BOOLEAN NOT NULL DEFAULT FALSE,
    check_otros_elementos BOOLEAN NOT NULL DEFAULT FALSE,
    texto_aprobado TEXT NOT NULL,

    -- Sección 5: Datos del Solicitante (para coordinar)
    solicitante_nombre VARCHAR(150) NOT NULL,
    solicitante_cargo VARCHAR(150) NOT NULL,
    solicitante_telefono VARCHAR(50) NOT NULL,

    -- Sección 6: Consideraciones y Conformidad
    vobo_aceptado BOOLEAN NOT NULL DEFAULT TRUE,

    -- SLA y Fechas de Control (7 días hábiles normados)
    prioridad prioridad_solicitud NOT NULL DEFAULT 'MEDIA',
    fecha_recepcion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_limite TIMESTAMP WITH TIME ZONE NOT NULL, -- Calculada: 7 días hábiles
    fecha_aprobacion TIMESTAMP WITH TIME ZONE,
    fecha_finalizado TIMESTAMP WITH TIME ZONE,

    -- Control de Modificaciones (Máx 2 rondas normadas)
    rondas_cambios_usadas INT NOT NULL DEFAULT 0 CHECK (rondas_cambios_usadas BETWEEN 0 AND 2),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Tabla: Archivos Adjuntos a la Solicitud (Insumos)
CREATE TABLE solicitud_archivos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
    tipo_archivo VARCHAR(50) NOT NULL, -- TEXTO_BRIEF, LOGO, FOTOGRAFIA, QR, MANUAL, OTRO
    nombre_original VARCHAR(255) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    tamano_bytes BIGINT NOT NULL,
    subido_por UUID NOT NULL REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Tabla: Entregables y Bocetos de Diseño
CREATE TABLE entregables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
    disenador_id UUID NOT NULL REFERENCES usuarios(id),
    version INT NOT NULL DEFAULT 1,
    es_arte_final BOOLEAN NOT NULL DEFAULT FALSE,
    titulo VARCHAR(150) NOT NULL,
    nota_disenador TEXT,
    s3_key_preview VARCHAR(500) NOT NULL, -- Imagen web/jpg/png para previsualización
    s3_key_editable VARCHAR(500),         -- Archivo fuente AI, PSD, ZIP, PDF imprenta
    descargas_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Tabla: Control de Modificaciones / Cambios (Máximo 2 Rondas)
CREATE TABLE solicitud_cambios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
    ronda_numero INT NOT NULL CHECK (ronda_numero IN (1, 2)),
    solicitado_por UUID NOT NULL REFERENCES usuarios(id),
    motivo_cambio TEXT NOT NULL,
    archivo_anterior_id UUID REFERENCES entregables(id),
    archivo_nuevo_referencia VARCHAR(500),
    atendido BOOLEAN DEFAULT FALSE,
    fecha_atendido TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_solicitud_ronda UNIQUE (solicitud_id, ronda_numero)
);

-- 14. Tabla: Comentarios y Mensajería de Seguimiento
CREATE TABLE solicitud_comentarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    solicitud_id UUID NOT NULL REFERENCES solicitudes(id) ON DELETE CASCADE,
    usuario_id UUID NOT NULL REFERENCES usuarios(id),
    comentario TEXT NOT NULL,
    es_interno_dicom BOOLEAN DEFAULT FALSE, -- Oculto para solicitante si es nota técnica de diseño
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Tabla: Auditoría Inmutable de Eventos (APPEND-ONLY)
CREATE TABLE auditoria (
    id BIGSERIAL PRIMARY KEY,
    evento VARCHAR(100) NOT NULL,
    entidad_tipo VARCHAR(50) NOT NULL,
    entidad_id VARCHAR(100) NOT NULL,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    ip_origen VARCHAR(45),
    user_agent TEXT,
    estado_anterior JSONB,
    estado_nuevo JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de Rendimiento
CREATE INDEX idx_solicitudes_estado ON solicitudes(estado_id);
CREATE INDEX idx_solicitudes_solicitante ON solicitudes(solicitante_id);
CREATE INDEX idx_solicitudes_disenador ON solicitudes(disenador_asignado_id);
CREATE INDEX idx_solicitudes_secretaria ON solicitudes(secretaria_id);
CREATE INDEX idx_solicitudes_fecha_limite ON solicitudes(fecha_limite);
CREATE INDEX idx_auditoria_entidad ON auditoria(entidad_tipo, entidad_id);
CREATE INDEX idx_auditoria_fecha ON auditoria(created_at DESC);

-- ==============================================================================
-- 16. LÓGICA DE NEGOCIO EN BASE DE DATOS (TRIGGERS & PROCEDIMIENTOS)
-- ==============================================================================

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_usuarios
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_solicitudes
BEFORE UPDATE ON solicitudes
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- Función para generar correlativo de trámite anual (SOL-2026-0001)
CREATE OR REPLACE FUNCTION comunica.generar_codigo_tramite()
RETURNS TRIGGER AS $$
DECLARE
    anio_actual TEXT := TO_CHAR(CURRENT_DATE, 'YYYY');
    conteo INT;
    nuevo_codigo TEXT;
BEGIN
    SELECT COUNT(*) + 1 INTO conteo
    FROM comunica.solicitudes
    WHERE codigo_tramite LIKE 'SOL-' || anio_actual || '-%';

    nuevo_codigo := 'SOL-' || anio_actual || '-' || LPAD(conteo::TEXT, 4, '0');
    NEW.codigo_tramite := nuevo_codigo;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generar_codigo_tramite ON comunica.solicitudes;
CREATE TRIGGER trigger_generar_codigo_tramite
BEFORE INSERT ON comunica.solicitudes
FOR EACH ROW
WHEN (NEW.codigo_tramite IS NULL OR NEW.codigo_tramite = '')
EXECUTE FUNCTION comunica.generar_codigo_tramite();

-- ==============================================================================
-- 17. CARGA DE DATOS SEMILLA (ORGANIGRAMA D.M. N° 200 - GESTIÓN 2026)
-- ==============================================================================

-- Roles
INSERT INTO roles (codigo, nombre, descripcion) VALUES
('SUPERADMIN', 'Super Administrador Municipal', 'Control supremo del sistema: administración de usuarios, roles, secretarías, direcciones, áreas y auditoría completa'),
('ADMIN', 'Administrador General', 'Control de la plataforma, usuarios, catálogos y auditoría general'),
('SUPERVISOR', 'Supervisor / Director DICOM', 'Priorización, asignación, validación técnica y dashboard'),
('DISENADOR', 'Diseñador Gráfico Institucional', 'Ejecución creativa, carga de propuestas y artes finales'),
('SOLICITANTE', 'Solicitante Municipal', 'Secretarías, Direcciones y Unidades del GAM El Alto');

-- Estados Oficiales
INSERT INTO estados (codigo, nombre, color_hex, orden, descripcion) VALUES
('PENDIENTE', '🟡 Pendiente', '#EAB308', 1, 'Solicitud recepcionada por el sistema en espera de revisión'),
('EN_REVISION', '🔵 En revisión', '#3B82F6', 2, 'Insumos validados y asignado a equipo de diseño'),
('DISENO_PROCESO', '🟣 Diseño en proceso', '#8B5CF6', 3, 'El diseñador se encuentra elaborando la propuesta gráfica'),
('AJUSTES', '🟠 Ajustes', '#F97316', 4, 'Observaciones de cambio en curso (Ronda 1 o 2)'),
('APROBADO', '🟢 Aprobado', '#10B981', 5, 'Propuesta aprobada por solicitante y supervisor'),
('FINALIZADO', '⚫ Finalizado', '#475569', 6, 'Artes finales entregados y archivados en memoria institucional'),
('RECHAZADO', '🔴 Rechazado / No Conforme', '#DC2626', 7, 'Solicitud o propuesta denegada con motivo fundado');

-- Catálogo Tipos de Diseño
INSERT INTO tipos_diseno (nombre, descripcion, icono) VALUES
('Afiche', 'Afiche promocional de evento en formato estándar', 'poster'),
('Poster', 'Cartel de gran impacto visual', 'art'),
('Flyer', 'Volante informativo digital o impreso', 'flyer'),
('Tríptico', 'Folleto plegable de 3 cuerpos para difusión detallada', 'booklet'),
('Invitación', 'Invitación protocolar formal para actos cívicos u obras', 'mail'),
('Banner', 'Banner impreso para eventos o pendones tipo roll-up', 'banner'),
('Infografía', 'Representación visual explicativa de datos y trámites', 'chart'),
('Redes Sociales', 'Artes optimizados para Facebook, Instagram feed/stories, WhatsApp', 'share'),
('Gigantografía', 'Vallas publicitarias exteriores de grandes dimensiones', 'billboard'),
('Otro', 'Pieza gráfica con requerimientos específicos personalizados', 'more');

-- Secretarías Municipales y Órganos (D.M. N° 200 - GESTIÓN 2026)
-- Secretarías Oficiales Organigrama D.M. N° 200
INSERT INTO secretarias (id, codigo, nombre, sigla) VALUES
(1, 'DESPACHO', 'Despacho del Alcalde', 'DESPACHO'),
(2, 'SMGI', 'Secretaría Municipal de Gestión Institucional', 'SMGI'),
(3, 'SMAF', 'Secretaría Municipal de Administración y Finanzas', 'SMAF'),
(4, 'SMMU', 'Secretaría Municipal de Movilidad Urbana', 'SMMU'),
(5, 'SMEC', 'Secretaría Municipal de Educación y Cultura', 'SMEC'),
(6, 'SMDHSI', 'Secretaría Municipal de Desarrollo Humano y Social Integral', 'SMDHSI'),
(7, 'SMSC', 'Secretaría Municipal de Seguridad Ciudadana', 'SMSC'),
(8, 'SMS', 'Secretaría Municipal de Salud', 'SMS'),
(9, 'SMIP', 'Secretaría Municipal de Infraestructura Pública', 'SMIP'),
(10, 'SMASGAR', 'Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos', 'SMASGAR'),
(11, 'SMDE', 'Secretaría Municipal de Desarrollo Económico', 'SMDE'),
(12, 'SUBALCALDIAS', 'Subalcaldías Municipales (Distritos Urbanos y Rurales D-1 al D-14)', 'SUB-D1-14'),
(13, 'DESCENTRALIZADO', 'Nivel Descentralizado y Empresas Municipales', 'DESCENTRALIZADO');

-- Direcciones Oficiales Aprobadas por D.M. N° 200
INSERT INTO direcciones (id, secretaria_id, codigo, nombre, sigla) VALUES
(1, 1, 'DGAL', 'Dirección General de Asesoría Legal', 'DGAL'),
(2, 1, 'DIPLAN', 'Dirección de Planificación', 'DIPLAN'),
(3, 1, 'DRI', 'Dirección de Relaciones Internacionales', 'DRI'),
(4, 1, 'UNID-DESPACHO', 'Unidades de Asesoramiento y Control Directo del Despacho', 'U-DESPACHO'),
(5, 2, 'DICOM', 'Dirección de Comunicación', 'DICOM'),
(6, 2, 'DAC', 'Dirección de Atención Ciudadana', 'DAC'),
(7, 2, 'DAP', 'Dirección de Alumbrado Público', 'DAP'),
(8, 3, 'DIR-TES', 'Dirección del Tesoro Municipal', 'DTM'),
(9, 3, 'DIR-TH', 'Dirección de Talento Humano', 'DTH'),
(10, 3, 'DIR-ATM', 'Dirección de Administración Tributaria Municipal', 'DATM'),
(11, 3, 'DIR-CONT', 'Dirección de Contrataciones', 'DCONT'),
(12, 3, 'DIR-ADM', 'Dirección Administrativa', 'DADM'),
(13, 4, 'DIR-RMU', 'Dirección de Regulación de la Movilidad Urbana', 'DRMU'),
(14, 5, 'DIR-CULT', 'Dirección de Cultura', 'DCULT'),
(15, 5, 'DIR-ASE', 'Dirección de Atención Servicios de Educación', 'DASE'),
(16, 5, 'DIR-AMIE', 'Dirección de Administración y Mejora de la Infraestructura y Equipamiento Educativo', 'DAMIEE'),
(17, 6, 'DIR-NGAS', 'Dirección de Niñez, Género y Atención Social', 'DNGAS'),
(18, 6, 'DIR-DI', 'Dirección de Desarrollo Integral', 'DDI'),
(19, 6, 'DIR-DEP', 'Dirección de Deportes', 'DDEP'),
(20, 7, 'DIR-SPPST', 'Dirección de Seguridad Pública, Programas de Seguridad Ciudadana y Soluciones Tecnológicas', 'DSPPST'),
(21, 7, 'DIR-FM', 'Dirección de Ferias y Mercados', 'DFM'),
(22, 8, 'DIR-GS', 'Dirección de Gestión en Salud', 'DGS'),
(23, 8, 'DIR-ESPN', 'Dirección de Establecimientos de Salud de Primer Nivel', 'DESPN'),
(24, 8, 'DIR-GSSND', 'Dirección de Gestión Servicios de Salud Nivel Desconcentrado', 'DGSSND'),
(25, 9, 'DIR-PM', 'Dirección de Proyectos Municipales', 'DPM'),
(26, 9, 'DIR-FO', 'Dirección de Fiscalización de Obras', 'DFO'),
(27, 9, 'DIR-SO', 'Dirección de Supervisión de Obras', 'DSO'),
(28, 9, 'DIR-OM', 'Dirección de Obras Municipales', 'DOM'),
(29, 9, 'DIR-ATC', 'Dirección de Administración Territorial y Catastro', 'DATC'),
(30, 10, 'DIR-SBRHCA', 'Dirección de Saneamiento Básico, Recursos Hídricos y Control Ambiental', 'DSBRHCA'),
(31, 10, 'DIR-GIR', 'Dirección de Gestión Integral de Residuos', 'DGIR'),
(32, 10, 'DIR-GR', 'Dirección de Gestión de Riesgos', 'DGR'),
(33, 10, 'DIR-FAP', 'Dirección de Forestación y Áreas Protegidas', 'DFAP'),
(34, 11, 'DIR-DPPYMES', 'Dirección de Desarrollo Productivo de Pequeñas y Medianas Empresas', 'DDP-PYMES'),
(35, 11, 'DIR-DPA', 'Dirección de Desarrollo Productivo Artesanal', 'DDPA'),
(36, 11, 'DIR-ASA', 'Dirección de Agropecuaria y Seguridad Alimentaria', 'DASA'),
(37, 11, 'DIR-SMEI', 'Dirección de Servicios Municipales e Iniciativas Económicas', 'DSMEI'),
(38, 11, 'DIR-BUS', 'Dirección Municipal de Transporte Público – Bus Municipal', 'DMTP-BUS'),
(39, 12, 'SUB-D1', 'Subalcaldía Distrito Municipal - 1', 'SDM-1'),
(40, 12, 'SUB-D2', 'Subalcaldía Distrito Municipal - 2', 'SDM-2'),
(41, 12, 'SUB-D3', 'Subalcaldía Distrito Municipal - 3', 'SDM-3'),
(42, 12, 'SUB-D4', 'Subalcaldía Distrito Municipal - 4', 'SDM-4'),
(43, 12, 'SUB-D5', 'Subalcaldía Distrito Municipal - 5', 'SDM-5'),
(44, 12, 'SUB-D6', 'Subalcaldía Distrito Municipal - 6', 'SDM-6'),
(45, 12, 'SUB-D7', 'Subalcaldía Distrito Municipal - 7', 'SDM-7'),
(46, 12, 'SUB-D8', 'Subalcaldía Distrito Municipal - 8', 'SDM-8'),
(47, 12, 'SUB-D9', 'Subalcaldía Distrito Municipal - 9', 'SDM-9'),
(48, 12, 'SUB-D10', 'Subalcaldía Distrito Municipal - 10', 'SDM-10'),
(49, 12, 'SUB-D11', 'Subalcaldía Distrito Municipal - 11', 'SDM-11'),
(50, 12, 'SUB-D12', 'Subalcaldía Distrito Municipal - 12', 'SDM-12'),
(51, 12, 'SUB-D13', 'Subalcaldía Distrito Municipal - 13', 'SDM-13'),
(52, 12, 'SUB-D14', 'Subalcaldía Distrito Municipal - 14', 'SDM-14'),
(53, 13, 'TMEA', 'Terminal Metropolitana El Alto', 'TMEA'),
(54, 13, 'LIOM-GAMEA', 'Laboratorio Industrial de Oxígeno Medicinal – G.A.M.E.A.', 'LIOM-GAMEA');

-- Unidades / Áreas Organizacionales Oficiales
INSERT INTO unidades (id, direccion_id, nombre) VALUES
(1, 1, 'Unidad de Asuntos Jurisdiccionales'),
(2, 1, 'Unidad de Normas Municipales y Asuntos Administrativos'),
(3, 1, 'Unidad de Defensa y Regularización de Bienes de Dominio Municipal'),
(4, 2, 'Unidad de Programación de Operaciones'),
(5, 2, 'Unidad de Inversión Pública y Seguimiento'),
(6, 2, 'Unidad de Desarrollo Organizacional'),
(7, 2, 'Unidad de Planificación Estratégica'),
(8, 2, 'Unidad de Ordenamiento Territorial'),
(9, 4, 'Unidad de Transparencia y Lucha Contra la Corrupción'),
(10, 4, 'Unidad Sumariante'),
(11, 4, 'Unidad de Auditoría Interna'),
(12, 4, 'Unidad de Límites'),
(13, 4, 'Unidad de Relaciones Públicas y Protocolo'),
(14, 4, 'Unidad de Gestión Social'),
(15, 5, 'Unidad de Prensa'),
(16, 5, 'Unidad de Imagen Corporativa'),
(17, 5, 'Unidad de Comunicación Digital'),
(18, 6, 'Unidad de Coordinación con Subalcaldías'),
(19, 6, 'Unidad de Archivo Central'),
(20, 6, 'Unidad de Prevención de Conflictos'),
(21, 6, 'Unidad de Sistema Único de Trámites'),
(22, 7, 'Unidad Operativa de Alumbrado Público'),
(23, 7, 'Unidad de Programas y Proyectos de Alumbrado Público'),
(24, 8, 'Unidad de Tesorería'),
(25, 8, 'Unidad de Presupuesto'),
(26, 8, 'Unidad de Contabilidad'),
(27, 8, 'Unidad de Crédito Público y Gestión de Financiamiento'),
(28, 9, 'Unidad de Registro'),
(29, 9, 'Unidad de Asesoría Legal DTH'),
(30, 9, 'Unidad de Planillas y Control'),
(31, 9, 'Unidad de Selección y Contratación'),
(32, 9, 'Unidad de Capacitación y Evaluación'),
(33, 10, 'Unidad de Ingresos y Control Tributario'),
(34, 10, 'Unidad de Asesoría Jurídica y Cobranza Coactiva'),
(35, 10, 'Unidad de Fiscalización y Recaudaciones'),
(36, 11, 'Unidad de Adquisiciones y Contrataciones Menores'),
(37, 11, 'Unidad de Licitaciones'),
(38, 11, 'Unidad Jurídica de Contrataciones'),
(39, 12, 'Unidad de Activos Fijos'),
(40, 12, 'Unidad de Servicios Generales y Mantenimiento'),
(41, 12, 'Unidad de Almacenes'),
(42, 12, 'Unidad de Administración de Sistemas de Información'),
(43, 13, 'Unidad de Planificación de la Movilidad Urbana Sostenible'),
(44, 13, 'Unidad de Señalización y Semaforización'),
(45, 13, 'Unidad de Regulación del Transporte'),
(46, 13, 'Unidad Guardia Municipal de Transporte'),
(47, 14, 'Unidad de Fomento a Iniciativas Artísticas y Culturales'),
(48, 14, 'Escuela Municipal de Artes'),
(49, 14, 'Unidad de Administración de Espacios Culturales'),
(50, 14, 'Unidad de Turismo'),
(51, 15, 'Unidad de Programas Educativos'),
(52, 15, 'Unidad de la Juventud'),
(53, 16, 'Unidad de Mejora de la Infraestructura y Equipamiento Educativo'),
(54, 16, 'Unidad de Regularización de Bienes Inmuebles Sector de Educación'),
(55, 17, 'Unidad de la Infancia, Niñez y Adolescencia'),
(56, 17, 'Unidad de la Mujer'),
(57, 17, 'Unidad de Atención Integral a la Familia'),
(58, 17, 'Unidad de Poblaciones Diversas'),
(59, 18, 'Unidad de Adultos Mayores'),
(60, 18, 'Unidad de Atención a Personas con Discapacidad'),
(61, 19, 'Unidad de Infraestructura Deportiva'),
(62, 19, 'Unidad de Fortalecimiento Deportivo'),
(63, 20, 'Intendencia, Guardia y Banda Municipal'),
(64, 20, 'Unidad del Observatorio Municipal'),
(65, 20, 'Unidad de Programas de Seguridad Ciudadana y Soluciones Tecnológicas'),
(66, 21, 'Unidad de Ferias'),
(67, 21, 'Unidad de Mercados'),
(68, 22, 'Unidad de Planificación Municipal en Salud'),
(69, 22, 'Unidad Técnica de Administración del S.U.S.'),
(70, 22, 'Unidad de Programas y Proyectos'),
(71, 22, 'Unidad de Promoción y Prevención'),
(72, 22, 'Unidad de Epidemiología'),
(73, 23, 'Red de Salud Municipal Corea'),
(74, 23, 'Red de Salud Municipal Los Andes'),
(75, 23, 'Red de Salud Municipal Holandés'),
(76, 23, 'Red de Salud Municipal Lotes y Servicios'),
(77, 23, 'Red de Salud Municipal Senkata'),
(78, 24, 'Hospital Municipal Boliviano Holandés'),
(79, 24, 'Hospital Municipal Los Andes'),
(80, 24, 'Hospital Municipal Modelo Corea'),
(81, 24, 'Hospital Municipal Qullañ Uta'),
(82, 24, 'Hospital Municipal Modelo Boliviano Japonés'),
(83, 25, 'Unidad de Proyectos Municipales'),
(84, 25, 'Unidad de Proyectos Estratégicos'),
(85, 26, 'Unidad de Fiscalización de Proyectos Estratégicos'),
(86, 26, 'Unidad de Fiscalización de Proyectos Municipales'),
(87, 27, 'Unidad de Supervisión de Obras Estratégicas'),
(88, 27, 'Unidad de Supervisión de Obras Municipales'),
(89, 27, 'Unidad de Cierre de Proyectos'),
(90, 28, 'Unidad de Infraestructura Municipal'),
(91, 28, 'Unidad de Infraestructura Vial'),
(92, 28, 'Unidad de Pavimentos'),
(93, 28, 'Unidad de Mantenimiento y Bacheo'),
(94, 28, 'Unidad de Administración de Maquinarias'),
(95, 29, 'Unidad de Catastro Municipal y Cartografía'),
(96, 29, 'Unidad de Administración Territorial'),
(97, 29, 'Unidad de Vialidad'),
(98, 29, 'Unidad Jurídica de Administración Territorial'),
(99, 30, 'Unidad de Recursos Hídricos y Drenaje Pluvial'),
(100, 30, 'Unidad de Saneamiento Básico'),
(101, 30, 'Unidad de Control y Monitoreo Ambiental'),
(102, 30, 'Unidad de Prevención y Calidad Ambiental'),
(103, 31, 'Unidad de Gestión de Residuos'),
(104, 31, 'Unidad de Seguimiento y Control'),
(105, 32, 'Unidad de Prevención de Riesgos'),
(106, 32, 'Centro de Operaciones de Emergencia (COE)'),
(107, 33, 'Unidad de Áreas Verdes, Protegidas y Bofedales'),
(108, 33, 'Unidad de Forestación'),
(109, 34, 'Unidad de Competitividad y Productividad'),
(110, 34, 'Unidad de Innovación y Emprendimiento'),
(111, 35, 'Unidad de Promoción Artesanal'),
(112, 35, 'Unidad de Desarrollo Productivo Artesanal'),
(113, 36, 'Unidad de Fortalecimiento Agropecuario'),
(114, 36, 'Unidad de Gestión de Proyectos Agropecuarios'),
(115, 37, 'Unidad de Administración de Servicios Municipales'),
(116, 37, 'Unidad de Iniciativas Económicas'),
(117, 38, 'Unidad de Operaciones'),
(118, 38, 'Unidad de Mantenimiento'),
(119, 38, 'Unidad de Administración y Recaudo'),
(120, 39, 'Unidad de Infraestructura Pública'),
(121, 39, 'Unidad de Desarrollo Humano'),
(122, 39, 'Asesoría Jurídica'),
(123, 39, 'Unidad de Finanzas y Administración'),
(124, 40, 'Unidad de Infraestructura Pública'),
(125, 40, 'Unidad de Desarrollo Humano'),
(126, 40, 'Asesoría Jurídica'),
(127, 40, 'Unidad de Finanzas y Administración'),
(128, 41, 'Unidad de Infraestructura Pública'),
(129, 41, 'Unidad de Desarrollo Humano'),
(130, 41, 'Asesoría Jurídica'),
(131, 41, 'Unidad de Finanzas y Administración'),
(132, 42, 'Unidad de Infraestructura Pública'),
(133, 42, 'Unidad de Desarrollo Humano'),
(134, 42, 'Asesoría Jurídica'),
(135, 42, 'Unidad de Finanzas y Administración'),
(136, 43, 'Unidad de Infraestructura Pública'),
(137, 43, 'Unidad de Desarrollo Humano'),
(138, 43, 'Asesoría Jurídica'),
(139, 43, 'Unidad de Finanzas y Administración'),
(140, 44, 'Unidad de Infraestructura Pública'),
(141, 44, 'Unidad de Desarrollo Humano'),
(142, 44, 'Asesoría Jurídica'),
(143, 44, 'Unidad de Finanzas y Administración'),
(144, 45, 'Unidad de Infraestructura Pública'),
(145, 45, 'Unidad de Desarrollo Humano'),
(146, 45, 'Asesoría Jurídica'),
(147, 45, 'Unidad de Finanzas y Administración'),
(148, 46, 'Unidad de Infraestructura Pública'),
(149, 46, 'Unidad de Desarrollo Humano'),
(150, 46, 'Asesoría Jurídica'),
(151, 46, 'Unidad de Finanzas y Administración'),
(152, 47, 'Unidad de Infraestructura Pública'),
(153, 47, 'Unidad de Desarrollo Humano'),
(154, 47, 'Asesoría Jurídica'),
(155, 47, 'Unidad de Finanzas y Administración'),
(156, 48, 'Unidad de Infraestructura Pública'),
(157, 48, 'Unidad de Desarrollo Humano'),
(158, 48, 'Asesoría Jurídica'),
(159, 48, 'Unidad de Finanzas y Administración'),
(160, 49, 'Unidad de Infraestructura Pública'),
(161, 49, 'Unidad de Desarrollo Humano'),
(162, 49, 'Asesoría Jurídica'),
(163, 49, 'Unidad de Finanzas y Administración'),
(164, 50, 'Unidad de Infraestructura Pública'),
(165, 50, 'Unidad de Desarrollo Humano'),
(166, 50, 'Asesoría Jurídica'),
(167, 50, 'Unidad de Finanzas y Administración'),
(168, 51, 'Unidad de Infraestructura Pública'),
(169, 51, 'Unidad de Desarrollo Humano'),
(170, 51, 'Asesoría Jurídica'),
(171, 51, 'Unidad de Finanzas y Administración'),
(172, 52, 'Unidad de Infraestructura Pública'),
(173, 52, 'Unidad de Desarrollo Humano'),
(174, 52, 'Asesoría Jurídica'),
(175, 52, 'Unidad de Finanzas y Administración'),
(176, 53, 'Unidad de Administración y Operaciones'),
(177, 54, 'Unidad de Producción y Calidad');

-- Usuarios Institucionales Preconfigurados por Dirección (Credenciales de Acceso Seguro)
INSERT INTO usuarios (id, rol_id, secretaria_id, direccion_id, nombres, apellidos, cargo, email, telefono_contacto, password_hash) VALUES
-- SUPERADMIN SUPREMO
('c0000001-0000-0000-0000-000000000001', 1, 1, 1, 'Ing. Wilfredo', 'Abad Mancilla', 'Super Administrador del Sistema Municipal', 'superadmin@elalto.gob.bo', '77210000', crypt('SuperAdminGamea2026!', gen_salt('bf'))),

-- DICOM (SUPERVISOR, DISENADOR, ADMIN)
('a0000001-0000-0000-0000-000000000001', 3, 2, 5, 'Lic. Mavelin', 'Yucra', 'Directora de Comunicación', 'director.dicom@elalto.gob.bo', '77210001', crypt('DicomElAlto2026!', gen_salt('bf'))),
('a0000001-0000-0000-0000-000000000002', 4, 2, 5, 'Lic. Marco Antonio', 'Choque Callisaya', 'Diseñador Gráfico Senior', 'disenador.marco@elalto.gob.bo', '77210002', crypt('DicomElAlto2026!', gen_salt('bf'))),
('a0000001-0000-0000-0000-000000000003', 2, 2, 5, 'Ing. Wilfredo', 'Abad Mancilla', 'Administrador General de Sistemas', 'admin@elalto.gob.bo', '77210000', crypt('AdminElAlto2026!', gen_salt('bf'))),

-- Usuarios Solicitantes Oficiales por Dirección
('b0000001-0000-0000-0000-000000000001', 5, 8, 23, 'Dra. Patricia', 'Mendoza Limachi', 'Directora de Gestión en Salud', 'dir.salud@elalto.gob.bo', '78900001', crypt('Salud2026!', gen_salt('bf'))),
('b0000001-0000-0000-0000-000000000002', 5, 9, 29, 'Ing. Roberto', 'Mamani Condori', 'Director de Obras Municipales', 'dir.obras@elalto.gob.bo', '78900002', crypt('Obras2026!', gen_salt('bf'))),
('b0000001-0000-0000-0000-000000000003', 5, 5, 17, 'Lic. Marcelo', 'Paredes Choque', 'Director de Cultura', 'dir.cultura@elalto.gob.bo', '78900003', crypt('Cultura2026!', gen_salt('bf'))),
('b0000001-0000-0000-0000-000000000004', 5, 7, 21, 'Cap. Edwin', 'Huanca Laura', 'Director de Seguridad Pública', 'dir.seguridad@elalto.gob.bo', '78900004', crypt('Seguridad2026!', gen_salt('bf'))),
('b0000001-0000-0000-0000-000000000005', 5, 3, 12, 'Lic. Carmen', 'Villavicencio', 'Directora Administrativa', 'dir.finanzas@elalto.gob.bo', '78900005', crypt('Finanzas2026!', gen_salt('bf'))),
('b0000001-0000-0000-0000-000000000006', 5, 11, 36, 'Lic. René', 'Condori Huallpa', 'Director de Promoción Artesanal', 'dir.artesanias@elalto.gob.bo', '78900006', crypt('Economia2026!', gen_salt('bf')));
