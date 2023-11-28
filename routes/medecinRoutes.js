const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

router.get('/', medecinController.getAllMedecins);
router.get('/ajouter', medecinController.addMedecinForm);
router.post('/ajouter', medecinController.addMedecin);

// Route pour la modification du médecin
router.get('/modifier/:id', medecinController.getMedecinById);
router.post('/modifier/:id', medecinController.updateMedecin);

router.post('/supprimer/:id', medecinController.deleteMedecin);

module.exports = router;
