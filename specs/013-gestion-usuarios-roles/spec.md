# Feature Specification: Módulo de Gestión de Usuarios y Roles

**Feature Branch**: `013-gestion-usuarios-roles`

**Created**: 2026-10-01

**Status**: Draft

**Input**: User description: "Módulo de gestión de usuarios y roles (CRUD completo de usuarios del sistema)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Listar Usuarios Registrados (Priority: P1)

El Administrador (ADMIN) accede a la sección "Gestión de Usuarios" desde el menú principal del sistema. Ve una tabla con todos los usuarios registrados mostrando: nombre completo, email, rol, secretaría/dirección asignada, estado (activo/inactivo) y fecha de último acceso. Puede filtrar por rol, secretaría o estado, y buscar por nombre/email.

**Why this priority**: Sin la capacidad de ver usuarios existentes, no se puede gestionar ningún aspecto del módulo. Es la base sobre la que se construyen todas las demás operaciones.

**Independent Test**: Puede verificarse navegando a la vista de usuarios y confirmando que la tabla muestra los 9 usuarios semilla del sistema con datos correctos.

**Acceptance Scenarios**:

1. **Given** el ADMIN ha iniciado sesión, **When** navega a "Gestión de Usuarios", **Then** ve una tabla con todos los usuarios del sistema con columnas: Nombre, Email, Rol, Secretaría/Dirección, Estado, Último Acceso.
2. **Given** la tabla tiene usuarios, **When** el ADMIN filtra por rol "DISENADOR", **Then** solo se muestran los usuarios con rol de diseñador.
3. **Given** la tabla tiene usuarios, **When** el ADMIN busca "Roxana", **Then** solo aparece la Directora de Comunicación.
4. **Given** no hay usuarios que coincidan con el filtro, **When** el ADMIN filtra, **Then** se muestra un estado vacío con mensaje informativo.

---

### User Story 2 - Crear Nuevo Usuario (Priority: P1)

El Administrador abre el formulario "Nuevo Usuario" y completa: nombres, apellidos, cargo, email institucional, teléfono, contraseña temporal, rol (ADMIN/SUPERVISOR/DISENADOR/SOLICITANTE) y la ubicación orgánica (Secretaría → Dirección → Unidad). Al guardar, el sistema valida datos, hashea la contraseña y registra al usuario en PostgreSQL.

**Why this priority**: Sin la capacidad de crear usuarios, el sistema queda limitado a los usuarios semilla. Las nuevas Secretarías/Direcciones necesitan cuentas para operar en la plataforma.

**Independent Test**: Crear un usuario nuevo con todos los campos, verificar que aparece en la tabla y que puede iniciar sesión con las credenciales asignadas.

**Acceptance Scenarios**:

1. **Given** el formulario de creación está abierto, **When** el ADMIN completa todos los campos obligatorios y guarda, **Then** el usuario se crea en la BD y aparece en la tabla.
2. **Given** el formulario está abierto, **When** el ADMIN intenta guardar sin email, **Then** se muestra error de validación "El email institucional es obligatorio".
3. **Given** ya existe un usuario con email `admin@elalto.gob.bo`, **When** el ADMIN intenta crear otro con el mismo email, **Then** se muestra error "Este email ya está registrado".
4. **Given** el ADMIN selecciona rol "SOLICITANTE", **When** elige una Secretaría, **Then** el select de Dirección se carga dinámicamente con las direcciones de esa secretaría.
5. **Given** la contraseña tiene menos de 8 caracteres, **When** intenta guardar, **Then** se muestra error "La contraseña debe tener al menos 8 caracteres".

---

### User Story 3 - Editar Usuario Existente (Priority: P2)

El Administrador selecciona un usuario de la tabla y abre el formulario de edición precargado con sus datos. Puede modificar: nombres, apellidos, cargo, teléfono, rol, secretaría/dirección/unidad y estado (activo/inactivo). El email NO es editable (es clave única institucional). Opcionalmente puede resetear la contraseña.

**Why this priority**: Los cambios organizacionales (rotación de personal, ascensos, cambios de dirección) son frecuentes en el GAMEA y requieren actualización inmediata de los perfiles.

**Independent Test**: Editar el cargo de un usuario existente, verificar que el cambio persiste en la BD y se refleja en la tabla.

