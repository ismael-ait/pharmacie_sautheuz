const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController'); // Import du contrôleur

// Route pour afficher la liste des patients
router.get('/', patientController.getAllPatients); // Utilisation du contrôleur

module.exports = router;
