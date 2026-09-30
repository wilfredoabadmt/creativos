# Manual Técnico de Instalación, Configuración y Operaciones
## COMUNICA DIGITAL GAM El Alto
### Plataforma Digital de Gestión Creativa Institucional

---

## 1. ESPECIFICACIONES DE INFRAESTRUCTURA

### 1.1 Requisitos Mínimos y Recomendados de Servidor

| Componente | Requisito Mínimo | Entorno de Producción Recomendado |
|---|---|---|
| **Sistema Operativo** | Ubuntu Server 22.04 LTS x86_64 | **Ubuntu Server 24.04 LTS x86_64** |
| **Procesador (CPU)** | 2 vCPU (2.4 GHz+) | **4 a 8 vCPU** (Compute Optimized) |
| **Memoria RAM** | 4 GB RAM | **8 GB a 16 GB RAM DDR4/DDR5** |
| **Almacenamiento** | 60 GB SSD | **250 GB+ NVMe SSD** (RAID 1 o Ceph) |
| **Red** | 100 Mbps simétricos | **1 Gbps** con IP pública estática y DNS municipal |
| **Puertos de Red** | 80/TCP, 443/TCP, 22/TCP (SSH) | Firewall UFW configurado con Fail2Ban |

### 1.2 Dependencias del Sistema Anfitrión
- **Docker Engine:** v26.0 o superior
- **Docker Compose:** v2.26 o superior
- **Git:** v2.40+
- **OpenSSL:** v3.0+

---

## 2. PROCEDIMIENTO DE INSTALACIÓN Y DESPLIEGUE CON DOCKER

### 2.1 Clonación y Preparación del Repositorio
```bash
# Conectarse al servidor vía SSH
ssh admin-gamea@servidor.elalto.gob.bo

# Clonar el repositorio oficial institucional
git clone https://github.com/gamea-dicom/comunica-digital.git /opt/comunica-digital
cd /opt/comunica-digital

# Crear el archivo de variables de entorno de producción
cp .env.example .env
nano .env
```

### 2.2 Variables de Entorno de Producción (`.env`)
```ini
# Configuración General del Entorno
NODE_ENV=production
PORT=3000
APP_URL=https://comunica.elalto.gob.bo

# Base de Datos PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_NAME=comunica_gamea
DB_USER=gamea_admin
DB_PASSWORD=CAMBIAR_POR_PASSWORD_ALFANUMERICO_32_CARACTERES
DB_POOL_MAX=20

# Almacenamiento MinIO (S3 Compatible)
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=gamea_minio_access
MINIO_SECRET_KEY=CAMBIAR_POR_MINIO_SECRET_KEY_COMPLEJA
MINIO_BUCKET_INSUMOS=gamea-insumos
MINIO_BUCKET_ENTREGABLES=gamea-entregables

# Seguridad y Criptografía
JWT_SECRET=CAMBIAR_POR_SECRETO_HEXADECIMAL_64_BYTES
JWT_EXPIRATION=30m
JWT_REFRESH_SECRET=CAMBIAR_POR_SECRETO_REFRESH_64_BYTES
JWT_REFRESH_EXPIRATION=7d

# Cache y Rate Limiting
REDIS_HOST=redis
REDIS_PORT=6379
```

### 2.3 Despliegue de los Contenedores
```bash
# Construir imágenes y levantar servicios en segundo plano
docker compose up -d --build

# Verificar que los 5 contenedores estén en estado 'Up'
docker compose ps

# Ejecutar las migraciones y carga de datos iniciales (seeds)
docker compose exec app npm run db:migrate
docker compose exec app npm run db:seed
```

---

## 3. ESPECIFICACIÓN DE ENDPOINTS DE LA API REST

Todos los endpoints (excepto login) requieren la cabecera `Authorization: Bearer <TOKEN_JWT>`.

| Método | Endpoint | Rol Requerido | Descripción |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Público | Autenticación de usuario con email y contraseña |
| `GET` | `/api/v1/auth/perfil` | Autenticado | Obtiene los datos del usuario en sesión |
| `POST` | `/api/v1/solicitudes` | Solicitante | Registra nueva solicitud (brief 4 pasos + adjuntos) |
| `GET` | `/api/v1/solicitudes` | Autenticado | Listado con filtros de estado, secretaría y búsqueda |
| `GET` | `/api/v1/solicitudes/:id` | Autenticado | Obtiene detalle completo, brief, SLA y entregables |
| `PATCH`| `/api/v1/solicitudes/:id/asignar` | Supervisor, Admin | Asigna o reasigna un diseñador a la solicitud |
| `PATCH`| `/api/v1/solicitudes/:id/estado` | Diseñador, Supervisor | Actualiza el estado (`DISENO_PROCESO`, `EN_REVISION`) |
| `POST` | `/api/v1/solicitudes/:id/entregables` | Diseñador | Carga boceto v1/v2 o arte final en alta resolución |
| `POST` | `/api/v1/solicitudes/:id/cambios` | Solicitante | Solicita modificaciones formales (Valida ronda <= 2) |
| `POST` | `/api/v1/solicitudes/:id/aprobar` | Solicitante, Supervisor | Emite la aprobación final formal de la pieza |
| `GET` | `/api/v1/dashboard/metricas` | Supervisor, Admin | Devuelve KPIs, cargas por secretaría y tiempos |
| `GET` | `/api/v1/auditoria` | Admin | Consulta logs transaccionales inmutables |

---

## 4. POLÍTICAS DE RESPALDO Y RECUPERACIÓN (BACKUP & DR)

### 4.1 Script Diario Automatizado (`/opt/comunica-digital/scripts/backup.sh`)
```bash
#!/bin/bash
set -e
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backup/comunica_gamea"
mkdir -p "$BACKUP_DIR"

# 1. Respaldo de Base de Datos PostgreSQL con compresión
docker compose exec -T postgres pg_dump -U gamea_admin comunica_gamea | gzip > "$BACKUP_DIR/db_$TIMESTAMP.sql.gz"

# 2. Respaldo de almacenamiento MinIO
tar -czf "$BACKUP_DIR/minio_$TIMESTAMP.tar.gz" /var/lib/docker/volumes/comunica_miniodata

# 3. Eliminar respaldos con más de 30 días de antigüedad
find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "[$(date)] Backup de COMUNICA DIGITAL completado exitosamente: $TIMESTAMP" >> /var/log/comunica_backup.log
```

---

## 5. REGLAS DE SEGURIDAD Y FIREWALL UFW

```bash
# Habilitar firewall nativo
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH Administrativo'
sudo ufw allow 80/tcp comment 'HTTP Let\'s Encrypt'
sudo ufw allow 443/tcp comment 'HTTPS COMUNICA DIGITAL'
sudo ufw enable
```
