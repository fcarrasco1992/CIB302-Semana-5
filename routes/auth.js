// ====================================
// routes/auth.js
// Rutas de autenticacion: login y logout
// ====================================

const express = require('express');
const jwt = require('jsonwebtoken');
const usuarios = require('../data/usuarios');

const router = express.Router();

// ------------------ POST /auth/login -------------
router.post('/login',(req,res) => {
    const { usuario, password } = req.body;

    // 1. Validar que vengan los capos
    if (!usuario || !password) {
        return res.status(400).json({
            error: 'Usuario y contrasena son obligatorios'
        });
    }

    // 2. Buscar el usuario en nuestra base de datos
    const user = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    if (!user) {
        return res.status(401).json({error: 'Credenciales invalidas'});
    }

    // 3. Generar el token JWT firmado con la clave secreta del .env
    // El payload lleva datos NO sensibles (id y usuario)
    const token = jwt.sign(
        {id: user.id, usuario: user.usuario},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '1h'}
    );

    // 4. Guardar el token en una cookie httpOnly (protegida ante XSS)
    res.cookie('token',token, {
        httpOnly: true,         // El JS del navegador NO puede leerla (mitiga XSS)
        secure: true,           // Solo se envia por HTTPS
        samesite: 'strict',     // Mitiga CSRF
        maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
    });

    // 5. Responder OK
    res.json({
        mensaje: 'Login exitoso',
        usuario: user.usuario
    });
});