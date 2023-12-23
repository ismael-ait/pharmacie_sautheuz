const express = require('express');
const router = express.Router();
const ordonnanceController = require('../controllers/ordonnanceController');

router.get('/', ordonnanceController.getAllOrdonnances);
router.get('/ajouter', ordonnanceController.addOrdonnanceForm);
router.post('/ajouter', ordonnanceController.addOrdonnance);

// Route pour la modification de l'ordonnance
router.get('/modifier/:id', ordonnanceController.getOrdonnanceById);
router.post('/modifier/:id', ordonnanceController.updateOrdonnance);

router.post('/supprimer/:id', ordonnanceController.deleteOrdonnance);

module.exports = router;
