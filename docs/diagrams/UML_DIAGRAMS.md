# Diagramas UML Oficiales
## COMUNICA DIGITAL GAM El Alto
### Plataforma Digital de Gestión Creativa Institucional

Este documento contiene la especificación formal de los diagramas UML que modelan el comportamiento, estructura y despliegue del sistema.

---

## 1. DIAGRAMA DE CASOS DE USO GENERAL

```mermaid
flowchart LR
    subgraph Actores["Actores del Sistema"]
        S((Solicitante Municipal))
        D((Diseñador Gráfico))
        V((Supervisor / Director))
        A((Administrador General))
    end

    subgraph Sistema["Límite del Sistema: COMUNICA DIGITAL GAMEA"]
        UC1[UC-01: Autenticarse con credenciales institucionales]
        UC2[UC-02: Registrar Ficha Técnica de Diseño de 4 pasos]
        UC3[UC-03: Adjuntar insumos, logos y textos aprobados]
        UC4[UC-04: Consultar estado y SLA de trámites en curso]
        UC5[UC-05: Solicitar cambios formales max 2 rondas]
        UC6[UC-06: Emitir visto bueno y descargar arte final]
        
        UC7[UC-07: Validar completitud de brief técnico]
        UC8[UC-08: Asignar solicitud a diseñador]
        UC9[UC-09: Reclamar/descargar insumos y recursos]
        UC10[UC-10: Cargar borradores y avances de diseño]
        UC11[UC-11: Cargar entregable final en alta resolución]
        
        UC12[UC-12: Visualizar Dashboard con métricas y carga]
        UC13[UC-13: Autorizar solicitud extraordinaria fuera de plazo]
        UC14[UC-14: Administrar catálogos dependencias y tipos]
        UC15[UC-15: Consultar logs de auditoría transaccional]
    end

    S --> UC1
    S --> UC2
    S --> UC3
    S --> UC4
    S --> UC5
    S --> UC6

    D --> UC1
    D --> UC4
    D --> UC9
    D --> UC10
    D --> UC11

    V --> UC1
    V --> UC4
    V --> UC7
    V --> UC8
    V --> UC12
    V --> UC13

    A --> UC1
    A --> UC12
    A --> UC14
    A --> UC15
```

---

## 2. DIAGRAMA DE SECUENCIA: CICLO DE VIDA DE LA SOLICITUD Y CONTROL DE CAMBIOS

```mermaid
sequenceDiagram
    autonumber
    actor Sol as Solicitante Municipal
    participant UI as Portal Web (Frontend)
    participant API as API REST Gateway
    participant Svc as Solicitud & SLA Engine
    actor Sup as Supervisor DICOM
    actor Dis as Diseñador Gráfico
    participant DB as PostgreSQL 16
    participant S3 as MinIO Storage

    %% Registro
    Note over Sol, UI: Paso 1: Registro de la Ficha Técnica
    Sol->>UI: Completa Formulario 4 Pasos + Adjunta Insumos
    UI->>UI: Valida campos requeridos (Fecha, Brief, Logos)
    UI->>API: POST /api/solicitudes (Payload + Archivos)
    API->>Svc: Validar completitud y calcular SLA (7 días hábiles)
    Svc->>S3: Guardar insumos en bucket seguro
    Svc->>DB: INSERT INTO solicitudes (Estado: PENDIENTE, Codigo: SOL-2026-XXXX)
    API-->>Sol: Retorna 201 Created (Comprobante y Código de Trámite)

    %% Asignación
    Note over Sup, Dis: Paso 2: Revisión y Asignación Creativa
    Sup->>UI: Ingresa al panel y revisa solicitud PENDIENTE
    Sup->>API: PATCH /api/solicitudes/{id}/asignar (disenador_id, prioridad)
    API->>DB: UPDATE solicitudes SET estado = 'EN_REVISION', disenador_id = X
    API-->>Dis: Notificación de nueva tarea asignada

    %% Proceso de Diseño
    Note over Dis, S3: Paso 3: Elaboración de la Pieza Gráfica
    Dis->>UI: Cambia estado a 'DISENO_PROCESO'
    Dis->>S3: Descarga logos institucionales y brief
    Dis->>UI: Sube propuesta de diseño preliminar (boceto v1)
    UI->>API: POST /api/solicitudes/{id}/entregables (archivo_previo)
    API->>DB: UPDATE estado = 'EN_REVISION'

    %% Control de Cambios
    Note over Sol, Dis: Paso 4: Control de Modificaciones (Máx 2 Rondas)
    Sol->>UI: Revisa boceto v1 y detecta observaciones
    Sol->>UI: Envía Solicitud de Cambio (Ronda 1 de 2) con justificación
    UI->>API: POST /api/solicitudes/{id}/cambios (ronda: 1, obs: "Ajustar tipografía...")
    API->>DB: Registra cambio y verifica ronda <= 2
    API->>DB: UPDATE estado = 'AJUSTES'
    Dis->>UI: Atiende observaciones y sube boceto corregido v2
    API->>DB: UPDATE estado = 'EN_REVISION'

    %% Aprobación Final
    Note over Sol, Sup: Paso 5: Aprobación y Finalización
    Sol->>UI: Otorga visto bueno final (Aprobado)
    Sup->>UI: Visto bueno de supervisión DICOM
    Dis->>UI: Sube entregable final de alta resolución (PDF prensa, PNG alta)
    API->>DB: UPDATE estado = 'FINALIZADO', fecha_finalizado = NOW()
    API-->>Sol: Enlace seguro de descarga de arte institucional oficial
```

