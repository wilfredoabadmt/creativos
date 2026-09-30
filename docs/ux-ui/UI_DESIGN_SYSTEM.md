# Sistema de Diseño Visual Institucional y Wireframes UX/UI
## COMUNICA DIGITAL GAM El Alto
### Plataforma Digital de Gestión Creativa Institucional

---

## 1. SISTEMA DE DISEÑO INSTITUCIONAL (DESIGN SYSTEM)

### 1.1 Filosofía Visual
El diseño de **COMUNICA DIGITAL** refleja la identidad, dinamismo y orgullo de la ciudad de **El Alto**: una urbe pujante, moderna y trabajadora. El diseño combina la sobriedad y solemnidad de la gestión pública con una estética digital de vanguardia (interfaz limpia, sutiles efectos de cristal/glassmorphism, micro-animaciones fluidas y tipografía de alta legibilidad).

### 1.2 Paleta de Colores Institucional

| Token | Nombre | Valor HEX | Uso Primario |
|---|---|---|---|
| `--color-primary-gamea` | Guindo Alteño | `#7A1315` | Barra institucional, botones primarios, acentos cívicos |
| `--color-primary-dark` | Guindo Profundo | `#540C0E` | Hover en botones primarios, encabezados hero |
| `--color-secondary-gold`| Dorado Cívico | `#D4AF37` | Badges de honor, sellos de aprobación, bordes destacados |
| `--color-secondary-blue`| Azul Institucional | `#0D2E5C` | Tarjetas de servicios, filtros avanzados, navegación |
| `--color-surface-bg` | Fondo Claro | `#F8FAFC` | Fondo general de la plataforma |
| `--color-surface-card` | Blanco Puro | `#FFFFFF` | Superficie de paneles, tarjetas y modales |
| `--color-text-main` | Gris Pizarra Oscuro | `#0F172A` | Títulos y texto de alta jerarquía |
| `--color-text-muted` | Gris Neutro Medio | `#64748B` | Subtítulos, etiquetas y textos secundarios |
| `--color-border` | Borde Sutil | `#E2E8F0` | Separadores de sección y contornos de inputs |

#### Colores Semánticos de Estados (SLA y Workflow)
- `🟡 Pendiente`: `#EAB308` (Fondo badge: `#FEF9C3`, Texto: `#854D0E`)
- `🔵 En revisión`: `#3B82F6` (Fondo badge: `#DBEAFE`, Texto: `#1E40AF`)
- `🟣 Diseño en proceso`: `#8B5CF6` (Fondo badge: `#EDE9FE`, Texto: `#5B21B6`)
- `🟠 Ajustes`: `#F97316` (Fondo badge: `#FFEDD5`, Texto: `#9A3412`)
- `🟢 Aprobado`: `#10B981` (Fondo badge: `#D1FAE5`, Texto: `#065F46`)
- `⚫ Finalizado`: `#475569` (Fondo badge: `#F1F5F9`, Texto: `#334155`)

