const express = require('express');
const router = express.Router();
const pathologieController = require('../controllers/pathologieController'); // Import du contrôleur

// Route pour afficher la liste des pathologies
router.get('/', pathologieController.getAllPathologies); // Utilisation du contrôleur


// Route pour ajouter une nouvelle pathologie
router.post('/ajouter', pathologieController.addPathologie);

// Route pour afficher le formulaire de modification d'une pathologie
router.get('/modifier/:id', pathologieController.getPathologieById);

// Route pour mettre à jour les informations d'une pathologie
router.post('/modifier/:id', pathologieController.updatePathologie);

// Route pour supprimer une pathologie
router.post('/supprimer/:id', pathologieController.deletePathologie);

module.exports = router;