---

## 3. DIAGRAMA DE MÁQUINA DE ESTADOS (STATE MACHINE)

```mermaid
stateDiagram-v2
    [*] --> PENDIENTE : Solicitud enviada por solicitante
    
    PENDIENTE --> EN_REVISION : Supervisor valida brief y asigna diseñador
    PENDIENTE --> RECHAZADA : Insumos insuficientes / rechazo formal con observación
    
    EN_REVISION --> DISENO_EN_PROCESO : Diseñador inicia elaboración
    
    DISENO_EN_PROCESO --> EN_EVALUACION : Diseñador publica propuesta/avance
    
    EN_EVALUACION --> AJUSTES_R1 : Solicitante solicita cambios (Ronda 1)
    AJUSTES_R1 --> DISENO_EN_PROCESO : Diseñador aplica correcciones R1
    
    EN_EVALUACION --> AJUSTES_R2 : Solicitante solicita cambios (Ronda 2 - Última permitida)
    AJUSTES_R2 --> DISENO_EN_PROCESO : Diseñador aplica correcciones R2
    
    EN_EVALUACION --> APROBADO : Solicitante y Supervisor otorgan visto bueno
    
    APROBADO --> FINALIZADO : Diseñador sube artes finales y se archiva
    FINALIZADO --> [*]
    RECHAZADA --> [*]
```

---

## 4. DIAGRAMA DE DESPLIEGUE EN SERVIDOR UBUNTU

```mermaid
graph TB
    subgraph Internet["Red Municipal / Internet"]
        UserDevice["Dispositivo de Usuario (Chrome / Firefox / Edge / Safari)"]
    end

    subgraph LinuxHost["Servidor Ubuntu 24.04 LTS (Centro de Datos GAMEA)"]
        subgraph Ports["Puertos Expuestos"]
            P443["Puerto 443 (HTTPS)"]
            P80["Puerto 80 (HTTP -> Redirige 443)"]
        end

        subgraph DockerEngine["Docker Compose Ecosystem"]
            NginxCont["Contenedor: nginx:alpine<br/>Reverse Proxy, SSL Termination, Headers"]
            AppCont["Contenedor: comunica-api (Node.js 20 LTS)<br/>Express API REST + Front Assets"]
            PostgresCont["Contenedor: postgres:16-alpine<br/>Puerto 5432 (Solo red interna Docker)"]
            MinioCont["Contenedor: minio/minio<br/>Puerto 9000 (S3 API interna)"]
            RedisCont["Contenedor: redis:7-alpine<br/>Puerto 6379 (Rate limiting & Cache)"]
        end

        subgraph StorageHost["Volúmenes Persistentes en Disco"]
            VolDB["/var/lib/docker/volumes/gamea_pgdata"]
            VolS3["/var/lib/docker/volumes/gamea_miniodata"]
            VolCerts["/etc/letsencrypt"]
        end
    end

    UserDevice -->|HTTPS| P443
    P443 --> NginxCont
    NginxCont -->|upstream app:3000| AppCont
    AppCont --> PostgresCont
    AppCont --> MinioCont
    AppCont --> RedisCont

    PostgresCont --- VolDB
    MinioCont --- VolS3
    NginxCont --- VolCerts
```