### 1.3 Tipografía
- **Familia Primaria:** `'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - Utilizada para encabezados institucionales (`H1`, `H2`, `H3`), números de KPI y botones de acción. Transmite modernidad y contundencia geométrica.
- **Familia Secundaria / Lectura:** `'Inter', system-ui, sans-serif`
  - Utilizada para formularios, tablas, textos de brief y descripciones técnicas. Óptima legibilidad en pantallas de cualquier densidad de píxeles.

---

## 2. WIREFRAMES Y ESTRUCTURA DE PANTALLAS

### 2.1 Wireframe 1: Landing Page Institucional (Pública / Interna)
```
+-----------------------------------------------------------------------------------+
|  [ESCUDO EL ALTO]  GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO    [Ingresar al Sistema]|
|                    Dirección de Comunicación - COMUNICA DIGITAL                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|      HERO SECTION:                                                                |
|      "Transformando la comunicación institucional mediante                        |
|       procesos digitales, eficientes y transparentes."                            |
|                                                                                   |
|      [ + Iniciar Solicitud de Diseño ]    [ Consultar Estado de Trámite ]          |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  SERVICIOS DEL ÁREA CREATIVA:                                                     |
|  +--------------------+ +--------------------+ +--------------------+             |
|  | 🎨 Diseño Gráfico  | | 📢 Campañas        | | 📱 Redes Sociales  |             |
|  | Institucional      | | Municipales        | | y Contenido Digital|             |
|  +--------------------+ +--------------------+ +--------------------+             |
|  +--------------------+ +--------------------+ +--------------------+             |
|  | 🎬 Producción      | | 📚 Publicaciones   | | 🖼 Branding &      |             |
|  | Audiovisual & Spot | | y Memorias         | | Identidad Visual   |             |
|  +--------------------+ +--------------------+ +--------------------+             |
+-----------------------------------------------------------------------------------+
|  CÓMO FUNCIONA EL SISTEMA (PASO A PASO):                                          |
|  (1) Solicitud -> (2) Validación -> (3) Asignación -> (4) Diseño -> (5) Revisión -> (6) Entrega |
+-----------------------------------------------------------------------------------+
|  BENEFICIOS INSTITUCIONALES:                                                      |
|  [⚡ Mayor Rapidez] [🔍 Transparencia] [⏱ Tiempo Real] [🏛 Memoria Histórica]    |
+-----------------------------------------------------------------------------------+
```

### 2.2 Wireframe 2: Formulario Digital de 4 Pasos (Ficha Técnica)
```
+-----------------------------------------------------------------------------------+
|  NUEVA SOLICITUD DE DISEÑO GRÁFICO (Ficha Técnica Oficial DICOM)                  |
|  Paso 1: Evento  -->  Paso 2: Características  -->  Paso 3: Formato  -->  Paso 4: Adjuntos |
+-----------------------------------------------------------------------------------+
|  [ SECCIÓN 1: DATOS DEL EVENTO O ACTIVIDAD ]                                      |
|  Secretaría Solicitante: [ Seleccione Secretaría...                v ]            |
|  Dirección / Unidad:     [ Seleccione Dependencia...               v ]            |
|  Nombre del Evento:      [ Ej: Inauguración de Hospital Municipal Los Andes     ] |
|  Fecha del Evento: [ 15/10/2026 ]   Hora: [ 09:30 AM ]   Lugar: [ Distrito 5    ] |
|  Público Objetivo: [ Vecinos, gremiales y juntas vecinales del Distrito 5       ] |
|  Objetivo del Mensaje: [ Comunicar la entrega de infraestructura y atenciones.. ] |
+-----------------------------------------------------------------------------------+
|  [ SECCIÓN 2: CARACTERÍSTICAS DEL DISEÑO ]                                        |
|  Tipo de Pieza:  [x] Afiche   [ ] Poster   [ ] Flyer   [ ] Tríptico   [ ] Banner   |
|                  [ ] Invitación  [ ] Infografía  [ ] Redes Sociales   [ ] Otro    |
|  Estilo Visual:  (o) Institucional  ( ) Moderno  ( ) Juvenil  ( ) Colorido       |
|                  ( ) Minimalista    ( ) Educativo ( ) Cultural                    |
+-----------------------------------------------------------------------------------+
|  [ SECCIÓN 3: FORMATO Y DIFUSIÓN ]                                                |
|  Material:       ( ) Impreso       ( ) Digital       (o) Ambos                    |
|  Orientación:    (o) Vertical      ( ) Horizontal    ( ) Cuadrado                 |
|  Plataformas:    [x] Facebook   [x] WhatsApp   [x] TikTok   [ ] Web   [ ] Pantallas|
+-----------------------------------------------------------------------------------+
|  [ SECCIÓN 4: INSUMOS Y ARCHIVOS OBLIGATORIOS ]                                   |
|  Texto Aprobado: [ Pegar o adjuntar el brief redactado final (No Lorem Ipsum) ]   |
|  Zona Drag & Drop: [ Arrastre logos SVG/PNG, fotografías de obra y documentos ]   |
|  Alerta SLA Automática: "Fecha estimada de entrega: 22/10/2026 (7 días hábiles)"  |
|                                                                                   |
|  [ < Paso Anterior ]                                     [ ENVIAR SOLICITUD > ]   |
+-----------------------------------------------------------------------------------+
```

### 2.3 Wireframe 3: Control de Modificaciones / Cambios (Máximo 2 Rondas)
```
+-----------------------------------------------------------------------------------+
|  CONTROL DE MODIFICACIONES | Trámite: SOL-2026-0042                               |
|  Rondas de Modificación Disponibles: [ Ronda 1: UTILIZADA ] [ Ronda 2: DISPONIBLE ]|
+-----------------------------------------------------------------------------------+
|  Historial de Versiones y Rondas:                                                 |
|  -------------------------------------------------------------------------------  |
|  [Propuesta v1] Subida el 05/10/2026 por Lic. Carlos Mamani (Diseñador)           |
|  -> Observación Ronda 1 (06/10/2026): "Cambiar hora a 10:00 y corregir logo D-5"   |
|  -------------------------------------------------------------------------------  |
|  [Propuesta v2] Subida el 07/10/2026 por Lic. Carlos Mamani (Diseñador)           |
|  Estado: En evaluación por Secretaría Solicitante                                 |
+-----------------------------------------------------------------------------------+
|  SOLICITAR NUEVO AJUSTE (Última ronda permitida: Ronda 2 de 2):                   |
|  Motivo técnico del cambio: [ Ingrese correcciones puntuales y aprobadas...    ]  |
|  Adjunto complementario:    [ Cargar insumo nuevo si corresponde             ]  |
|  [ Enviar a Ajustes (Ronda 2) ]              ó              [ APROBAR DISEÑO FINAL ]|
+-----------------------------------------------------------------------------------+
```

### 2.4 Wireframe 4: Dashboard Administrativo e Indicadores Institucionales
```
+-----------------------------------------------------------------------------------+
|  PANEL DE CONTROL DICOM - GOBIERNO AUTÓNOMO MUNICIPAL DE EL ALTO                  |
+-----------------------------------------------------------------------------------+
|  [ 142 Solicitudes ]  [ 98 Finalizadas ]  [ 38 En Proceso ]  [ 4.8 Días Promedio ] |
+-----------------------------------------------------------------------------------+
|  PRODUCCIÓN POR SECRETARÍAS (Mayor Demanda):   | ESTADOS ACTUALES:                |
|  1. Sec. Municipal de Salud       [==== 34 ]   |  🟡 Pendiente: 8                 |
|  2. Sec. Infraestructura Pública  [===  28 ]   |  🔵 En revisión: 12              |
|  3. Sec. Educación y Cultura      [==   21 ]   |  🟣 En diseño: 18                |
|  4. Sec. Desarrollo Económico     [=    14 ]   |  🟠 Ajustes: 6                   |
|  5. Sec. Seguridad Ciudadana      [=    12 ]   |  🟢 Aprobado: 14                 |
|                                                |  ⚫ Finalizado: 98               |
+-----------------------------------------------------------------------------------+
|  PIEZAS MÁS SOLICITADAS:                       | RENDIMIENTO MENSUAL:             |
|  - Redes Sociales (42%)                        | Ene: 24 | Feb: 38 | Mar: 52      |
|  - Afiches y Posters (28%)                     | Abr: 45 | May: 60 | Jun: 71      |
|  - Banners y Gigantografías (18%)              |                                  |
|  - Trípticos / Folletos (12%)                  |                                  |
+-----------------------------------------------------------------------------------+
```
