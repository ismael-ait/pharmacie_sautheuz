const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

// Route pour afficher la liste des médecins
router.get('/', medecinController.getAllMedecins);

module.exports = router;
