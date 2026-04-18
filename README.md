# Universidad del Sur - Portal Seguro HTTPS

Aplicación web desarrollada con Node.js y Express para implementar un portal de acceso seguro con HTTPS, certificado SSL auto-firmado y autenticación mediante JWT.

## Instalación

1. Clonar el repositorio.
2. Entrar a la carpeta del proyecto.
3. Ejecutar `npm install`.
4. Crear el archivo `.env` en la raíz del proyecto.
5. Generar los certificados SSL dentro de la carpeta `certs`.

## Archivo .env

Crear un archivo `.env` en la raíz del proyecto con esta estructura:

```env
PORT=8080
JWTSECRET=misma clave acordada por el equipo
JWTEXPIRESIN=1h
```

## Ejecución

Para iniciar el proyecto:

```bash
npm start
```

Para iniciar el proyecto en modo desarrollo:

```bash
npm run dev
```

## Acceso

Abrir en el navegador:

```text
https://localhost:8080
```

## Usuarios de prueba

- `usuario1 / contraseña1`
- `usuario2 / contraseña2`

## Estructura del proyecto

```text
universidad-del-sur/
├── certs/
├── data/
│   └── users.js
├── middleware/
├── public/
├── routes/
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```