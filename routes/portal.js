const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const usuarios = require('../data/users'); 

const router = express.Router();

router.get('/mi-portal', verifyToken, (req, res) => {

  const estudiante = usuarios.find(u => u.id === req.usuario.id);

  if (!estudiante) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json({
    mensaje: 'Acceso autorizado',
    usuario: estudiante.usuario
  });

});

module.exports = router;