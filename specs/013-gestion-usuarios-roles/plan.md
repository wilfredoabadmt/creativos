# Implementation Plan: Módulo de Gestión de Usuarios y Roles

**Branch**: `013-gestion-usuarios-roles` | **Date**: 2026-10-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/013-gestion-usuarios-roles/spec.md`

## Summary

Construir un módulo CRUD completo de usuarios y roles dentro de la SPA existente (`app.js`) con endpoints REST en `server.js`, persistiendo en PostgreSQL 16. El ADMIN podrá listar, crear, editar, desactivar/reactivar usuarios y resetear contraseñas. El módulo se integra al sistema de navegación existente con una nueva sección en el menú lateral visible solo para el rol ADMIN.

## Technical Context

**Language/Version**: JavaScript ES2022+ (Node.js 18+ / Vanilla JS Frontend)

**Primary Dependencies**: Express 4.x, pg (node-postgres), bcryptjs (ya en proyecto)

**Storage**: PostgreSQL 16 — esquema `comunica`, tablas `usuarios`, `roles`, `secretarias`, `direcciones`, `unidades`, `auditoria`

**Testing**: Pruebas manuales vía API REST + verificación de comportamiento E2E en navegador

**Target Platform**: Web SPA (Desktop + Mobile responsivo) — Nginx Alpine en Coolify

**Project Type**: Web application (monolito Node.js + SPA vanilla)

**Performance Goals**: Tabla de usuarios carga < 500ms, operaciones CRUD < 300ms, selects en cascada < 200ms

**Constraints**: Sin SSO/OAuth (email + password), bcrypt factor 12, solo ADMIN accede al módulo, soft-delete obligatorio

**Scale/Scope**: ~200 usuarios máximo (servidores públicos GAMEA), 14 secretarías, 43 direcciones

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Regla | Estado | Notas |
|-------|--------|-------|
| Secretos cifrados, nunca al cliente | ✅ PASA | Passwords hasheados con bcrypt, nunca se retornan al frontend |
| Auditoría inmutable APPEND-ONLY | ✅ PASA | Cada operación CRUD escribe en `auditoria` |
| Solo ADMIN accede al módulo | ✅ PASA | Middleware de verificación de rol en cada endpoint |
| Soft-delete, no eliminación física | ✅ PASA | Campo `activo` boolean en `usuarios` |
| Protección de auto-degradación | ✅ PASA | Validación server-side: no auto-desactivar ni cambiar rol del último admin |

## Project Structure

### Documentation (this feature)

```text
specs/013-gestion-usuarios-roles/
├── spec.md              # Especificación (QUÉ y POR QUÉ)
├── plan.md              # Este archivo (CÓMO)
├── data-model.md        # Modelo de datos y contratos de API
├── tasks.md             # Tareas dependency-ordered
└── contracts/           # Contratos de endpoints REST
    └── api-usuarios.md  # Endpoints CRUD de usuarios
```

### Source Code (files to modify/create)

```text
# Backend (server.js) — Nuevos endpoints a agregar
server.js
├── GET    /api/usuarios          # Listar con filtros y paginación
├── GET    /api/usuarios/:id      # Detalle de usuario
├── POST   /api/usuarios          # Crear usuario
├── PUT    /api/usuarios/:id      # Editar usuario
├── PATCH  /api/usuarios/:id/estado  # Activar/desactivar
├── POST   /api/usuarios/:id/reset-password  # Resetear contraseña
├── GET    /api/roles             # Listar roles con conteo
└── PUT    /api/roles/:id         # Editar descripción rol

# Frontend (public/) — Nuevos archivos/secciones
public/
├── index.html           # Nueva sección #usuarios-section en el DOM
├── css/styles.css       # Estilos del módulo de gestión de usuarios
└── js/app.js            # Lógica de la vista de usuarios (renderUsers, renderUserForm, etc.)
```

## Diseño de API REST

### Endpoints de Usuarios

| Método | Ruta | Descripción | Rol |
|--------|------|-------------|-----|
| `GET` | `/api/usuarios?rol=X&secretaria_id=X&activo=true&buscar=X&page=1&limit=20` | Listar usuarios con filtros y paginación | ADMIN |
| `GET` | `/api/usuarios/:id` | Obtener detalle de un usuario | ADMIN |
| `POST` | `/api/usuarios` | Crear nuevo usuario | ADMIN |
| `PUT` | `/api/usuarios/:id` | Editar usuario (sin email ni password) | ADMIN |
| `PATCH` | `/api/usuarios/:id/estado` | Activar/Desactivar usuario | ADMIN |
| `POST` | `/api/usuarios/:id/reset-password` | Resetear contraseña | ADMIN |

### Endpoints de Roles

| Método | Ruta | Descripción | Rol |
|--------|------|-------------|-----|
| `GET` | `/api/roles` | Listar roles con conteo de usuarios | ADMIN |
| `PUT` | `/api/roles/:id` | Editar descripción de rol | ADMIN |

### Payloads

**POST /api/usuarios** (Request Body):
```json
{
  "nombres": "Lic. Juan",
  "apellidos": "Pérez Mamani",
  "cargo": "Director de Deportes",
  "email": "dir.deportes@elalto.gob.bo",
  "telefono_contacto": "77211234",
  "password": "Deportes2026!",
  "rol_id": 4,
  "secretaria_id": 6,
  "direccion_id": 16,
  "unidad_id": null
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "usuario": {
    "id": "uuid...",
    "nombres": "Lic. Juan",
    "apellidos": "Pérez Mamani",
    "email": "dir.deportes@elalto.gob.bo",
    "rol": "SOLICITANTE",
    "secretaria": "Secretaría Municipal de Educación y Cultura",
    "direccion": "Dirección de Deportes"
  }
}
```

## Diseño Frontend

### Componentes UI

1. **Vista de Lista de Usuarios** (`renderUsersView`)
   - Barra de herramientas: botón "Nuevo Usuario" + filtros (rol, secretaría, estado) + buscador
   - Tabla responsiva con columnas: Avatar/Iniciales, Nombre, Email, Rol (badge color), Secretaría/Dirección, Estado, Acciones
   - Paginación inferior
   - En móvil: tarjetas en vez de tabla

2. **Modal de Creación/Edición** (`renderUserFormModal`)
   - Formulario con 2 columnas en desktop, 1 en móvil
   - Selects en cascada: Secretaría → Dirección → Unidad
   - Validación en tiempo real
   - Botones: Guardar / Cancelar

3. **Modal de Confirmación** (`renderConfirmModal`)
   - Para desactivar/reactivar/resetear contraseña
   - Muestra advertencias contextuales

4. **Vista de Roles** (tabla simple dentro de la misma sección)
   - Cards o tabla con los 4 roles, descripción editable inline, conteo de usuarios

### Navegación
- Nueva entrada "Gestión de Usuarios" en el menú lateral, visible SOLO para ADMIN
- Icono: 👥 o SVG de grupo de personas
- Sub-tabs internos: "Usuarios" | "Roles"

## Complexity Tracking

Sin violaciones de constitución. El diseño se mantiene dentro de los patrones existentes del proyecto.
