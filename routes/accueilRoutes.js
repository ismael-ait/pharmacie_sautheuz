const express = require('express');
const router = express.Router();
const Accueil = require('../controllers/accueilController');


router.get('/', Accueil.getAllMedicaments); // Utilisation du contrôleur
router.get('/getDiagram', Accueil.getDiagram);



module.exports = router;
