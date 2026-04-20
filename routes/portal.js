const express = require('express');
const path = require('path');
const verifyToken = require('../middleware/verifyToken');
const usuarios = require('../data/users');

const router = express.Router();

// GET /mi-portal → sirve la página del portal (requiere token)
router.get('/mi-portal', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'portal.html'));
});

// GET /mi-portal/datos → devuelve JSON con datos del estudiante (requiere token)
router.get('/mi-portal/datos', verifyToken, (req, res) => {
  const estudiante = usuarios.find(u => u.id === req.usuario.id);

  if (!estudiante) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { password, ...datosSeguros } = estudiante;
  res.json({ estudiante: datosSeguros });
});

module.exports = router;