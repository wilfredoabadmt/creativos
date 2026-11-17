-- ==============================================================================
-- COMUNICA DIGITAL - GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
-- SEMILLA DEL ORGANIGRAMA OFICIAL COMPLETO (D.M. N° 200 - GESTIÓN 2026)
-- ==============================================================================

SET search_path TO comunica, public;

-- 1. Tabla unidades
CREATE TABLE IF NOT EXISTS comunica.unidades (
    id SERIAL PRIMARY KEY,
    direccion_id INT NOT NULL REFERENCES comunica.direcciones(id) ON DELETE CASCADE,
    codigo VARCHAR(50),
    nombre VARCHAR(250) NOT NULL,
    sigla VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Asegurar rol SUPERADMIN
INSERT INTO comunica.roles (codigo, nombre, descripcion)
VALUES ('SUPERADMIN', 'Super Administrador Municipal', 'Control supremo: gestión de organigrama, secretarías, direcciones, unidades y todos los usuarios del municipio')
ON CONFLICT (codigo) DO UPDATE 
SET nombre = EXCLUDED.nombre, descripcion = EXCLUDED.descripcion;

-- 3. Upsert Secretarías por 'codigo'

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('DESPACHO', 'Despacho del Alcalde', 'DESPACHO', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMGI', 'Secretaría Municipal de Gestión Institucional', 'SMGI', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMAF', 'Secretaría Municipal de Administración y Finanzas', 'SMAF', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMMU', 'Secretaría Municipal de Movilidad Urbana', 'SMMU', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMEC', 'Secretaría Municipal de Educación y Cultura', 'SMEC', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMDHSI', 'Secretaría Municipal de Desarrollo Humano y Social Integral', 'SMDHSI', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMSC', 'Secretaría Municipal de Seguridad Ciudadana', 'SMSC', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMS', 'Secretaría Municipal de Salud', 'SMS', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMIP', 'Secretaría Municipal de Infraestructura Pública', 'SMIP', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMASGAR', 'Secretaría Municipal de Agua, Saneamiento, Gestión Ambiental y Riesgos', 'SMASGAR', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SMDE', 'Secretaría Municipal de Desarrollo Económico', 'SMDE', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('SUBALCALDIAS', 'Subalcaldías Municipales (Distritos Urbanos y Rurales D-1 al D-14)', 'SUB-D1-14', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

INSERT INTO comunica.secretarias (codigo, nombre, sigla, activo)
VALUES ('DESCENTRALIZADO', 'Nivel Descentralizado y Empresas Municipales', 'DESCENTRALIZADO', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre, sigla = EXCLUDED.sigla, activo = TRUE;

-- 4. Upsert Direcciones por '(secretaria_id, codigo)'

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESPACHO' LIMIT 1),
  'DGAL',
  'Dirección General de Asesoría Legal',
  'DGAL',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESPACHO' LIMIT 1),
  'DIPLAN',
  'Dirección de Planificación',
  'DIPLAN',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESPACHO' LIMIT 1),
  'DRI',
  'Dirección de Relaciones Internacionales',
  'DRI',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESPACHO' LIMIT 1),
  'UNID-DESPACHO',
  'Unidades de Asesoramiento y Control Directo del Despacho',
  'U-DESPACHO',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMGI' LIMIT 1),
  'DICOM',
  'Dirección de Comunicación',
  'DICOM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMGI' LIMIT 1),
  'DAC',
  'Dirección de Atención Ciudadana',
  'DAC',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMGI' LIMIT 1),
  'DAP',
  'Dirección de Alumbrado Público',
  'DAP',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMAF' LIMIT 1),
  'DIR-TES',
  'Dirección del Tesoro Municipal',
  'DTM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMAF' LIMIT 1),
  'DIR-TH',
  'Dirección de Talento Humano',
  'DTH',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMAF' LIMIT 1),
  'DIR-ATM',
  'Dirección de Administración Tributaria Municipal',
  'DATM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMAF' LIMIT 1),
  'DIR-CONT',
  'Dirección de Contrataciones',
  'DCONT',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMAF' LIMIT 1),
  'DIR-ADM',
  'Dirección Administrativa',
  'DADM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMMU' LIMIT 1),
  'DIR-RMU',
  'Dirección de Regulación de la Movilidad Urbana',
  'DRMU',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMEC' LIMIT 1),
  'DIR-CULT',
  'Dirección de Cultura',
  'DCULT',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMEC' LIMIT 1),
  'DIR-ASE',
  'Dirección de Atención Servicios de Educación',
  'DASE',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMEC' LIMIT 1),
  'DIR-AMIE',
  'Dirección de Administración y Mejora de la Infraestructura y Equipamiento Educativo',
  'DAMIEE',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDHSI' LIMIT 1),
  'DIR-NGAS',
  'Dirección de Niñez, Género y Atención Social',
  'DNGAS',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDHSI' LIMIT 1),
  'DIR-DI',
  'Dirección de Desarrollo Integral',
  'DDI',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDHSI' LIMIT 1),
  'DIR-DEP',
  'Dirección de Deportes',
  'DDEP',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMSC' LIMIT 1),
  'DIR-SPPST',
  'Dirección de Seguridad Pública, Programas de Seguridad Ciudadana y Soluciones Tecnológicas',
  'DSPPST',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMSC' LIMIT 1),
  'DIR-FM',
  'Dirección de Ferias y Mercados',
  'DFM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMS' LIMIT 1),
  'DIR-GS',
  'Dirección de Gestión en Salud',
  'DGS',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMS' LIMIT 1),
  'DIR-ESPN',
  'Dirección de Establecimientos de Salud de Primer Nivel',
  'DESPN',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMS' LIMIT 1),
  'DIR-GSSND',
  'Dirección de Gestión Servicios de Salud Nivel Desconcentrado',
  'DGSSND',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMIP' LIMIT 1),
  'DIR-PM',
  'Dirección de Proyectos Municipales',
  'DPM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMIP' LIMIT 1),
  'DIR-FO',
  'Dirección de Fiscalización de Obras',
  'DFO',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMIP' LIMIT 1),
  'DIR-SO',
  'Dirección de Supervisión de Obras',
  'DSO',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMIP' LIMIT 1),
  'DIR-OM',
  'Dirección de Obras Municipales',
  'DOM',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMIP' LIMIT 1),
  'DIR-ATC',
  'Dirección de Administración Territorial y Catastro',
  'DATC',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMASGAR' LIMIT 1),
  'DIR-SBRHCA',
  'Dirección de Saneamiento Básico, Recursos Hídricos y Control Ambiental',
  'DSBRHCA',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMASGAR' LIMIT 1),
  'DIR-GIR',
  'Dirección de Gestión Integral de Residuos',
  'DGIR',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMASGAR' LIMIT 1),
  'DIR-GR',
  'Dirección de Gestión de Riesgos',
  'DGR',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMASGAR' LIMIT 1),
  'DIR-FAP',
  'Dirección de Forestación y Áreas Protegidas',
  'DFAP',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDE' LIMIT 1),
  'DIR-DPPYMES',
  'Dirección de Desarrollo Productivo de Pequeñas y Medianas Empresas',
  'DDP-PYMES',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDE' LIMIT 1),
  'DIR-DPA',
  'Dirección de Desarrollo Productivo Artesanal',
  'DDPA',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDE' LIMIT 1),
  'DIR-ASA',
  'Dirección de Agropecuaria y Seguridad Alimentaria',
  'DASA',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDE' LIMIT 1),
  'DIR-SMEI',
  'Dirección de Servicios Municipales e Iniciativas Económicas',
  'DSMEI',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SMDE' LIMIT 1),
  'DIR-BUS',
  'Dirección Municipal de Transporte Público – Bus Municipal',
  'DMTP-BUS',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D1',
  'Subalcaldía Distrito Municipal - 1',
  'SDM-1',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D2',
  'Subalcaldía Distrito Municipal - 2',
  'SDM-2',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D3',
  'Subalcaldía Distrito Municipal - 3',
  'SDM-3',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D4',
  'Subalcaldía Distrito Municipal - 4',
  'SDM-4',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D5',
  'Subalcaldía Distrito Municipal - 5',
  'SDM-5',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D6',
  'Subalcaldía Distrito Municipal - 6',
  'SDM-6',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D7',
  'Subalcaldía Distrito Municipal - 7',
  'SDM-7',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D8',
  'Subalcaldía Distrito Municipal - 8',
  'SDM-8',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D9',
  'Subalcaldía Distrito Municipal - 9',
  'SDM-9',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D10',
  'Subalcaldía Distrito Municipal - 10',
  'SDM-10',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D11',
  'Subalcaldía Distrito Municipal - 11',
  'SDM-11',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D12',
  'Subalcaldía Distrito Municipal - 12',
  'SDM-12',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D13',
  'Subalcaldía Distrito Municipal - 13',
  'SDM-13',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'SUBALCALDIAS' LIMIT 1),
  'SUB-D14',
  'Subalcaldía Distrito Municipal - 14',
  'SDM-14',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESCENTRALIZADO' LIMIT 1),
  'TMEA',
  'Terminal Metropolitana El Alto',
  'TMEA',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

