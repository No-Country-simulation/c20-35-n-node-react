# **NestJS, TypeORM, PostgreSQL (Neon) y JWT**

El objetivo es proporcionar una solución robusta y escalable, que incluya el registro de usuarios, inicio de sesión y rutas protegidas utilizando JWT para autenticación sin estado.

## **Tabla de Contenidos**

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Ejecutando la Aplicación](#ejecutando-la-aplicación)
- [Puntos de Acceso API](#puntos-de-acceso-api)
- [Validación](#validación)
- [Manejo de Errores](#manejo-de-errores)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## **Características**

- Registro e inicio de sesión de usuarios con encriptación de contraseñas utilizando bcrypt.
- Autenticación segura con JWT, incluyendo la generación y validación de tokens.
- Protección de rutas basada en roles usando guards de NestJS.
- Interacción directa con la base de datos Neon usando consultas SQL.
- Validación de entrada usando `class-validator` y `class-transformer`.
- Manejo detallado de errores y respuestas JSON para todos los casos de error.
- Interacción con la base de datos Neon a través de TypeORM, un Object-Relational Mapper (ORM) que simplifica la gestión de bases de datos y la ejecución de consultas.

## **Tecnologías Utilizadas**

- **NestJS**: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes, confiables y escalables.
- **Neon**: Una base de datos PostgreSQL sin servidor que ofrece alta escalabilidad y fácil ramificación para el desarrollo.
- **TypeORM**: Un Object-Relational Mapper (ORM) para TypeScript y JavaScript que simplifica las interacciones con la base de datos y la gestión de esquemas.
- **JWT**: Utilizado para autenticación segura sin estado.
- **Class-Validator & Class-Transformer**: Para validar y transformar solicitudes entrantes.
- **Bcrypt**: Para encriptación segura de contraseñas.

### **Requisitos Previos**

Asegúrate de tener lo siguiente instalado en tu entorno de desarrollo local:

- Node.js (v20 o posterior)
- npm (v9 o posterior)
- Cuenta de Neon para acceso a la base de datos

### **Instalación**

**Variables de Entorno**

Crea un archivo `.env` en el directorio raíz y configura las siguientes variables de entorno:

- **DATABASE_URL**: Tu cadena de conexión a la base de datos Neon.
- **JWT_SECRET**: Una clave secreta para firmar los JWT. Asegúrate de mantenerla segura.

### Configuración de la Base de Datos

TypeORM creará automáticamente las tablas necesarias según las entidades definidas en el proyecto.

1. Asegúrate de que la opción `synchronize` en la configuración de TypeORM esté establecida en `true` para la sincronización automática del esquema (recomendado solo para entornos de desarrollo).

2. Si usas migraciones para entornos de producción, ejecuta el comando de migración:

```bash
npm run typeorm migration:run
```

Asegúrate de que la tabla exista y sea accesible en tu base de datos Neon.

## Ejecutando la Aplicación

### 1. Iniciar la Aplicación

Inicia la aplicación usando:

```
npm run start
```

### 2. Acceder a la Aplicación

La aplicación estará ejecutándose en `http://localhost:3000`.

## Puntos de Acceso API

### Registro de Usuario

- **URL**: `/auth/register`
- **Método**: `POST`
- **Cuerpo**:

```
json { "username": "tu_usuario", "password": "tu_contraseña" }
```

- **Descripción**: Registra un nuevo usuario con un nombre de usuario y contraseña.

### Inicio de Sesión de Usuario

- **URL**: `/auth/login`
- **Método**: `POST`
- **Cuerpo**:

```
json { "username": "tu_usuario", "password": "tu_contraseña" }
```

- **Descripción**: Autentica a un usuario y devuelve un token de acceso JWT.

### Ruta Protegida

- **URL**: `/auth/profile`
- **Método**: `GET`
- **Encabezados**:
  - `Authorization: Bearer <token>`
- **Descripción**: Accede a contenido protegido. Requiere un JWT válido.

## Validación

- **DTOs**: Los Data Transfer Objects se utilizan para definir la estructura y las reglas de validación de las solicitudes entrantes.
- **Validation Pipe**: Garantiza que los datos entrantes cumplan con las reglas definidas utilizando decoradores de `class-validator` como `@IsString()`, `@IsNotEmpty()`, y otros.

## Manejo de Errores

- **Respuestas de Error Estructuradas**: Usa `HttpException` de NestJS para estandarizar las respuestas de error, incluyendo códigos de estado HTTP adecuados y mensajes de error.
- **Registro de Logs**: Registra errores inesperados para facilitar la depuración y el monitoreo.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, haz un fork del repositorio y envía un pull request para cualquier mejora o nueva característica.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.