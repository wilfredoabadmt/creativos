# Tasks: Módulo de Gestión de Usuarios y Roles

**Input**: Design documents from `/specs/013-gestion-usuarios-roles/`

**Prerequisites**: plan.md ✅, spec.md ✅, data-model.md ✅

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Backend — Endpoints REST de Usuarios

**Purpose**: API REST completa para operaciones CRUD sobre la tabla `usuarios`

- [x] T001 [US1] Endpoint `GET /api/usuarios` — Listar usuarios con filtros (rol, secretaria_id, activo, buscar) y paginación (page, limit). JOIN con roles, secretarias, direcciones. Retornar sin `password_hash`. Archivo: `server.js`
- [x] T002 [US2] Endpoint `POST /api/usuarios` — Crear usuario con validación server-side (email único, password mín 8 chars, rol válido, cascada secretaria→dirección válida). Hashear password con bcrypt factor 12. Registrar en auditoría. Archivo: `server.js`
- [x] T003 [US3] Endpoint `PUT /api/usuarios/:id` — Editar usuario (sin email ni password). Validar que no se auto-degrada el último admin. Registrar en auditoría (estado anterior vs nuevo). Archivo: `server.js`
- [x] T004 [US5] Endpoint `PATCH /api/usuarios/:id/estado` — Activar/desactivar con validaciones: no auto-desactivar, no desactivar último admin, advertir si tiene solicitudes activas. Registrar en auditoría. Archivo: `server.js`
- [x] T005 [US4] Endpoint `POST /api/usuarios/:id/reset-password` — Generar contraseña temporal aleatoria (12 chars, alfanumérica + especial), hashear y actualizar. Retornar contraseña temporal en respuesta (una sola vez). Registrar en auditoría. Archivo: `server.js`
- [x] T006 [P] [US6] Endpoint `GET /api/roles` — Listar roles con conteo de usuarios asignados por rol. Archivo: `server.js`
- [x] T007 [P] [US6] Endpoint `PUT /api/roles/:id` — Editar descripción del rol (solo descripción). Registrar en auditoría. Archivo: `server.js`
- [x] T008 [P] [US2] Endpoint `GET /api/usuarios/:id` — Detalle de un usuario específico con joins. Archivo: `server.js`

---

## Phase 2: Frontend — Vista de Gestión de Usuarios

**Purpose**: Interfaz completa del módulo en la SPA existente

- [x] T009 [US1] Agregar sección `#usuarios-section` en `public/index.html` con estructura HTML: toolbar (botón nuevo + filtros + buscador), contenedor tabla, paginación. Visible solo para ADMIN.
- [x] T010 [US1] Agregar entrada "Gestión de Usuarios" en el menú lateral de `public/index.html`, visible solo para ADMIN. Icono 👥.
- [x] T011 [US1] Implementar `renderUsersView()` en `public/js/app.js` — Cargar datos desde `GET /api/usuarios`, renderizar tabla con columnas: Iniciales, Nombre, Email, Rol (badge color), Secretaría/Dirección, Estado, Acciones.
- [x] T012 [US1] Implementar filtros y búsqueda en la tabla de usuarios — Filtros por rol (select), secretaría (select), estado (activo/inactivo/todos) + campo de búsqueda por nombre/email. Recarga dinámica sin recargar página.
- [x] T013 [US2] Implementar modal de creación de usuario — Formulario con campos: nombres, apellidos, cargo, email, teléfono, contraseña, rol (select), secretaría (select dinámico), dirección (select en cascada), unidad (select en cascada). Validación frontend. Submit a `POST /api/usuarios`.
- [x] T014 [US3] Implementar modal de edición de usuario — Precargar datos desde `GET /api/usuarios/:id`, email readonly, sin campo password. Submit a `PUT /api/usuarios/:id`.
- [x] T015 [US4] Implementar modal de reset de contraseña — Confirmación + mostrar contraseña temporal generada en un campo copiable con botón "Copiar al portapapeles".
- [x] T016 [US5] Implementar toggle de estado activo/inactivo — Botón con confirmación, advertencia de solicitudes activas. Call a `PATCH /api/usuarios/:id/estado`.
- [x] T017 [US6] Implementar sub-vista de roles — Tabla/cards con 4 roles, conteo de usuarios, descripción editable inline. Call a `GET /api/roles` y `PUT /api/roles/:id`.

---

## Phase 3: Estilos CSS y Responsividad

**Purpose**: Diseño visual institucional del módulo

- [x] T018 [P] Estilos de tabla de usuarios en `public/css/styles.css` — Badges de color por rol (ADMIN=rojo, SUPERVISOR=azul, DISENADOR=púrpura, SOLICITANTE=verde), estado activo/inactivo, hover effects, responsive (cards en móvil).
- [x] T019 [P] Estilos de modales de usuario — Formulario 2 columnas en desktop, 1 columna en móvil, validación visual (bordes rojos en error), botones institucionales.
- [x] T020 [P] Estilos de filtros y buscador — Barra de herramientas compacta, chips de filtros activos, responsivo.

---

## Phase 4: Integración y Navegación

**Purpose**: Conectar el módulo con el sistema de navegación existente

- [x] T021 Integrar navegación del módulo en `app.js` — Agregar case 'usuarios' en el switch de navegación, cargar datos al entrar, mostrar/ocultar sección según rol.
- [x] T022 Protección de acceso frontend — Ocultar menú "Gestión de Usuarios" para roles no-ADMIN, redirigir si un no-admin intenta navegar a la sección.
- [x] T023 Selects en cascada — Implementar carga dinámica: al seleccionar Secretaría → cargar Direcciones de esa secretaría → al seleccionar Dirección → cargar Unidades. Usar endpoints existentes `/api/secretarias` y `/api/direcciones?secretaria_id=X`.

---

## Phase 5: Verificación E2E

**Purpose**: Self-test de comportamiento completo

- [ ] T024 Verificación: Crear un usuario nuevo via API, verificar que aparece en la tabla y puede loguearse.
- [ ] T025 Verificación: Editar un usuario, verificar persistencia del cambio.
- [ ] T026 Verificación: Desactivar un usuario, verificar que no puede loguearse, reactivarlo y verificar que puede.
- [ ] T027 Verificación: Resetear contraseña, loguearse con la nueva.
- [ ] T028 Verificación: Intentar desactivar al último admin → debe rechazar.
- [ ] T029 Verificación: Responsividad — verificar que la tabla se transforma en cards en viewport < 768px.

---

## Dependency Graph

```
T001 ──┐
T006 ──┤
T007 ──┤
T008 ──┼──► T009 ──► T010 ──► T011 ──► T012
T002 ──┤                                  │
T003 ──┤         T013 ◄──────────────────┘
T004 ──┤         T014 ◄── T003
T005 ──┘         T015 ◄── T005
                 T016 ◄── T004
                 T017 ◄── T006, T007
                 T018, T019, T020 ◄── (paralelo con Phase 2)
                 T021 ◄── T011
                 T022 ◄── T021
                 T023 ◄── T013
                 T024-T029 ◄── ALL above
```
