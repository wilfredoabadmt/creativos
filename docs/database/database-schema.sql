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
    tipo_diseno_otro VARCHAR(100),
    estilo_visual VARCHAR(50) NOT NULL, -- Institucional, Moderno, Juvenil, Colorido, Minimalista, etc.
    estilo_otro VARCHAR(100),

    -- Sección 3: Formato y Difusión
    material tipo_material NOT NULL DEFAULT 'DIGITAL',
    orientacion orientacion_diseno NOT NULL DEFAULT 'VERTICAL',
    plataformas_difusion TEXT[] NOT NULL DEFAULT ARRAY['REDES_SOCIALES'], -- Facebook, Instagram, TikTok, WhatsApp, Web, etc.
    dimensiones_especificas VARCHAR(100), -- Ej: 1080x1350px, 2x1 metros

    -- SLA y Fechas de Control
    prioridad prioridad_solicitud NOT NULL DEFAULT 'MEDIA',
    fecha_recepcion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_limite TIMESTAMP WITH TIME ZONE NOT NULL, -- Calculada: 7 días hábiles
    fecha_aprobacion TIMESTAMP WITH TIME ZONE,
    fecha_finalizado TIMESTAMP WITH TIME ZONE,

    -- Control de Modificaciones
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
CREATE OR REPLACE FUNCTION generar_codigo_tramite()
RETURNS TRIGGER AS $$
DECLARE
    anio_actual TEXT := TO_CHAR(CURRENT_DATE, 'YYYY');
    conteo INT;
    nuevo_codigo TEXT;
BEGIN
    SELECT COUNT(*) + 1 INTO conteo
    FROM solicitudes
    WHERE codigo_tramite LIKE 'SOL-' || anio_actual || '-%';

    nuevo_codigo := 'SOL-' || anio_actual || '-' || LPAD(conteo::TEXT, 4, '0');
    NEW.codigo_tramite := nuevo_codigo;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generar_codigo_tramite
BEFORE INSERT ON solicitudes
FOR EACH ROW
WHEN (NEW.codigo_tramite IS NULL OR NEW.codigo_tramite = '')
EXECUTE FUNCTION generar_codigo_tramite();

-- ==============================================================================
-- 17. CARGA DE DATOS SEMILLA (SEEDS OFICIALES GAMEA)
-- ==============================================================================

-- Roles
INSERT INTO roles (codigo, nombre, descripcion) VALUES
('ADMIN', 'Administrador General', 'Control total de la plataforma, usuarios, catálogos y auditoría'),
('SUPERVISOR', 'Supervisor / Director DICOM', 'Priorización, asignación, validación técnica y dashboard'),
('DISENADOR', 'Diseñador Gráfico Institucional', 'Ejecución creativa, carga de propuestas y artes finales'),
('SOLICITANTE', 'Solicitante Municipal', 'Secretarías, Direcciones y Unidades del GAM El Alto');

-- Estados
INSERT INTO estados (codigo, nombre, color_hex, orden, descripcion) VALUES
('PENDIENTE', '🟡 Pendiente', '#EAB308', 1, 'Solicitud recepcionada por el sistema en espera de revisión'),
('EN_REVISION', '🔵 En revisión', '#3B82F6', 2, 'Insumos validados y asignado a equipo de diseño'),
('DISENO_PROCESO', '🟣 Diseño en proceso', '#8B5CF6', 3, 'El diseñador se encuentra elaborando la propuesta gráfica'),
('AJUSTES', '🟠 Ajustes', '#F97316', 4, 'Observaciones de cambio en curso (Ronda 1 o 2)'),
('APROBADO', '🟢 Aprobado', '#10B981', 5, 'Propuesta aprobada por solicitante y supervisor'),
('FINALIZADO', '⚫ Finalizado', '#475569', 6, 'Artes finales entregados y archivados en memoria institucional');

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

-- Secretarías del GAM El Alto
INSERT INTO secretarias (codigo, nombre, sigla) VALUES
('SMGI', 'Secretaría Municipal de Gestión Institucional', 'SMGI'),
('SMS', 'Secretaría Municipal de Salud', 'SMS'),
('SMIP', 'Secretaría Municipal de Infraestructura Pública', 'SMIP'),
('SMEC', 'Secretaría Municipal de Educación y Cultura', 'SMEC'),
('SMSC', 'Secretaría Municipal de Seguridad Ciudadana', 'SMSC'),
('SMDE', 'Secretaría Municipal de Desarrollo Económico', 'SMDE'),
('SMAMA', 'Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos', 'SMAMA'),
('SMAP', 'Secretaría Municipal de Administración y Finanzas', 'SMAF');

-- Direcciones Representativas
INSERT INTO direcciones (secretaria_id, codigo, nombre, sigla) VALUES
(1, 'DICOM', 'Dirección de Comunicación', 'DICOM'),
(1, 'DIR-PROT', 'Dirección de Protocolo y Ceremonial', 'DIR-PROT'),
(2, 'DIR-SALUD', 'Dirección de Redes de Salud', 'DRS'),
(3, 'DIR-OBRAS', 'Dirección de Supervisión de Obras Municipales', 'DSOM'),
(4, 'DIR-CULT', 'Dirección de Culturas y Turismo', 'DCT'),
(5, 'DIR-SEG', 'Dirección de Prevención y Seguridad Vecinal', 'DPSV');
