const express = require('express');
const router = express.Router();
const posologieController = require('../controllers/posologieController');

// GET - Afficher toutes les posologies
router.get('/posologies', posologieController.getAllPosologies);

// POST - Ajouter une posologie
router.post('/posologies/ajouter', posologieController.addPosologie);


module.exports = router;
