// ====================================
// routes/auth.js
// Rutas de autenticación: login y logout
// ====================================

const express = require('express');
const jwt = require('jsonwebtoken');
const usuarios = require('../data/users');

const router = express.Router();

// ------------------ POST /auth/login -------------
router.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    // 1. Validar que vengan los campos
    if (!usuario || !password) {
        return res.status(400).json({
            error: 'Usuario y contraseña son obligatorios'
        });
    }

    // 2. Buscar el usuario
    const user = usuarios.find(
        u => u.usuario === usuario && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generar token JWT
    const token = jwt.sign(
        { id: user.id, usuario: user.usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // 4. Guardar cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    // 5. Respuesta
    res.json({
        mensaje: 'Login exitoso',
        usuario: user.usuario
    });
});

// ------------------ POST /auth/logout -------------
router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({ mensaje: 'Sesión cerrada correctamente' });
});

module.exports = router;