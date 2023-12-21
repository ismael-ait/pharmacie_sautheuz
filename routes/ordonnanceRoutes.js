const express = require('express');
const router = express.Router();
const ordonnanceController = require('../controllers/ordonnanceController');

router.get('/', ordonnanceController.getAllOrdonnances);
// Ajouter les autres routes pour l'ajout, la modification, la suppression d'ordonnances

module.exports = router;
