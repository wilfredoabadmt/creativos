# Quickstart: Módulo de Gestión de Usuarios y Roles

## Prerrequisitos

- Node.js 18+ instalado
- PostgreSQL 16 accesible (local o Coolify)
- Variables de entorno configuradas (`DATABASE_URL` o `PGHOST`/`PGUSER`/`PGPASSWORD`/`PGDATABASE`)

## Levantar el sistema

```bash
cd f:\Documentos\GitHub\creativos
npm install
npm start
```

## Verificar el módulo

1. **Iniciar sesión como ADMIN**:
   - Email: `admin@elalto.gob.bo`
   - Contraseña: `AdminElAlto2026!`

2. **Navegar a "Gestión de Usuarios"** en el menú lateral (solo visible para ADMIN).

3. **Probar CRUD**:
   - Ver la tabla de usuarios con los 9 usuarios semilla
   - Crear un usuario nuevo con rol SOLICITANTE
   - Editar el cargo de un usuario existente
   - Desactivar un usuario y verificar que no puede loguearse
   - Resetear contraseña y verificar login con la nueva

## Probar via API (curl)

```bash
# Listar usuarios
curl http://localhost:3000/api/usuarios

# Crear usuario
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Test",
    "apellidos": "Usuario",
    "cargo": "Prueba",
    "email": "test@elalto.gob.bo",
    "telefono_contacto": "77200000",
    "password": "TestPass2026!",
    "rol_id": 4,
    "secretaria_id": 6,
    "direccion_id": 15
  }'

# Listar roles
curl http://localhost:3000/api/roles
```

## Verificar en base de datos

```sql
SET search_path TO comunica, public;
SELECT id, nombres, apellidos, email, activo FROM usuarios;
SELECT * FROM roles;
SELECT * FROM auditoria WHERE entidad_tipo = 'USUARIO' ORDER BY created_at DESC LIMIT 10;
```