**Acceptance Scenarios**:

1. **Given** el ADMIN abre el formulario de edición de un usuario, **When** modifica el cargo y guarda, **Then** el cambio se persiste y la tabla muestra el nuevo cargo.
2. **Given** el formulario de edición está abierto, **When** el ADMIN ve el campo email, **Then** está en modo solo lectura (no editable).
3. **Given** el ADMIN marca un usuario como "Inactivo", **When** guarda, **Then** el usuario no puede iniciar sesión pero su historial de trámites se mantiene intacto.
4. **Given** el ADMIN cambia el rol de un usuario de SOLICITANTE a DISENADOR, **When** guarda, **Then** el usuario hereda los permisos del nuevo rol en su próximo inicio de sesión.

---

### User Story 4 - Resetear Contraseña de Usuario (Priority: P2)

El Administrador puede generar una nueva contraseña temporal para un usuario que ha olvidado sus credenciales o necesita un reset. Se genera un hash seguro con bcrypt y se muestra la contraseña temporal una sola vez en pantalla.

**Why this priority**: En un entorno institucional sin SSO, el reset de contraseña es una operación frecuente y crítica para no bloquear el acceso de las dependencias.

**Independent Test**: Resetear la contraseña de un usuario, copiar la nueva contraseña temporal e iniciar sesión con ella.

**Acceptance Scenarios**:

1. **Given** el ADMIN abre la acción "Resetear Contraseña" de un usuario, **When** confirma la acción, **Then** se genera una contraseña temporal segura y se muestra en un modal copiable.
2. **Given** se reseteó la contraseña, **When** el usuario intenta loguearse con la contraseña anterior, **Then** el acceso es denegado.
3. **Given** se reseteó la contraseña, **When** el usuario inicia sesión con la contraseña temporal, **Then** accede al sistema correctamente.

---

### User Story 5 - Desactivar / Reactivar Usuario (Priority: P3)

El Administrador puede desactivar (soft-delete) un usuario sin eliminar su historial. Un usuario desactivado no puede iniciar sesión. Se puede reactivar en cualquier momento.

**Why this priority**: Es un mecanismo de control más seguro que la eliminación, necesario cuando un funcionario deja el cargo pero su historial de trámites debe permanecer.

**Independent Test**: Desactivar un usuario, verificar que no puede loguearse, reactivarlo y verificar que puede volver a acceder.

**Acceptance Scenarios**:

1. **Given** el ADMIN desactiva un usuario activo, **When** el usuario intenta iniciar sesión, **Then** recibe un mensaje "Su cuenta ha sido deshabilitada. Contacte al administrador".
2. **Given** un usuario inactivo existe, **When** el ADMIN lo reactiva, **Then** el usuario puede iniciar sesión nuevamente con sus credenciales previas.
3. **Given** un usuario está asignado como diseñador a solicitudes activas, **When** el ADMIN intenta desactivarlo, **Then** el sistema advierte "Este usuario tiene X solicitudes activas asignadas. ¿Desea continuar?"

---

### User Story 6 - Gestión de Roles con Permisos (Priority: P3)

El Administrador puede ver la tabla de roles del sistema con sus permisos asociados. Puede editar la descripción de los roles pero NO puede crear/eliminar roles base (ADMIN, SUPERVISOR, DISENADOR, SOLICITANTE) ya que están vinculados a la lógica de negocio.

**Why this priority**: Proporciona visibilidad sobre la estructura de permisos del sistema sin poner en riesgo la integridad de la lógica de negocio.

**Independent Test**: Navegar a la sección de roles, verificar que los 4 roles se muestran con sus descripciones y que la edición de descripción persiste.

**Acceptance Scenarios**:

1. **Given** el ADMIN navega a "Gestión de Roles", **When** ve la tabla de roles, **Then** se muestran los 4 roles con código, nombre, descripción y número de usuarios asignados.
2. **Given** el ADMIN edita la descripción de un rol, **When** guarda, **Then** la nueva descripción persiste en la BD.
3. **Given** el ADMIN intenta eliminar un rol, **Then** el botón de eliminar NO está disponible (roles base protegidos).

---

### Edge Cases

