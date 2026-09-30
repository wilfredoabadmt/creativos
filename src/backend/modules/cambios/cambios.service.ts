/**
 * Módulo de Control de Modificaciones / Cambios
 * Regla de Oro Institucional: Máximo 2 rondas de cambios
 */

export interface RegistroCambioDTO {
  solicitud_id: string;
  solicitado_por: string;
  motivo_cambio: string;
  archivo_anterior_id?: string;
  archivo_nuevo_referencia?: string;
}

export class ControlModificacionesService {
  /**
   * Procesa la solicitud de cambio asegurando que no exceda las 2 rondas permitidas
   */
  public async procesarCambio(dto: RegistroCambioDTO, rondasActuales: number) {
    if (rondasActuales >= 2) {
      throw new Error(
        'LÍMITE EXCEDIDO: La solicitud ya ha utilizado las 2 rondas de cambios permitidas institucionalmente. ' +
        'Cualquier modificación adicional requiere autorización expresa y justificada del Director de Comunicación.'
      );
    }

    const nuevaRonda = rondasActuales + 1;

    return {
      exito: true,
      ronda: nuevaRonda,
      mensaje: `Ronda de cambios ${nuevaRonda} de 2 registrada exitosamente. El equipo de diseño ha sido notificado.`,
      estado_nuevo: 'AJUSTES',
      alerta: nuevaRonda === 2 ? 'ATENCIÓN: Esta es la ÚLTIMA ronda de modificaciones permitida para este trámite.' : null,
      data: {
        solicitud_id: dto.solicitud_id,
        ronda_numero: nuevaRonda,
        solicitado_por: dto.solicitado_por,
        motivo_cambio: dto.motivo_cambio,
        archivo_anterior_id: dto.archivo_anterior_id,
        archivo_nuevo_referencia: dto.archivo_nuevo_referencia,
        fecha_registro: new Date().toISOString()
      }
    };
  }
}
