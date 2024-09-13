# API Documentation

## 1. Registro de Usuario
- **Método**: `POST`
- **URL**: `/api/v1/auth/register`
- **Descripción**: Este endpoint permite registrar un nuevo usuario en la plataforma. Recibe varios datos personales, incluyendo los campos opcionales para perfil de fitness.
- **Parámetros del cuerpo (JSON)**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "height": 180,             // (opcional) Altura en cm
    "weight": 75,              // (opcional) Peso en kg
    "age": 30,                 // (opcional) Edad
    "activityLevel": "active",// (opcional) Nivel de actividad física
    "goal": "lose weight"      // (opcional) Meta de fitness
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```
- **Posibles errores**:
  - `400 Bad Request`: Si el usuario ya existe o si alguno de los campos obligatorios no es válido.
  - `500 Internal Server Error`: Si ocurre un error interno durante la creación del usuario.

## 2. Inicio de Sesión de Usuario
- **Método**: `POST`
- **URL**: `/api/v1/auth/login`
- **Descripción**: Este endpoint autentica a un usuario existente utilizando su correo electrónico y contraseña. Devuelve un token JWT para usar en rutas protegidas.
- **Parámetros del cuerpo (JSON)**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "password123"
  }
  ```
- **Respuesta exitosa (200)**:
  ```json
  {
    "token": "jwt_token_here",
    "email": "johndoe@example.com"
  }
  ```
- **Posibles errores**:
  - `401 Unauthorized`: Si el correo electrónico o la contraseña no son válidos.
  - `500 Internal Server Error`: Si ocurre un error durante el proceso de autenticación.

## 3. Perfil de Usuario
- **Método**: `GET`
- **URL**: `/api/v1/auth/profile`
- **Descripción**: Este endpoint permite al usuario autenticado acceder a su perfil de usuario. Se requiere un token JWT en el encabezado.
- **Encabezados**:
  - `Authorization: Bearer <token>`
- **Respuesta exitosa (200)**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "height": 180,
    "weight": 75,
    "age": 30,
    "activityLevel": "active",
    "goal": "lose weight"
  }
  ```
- **Posibles errores**:
  - `401 Unauthorized`: Si el token JWT no es válido o ha expirado.
  - `500 Internal Server Error`: Si ocurre un error al recuperar el perfil del usuario.

## Notas adicionales
1. **Autorización**: 
   - Todos los endpoints relacionados con el perfil requieren autorización mediante un token JWT válido que se envía en los encabezados HTTP con el formato `Bearer <token>`.

2. **Validaciones**:
   - Se utiliza `class-validator` para validar los datos de entrada. Por ejemplo, el correo debe ser un formato válido, y la contraseña debe tener al menos 6 caracteres.

## Formato de Respuesta para Errores
Todos los endpoints manejan errores con respuestas JSON estandarizadas que incluyen un código de estado HTTP y un mensaje descriptivo del error.

- **Formato de error**:
  ```json
  {
    "statusCode": 400,
    "message": "User already exists",
    "error": "Bad Request"
  }
  ```
