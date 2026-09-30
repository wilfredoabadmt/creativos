import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env';
import { SolicitudCreateSchema, calcularFechaLimiteEntrega } from './modules/solicitudes/solicitud.schema';
import { ControlModificacionesService } from './modules/cambios/cambios.service';
import { DashboardService } from './modules/dashboard/dashboard.service';

const app = express();

// Middlewares de seguridad y parsing
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir frontend institucional en producción
app.use(express.static('public'));

// Servicios de dominio
const cambiosService = new ControlModificacionesService();
const dashboardService = new DashboardService();

// Health Check institucional
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'OK',
    plataforma: 'COMUNICA DIGITAL GAM El Alto',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Endpoint: Registrar Solicitud (Brief de 4 secciones)
app.post('/api/solicitudes', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validData = SolicitudCreateSchema.parse(req.body);
    const fechaRecepcion = new Date();
    const fechaLimite = calcularFechaLimiteEntrega(fechaRecepcion);

    // Correlativo simulado para respuesta
    const codigoTramite = `SOL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    res.status(201).json({
      exito: true,
      mensaje: 'Solicitud registrada exitosamente en el sistema de la DICOM',
      data: {
        id: 'uuid-solicitud-gamea',
        codigo_tramite: codigoTramite,
        estado: 'PENDIENTE',
        fecha_recepcion: fechaRecepcion.toISOString(),
        fecha_limite: fechaLimite.toISOString(),
        dias_habiles_sla: 7,
        detalle: validData
      }
    });
  } catch (error) {
    next(error);
  }
});

// Endpoint: Control de Modificaciones / Cambios (Máximo 2 Rondas)
app.post('/api/solicitudes/:id/cambios', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { solicitud_id, solicitado_por, motivo_cambio, rondas_actuales } = req.body;
    const resultado = await cambiosService.procesarCambio(
      {
        solicitud_id,
        solicitado_por,
        motivo_cambio
      },
      rondas_actuales || 0
    );

    res.json(resultado);
  } catch (error: any) {
    res.status(400).json({ exito: false, mensaje: error.message });
  }
});

// Endpoint: Métricas y Estadísticas de Dashboard
app.get('/api/dashboard/metricas', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const metricas = await dashboardService.obtenerMetricas();
    res.json({ exito: true, data: metricas });
  } catch (error) {
    next(error);
  }
});

// Middleware Global de Errores
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error Servidor GAMEA]:', err);
  if (err.name === 'ZodError') {
    return res.status(422).json({
      exito: false,
      mensaje: 'Error de validación en la Ficha Técnica de Solicitud',
      errores: err.errors
    });
  }
  res.status(500).json({
    exito: false,
    mensaje: err.message || 'Error interno del servidor municipal'
  });
});

// Inicialización del Servidor
if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    console.log(`=======================================================`);
    console.log(`  COMUNICA DIGITAL - GAM EL ALTO INICIADO`);
    console.log(`  Puerto: ${ENV.PORT} | Entorno: ${ENV.NODE_ENV}`);
    console.log(`  Dirección de Comunicación - Gobierno Municipal`);
    console.log(`=======================================================`);
  });
}

export default app;
