const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController'); // Import du contrôleur

// Route pour afficher la liste des patients
router.get('/', patientController.getAllPatients); // Utilisation du contrôleur

// Route pour ajouter un nouveau patient
router.post('/ajouter', patientController.addPatient);

// Route pour afficher le formulaire de modification d'un patient
router.get('/modifier/:id', patientController.getPatientById);

// Route pour mettre à jour les informations d'un patient
router.post('/modifier/:id', patientController.updatePatient);

// Route pour supprimer un patient
router.post('/supprimer/:id', patientController.deletePatient);

module.exports = router;
