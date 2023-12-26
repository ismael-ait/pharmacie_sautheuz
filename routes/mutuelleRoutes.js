const express = require('express');
const router = express.Router();
const mutuelleController = require('../controllers/mutuelleController'); // Import du contrôleur

// Route pour afficher la liste des mutuelles
router.get('/', mutuelleController.getAllMutuelles); // Utilisation du contrôleur

// Route pour ajouter une nouvelle mutuelle
router.post('/ajouter', mutuelleController.addMutuelle);

// Route pour afficher le formulaire de modification d'une mutuelle
router.get('/modifier/:id', mutuelleController.getMutuelleById);

// Route pour mettre à jour les informations d'une mutuelle
router.post('/modifier/:id', mutuelleController.updateMutuelle);

// Route pour supprimer une mutuelle
router.post('/supprimer/:id', mutuelleController.deleteMutuelle);

module.exports = router;
