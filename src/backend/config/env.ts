/**
 * Configuración de Variables de Entorno - COMUNICA DIGITAL GAMEA
 */
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    PORT: parseInt(process.env.DB_PORT || '5432', 10),
    NAME: process.env.DB_NAME || 'comunica_gamea',
    USER: process.env.DB_USER || 'gamea_admin',
    PASS: process.env.DB_PASSWORD || 'SecretGamea2026_SecureDb!',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'gamea_jwt_ultra_secret_key_alcaldia_el_alto_2026',
    EXPIRATION: '30m',
  },
  MINIO: {
    ENDPOINT: process.env.MINIO_ENDPOINT || 'localhost',
    PORT: parseInt(process.env.MINIO_PORT || '9000', 10),
    ACCESS_KEY: process.env.MINIO_ACCESS_KEY || 'gamea_minio_access',
    SECRET_KEY: process.env.MINIO_SECRET_KEY || 'GameaMinioSecretKey2026!',
    BUCKET_INSUMOS: 'gamea-insumos',
    BUCKET_ENTREGABLES: 'gamea-entregables',
  },
  REGLAS_NEGOCIO: {
    DIAS_HABILES_PRODUCCION: 7,
    MAX_RONDAS_CAMBIOS: 2,
    HORA_LIMITE_RECEPCION_MISMO_DIA: 16, // 16:00
  }
};