INSERT INTO comunica.direcciones (secretaria_id, codigo, nombre, sigla, activo)
VALUES (
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESCENTRALIZADO' LIMIT 1),
  'LIOM-GAMEA',
  'Laboratorio Industrial de Oxígeno Medicinal – G.A.M.E.A.',
  'LIOM-GAMEA',
  TRUE
)
ON CONFLICT (secretaria_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    sigla = EXCLUDED.sigla,
    activo = TRUE;

-- 5. Cargar Unidades
DELETE FROM comunica.unidades;

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DGAL' LIMIT 1),
  'Unidad de Asuntos Jurisdiccionales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DGAL' LIMIT 1),
  'Unidad de Normas Municipales y Asuntos Administrativos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DGAL' LIMIT 1),
  'Unidad de Defensa y Regularización de Bienes de Dominio Municipal',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DIPLAN' LIMIT 1),
  'Unidad de Programación de Operaciones',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DIPLAN' LIMIT 1),
  'Unidad de Inversión Pública y Seguimiento',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DIPLAN' LIMIT 1),
  'Unidad de Desarrollo Organizacional',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DIPLAN' LIMIT 1),
  'Unidad de Planificación Estratégica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'DIPLAN' LIMIT 1),
  'Unidad de Ordenamiento Territorial',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'UNID-DESPACHO' LIMIT 1),
  'Unidad de Transparencia y Lucha Contra la Corrupción',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'UNID-DESPACHO' LIMIT 1),
  'Unidad Sumariante',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'UNID-DESPACHO' LIMIT 1),
  'Unidad de Auditoría Interna',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'UNID-DESPACHO' LIMIT 1),
  'Unidad de Límites',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'UNID-DESPACHO' LIMIT 1),
  'Unidad de Relaciones Públicas y Protocolo',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESPACHO' AND d.codigo = 'UNID-DESPACHO' LIMIT 1),
  'Unidad de Gestión Social',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DICOM' LIMIT 1),
  'Unidad de Prensa',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DICOM' LIMIT 1),
  'Unidad de Imagen Corporativa',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DICOM' LIMIT 1),
  'Unidad de Comunicación Digital',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DAC' LIMIT 1),
  'Unidad de Coordinación con Subalcaldías',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DAC' LIMIT 1),
  'Unidad de Archivo Central',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DAC' LIMIT 1),
  'Unidad de Prevención de Conflictos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DAC' LIMIT 1),
  'Unidad de Sistema Único de Trámites',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DAP' LIMIT 1),
  'Unidad Operativa de Alumbrado Público',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMGI' AND d.codigo = 'DAP' LIMIT 1),
  'Unidad de Programas y Proyectos de Alumbrado Público',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TES' LIMIT 1),
  'Unidad de Tesorería',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TES' LIMIT 1),
  'Unidad de Presupuesto',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TES' LIMIT 1),
  'Unidad de Contabilidad',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TES' LIMIT 1),
  'Unidad de Crédito Público y Gestión de Financiamiento',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TH' LIMIT 1),
  'Unidad de Registro',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TH' LIMIT 1),
  'Unidad de Asesoría Legal DTH',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TH' LIMIT 1),
  'Unidad de Planillas y Control',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TH' LIMIT 1),
  'Unidad de Selección y Contratación',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-TH' LIMIT 1),
  'Unidad de Capacitación y Evaluación',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ATM' LIMIT 1),
  'Unidad de Ingresos y Control Tributario',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ATM' LIMIT 1),
  'Unidad de Asesoría Jurídica y Cobranza Coactiva',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ATM' LIMIT 1),
  'Unidad de Fiscalización y Recaudaciones',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-CONT' LIMIT 1),
  'Unidad de Adquisiciones y Contrataciones Menores',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-CONT' LIMIT 1),
  'Unidad de Licitaciones',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-CONT' LIMIT 1),
  'Unidad Jurídica de Contrataciones',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ADM' LIMIT 1),
  'Unidad de Activos Fijos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ADM' LIMIT 1),
  'Unidad de Servicios Generales y Mantenimiento',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ADM' LIMIT 1),
  'Unidad de Almacenes',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMAF' AND d.codigo = 'DIR-ADM' LIMIT 1),
  'Unidad de Administración de Sistemas de Información',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMMU' AND d.codigo = 'DIR-RMU' LIMIT 1),
  'Unidad de Planificación de la Movilidad Urbana Sostenible',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMMU' AND d.codigo = 'DIR-RMU' LIMIT 1),
  'Unidad de Señalización y Semaforización',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMMU' AND d.codigo = 'DIR-RMU' LIMIT 1),
  'Unidad de Regulación del Transporte',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMMU' AND d.codigo = 'DIR-RMU' LIMIT 1),
  'Unidad Guardia Municipal de Transporte',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-CULT' LIMIT 1),
  'Unidad de Fomento a Iniciativas Artísticas y Culturales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-CULT' LIMIT 1),
  'Escuela Municipal de Artes',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-CULT' LIMIT 1),
  'Unidad de Administración de Espacios Culturales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-CULT' LIMIT 1),
  'Unidad de Turismo',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-ASE' LIMIT 1),
  'Unidad de Programas Educativos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-ASE' LIMIT 1),
  'Unidad de la Juventud',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-AMIE' LIMIT 1),
  'Unidad de Mejora de la Infraestructura y Equipamiento Educativo',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMEC' AND d.codigo = 'DIR-AMIE' LIMIT 1),
  'Unidad de Regularización de Bienes Inmuebles Sector de Educación',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-NGAS' LIMIT 1),
  'Unidad de la Infancia, Niñez y Adolescencia',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-NGAS' LIMIT 1),
  'Unidad de la Mujer',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-NGAS' LIMIT 1),
  'Unidad de Atención Integral a la Familia',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-NGAS' LIMIT 1),
  'Unidad de Poblaciones Diversas',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-DI' LIMIT 1),
  'Unidad de Adultos Mayores',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-DI' LIMIT 1),
  'Unidad de Atención a Personas con Discapacidad',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-DEP' LIMIT 1),
  'Unidad de Infraestructura Deportiva',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDHSI' AND d.codigo = 'DIR-DEP' LIMIT 1),
  'Unidad de Fortalecimiento Deportivo',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMSC' AND d.codigo = 'DIR-SPPST' LIMIT 1),
  'Intendencia, Guardia y Banda Municipal',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMSC' AND d.codigo = 'DIR-SPPST' LIMIT 1),
  'Unidad del Observatorio Municipal',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMSC' AND d.codigo = 'DIR-SPPST' LIMIT 1),
  'Unidad de Programas de Seguridad Ciudadana y Soluciones Tecnológicas',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMSC' AND d.codigo = 'DIR-FM' LIMIT 1),
  'Unidad de Ferias',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMSC' AND d.codigo = 'DIR-FM' LIMIT 1),
  'Unidad de Mercados',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GS' LIMIT 1),
  'Unidad de Planificación Municipal en Salud',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GS' LIMIT 1),
  'Unidad Técnica de Administración del S.U.S.',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GS' LIMIT 1),
  'Unidad de Programas y Proyectos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GS' LIMIT 1),
  'Unidad de Promoción y Prevención',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GS' LIMIT 1),
  'Unidad de Epidemiología',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-ESPN' LIMIT 1),
  'Red de Salud Municipal Corea',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-ESPN' LIMIT 1),
  'Red de Salud Municipal Los Andes',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-ESPN' LIMIT 1),
  'Red de Salud Municipal Holandés',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-ESPN' LIMIT 1),
  'Red de Salud Municipal Lotes y Servicios',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-ESPN' LIMIT 1),
  'Red de Salud Municipal Senkata',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GSSND' LIMIT 1),
  'Hospital Municipal Boliviano Holandés',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GSSND' LIMIT 1),
  'Hospital Municipal Los Andes',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GSSND' LIMIT 1),
  'Hospital Municipal Modelo Corea',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GSSND' LIMIT 1),
  'Hospital Municipal Qullañ Uta',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMS' AND d.codigo = 'DIR-GSSND' LIMIT 1),
  'Hospital Municipal Modelo Boliviano Japonés',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-PM' LIMIT 1),
  'Unidad de Proyectos Municipales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-PM' LIMIT 1),
  'Unidad de Proyectos Estratégicos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-FO' LIMIT 1),
  'Unidad de Fiscalización de Proyectos Estratégicos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-FO' LIMIT 1),
  'Unidad de Fiscalización de Proyectos Municipales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-SO' LIMIT 1),
  'Unidad de Supervisión de Obras Estratégicas',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-SO' LIMIT 1),
  'Unidad de Supervisión de Obras Municipales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-SO' LIMIT 1),
  'Unidad de Cierre de Proyectos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-OM' LIMIT 1),
  'Unidad de Infraestructura Municipal',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-OM' LIMIT 1),
  'Unidad de Infraestructura Vial',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-OM' LIMIT 1),
  'Unidad de Pavimentos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-OM' LIMIT 1),
  'Unidad de Mantenimiento y Bacheo',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-OM' LIMIT 1),
  'Unidad de Administración de Maquinarias',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-ATC' LIMIT 1),
  'Unidad de Catastro Municipal y Cartografía',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-ATC' LIMIT 1),
  'Unidad de Administración Territorial',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-ATC' LIMIT 1),
  'Unidad de Vialidad',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMIP' AND d.codigo = 'DIR-ATC' LIMIT 1),
  'Unidad Jurídica de Administración Territorial',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-SBRHCA' LIMIT 1),
  'Unidad de Recursos Hídricos y Drenaje Pluvial',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-SBRHCA' LIMIT 1),
  'Unidad de Saneamiento Básico',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-SBRHCA' LIMIT 1),
  'Unidad de Control y Monitoreo Ambiental',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-SBRHCA' LIMIT 1),
  'Unidad de Prevención y Calidad Ambiental',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-GIR' LIMIT 1),
  'Unidad de Gestión de Residuos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-GIR' LIMIT 1),
  'Unidad de Seguimiento y Control',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-GR' LIMIT 1),
  'Unidad de Prevención de Riesgos',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-GR' LIMIT 1),
  'Centro de Operaciones de Emergencia (COE)',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-FAP' LIMIT 1),
  'Unidad de Áreas Verdes, Protegidas y Bofedales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMASGAR' AND d.codigo = 'DIR-FAP' LIMIT 1),
  'Unidad de Forestación',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-DPPYMES' LIMIT 1),
  'Unidad de Competitividad y Productividad',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-DPPYMES' LIMIT 1),
  'Unidad de Innovación y Emprendimiento',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-DPA' LIMIT 1),
  'Unidad de Promoción Artesanal',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-DPA' LIMIT 1),
  'Unidad de Desarrollo Productivo Artesanal',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-ASA' LIMIT 1),
  'Unidad de Fortalecimiento Agropecuario',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-ASA' LIMIT 1),
  'Unidad de Gestión de Proyectos Agropecuarios',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-SMEI' LIMIT 1),
  'Unidad de Administración de Servicios Municipales',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-SMEI' LIMIT 1),
  'Unidad de Iniciativas Económicas',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-BUS' LIMIT 1),
  'Unidad de Operaciones',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-BUS' LIMIT 1),
  'Unidad de Mantenimiento',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SMDE' AND d.codigo = 'DIR-BUS' LIMIT 1),
  'Unidad de Administración y Recaudo',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D1' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D1' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D1' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D1' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D2' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D2' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D2' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D2' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D3' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D3' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D3' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D3' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D4' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D4' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D4' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D4' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D5' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D5' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D5' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D5' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D6' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D6' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D6' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D6' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D7' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D7' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D7' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D7' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D8' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D8' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D8' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D8' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D9' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D9' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D9' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D9' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D10' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D10' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D10' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D10' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D11' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D11' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D11' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D11' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D12' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D12' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D12' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D12' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D13' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D13' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D13' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D13' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D14' LIMIT 1),
  'Unidad de Infraestructura Pública',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D14' LIMIT 1),
  'Unidad de Desarrollo Humano',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D14' LIMIT 1),
  'Asesoría Jurídica',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'SUBALCALDIAS' AND d.codigo = 'SUB-D14' LIMIT 1),
  'Unidad de Finanzas y Administración',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESCENTRALIZADO' AND d.codigo = 'TMEA' LIMIT 1),
  'Unidad de Administración y Operaciones',
  TRUE
);

