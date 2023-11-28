const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

router.get('/', medecinController.getAllMedecins);
router.get('/ajouter', medecinController.addMedecinForm);
router.post('/ajouter', medecinController.addMedecin);

module.exports = router;
