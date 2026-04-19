// ============================================
// server.js - Servidor HTTPS Universidad del Sur
// ============================================
 
// Cargar variables de entorno desde .env
require('dotenv').config();
 
// Modulos nativos de Node.js
const https = require('https');   // Para crear servidor HTTPS
const fs = require('fs');         // Para leer los archivos de certificado
const path = require('path');     // Para manejar rutas de archivos
 
// Modulos de terceros
const express = require('express');
const cookieParser = require('cookie-parser');
 
// Importamos las rutas (las crearan los integrantes 3 y 4)
const authRoutes = require('./routes/auth');
const portalRoutes = require('./routes/portal');
 
// Crear la aplicacion Express
const app = express();
 
// ---------- MIDDLEWARES GLOBALES ----------
app.use(express.json());                         // Parsea JSON en el body
app.use(express.urlencoded({ extended: true })); // Parsea formularios HTML
app.use(cookieParser());                         // Permite leer req.cookies
app.use(express.static(path.join(__dirname, 'public'))); // Sirve login.html
 
// ---------- RUTAS ----------
app.use('/auth', authRoutes);   // /auth/login y /auth/logout
app.use('/', portalRoutes);     // /mi-portal (protegida)
 
// Ruta raiz redirige al login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
 
// ---------- CARGAR CERTIFICADOS SSL ----------
const opcionesHTTPS = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};
 
// ---------- INICIAR SERVIDOR HTTPS ----------
const PORT = process.env.PORT || 8080;
 
https.createServer(opcionesHTTPS, app).listen(PORT, () => {
  console.log('========================================');
  console.log('Servidor HTTPS Universidad del Sur');
  console.log('Corriendo en: https://localhost:' + PORT);
  console.log('========================================');
});
