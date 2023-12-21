const Ordonnance = require('../models/ordonnance');

const ordonnanceController = {
  getAllOrdonnances: (req, res) => {
    Ordonnance.getAllOrdonnances((error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des ordonnances');
      } else {
        res.render('ordonnances', { ordonnances: results });
      }
    });
  },
  // ... autres fonctions pour gérer l'ajout, la modification et la suppression des ordonnances
};

module.exports = ordonnanceController;
