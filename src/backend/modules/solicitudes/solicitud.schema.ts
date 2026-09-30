import { z } from 'zod';

/**
 * Esquema de Validación Zod para Solicitudes Creativas
 * Cumple estrictamente con la Ficha Técnica Oficial de la Dirección de Comunicación (GAMEA)
 */
export const SolicitudCreateSchema = z.object({
  // SECCIÓN 1: DATOS DEL EVENTO O ACTIVIDAD
  secretaria_id: z.number({ required_error: 'La Secretaría solicitante es obligatoria' }).positive(),
  direccion_id: z.number().optional().nullable(),
  unidad_id: z.number().optional().nullable(),
  nombre_evento: z.string({ required_error: 'El nombre del evento es obligatorio' })
    .min(5, 'El nombre del evento debe tener al menos 5 caracteres')
    .max(250),
  fecha_evento: z.string({ required_error: 'La fecha del evento es obligatoria' })
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Fecha de evento inválida' }),
  hora_evento: z.string().optional().nullable(),
  lugar_evento: z.string({ required_error: 'El lugar del evento es obligatorio' })
    .min(3, 'El lugar debe especificarse con claridad'),
  publico_objetivo: z.string({ required_error: 'El público objetivo es obligatorio' })
    .min(5, 'Especifique el público al que se orienta la pieza gráfica'),
  objetivo_mensaje: z.string({ required_error: 'El objetivo del mensaje es obligatorio' })
    .min(10, 'Redacte claramente qué se desea lograr con esta comunicación'),
  informacion_adicional: z.string().optional().nullable(),

  // SECCIÓN 2: CARACTERÍSTICAS DEL DISEÑO
  tipo_diseno_id: z.number({ required_error: 'Seleccione un tipo de pieza gráfica' }).positive(),
  tipo_diseno_otro: z.string().optional().nullable(),
  estilo_visual: z.enum([
    'Institucional',
    'Moderno',
    'Juvenil',
    'Colorido',
    'Minimalista',
    'Educativo',
    'Cultural',
    'Otro'
  ], { required_error: 'El estilo visual es obligatorio' }),
  estilo_otro: z.string().optional().nullable(),

  // SECCIÓN 3: FORMATO Y DIFUSIÓN
  material: z.enum(['IMPRESO', 'DIGITAL', 'AMBOS'], {
    required_error: 'Especifique si el material es impreso, digital o ambos'
  }),
  orientacion: z.enum(['VERTICAL', 'HORIZONTAL', 'CUADRADO', 'PANORAMICO'], {
    required_error: 'Seleccione la orientación requerida'
  }),
  plataformas_difusion: z.array(z.string()).nonempty('Debe seleccionar al menos una plataforma de difusión'),
  dimensiones_especificas: z.string().optional().nullable(),

  // SECCIÓN 4: INSUMOS OBLIGATORIOS (BRIEF)
  texto_aprobado: z.string({ required_error: 'El texto oficial aprobado es obligatorio' })
    .min(15, 'Debe adjuntar el texto oficial revisado (se prohíbe Lorem Ipsum)'),
  archivos: z.array(
    z.object({
      tipo_archivo: z.enum(['TEXTO_BRIEF', 'LOGO', 'FOTOGRAFIA', 'QR', 'MANUAL', 'OTRO']),
      nombre_original: z.string(),
      s3_key: z.string(),
      mime_type: z.string(),
      tamano_bytes: z.number()
    })
  ).min(1, 'Debe adjuntar al menos un recurso gráfico o logotipo institucional')
});

export type SolicitudCreateDTO = z.infer<typeof SolicitudCreateSchema>;

/**
 * Función que calcula la fecha límite de entrega respetando 7 días hábiles
 * Excluye fines de semana y el feriado municipal de El Alto (6 de marzo)
 */
export function calcularFechaLimiteEntrega(fechaInicio: Date = new Date()): Date {
  const FERIADOS_FIJOS = [
    '01-01', // Año Nuevo
    '03-06', // Aniversario de la Ciudad de El Alto
    '05-01', // Día del Trabajo
    '06-21', // Año Nuevo Andino
    '08-06', // Día de la Patria
    '11-02', // Todos Santos
    '12-25', // Navidad
  ];

  let diasHabilesRestantes = 7;
  const fecha = new Date(fechaInicio);

  // Si se recibe después de las 16:00, arranca el conteo al día siguiente
  if (fecha.getHours() >= 16) {
    fecha.setDate(fecha.getDate() + 1);
    fecha.setHours(8, 0, 0, 0);
  }

  while (diasHabilesRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1);
    const diaSemana = fecha.getDay(); // 0 = Domingo, 6 = Sábado
    if (diaSemana === 0 || diaSemana === 6) {
      continue; // Fin de semana
    }

    const mesDia = `${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    if (FERIADOS_FIJOS.includes(mesDia)) {
      continue; // Feriado
    }

    diasHabilesRestantes--;
  }

  fecha.setHours(18, 0, 0, 0);
  return fecha;
}
