const express = require('express');
const router = express.Router();
const pharmacienController = require('../controllers/pharmacienController');

router.get('/', pharmacienController.getAllPharmaciens);
router.get('/ajouter', pharmacienController.addPharmacienForm);
router.post('/ajouter', pharmacienController.addPharmacien);

// Route pour la modification du médecin
router.get('/modifier/:id', pharmacienController.getPharmacienById);
router.post('/modifier/:id', pharmacienController.updatePharmacien);

router.post('/supprimer/:id', pharmacienController.deletePharmacien);

module.exports = router;
