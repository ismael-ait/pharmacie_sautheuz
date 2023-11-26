const Medecin = require('../models/medecin');

const medecinController = {
  getAllMedecins: (req, res) => {
    Medecin.getAllMedecins((error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des médecins');
      } else {
        res.render('medecins', { medecins: results });
      }
    });
  }
  // Autres méthodes du contrôleur Medecin si nécessaire...
};

module.exports = medecinController;
