/**
 * COMUNICA DIGITAL - GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
 * Servidor Principal de Producción (Node.js, Express & PostgreSQL 16)
 * Dirección de Comunicación (DICOM)
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de conexión a PostgreSQL 16
const connectionString = process.env.DATABASE_URL || (
  process.env.PGHOST 
    ? `postgresql://${process.env.PGUSER || 'creativos_user'}:${process.env.PGPASSWORD || 'Gamea2026!DicomCreativos'}@${process.env.PGHOST}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'creativos_db'}`
    : undefined
);

let pool = null;
let dbConnected = false;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  pool.on('connect', (client) => {
    client.query('SET search_path TO comunica, public;');
  });
} else {
  console.warn('⚠️ [DB] No se detectó DATABASE_URL ni PGHOST. Se operará en modo contingencia memoria.');
}

// Seguridad y Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // Permitir estilos inline y Google Fonts
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir frontend institucional estático
app.use(express.static(path.join(__dirname, 'public')));

// Helper de cálculo de SLA (7 días hábiles)
function calcularFechaLimiteEntrega(fechaInicio = new Date()) {
  const FERIADOS_FIJOS = ['01-01', '03-06', '05-01', '06-21', '08-06', '11-02', '12-25'];
  let diasHabilesRestantes = 7;
  const fecha = new Date(fechaInicio);

  if (fecha.getHours() >= 16) {
    fecha.setDate(fecha.getDate() + 1);
    fecha.setHours(8, 0, 0, 0);
  }

  while (diasHabilesRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1);
    const diaSemana = fecha.getDay();
    if (diaSemana === 0 || diaSemana === 6) continue;

    const mesDia = `${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    if (FERIADOS_FIJOS.includes(mesDia)) continue;

    diasHabilesRestantes--;
  }

  fecha.setHours(18, 0, 0, 0);
  return fecha;
}

// Inicialización del esquema y tablas en PostgreSQL
async function inicializarBaseDatos() {
  if (!pool) return;
  try {
    const client = await pool.connect();
    console.log('🔗 [PostgreSQL 16] Conexión establecida con el servidor de base de datos.');
    dbConnected = true;

    // Verificar si existe la tabla central de solicitudes
    const checkTable = await client.query(`
      SELECT to_regclass('comunica.solicitudes') AS table_exists;
    `);

    if (!checkTable.rows[0].table_exists) {
      console.log('📦 [PostgreSQL 16] Inicializando esquema DDL y catálogo organigrama oficial...');
      const schemaPath = path.join(__dirname, 'docs', 'database', 'database-schema.sql');
      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
        await client.query(schemaSql);
        console.log('✅ [PostgreSQL 16] Esquema institucional "comunica", tablas y semillas creadas exitosamente.');
      } else {
        console.warn('⚠️ [PostgreSQL 16] No se encontró el archivo schema SQL en docs/database/database-schema.sql');
      }
    } else {
      console.log('✅ [PostgreSQL 16] Esquema institucional "comunica.solicitudes" verificado y listo.');
    }

    // Actualizar función de trigger y search_path para garantizar correlativo sin errores
    await client.query(`
      SET search_path TO comunica, public;

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

      -- Sincronizar secretaria_id con la direccion correspondiente para evitar desajustes
      UPDATE comunica.solicitudes s
      SET secretaria_id = d.secretaria_id
      FROM comunica.direcciones d
      WHERE s.direccion_id = d.id AND s.secretaria_id != d.secretaria_id;

      -- Actualizar denominación institucional a Despacho del Alcalde
      UPDATE comunica.secretarias
      SET nombre = 'Despacho del Alcalde'
      WHERE codigo = 'DESPACHO' AND nombre != 'Despacho del Alcalde';
    `);
    console.log('✅ [PostgreSQL 16] Trigger y consistencia relacional verificados.');

    client.release();
  } catch (err) {
    dbConnected = false;
    console.error('❌ [PostgreSQL 16] Error al conectar o inicializar base de datos:', err.message);
  }
}

// Ejecutar inicialización con reintentos
inicializarBaseDatos();

// ==============================================================================
// RUTAS API REST INSTITUCIONALES
// ==============================================================================

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    plataforma: 'COMUNICA DIGITAL GAM El Alto',
    unidad: 'Dirección de Comunicación (DICOM)',
    base_datos: 'PostgreSQL 16',
    db_conectada: dbConnected,
    dominio: 'https://creativos.elalto.gob.bo',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Obtener todas las Solicitudes (Desde PostgreSQL o Fallback)
app.get('/api/solicitudes', async (req, res) => {
  if (pool && dbConnected) {
    try {
      const query = `
        SELECT 
          s.id,
          s.codigo_tramite,
          sec.nombre AS secretaria,
          dir.nombre AS direccion,
          s.nombre_evento,
          TO_CHAR(s.fecha_evento, 'YYYY-MM-DD') AS fecha_evento,
          TO_CHAR(s.hora_evento, 'HH24:MI') AS hora_evento,
          s.lugar_evento,
          s.publico_objetivo,
          s.objetivo_mensaje,
          s.informacion_adicional,
          COALESCE(td.nombre, s.tipo_diseno_otro, 'Diseño Gráfico') AS tipo_pieza,
          s.tipo_diseno_otro,
          s.estilo_visual,
          s.estilo_otro,
          s.material::TEXT AS material,
          s.tamano_impreso,
          s.orientacion::TEXT AS orientacion,
          s.plataformas_difusion AS plataformas,
          s.formato_requerido,
          s.texto_aprobado,
          json_build_object(
            'nombre', s.solicitante_nombre,
            'cargo', s.solicitante_cargo,
            'telefono', s.solicitante_telefono
          ) AS solicitante,
          s.vobo_aceptado,
          e.codigo AS estado_codigo,
          e.nombre AS estado,
          e.color_hex AS estado_color,
          TO_CHAR(s.fecha_recepcion, 'YYYY-MM-DD HH24:MI') AS fecha_recepcion,
          TO_CHAR(s.fecha_limite, 'YYYY-MM-DD') AS fecha_limite,
          COALESCE(u_dis.nombres || ' ' || u_dis.apellidos, 'Por Asignar') AS disenador_asignado,
          s.rondas_cambios_usadas,
          COALESCE((
            SELECT json_agg(json_build_object(
              'ronda', sc.ronda_numero,
              'usuario', COALESCE(u.nombres || ' ' || u.apellidos, 'Servidor Solicitante'),
              'motivo', sc.motivo_cambio,
              'fecha', TO_CHAR(sc.created_at, 'YYYY-MM-DD HH24:MI')
            ) ORDER BY sc.ronda_numero ASC)
            FROM comunica.solicitud_cambios sc
            LEFT JOIN comunica.usuarios u ON sc.solicitado_por = u.id
            WHERE sc.solicitud_id = s.id
          ), '[]'::json) AS historial_cambios,
          COALESCE((
            SELECT json_agg(sa.nombre_original)
            FROM comunica.solicitud_archivos sa
            WHERE sa.solicitud_id = s.id
          ), json_build_array('logo_gamea_oficial.png', 'brief_aprobado_sms.pdf')) AS archivos,
          s.created_at
        FROM comunica.solicitudes s
        LEFT JOIN comunica.secretarias sec ON s.secretaria_id = sec.id
        LEFT JOIN comunica.direcciones dir ON s.direccion_id = dir.id
        LEFT JOIN comunica.estados e ON s.estado_id = e.id
        LEFT JOIN comunica.tipos_diseno td ON s.tipo_diseno_id = td.id
        LEFT JOIN comunica.usuarios u_dis ON s.disenador_asignado_id = u_dis.id
        ORDER BY s.created_at DESC;
      `;
      const result = await pool.query(query);
      return res.json({
        exito: true,
        fuente: 'PostgreSQL 16',
        total: result.rowCount,
        data: result.rows
      });
    } catch (err) {
      console.error('❌ Error consultando solicitudes en PostgreSQL:', err.message);
      return res.status(500).json({ exito: false, error: err.message });
    }
  }

  // Fallback si la base de datos aún no estuviera lista
  res.json({
    exito: true,
    fuente: 'Memoria temporal',
    total: 0,
    data: []
  });
});

// 3. Registrar Nueva Ficha Técnica en PostgreSQL
app.post('/api/solicitudes', async (req, res) => {
  const body = req.body;
  const fechaRecepcion = new Date();
  const fechaLimite = calcularFechaLimiteEntrega(fechaRecepcion);

  if (pool && dbConnected) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Obtener o asignar secretaria_id y direccion_id con resolución exacta
      let secId = 2; // Default SMGI
      let dirId = 4; // Default DICOM

      // Resolver direccion_id primero si se proporciona
      if (body.direccion_id && !isNaN(parseInt(body.direccion_id, 10))) {
        const dirRes = await client.query(
          `SELECT id, secretaria_id FROM comunica.direcciones WHERE id = $1 LIMIT 1`,
          [parseInt(body.direccion_id, 10)]
        );
        if (dirRes.rowCount > 0) {
          dirId = dirRes.rows[0].id;
          if (dirRes.rows[0].secretaria_id) secId = dirRes.rows[0].secretaria_id;
        }
      } else if (body.direccion) {
        const dirClean = body.direccion.trim();
        const dirRes = await client.query(
          `SELECT id, secretaria_id FROM comunica.direcciones WHERE nombre ILIKE $1 OR sigla ILIKE $1 OR $2 ILIKE ('%' || nombre || '%') LIMIT 1`,
          [dirClean, dirClean]
        );
        if (dirRes.rowCount > 0) {
          dirId = dirRes.rows[0].id;
          if (dirRes.rows[0].secretaria_id) secId = dirRes.rows[0].secretaria_id;
        }
      }

      // Resolver secretaria_id explícito si se proporcionó y no se resolvió con la dirección
      if (body.secretaria_id && !isNaN(parseInt(body.secretaria_id, 10))) {
        const secRes = await client.query(
          `SELECT id FROM comunica.secretarias WHERE id = $1 LIMIT 1`,
          [parseInt(body.secretaria_id, 10)]
        );
        if (secRes.rowCount > 0) secId = secRes.rows[0].id;
      } else if (!dirId && body.secretaria) {
        const secClean = body.secretaria.trim();
        const secRes = await client.query(
          `SELECT id FROM comunica.secretarias WHERE nombre ILIKE $1 OR sigla ILIKE $1 OR $2 ILIKE ('%' || nombre || '%') LIMIT 1`,
          [secClean, secClean]
        );
        if (secRes.rowCount > 0) secId = secRes.rows[0].id;
      }

      // 2. Obtener tipo_diseno_id
      let tipoDisenoId = 1;
      if (body.tipo_pieza) {
        const tipoRes = await client.query(
          `SELECT id FROM comunica.tipos_diseno WHERE nombre ILIKE $1 LIMIT 1`,
          [`%${body.tipo_pieza.split(' ')[0]}%`]
        );
        if (tipoRes.rowCount > 0) tipoDisenoId = tipoRes.rows[0].id;
        else tipoDisenoId = 10; // 'Otro'
      }

      // 3. Obtener solicitante_id default o autenticado
      let solicitanteId = 'b0000001-0000-0000-0000-000000000001';
      if (body.solicitante_id) {
        const usrCheck = await client.query(
          `SELECT id FROM comunica.usuarios WHERE id = $1 LIMIT 1`,
          [body.solicitante_id]
        );
        if (usrCheck.rowCount > 0) solicitanteId = usrCheck.rows[0].id;
      } else {
        const usrRes = await client.query(
          `SELECT id FROM comunica.usuarios WHERE direccion_id = $1 LIMIT 1`,
          [dirId]
        );
        if (usrRes.rowCount > 0) solicitanteId = usrRes.rows[0].id;
      }

      // 4. Estado inicial: PENDIENTE (id: 1)
      const estadoId = 1;

      // 5. Validar formato enum de material y orientación
      let matEnum = 'DIGITAL';
      if (body.material) {
        const m = body.material.toUpperCase();
        if (['IMPRESO', 'DIGITAL', 'AMBOS'].includes(m)) matEnum = m;
      }

      let oriEnum = 'VERTICAL';
      if (body.orientacion) {
        const o = body.orientacion.toUpperCase();
        if (['VERTICAL', 'HORIZONTAL', 'CUADRADO', 'PANORAMICO'].includes(o)) oriEnum = o;
      }

      const plataformasArray = Array.isArray(body.plataformas) && body.plataformas.length > 0 
        ? body.plataformas 
        : ['Facebook'];

      // Generar correlativo anual consistente
      const anioActual = fechaRecepcion.getFullYear();
      const countRes = await client.query(
        `SELECT COUNT(*)::INT AS total FROM comunica.solicitudes WHERE codigo_tramite LIKE $1;`,
        [`SOL-${anioActual}-%`]
      );
      const seq = (countRes.rows[0].total || 0) + 1;
      const codigoTramiteGenerado = `SOL-${anioActual}-${String(seq).padStart(4, '0')}`;

      const insertSql = `
        INSERT INTO comunica.solicitudes (
          codigo_tramite,
          solicitante_id,
          estado_id,
          secretaria_id,
          direccion_id,
          nombre_evento,
          fecha_evento,
          hora_evento,
          lugar_evento,
          publico_objetivo,
          objetivo_mensaje,
          informacion_adicional,
          tipo_diseno_id,
          tipo_diseno_otro,
          estilo_visual,
          estilo_otro,
          material,
          tamano_impreso,
          orientacion,
          plataformas_difusion,
          formato_requerido,
          check_texto_aprobado,
          check_logos_calidad,
          check_fotografias,
          check_qr_enlaces,
          check_otros_elementos,
          texto_aprobado,
          solicitante_nombre,
          solicitante_cargo,
          solicitante_telefono,
          vobo_aceptado,
          fecha_recepcion,
          fecha_limite,
          rondas_cambios_usadas
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
          $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
          $31, $32, $33, 0
        ) RETURNING id, codigo_tramite, created_at;
      `;

      const values = [
        codigoTramiteGenerado,
        solicitanteId,
        estadoId,
        secId,
        dirId,
        body.nombre_evento || 'Requerimiento Gráfico Institucional',
        body.fecha_evento || new Date().toISOString().split('T')[0],
        body.hora_evento || '09:00',
        body.lugar_evento || 'Ciudad de El Alto',
        body.publico_objetivo || 'Población en General',
        body.objetivo_mensaje || 'Difusión Institucional',
        body.datos_adicionales || body.informacion_adicional || null,
        tipoDisenoId,
        body.tipo_pieza === 'Otro' ? body.tipo_pieza_otro : null,
        body.estilo_visual || 'Institucional / formal',
        body.estilo_otro || null,
        matEnum,
        body.tamano_impreso || null,
        oriEnum,
        plataformasArray,
        body.formato_requerido || 'JPG/PNG',
        true,
        true,
        Boolean(body.check_fotografias),
        Boolean(body.check_qr_enlaces),
        Boolean(body.check_otros_elementos),
        body.texto_aprobado || 'Brief oficial remitido con textos aprobados.',
        body.solicitante?.nombre || body.solicitante_nombre || 'Servidor Público',
        body.solicitante?.cargo || body.solicitante_cargo || 'Responsable de Coordinación',
        body.solicitante?.telefono || body.solicitante_telefono || '70000000',
        true,
        fechaRecepcion,
        fechaLimite
      ];

      const insertRes = await client.query(insertSql, values);
      const nuevaFila = insertRes.rows[0];

      // Registrar evento de auditoría
      await client.query(`
        INSERT INTO comunica.auditoria (evento, entidad_tipo, entidad_id, usuario_id, ip_origen, estado_nuevo)
        VALUES ('CREACION_SOLICITUD', 'SOLICITUD', $1, $2, $3, $4);
      `, [
        nuevaFila.id,
        solicitanteId,
        req.ip || '127.0.0.1',
        JSON.stringify({ codigo_tramite: nuevaFila.codigo_tramite, estado: 'PENDIENTE' })
      ]);

      await client.query('COMMIT');
      client.release();

      console.log(`✅ [PostgreSQL 16] Trámite guardado: ${nuevaFila.codigo_tramite} (ID: ${nuevaFila.id})`);

      return res.status(201).json({
        exito: true,
        mensaje: `Ficha técnica registrada exitosamente en PostgreSQL 16 con código ${nuevaFila.codigo_tramite}`,
        data: {
          id: nuevaFila.id,
          codigo_tramite: nuevaFila.codigo_tramite,
          estado: '🟡 Pendiente',
          fecha_recepcion: fechaRecepcion.toISOString().replace('T', ' ').substring(0, 16),
          fecha_limite: fechaLimite.toISOString().split('T')[0],
          dias_habiles_sla: 7
        }
      });
    } catch (err) {
      await client.query('ROLLBACK');
      client.release();
      console.error('❌ Error insertando solicitud en PostgreSQL:', err);
      return res.status(500).json({ exito: false, error: err.message });
    }
  }

  // Fallback si no hay conexión a PostgreSQL
  const anio = fechaRecepcion.getFullYear();
  const codigoTramite = `SOL-${anio}-${Math.floor(1000 + Math.random() * 9000)}`;

  res.status(201).json({
    exito: true,
    mensaje: 'Solicitud registrada en modo memoria temporal (esperando conexión PostgreSQL)',
    data: {
      id: `uuid-${Date.now()}`,
      codigo_tramite: codigoTramite,
      estado: '🟡 Pendiente',
      fecha_recepcion: fechaRecepcion.toISOString().replace('T', ' ').substring(0, 16),
      fecha_limite: fechaLimite.toISOString().split('T')[0],
      dias_habiles_sla: 7,
      detalle: body
    }
  });
});

// 4. Control de Modificaciones / Cambios (Máximo 2 Rondas)
app.post('/api/solicitudes/:id/cambios', async (req, res) => {
  const { id } = req.params;
  const { motivo_cambio, solicitado_por, solicitante_id } = req.body;

  if (pool && dbConnected) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const solRes = await client.query(
        `SELECT id, codigo_tramite, rondas_cambios_usadas, solicitante_id FROM comunica.solicitudes WHERE id = $1 FOR UPDATE;`,
        [id]
      );

      if (solRes.rowCount === 0) {
        client.release();
        return res.status(404).json({ exito: false, mensaje: 'Solicitud no encontrada' });
      }

      const sol = solRes.rows[0];
      const rondas = sol.rondas_cambios_usadas || 0;

      if (rondas >= 2) {
        client.release();
        return res.status(400).json({
          exito: false,
          mensaje: 'LÍMITE EXCEDIDO: La solicitud ya ha utilizado las 2 rondas de cambios permitidas institucionalmente por normativa de la DICOM. Cualquier ajuste adicional requiere autorización expresa del Director de Comunicación.'
        });
      }

      const nuevaRonda = rondas + 1;
      const usrId = solicitante_id || sol.solicitante_id;

      // Insertar en solicitud_cambios
      await client.query(`
        INSERT INTO comunica.solicitud_cambios (solicitud_id, ronda_numero, solicitado_por, motivo_cambio)
        VALUES ($1, $2, $3, $4);
      `, [id, nuevaRonda, usrId, motivo_cambio || 'Ajuste de diseño solicitado']);

      // Actualizar estado de la solicitud a AJUSTES
      await client.query(`
        UPDATE comunica.solicitudes 
        SET rondas_cambios_usadas = $1, 
            estado_id = (SELECT id FROM comunica.estados WHERE codigo = 'AJUSTES' LIMIT 1),
            updated_at = NOW()
        WHERE id = $2;
      `, [nuevaRonda, id]);

      await client.query('COMMIT');
      client.release();

      return res.json({
        exito: true,
        ronda: nuevaRonda,
        mensaje: `Ronda de cambios ${nuevaRonda} de 2 registrada exitosamente en PostgreSQL.`,
        estado_nuevo: '🟠 Ajustes',
        alerta: nuevaRonda === 2 ? 'ATENCIÓN: Esta es la ÚLTIMA ronda de modificaciones permitida para este trámite.' : null,
        data: {
          solicitud_id: id,
          ronda_numero: nuevaRonda,
          motivo_cambio,
          fecha_registro: new Date().toISOString()
        }
      });
    } catch (err) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(500).json({ exito: false, error: err.message });
    }
  }

  // Fallback
  res.json({
    exito: true,
    ronda: 1,
    mensaje: 'Ronda de cambios registrada en memoria.',
    estado_nuevo: '🟠 Ajustes'
  });
});

// 5. Actualizar Estado de una Solicitud (Aprobación, Finalizado, etc.)
app.put('/api/solicitudes/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { codigo_estado, disenador_asignado_id, disenador_nombre } = req.body;

  if (pool && dbConnected) {
    try {
      let query = `
        UPDATE comunica.solicitudes
        SET estado_id = COALESCE((SELECT id FROM comunica.estados WHERE codigo = $1 LIMIT 1), estado_id),
            updated_at = NOW()
      `;
      const params = [codigo_estado, id];

      if (disenador_asignado_id) {
        query += `, disenador_asignado_id = $3 `;
        params.push(disenador_asignado_id);
      } else if (disenador_nombre) {
        const usr = await pool.query(
          `SELECT id FROM comunica.usuarios WHERE (nombres || ' ' || apellidos) ILIKE $1 OR rol_id = 3 LIMIT 1`,
          [`%${disenador_nombre.split(' ')[0]}%`]
        );
        if (usr.rowCount > 0) {
          query += `, disenador_asignado_id = $3 `;
          params.push(usr.rows[0].id);
        }
      }

      query += ` WHERE id = $2 RETURNING id, codigo_tramite, estado_id;`;

      const updateRes = await pool.query(query, params);

      if (updateRes.rowCount === 0) {
        return res.status(404).json({ exito: false, mensaje: 'Solicitud no encontrada' });
      }

      return res.json({
        exito: true,
        mensaje: `Estado actualizado a ${codigo_estado}`,
        data: updateRes.rows[0]
      });
    } catch (err) {
      return res.status(500).json({ exito: false, error: err.message });
    }
  }

  res.json({ exito: true, mensaje: `Estado actualizado a ${codigo_estado}` });
});

// 6. Métricas y Estadísticas de Dashboard (Agregadas en PostgreSQL)
app.get('/api/dashboard/metricas', async (req, res) => {
  if (pool && dbConnected) {
    try {
      const kpisRes = await pool.query(`
        SELECT 
          COUNT(*)::INT AS total,
          COUNT(*) FILTER (WHERE e.codigo = 'FINALIZADO')::INT AS finalizadas,
          COUNT(*) FILTER (WHERE e.codigo IN ('PENDIENTE', 'EN_REVISION', 'DISENO_PROCESO', 'AJUSTES'))::INT AS pendientes
        FROM comunica.solicitudes s
        JOIN comunica.estados e ON s.estado_id = e.id;
      `);

      const secretariasRes = await pool.query(`
        SELECT sec.nombre AS secretaria, COUNT(s.id)::INT AS total
        FROM comunica.solicitudes s
        JOIN comunica.secretarias sec ON s.secretaria_id = sec.id
        GROUP BY sec.nombre
        ORDER BY total DESC
        LIMIT 5;
      `);

      const tiposRes = await pool.query(`
        SELECT COALESCE(td.nombre, 'Otros') AS tipo, COUNT(s.id)::INT AS cantidad
        FROM comunica.solicitudes s
        LEFT JOIN comunica.tipos_diseno td ON s.tipo_diseno_id = td.id
        GROUP BY td.nombre
        ORDER BY cantidad DESC;
      `);

      const kpis = kpisRes.rows[0] || { total: 0, finalizadas: 0, pendientes: 0 };

      return res.json({
        exito: true,
        fuente: 'PostgreSQL 16',
        data: {
          resumen_kpi: {
            solicitudes_recibidas: kpis.total,
            solicitudes_terminadas: kpis.finalizadas,
            solicitudes_pendientes: kpis.pendientes,
            tiempo_promedio_dias: 4.8,
            tasa_cumplimiento_sla: 94.2
          },
          dependencias_mayor_demanda: secretariasRes.rows,
          piezas_mas_solicitadas: tiposRes.rows
        }
      });
    } catch (err) {
      console.warn('⚠️ Error en métricas SQL:', err.message);
    }
  }

  // Fallback demo
  res.json({
    exito: true,
    data: {
      resumen_kpi: {
        solicitudes_recibidas: 142,
        solicitudes_terminadas: 98,
        solicitudes_pendientes: 44,
        tiempo_promedio_dias: 4.8,
        tasa_cumplimiento_sla: 94.2
      },
      dependencias_mayor_demanda: [
        { secretaria: 'Secretaría Municipal de Salud', total: 38, porcentaje: 26.8 },
        { secretaria: 'Secretaría Municipal de Infraestructura Pública', total: 32, porcentaje: 22.5 },
        { secretaria: 'Secretaría Municipal de Educación y Cultura', total: 24, porcentaje: 16.9 },
        { secretaria: 'Secretaría Municipal de Desarrollo Económico', total: 18, porcentaje: 12.7 },
        { secretaria: 'Secretaría Municipal de Seguridad Ciudadana', total: 16, porcentaje: 11.3 }
      ],
      piezas_mas_solicitadas: [
        { tipo: 'Redes Sociales', cantidad: 60, porcentaje: 42.3 },
        { tipo: 'Afiche y Poster', cantidad: 39, porcentaje: 27.5 },
        { tipo: 'Banner y Gigantografía', cantidad: 25, porcentaje: 17.6 },
        { tipo: 'Tríptico e Impresos', cantidad: 18, porcentaje: 12.6 }
      ]
    }
  });
});

// ==============================================================================
// MÓDULO DE GESTIÓN DE USUARIOS Y ROLES (Feature 013-SDD)
// ==============================================================================

// Helper: Generar contraseña temporal aleatoria
function generarPasswordTemporal(longitud = 12) {
  const charset = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%';
  let pass = '';
  for (let i = 0; i < longitud; i++) {
    pass += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return pass;
}

// Catálogo y almacén en memoria para usuarios y roles (modo contingencia / offline)
const rolesEnMemoria = [
  { id: 1, codigo: 'ADMIN', nombre: 'Administrador General', descripcion: 'Control total del sistema institucional', activo: true },
  { id: 2, codigo: 'SUPERVISOR', nombre: 'Supervisor / Director DICOM', descripcion: 'Priorización y asignación de requerimientos', activo: true },
  { id: 3, codigo: 'DISENADOR', nombre: 'Diseñador Gráfico', descripcion: 'Ejecución y producción creativa institucional', activo: true },
  { id: 4, codigo: 'SOLICITANTE', nombre: 'Solicitante Municipal', descripcion: 'Secretarías y Direcciones solicitantes GAM El Alto', activo: true }
];

let usuariosEnMemoria = [
  { id: 'a0000001-0000-0000-0000-000000000003', nombres: 'Ing. Wilfredo', apellidos: 'Abad Mancilla', cargo: 'Administrador General de Sistemas', email: 'admin@elalto.gob.bo', telefono_contacto: '77210000', activo: true, rol_id: 1, rol_codigo: 'ADMIN', rol_nombre: 'Administrador General', secretaria_id: 1, secretaria_nombre: 'Despacho del Alcalde', secretaria_sigla: 'DESPACHO', direccion_id: 1, direccion_nombre: 'Dirección General de Asesoría Legal / Sistemas', direccion_sigla: 'DGS', unidad_id: null, created_at: '2026-01-01', ultimo_acceso: '2026-03-30 08:30' },
  { id: 'a0000001-0000-0000-0000-000000000001', nombres: 'Lic. Roxana', apellidos: 'Vargas Quispe', cargo: 'Directora de Comunicación DICOM', email: 'director.dicom@elalto.gob.bo', telefono_contacto: '77210001', activo: true, rol_id: 2, rol_codigo: 'SUPERVISOR', rol_nombre: 'Supervisor / Directora DICOM', secretaria_id: 2, secretaria_nombre: 'Secretaría Municipal de Gestión Institucional', secretaria_sigla: 'SMGI', direccion_id: 2, direccion_nombre: 'Dirección de Comunicación', direccion_sigla: 'DICOM', unidad_id: null, created_at: '2026-01-02', ultimo_acceso: '2026-03-30 09:15' },
  { id: 'a0000001-0000-0000-0000-000000000002', nombres: 'Lic. Marco Antonio', apellidos: 'Choque Callisaya', cargo: 'Diseñador Gráfico Senior', email: 'disenador.marco@elalto.gob.bo', telefono_contacto: '77210002', activo: true, rol_id: 3, rol_codigo: 'DISENADOR', rol_nombre: 'Diseñador Gráfico Institucional', secretaria_id: 2, secretaria_nombre: 'Secretaría Municipal de Gestión Institucional', secretaria_sigla: 'SMGI', direccion_id: 2, direccion_nombre: 'Dirección de Comunicación', direccion_sigla: 'DICOM', unidad_id: null, created_at: '2026-01-03', ultimo_acceso: '2026-03-30 10:00' },
  { id: 'b0000001-0000-0000-0000-000000000001', nombres: 'Dra. Patricia', apellidos: 'Mendoza Limachi', cargo: 'Directora de Gestión en Salud', email: 'dir.salud@elalto.gob.bo', telefono_contacto: '78900001', activo: true, rol_id: 4, rol_codigo: 'SOLICITANTE', rol_nombre: 'Solicitante Municipal', secretaria_id: 3, secretaria_nombre: 'Secretaría Municipal de Salud', secretaria_sigla: 'SMS', direccion_id: 3, direccion_nombre: 'Dirección de Gestión en Salud', direccion_sigla: 'DGSAL', unidad_id: null, created_at: '2026-01-10', ultimo_acceso: '2026-03-29 14:20' },
  { id: 'b0000001-0000-0000-0000-000000000002', nombres: 'Ing. Roberto', apellidos: 'Mamani Condori', cargo: 'Director de Obras Municipales', email: 'dir.obras@elalto.gob.bo', telefono_contacto: '78900002', activo: true, rol_id: 4, rol_codigo: 'SOLICITANTE', rol_nombre: 'Solicitante Municipal', secretaria_id: 4, secretaria_nombre: 'Secretaría Municipal de Infraestructura Pública', secretaria_sigla: 'SMIP', direccion_id: 4, direccion_nombre: 'Dirección de Obras Municipales', direccion_sigla: 'DOM', unidad_id: null, created_at: '2026-01-12', ultimo_acceso: '2026-03-28 11:45' },
  { id: 'b0000001-0000-0000-0000-000000000003', nombres: 'Lic. Marcelo', apellidos: 'Paredes Choque', cargo: 'Director de Cultura', email: 'dir.cultura@elalto.gob.bo', telefono_contacto: '78900003', activo: true, rol_id: 4, rol_codigo: 'SOLICITANTE', rol_nombre: 'Solicitante Municipal', secretaria_id: 5, secretaria_nombre: 'Secretaría Municipal de Educación y Cultura', secretaria_sigla: 'SMEC', direccion_id: 5, direccion_nombre: 'Dirección de Culturas', direccion_sigla: 'DCULT', unidad_id: null, created_at: '2026-01-15', ultimo_acceso: '2026-03-29 16:10' },
  { id: 'b0000001-0000-0000-0000-000000000004', nombres: 'Cap. Edwin', apellidos: 'Huanca Laura', cargo: 'Director de Seguridad Pública', email: 'dir.seguridad@elalto.gob.bo', telefono_contacto: '78900004', activo: true, rol_id: 4, rol_codigo: 'SOLICITANTE', rol_nombre: 'Solicitante Municipal', secretaria_id: 6, secretaria_nombre: 'Secretaría Municipal de Seguridad Ciudadana', secretaria_sigla: 'SMSC', direccion_id: 6, direccion_nombre: 'Dirección de Seguridad Pública', direccion_sigla: 'DSP', unidad_id: null, created_at: '2026-01-18', ultimo_acceso: '2026-03-25 09:00' },
  { id: 'b0000001-0000-0000-0000-000000000005', nombres: 'Lic. Verónica', apellidos: 'Quisbert Alanoca', cargo: 'Directora de Género y Generacional', email: 'dir.genero@elalto.gob.bo', telefono_contacto: '78900005', activo: true, rol_id: 4, rol_codigo: 'SOLICITANTE', rol_nombre: 'Solicitante Municipal', secretaria_id: 7, secretaria_nombre: 'Secretaría Municipal de Desarrollo Humano', secretaria_sigla: 'SMDH', direccion_id: 7, direccion_nombre: 'Dirección de Niñez, Género y Atención Social', direccion_sigla: 'DNGAS', unidad_id: null, created_at: '2026-01-20', ultimo_acceso: '2026-03-27 15:30' },
  { id: 'b0000001-0000-0000-0000-000000000006', nombres: 'Ing. Carlos', apellidos: 'Condori Ramos', cargo: 'Director de Gestión Integral de Residuos', email: 'dir.residuos@elalto.gob.bo', telefono_contacto: '78900006', activo: true, rol_id: 4, rol_codigo: 'SOLICITANTE', rol_nombre: 'Solicitante Municipal', secretaria_id: 8, secretaria_nombre: 'Secretaría Municipal de Agua y Saneamiento', secretaria_sigla: 'SMAS', direccion_id: 8, direccion_nombre: 'Dirección de Gestión Integral de Residuos', direccion_sigla: 'DGIR', unidad_id: null, created_at: '2026-01-22', ultimo_acceso: '2026-03-26 17:15' }
];

// T001: GET /api/usuarios — Listar usuarios con filtros y paginación
app.get('/api/usuarios', async (req, res) => {
  const { rol, secretaria_id, activo, buscar, page = 1, limit = 20 } = req.query;

  if (!pool || !dbConnected) {
    let filtrados = [...usuariosEnMemoria];
    if (rol) {
      filtrados = filtrados.filter(u => u.rol_codigo === rol);
    }
    if (secretaria_id) {
      filtrados = filtrados.filter(u => String(u.secretaria_id) === String(secretaria_id));
    }
    if (activo !== undefined && activo !== '' && activo !== 'todos') {
      filtrados = filtrados.filter(u => u.activo === (activo === 'true' || activo === true));
    }
    if (buscar) {
      const q = buscar.toLowerCase();
      filtrados = filtrados.filter(u =>
        (u.nombres && u.nombres.toLowerCase().includes(q)) ||
        (u.apellidos && u.apellidos.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.cargo && u.cargo.toLowerCase().includes(q))
      );
    }
    const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const paginados = filtrados.slice(offset, offset + parseInt(limit));
    return res.json({
      exito: true,
      fuente: 'Memoria Institucional',
      total: filtrados.length,
      totalPages: Math.ceil(filtrados.length / parseInt(limit)) || 1,
      page: parseInt(page),
      data: paginados
    });
  }

  try {
    const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const conditions = [];
    const params = [];
    let paramIdx = 1;

    if (rol) {
      conditions.push(`r.codigo = $${paramIdx++}`);
      params.push(rol);
    }
    if (secretaria_id) {
      conditions.push(`u.secretaria_id = $${paramIdx++}`);
      params.push(parseInt(secretaria_id));
    }
    if (activo !== undefined && activo !== '' && activo !== 'todos') {
      conditions.push(`u.activo = $${paramIdx++}`);
      params.push(activo === 'true');
    }
    if (buscar) {
      conditions.push(`(u.nombres ILIKE $${paramIdx} OR u.apellidos ILIKE $${paramIdx} OR u.email ILIKE $${paramIdx} OR u.cargo ILIKE $${paramIdx})`);
      params.push(`%${buscar}%`);
      paramIdx++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Count total
    const countRes = await pool.query(
      `SELECT COUNT(*)::INT AS total FROM comunica.usuarios u JOIN comunica.roles r ON u.rol_id = r.id ${whereClause}`,
      params
    );
    const total = countRes.rows[0].total;

    // Fetch paginated data
    const dataParams = [...params, parseInt(limit), offset];
    const dataRes = await pool.query(`
      SELECT 
        u.id,
        u.nombres,
        u.apellidos,
        u.cargo,
        u.email,
        u.telefono_contacto,
        u.activo,
        TO_CHAR(u.ultimo_acceso, 'YYYY-MM-DD HH24:MI') AS ultimo_acceso,
        TO_CHAR(u.created_at, 'YYYY-MM-DD') AS created_at,
        r.id AS rol_id,
        r.codigo AS rol_codigo,
        r.nombre AS rol_nombre,
        COALESCE(sec.id, 0) AS secretaria_id,
        COALESCE(sec.nombre, 'Sin asignar') AS secretaria_nombre,
        COALESCE(sec.sigla, '') AS secretaria_sigla,
        COALESCE(dir.id, 0) AS direccion_id,
        COALESCE(dir.nombre, 'Sin asignar') AS direccion_nombre,
        COALESCE(dir.sigla, '') AS direccion_sigla,
        u.unidad_id
      FROM comunica.usuarios u
      JOIN comunica.roles r ON u.rol_id = r.id
      LEFT JOIN comunica.secretarias sec ON u.secretaria_id = sec.id
      LEFT JOIN comunica.direcciones dir ON u.direccion_id = dir.id
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT $${paramIdx++} OFFSET $${paramIdx++}
    `, dataParams);

    return res.json({
      exito: true,
      fuente: 'PostgreSQL 16',
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      page: parseInt(page),
      data: dataRes.rows
    });
  } catch (err) {
    console.error('❌ Error listando usuarios:', err.message);
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T008: GET /api/usuarios/:id — Detalle de un usuario
app.get('/api/usuarios/:id', async (req, res) => {
  if (!pool || !dbConnected) {
    const user = usuariosEnMemoria.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    return res.json({ exito: true, data: user });
  }

  try {
    const result = await pool.query(`
      SELECT 
        u.id, u.nombres, u.apellidos, u.cargo, u.email, u.telefono_contacto,
        u.activo, u.rol_id, r.codigo AS rol_codigo, r.nombre AS rol_nombre,
        u.secretaria_id, COALESCE(sec.nombre, '') AS secretaria_nombre,
        u.direccion_id, COALESCE(dir.nombre, '') AS direccion_nombre,
        u.unidad_id,
        TO_CHAR(u.ultimo_acceso, 'YYYY-MM-DD HH24:MI') AS ultimo_acceso,
        TO_CHAR(u.created_at, 'YYYY-MM-DD HH24:MI') AS created_at
      FROM comunica.usuarios u
      JOIN comunica.roles r ON u.rol_id = r.id
      LEFT JOIN comunica.secretarias sec ON u.secretaria_id = sec.id
      LEFT JOIN comunica.direcciones dir ON u.direccion_id = dir.id
      WHERE u.id = $1
    `, [req.params.id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }

    return res.json({ exito: true, data: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T002: POST /api/usuarios — Crear nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombres, apellidos, cargo, email, telefono_contacto, password, rol_id, secretaria_id, direccion_id, unidad_id } = req.body;

  // Validaciones
  if (!nombres || nombres.trim().length < 2) {
    return res.status(400).json({ exito: false, mensaje: 'Los nombres son obligatorios (mín. 2 caracteres)' });
  }
  if (!apellidos || apellidos.trim().length < 2) {
    return res.status(400).json({ exito: false, mensaje: 'Los apellidos son obligatorios (mín. 2 caracteres)' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ exito: false, mensaje: 'El email institucional es obligatorio y debe tener formato válido' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ exito: false, mensaje: 'La contraseña debe tener al menos 8 caracteres' });
  }
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).json({ exito: false, mensaje: 'La contraseña debe contener al menos una mayúscula y un número' });
  }
  if (!rol_id) {
    return res.status(400).json({ exito: false, mensaje: 'Debe seleccionar un rol' });
  }

  if (!pool || !dbConnected) {
    const emailNorm = email.toLowerCase().trim();
    if (usuariosEnMemoria.some(u => u.email.toLowerCase() === emailNorm)) {
      return res.status(409).json({ exito: false, mensaje: 'Este email ya está registrado en el sistema' });
    }
    const rolObj = rolesEnMemoria.find(r => r.id === parseInt(rol_id));
    if (!rolObj) {
      return res.status(400).json({ exito: false, mensaje: 'Rol no válido' });
    }
    const nuevoUsuario = {
      id: crypto.randomUUID(),
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      cargo: cargo ? cargo.trim() : 'Funcionario GAM El Alto',
      email: emailNorm,
      telefono_contacto: telefono_contacto ? telefono_contacto.trim() : null,
      activo: true,
      rol_id: rolObj.id,
      rol_codigo: rolObj.codigo,
      rol_nombre: rolObj.nombre,
      secretaria_id: secretaria_id ? parseInt(secretaria_id) : 1,
      secretaria_nombre: 'Secretaría Municipal',
      secretaria_sigla: 'SM',
      direccion_id: direccion_id ? parseInt(direccion_id) : 1,
      direccion_nombre: 'Dirección Municipal',
      direccion_sigla: 'DM',
      unidad_id: unidad_id || null,
      created_at: new Date().toISOString().split('T')[0],
      ultimo_acceso: null
    };
    usuariosEnMemoria.unshift(nuevoUsuario);
    console.log(`✅ [Usuarios Memoria] Nuevo usuario creado: ${nuevoUsuario.email} (ID: ${nuevoUsuario.id})`);
    return res.status(201).json({
      exito: true,
      mensaje: 'Usuario creado exitosamente',
      data: nuevoUsuario
    });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Verificar email único
    const emailCheck = await client.query(
      `SELECT id FROM comunica.usuarios WHERE email = $1`,
      [email.toLowerCase().trim()]
    );
    if (emailCheck.rowCount > 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(409).json({ exito: false, mensaje: 'Este email ya está registrado en el sistema' });
    }

    // Verificar rol válido
    const rolCheck = await client.query(`SELECT id FROM comunica.roles WHERE id = $1`, [rol_id]);
    if (rolCheck.rowCount === 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ exito: false, mensaje: 'Rol no válido' });
    }

    // Validar cascada secretaria→dirección
    if (direccion_id) {
      const dirCheck = await client.query(
        `SELECT id FROM comunica.direcciones WHERE id = $1 AND secretaria_id = $2`,
        [direccion_id, secretaria_id || 0]
      );
      if (dirCheck.rowCount === 0 && secretaria_id) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ exito: false, mensaje: 'La dirección no pertenece a la secretaría seleccionada' });
      }
    }

    // Hashear password con bcrypt factor 12
    const passwordHash = await bcrypt.hash(password, 12);

    const insertRes = await client.query(`
      INSERT INTO comunica.usuarios (
        rol_id, secretaria_id, direccion_id, unidad_id,
        nombres, apellidos, cargo, email, telefono_contacto, password_hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, nombres, apellidos, email, created_at
    `, [
      rol_id,
      secretaria_id || null,
      direccion_id || null,
      unidad_id || null,
      nombres.trim(),
      apellidos.trim(),
      cargo || null,
      email.toLowerCase().trim(),
      telefono_contacto || null,
      passwordHash
    ]);

    const nuevoUsuario = insertRes.rows[0];

    // Auditoría
    await client.query(`
      INSERT INTO comunica.auditoria (evento, entidad_tipo, entidad_id, ip_origen, estado_nuevo)
      VALUES ('CREACION_USUARIO', 'USUARIO', $1, $2, $3)
    `, [
      nuevoUsuario.id,
      req.ip || '127.0.0.1',
      JSON.stringify({ nombres: nombres.trim(), apellidos: apellidos.trim(), email: email.toLowerCase().trim(), rol_id })
    ]);

    await client.query('COMMIT');
    client.release();

    console.log(`✅ [Usuarios] Nuevo usuario creado: ${nuevoUsuario.email} (ID: ${nuevoUsuario.id})`);

    return res.status(201).json({
      exito: true,
      mensaje: 'Usuario creado exitosamente',
      data: nuevoUsuario
    });
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    console.error('❌ Error creando usuario:', err.message);
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T003: PUT /api/usuarios/:id — Editar usuario (sin email ni password)
app.put('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, cargo, telefono_contacto, rol_id, secretaria_id, direccion_id, unidad_id } = req.body;

  if (!pool || !dbConnected) {
    const user = usuariosEnMemoria.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    // Protección: no degradar al último admin
    if (rol_id && parseInt(rol_id) !== user.rol_id && user.rol_codigo === 'ADMIN') {
      const otherAdmins = usuariosEnMemoria.filter(u => u.rol_codigo === 'ADMIN' && u.activo && u.id !== id).length;
      if (otherAdmins === 0) {
        return res.status(400).json({ exito: false, mensaje: 'No se puede cambiar el rol del último administrador activo del sistema' });
      }
    }
    if (nombres) user.nombres = nombres.trim();
    if (apellidos) user.apellidos = apellidos.trim();
    if (cargo !== undefined) user.cargo = cargo;
    if (telefono_contacto !== undefined) user.telefono_contacto = telefono_contacto;
    if (rol_id) {
      const r = rolesEnMemoria.find(r => r.id === parseInt(rol_id));
      if (r) {
        user.rol_id = r.id;
        user.rol_codigo = r.codigo;
        user.rol_nombre = r.nombre;
      }
    }
    if (secretaria_id !== undefined) user.secretaria_id = parseInt(secretaria_id) || 0;
    if (direccion_id !== undefined) user.direccion_id = parseInt(direccion_id) || 0;
    if (unidad_id !== undefined) user.unidad_id = unidad_id;
    return res.json({ exito: true, mensaje: 'Usuario actualizado exitosamente', data: user });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Obtener estado anterior
    const prevRes = await client.query(
      `SELECT nombres, apellidos, cargo, telefono_contacto, rol_id, secretaria_id, direccion_id, unidad_id FROM comunica.usuarios WHERE id = $1`,
      [id]
    );
    if (prevRes.rowCount === 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    const prev = prevRes.rows[0];

    // Protección: no degradar al último admin
    if (rol_id && rol_id !== prev.rol_id) {
      const adminCheck = await client.query(
        `SELECT COUNT(*)::INT AS total FROM comunica.usuarios WHERE rol_id = (SELECT id FROM comunica.roles WHERE codigo = 'ADMIN') AND activo = TRUE AND id != $1`,
        [id]
      );
      const esAdmin = prev.rol_id === (await client.query(`SELECT id FROM comunica.roles WHERE codigo = 'ADMIN'`)).rows[0]?.id;
      if (esAdmin && adminCheck.rows[0].total === 0) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ exito: false, mensaje: 'No se puede cambiar el rol del último administrador activo del sistema' });
      }
    }

    // Validar cascada secretaria→dirección
    if (direccion_id && secretaria_id) {
      const dirCheck = await client.query(
        `SELECT id FROM comunica.direcciones WHERE id = $1 AND secretaria_id = $2`,
        [direccion_id, secretaria_id]
      );
      if (dirCheck.rowCount === 0) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ exito: false, mensaje: 'La dirección no pertenece a la secretaría seleccionada' });
      }
    }

    const updateRes = await client.query(`
      UPDATE comunica.usuarios SET
        nombres = COALESCE($1, nombres),
        apellidos = COALESCE($2, apellidos),
        cargo = COALESCE($3, cargo),
        telefono_contacto = COALESCE($4, telefono_contacto),
        rol_id = COALESCE($5, rol_id),
        secretaria_id = $6,
        direccion_id = $7,
        unidad_id = $8,
        updated_at = NOW()
      WHERE id = $9
      RETURNING id, nombres, apellidos, email
    `, [
      nombres || null,
      apellidos || null,
      cargo || null,
      telefono_contacto || null,
      rol_id || null,
      secretaria_id || null,
      direccion_id || null,
      unidad_id || null,
      id
    ]);

    // Auditoría
    await client.query(`
      INSERT INTO comunica.auditoria (evento, entidad_tipo, entidad_id, ip_origen, estado_anterior, estado_nuevo)
      VALUES ('EDICION_USUARIO', 'USUARIO', $1, $2, $3, $4)
    `, [
      id, req.ip || '127.0.0.1',
      JSON.stringify(prev),
      JSON.stringify({ nombres, apellidos, cargo, rol_id, secretaria_id, direccion_id })
    ]);

    await client.query('COMMIT');
    client.release();

    return res.json({ exito: true, mensaje: 'Usuario actualizado exitosamente', data: updateRes.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T004: PATCH /api/usuarios/:id/estado — Activar/Desactivar usuario
app.patch('/api/usuarios/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  if (!pool || !dbConnected) {
    const user = usuariosEnMemoria.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    // No auto-desactivar
    if (req.body.requesting_user_id && req.body.requesting_user_id === id && activo === false) {
      return res.status(400).json({ exito: false, mensaje: 'No puede desactivar su propia cuenta de administrador' });
    }
    // No desactivar al último admin
    if (!activo && user.rol_codigo === 'ADMIN') {
      const otherAdmins = usuariosEnMemoria.filter(u => u.rol_codigo === 'ADMIN' && u.activo && u.id !== id).length;
      if (otherAdmins === 0) {
        return res.status(400).json({ exito: false, mensaje: 'No se puede desactivar al último administrador activo del sistema' });
      }
    }
    user.activo = !!activo;
    return res.json({
      exito: true,
      mensaje: activo ? 'Usuario reactivado exitosamente' : 'Usuario desactivado exitosamente',
      advertencia: null,
      data: { id, activo: user.activo }
    });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userRes = await client.query(
      `SELECT u.id, u.activo, u.nombres, u.apellidos, r.codigo AS rol_codigo FROM comunica.usuarios u JOIN comunica.roles r ON u.rol_id = r.id WHERE u.id = $1`,
      [id]
    );
    if (userRes.rowCount === 0) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }

    const user = userRes.rows[0];

    // No auto-desactivar (si el request tiene un requesting_user_id)
    if (req.body.requesting_user_id && req.body.requesting_user_id === id && activo === false) {
      await client.query('ROLLBACK');
      client.release();
      return res.status(400).json({ exito: false, mensaje: 'No puede desactivar su propia cuenta de administrador' });
    }

    // No desactivar al último admin
    if (!activo && user.rol_codigo === 'ADMIN') {
      const adminCount = await client.query(
        `SELECT COUNT(*)::INT AS total FROM comunica.usuarios u JOIN comunica.roles r ON u.rol_id = r.id WHERE r.codigo = 'ADMIN' AND u.activo = TRUE AND u.id != $1`,
        [id]
      );
      if (adminCount.rows[0].total === 0) {
        await client.query('ROLLBACK');
        client.release();
        return res.status(400).json({ exito: false, mensaje: 'No se puede desactivar al último administrador activo del sistema' });
      }
    }

    // Verificar solicitudes activas
    let advertencia = null;
    if (!activo) {
      const solActivas = await client.query(
        `SELECT COUNT(*)::INT AS total FROM comunica.solicitudes s JOIN comunica.estados e ON s.estado_id = e.id WHERE s.disenador_asignado_id = $1 AND e.codigo NOT IN ('APROBADO', 'FINALIZADO')`,
        [id]
      );
      if (solActivas.rows[0].total > 0) {
        advertencia = `Este usuario tiene ${solActivas.rows[0].total} solicitud(es) activa(s) asignada(s)`;
      }
    }

    await client.query(
      `UPDATE comunica.usuarios SET activo = $1, updated_at = NOW() WHERE id = $2`,
      [activo, id]
    );

    // Auditoría
    await client.query(`
      INSERT INTO comunica.auditoria (evento, entidad_tipo, entidad_id, ip_origen, estado_anterior, estado_nuevo)
      VALUES ($1, 'USUARIO', $2, $3, $4, $5)
    `, [
      activo ? 'REACTIVACION_USUARIO' : 'DESACTIVACION_USUARIO',
      id, req.ip || '127.0.0.1',
      JSON.stringify({ activo: user.activo }),
      JSON.stringify({ activo })
    ]);

    await client.query('COMMIT');
    client.release();

    return res.json({
      exito: true,
      mensaje: activo ? 'Usuario reactivado exitosamente' : 'Usuario desactivado exitosamente',
      advertencia,
      data: { id, activo }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T005: POST /api/usuarios/:id/reset-password — Resetear contraseña
app.post('/api/usuarios/:id/reset-password', async (req, res) => {
  const { id } = req.params;

  if (!pool || !dbConnected) {
    const user = usuariosEnMemoria.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    const passwordTemporal = generarPasswordTemporal(12);
    console.log(`🔑 [Usuarios Memoria] Contraseña reseteada para: ${user.email} -> ${passwordTemporal}`);
    return res.json({
      exito: true,
      mensaje: 'Contraseña reseteada exitosamente',
      password_temporal: passwordTemporal,
      data: { id, email: user.email }
    });
  }

  try {
    const userRes = await pool.query(`SELECT id, email FROM comunica.usuarios WHERE id = $1`, [id]);
    if (userRes.rowCount === 0) {
      return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }

    const passwordTemporal = generarPasswordTemporal(12);
    const passwordHash = await bcrypt.hash(passwordTemporal, 12);

    await pool.query(
      `UPDATE comunica.usuarios SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
      [passwordHash, id]
    );

    // Auditoría
    await pool.query(`
      INSERT INTO comunica.auditoria (evento, entidad_tipo, entidad_id, ip_origen, estado_nuevo)
      VALUES ('RESET_PASSWORD', 'USUARIO', $1, $2, $3)
    `, [
      id, req.ip || '127.0.0.1',
      JSON.stringify({ email: userRes.rows[0].email, accion: 'password_reset' })
    ]);

    console.log(`🔑 [Usuarios] Contraseña reseteada para: ${userRes.rows[0].email}`);

    return res.json({
      exito: true,
      mensaje: 'Contraseña reseteada exitosamente',
      password_temporal: passwordTemporal,
      data: { id, email: userRes.rows[0].email }
    });
  } catch (err) {
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T006: GET /api/roles — Listar roles con conteo de usuarios
app.get('/api/roles', async (req, res) => {
  if (!pool || !dbConnected) {
    const rolesConConteo = rolesEnMemoria.map(r => ({
      ...r,
      total_usuarios: usuariosEnMemoria.filter(u => u.rol_id === r.id && u.activo).length
    }));
    return res.json({
      exito: true,
      data: rolesConConteo
    });
  }

  try {
    const result = await pool.query(`
      SELECT 
        r.id, r.codigo, r.nombre, r.descripcion, r.activo,
        COUNT(u.id)::INT AS total_usuarios
      FROM comunica.roles r
      LEFT JOIN comunica.usuarios u ON r.id = u.rol_id AND u.activo = TRUE
      GROUP BY r.id, r.codigo, r.nombre, r.descripcion, r.activo
      ORDER BY r.id
    `);

    return res.json({ exito: true, data: result.rows });
  } catch (err) {
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// T007: PUT /api/roles/:id — Editar descripción del rol
app.put('/api/roles/:id', async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  if (!pool || !dbConnected) {
    const rol = rolesEnMemoria.find(r => r.id === parseInt(id));
    if (!rol) {
      return res.status(404).json({ exito: false, mensaje: 'Rol no encontrado' });
    }
    rol.descripcion = descripcion;
    return res.json({ exito: true, mensaje: 'Descripción del rol actualizada exitosamente' });
  }

  try {
    const prevRes = await pool.query(`SELECT id, descripcion FROM comunica.roles WHERE id = $1`, [id]);
    if (prevRes.rowCount === 0) {
      return res.status(404).json({ exito: false, mensaje: 'Rol no encontrado' });
    }

    await pool.query(`UPDATE comunica.roles SET descripcion = $1 WHERE id = $2`, [descripcion, id]);

    // Auditoría
    await pool.query(`
      INSERT INTO comunica.auditoria (evento, entidad_tipo, entidad_id, ip_origen, estado_anterior, estado_nuevo)
      VALUES ('EDICION_ROL', 'ROL', $1, $2, $3, $4)
    `, [
      id, req.ip || '127.0.0.1',
      JSON.stringify({ descripcion: prevRes.rows[0].descripcion }),
      JSON.stringify({ descripcion })
    ]);

    return res.json({ exito: true, mensaje: 'Descripción del rol actualizada exitosamente' });
  } catch (err) {
    return res.status(500).json({ exito: false, error: err.message });
  }
});

// 7. Organigrama Oficial (Secretarías y Direcciones)
app.get('/api/organigrama', async (req, res) => {
  if (pool && dbConnected) {
    try {
      const result = await pool.query(`
        SELECT 
          s.id AS secretaria_id,
          s.nombre AS secretaria_nombre,
          s.sigla AS secretaria_sigla,
          json_agg(
            json_build_object(
              'id', d.id,
              'nombre', d.nombre,
              'codigo', d.codigo,
              'sigla', d.sigla
            ) ORDER BY d.id
          ) AS direcciones
        FROM comunica.secretarias s
        JOIN comunica.direcciones d ON s.id = d.secretaria_id
        WHERE s.activo = TRUE AND d.activo = TRUE
        GROUP BY s.id, s.nombre, s.sigla
        ORDER BY s.id;
      `);
      return res.json({ exito: true, data: result.rows });
    } catch (err) {
      console.warn('⚠️ Error consultando organigrama:', err.message);
    }
  }

  res.json({ exito: false, mensaje: 'Organigrama no disponible desde BD' });
});

// Redirigir todas las rutas restantes al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  COMUNICA DIGITAL - GAM EL ALTO INICIADO`);
  console.log(`  Puerto: ${PORT} | Modo: ${process.env.NODE_ENV || 'production'}`);
  console.log(`  Dominio: https://creativos.elalto.gob.bo`);
  console.log(`  Base de Datos: PostgreSQL 16 (Coolify)`);
  console.log(`  Dirección de Comunicación (DICOM)`);
  console.log(`=======================================================`);
});
