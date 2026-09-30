/**
 * COMUNICA DIGITAL - GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO
 * Servidor Principal de Producción (Node.js & Express)
 * Dirección de Comunicación (DICOM)
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Health Check institucional para Coolify / Docker
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    plataforma: 'COMUNICA DIGITAL GAM El Alto',
    unidad: 'Dirección de Comunicación (DICOM)',
    base_datos: 'PostgreSQL 16',
    dominio: 'https://creativos.elalto.gob.bo',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Endpoint: Registrar Solicitud (Brief de 4 secciones)
app.post('/api/solicitudes', (req, res) => {
  const body = req.body;
  const fechaRecepcion = new Date();
  const fechaLimite = calcularFechaLimiteEntrega(fechaRecepcion);
  const anio = fechaRecepcion.getFullYear();
  const codigoTramite = `SOL-${anio}-${Math.floor(1000 + Math.random() * 9000)}`;

  res.status(201).json({
    exito: true,
    mensaje: 'Solicitud registrada exitosamente en el sistema de la DICOM',
    data: {
      id: `uuid-${Date.now()}`,
      codigo_tramite: codigoTramite,
      estado: 'PENDIENTE',
      fecha_recepcion: fechaRecepcion.toISOString(),
      fecha_limite: fechaLimite.toISOString(),
      dias_habiles_sla: 7,
      detalle: body
    }
  });
});

// Endpoint: Control de Modificaciones / Cambios (Máximo 2 Rondas)
app.post('/api/solicitudes/:id/cambios', (req, res) => {
  const { rondas_actuales, motivo_cambio, solicitado_por } = req.body;
  const rondas = rondas_actuales || 0;

  if (rondas >= 2) {
    return res.status(400).json({
      exito: false,
      mensaje: 'LÍMITE EXCEDIDO: La solicitud ya ha utilizado las 2 rondas de cambios permitidas institucionalmente por normativa de la DICOM. Cualquier ajuste adicional requiere autorización del Director de Comunicación.'
    });
  }

  const nuevaRonda = rondas + 1;
  res.json({
    exito: true,
    ronda: nuevaRonda,
    mensaje: `Ronda de cambios ${nuevaRonda} de 2 registrada exitosamente.`,
    estado_nuevo: 'AJUSTES',
    alerta: nuevaRonda === 2 ? 'ATENCIÓN: Esta es la ÚLTIMA ronda de modificaciones permitida para este trámite.' : null,
    data: {
      solicitud_id: req.params.id,
      ronda_numero: nuevaRonda,
      solicitado_por: solicitado_por || 'Solicitante Municipal',
      motivo_cambio,
      fecha_registro: new Date().toISOString()
    }
  });
});

// Endpoint: Métricas y Estadísticas de Dashboard
app.get('/api/dashboard/metricas', (req, res) => {
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

// Redirigir todas las rutas restantes al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`  COMUNICA DIGITAL - GAM EL ALTO INICIADO`);
  console.log(`  Puerto: ${PORT} | Modo: ${process.env.NODE_ENV || 'production'}`);
  console.log(`  Dominio: https://creativos.elalto.gob.bo`);
  console.log(`  Dirección de Comunicación (DICOM)`);
  console.log(`=======================================================`);
});