INSERT INTO comunica.unidades (direccion_id, nombre, activo)
VALUES (
  (SELECT d.id FROM comunica.direcciones d JOIN comunica.secretarias s ON d.secretaria_id = s.id WHERE s.codigo = 'DESCENTRALIZADO' AND d.codigo = 'LIOM-GAMEA' LIMIT 1),
  'Unidad de Producción y Calidad',
  TRUE
);

-- 6. Super Administrador Municipal Supremo
INSERT INTO comunica.usuarios (id, rol_id, secretaria_id, direccion_id, unidad_id, nombres, apellidos, cargo, email, telefono_contacto, password_hash)
VALUES (
  'c0000001-0000-0000-0000-000000000001',
  (SELECT id FROM comunica.roles WHERE codigo = 'SUPERADMIN' LIMIT 1),
  (SELECT id FROM comunica.secretarias WHERE codigo = 'DESPACHO' LIMIT 1),
  (SELECT id FROM comunica.direcciones WHERE codigo = 'DGAL' LIMIT 1),
  NULL,
  'Ing. Wilfredo', 'Abad Mancilla',
  'Super Administrador del Sistema Municipal',
  'superadmin@elalto.gob.bo',
  '77210000',
  crypt('SuperAdminGamea2026!', gen_salt('bf'))
)
ON CONFLICT (email) DO UPDATE
SET rol_id = (SELECT id FROM comunica.roles WHERE codigo = 'SUPERADMIN' LIMIT 1),
    nombres = EXCLUDED.nombres,
    apellidos = EXCLUDED.apellidos,
    cargo = EXCLUDED.cargo;
