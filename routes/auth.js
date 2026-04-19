const express = require('express');
const router = express.Router();

// TODO: implementar por integrantes 3 y 4
router.post('/login', (req, res) => res.status(501).json({ message: 'Not implemented' }));
router.post('/logout', (req, res) => res.status(501).json({ message: 'Not implemented' }));

module.exports = router;
