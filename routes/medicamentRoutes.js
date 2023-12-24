const express = require('express');
const router = express.Router();
const medicamentController = require('../controllers/medicamentController');

router.get('/', medicamentController.getAllMedicaments);
router.post('/ajouter', medicamentController.addMedicament);

// Route pour la modification du médicament
router.get('/modifier/:id', medicamentController.getMedicamentById);
router.post('/modifier/:id', medicamentController.updateMedicament);

router.post('/supprimer/:id', medicamentController.deleteMedicament);

module.exports = router;
