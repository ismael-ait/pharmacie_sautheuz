const Patient = require('../models/patient');

const patientController = {
  getAllPatients: (req, res) => {
    Patient.getAllPatients((error, patients) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des patients');
      } else {
        res.render('patients', { patients: patients }); // Utilisation de res.render pour rendre la vue
      }
    });
  }
  // Autres méthodes du contrôleur Patient si nécessaire...
};

module.exports = patientController;