- ¿Qué pasa si el ADMIN intenta desactivar su propia cuenta? → **Sistema rechaza**: "No puede desactivar su propia cuenta de administrador".
- ¿Qué pasa si se intenta crear un usuario con un email que no sea del dominio `@elalto.gob.bo`? → El sistema permite cualquier email válido (no todos los funcionarios tienen correo institucional), pero muestra una advertencia.
- ¿Qué pasa si el único ADMIN intenta cambiar su propio rol? → **Sistema rechaza**: "Debe existir al menos un administrador activo en el sistema".
- ¿Qué pasa con la carga masiva de usuarios? → Fuera del alcance de v1. Se resolverá en una feature futura (import CSV/Excel).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Sistema DEBE permitir al ADMIN listar todos los usuarios con paginación (20 por página) y filtros por rol, secretaría, estado.
- **FR-002**: Sistema DEBE permitir al ADMIN crear nuevos usuarios con validación de campos obligatorios (nombres, apellidos, email, rol, contraseña).
- **FR-003**: Sistema DEBE hashear las contraseñas con bcrypt (factor 12) antes de almacenar.
- **FR-004**: Sistema DEBE validar unicidad de email antes de crear/editar un usuario.
- **FR-005**: Sistema DEBE implementar selects en cascada: Secretaría → Dirección → Unidad al asignar ubicación orgánica.
- **FR-006**: Sistema DEBE permitir desactivar (soft-delete) usuarios sin perder su historial de trámites.
- **FR-007**: Sistema DEBE registrar cada operación CRUD en la tabla de auditoría (auditoria) con usuario, IP, timestamp y estado anterior/nuevo.
- **FR-008**: Sistema DEBE permitir al ADMIN resetear la contraseña de cualquier usuario generando una contraseña temporal segura.
- **FR-009**: Sistema DEBE mostrar la tabla de roles con conteo de usuarios por rol.
- **FR-010**: Sistema DEBE restringir el acceso a este módulo EXCLUSIVAMENTE al rol ADMIN.
- **FR-011**: Sistema DEBE prevenir la eliminación física de usuarios (solo soft-delete via campo `activo`).
- **FR-012**: Sistema DEBE prevenir auto-desactivación y auto-degradación del último ADMIN.

### Key Entities

- **Usuario** (`usuarios`): Servidor público registrado con pertenencia orgánica (secretaría/dirección/unidad), credenciales cifradas, rol asignado y estado activo/inactivo. Clave primaria UUID.
- **Rol** (`roles`): Perfil de permisos del sistema (ADMIN, SUPERVISOR, DISENADOR, SOLICITANTE). Los roles son estáticos y protegidos.
- **Secretaría** (`secretarias`): Dependencia de primer nivel del organigrama D.M. N° 200.
- **Dirección** (`direcciones`): Dependencia de segundo nivel, vinculada a una secretaría.
- **Unidad** (`unidades`): Dependencia de tercer nivel, vinculada a una dirección.
- **Auditoría** (`auditoria`): Registro inmutable de todas las operaciones realizadas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El ADMIN puede crear un usuario nuevo y este puede iniciar sesión en menos de 2 minutos.
- **SC-002**: La tabla de usuarios carga con filtros aplicados en menos de 500ms (hasta 200 usuarios).
- **SC-003**: Todas las operaciones CRUD quedan registradas en la tabla de auditoría sin excepción.
- **SC-004**: Un usuario desactivado es rechazado al intentar login con mensaje descriptivo.
- **SC-005**: Los selects en cascada (Secretaría → Dirección → Unidad) cargan en menos de 300ms.
- **SC-006**: 100% de las contraseñas se almacenan hasheadas (nunca en texto plano).

## Assumptions

- El sistema ya cuenta con autenticación JWT funcionando en `server.js` con roles RBAC.
- El frontend es una SPA vanilla (HTML/CSS/JS) con estado centralizado en `app.js`.
- PostgreSQL 16 está configurado y accesible via pool de conexiones en `server.js`.
- La tabla `usuarios` y tablas relacionadas ya existen en el esquema `comunica`.
- Solo el rol ADMIN tiene acceso a este módulo. SUPERVISOR puede ver la lista de usuarios pero no editarlos.
- No se implementa SSO ni OAuth en esta versión; la autenticación es por email/contraseña.
- La carga masiva de usuarios (import CSV) queda fuera del alcance de esta feature.
