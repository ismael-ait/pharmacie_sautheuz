const Medicament = require('../models/medicament');

const medicamentController = {
  getAllMedicaments: (req, res) => {
    Medicament.getAllMedicaments((error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des médicaments');
      } else {
        res.render('medicaments', { medicaments: results });
      }
    });
  },

 

  addMedicament: (req, res) => {
    const { nom, stock, prix } = req.body;
    const newMedicament = {
      Medicament_Nom: nom,
      Medicament_Stock: stock,
      Medicament_Prix: prix
    };

    Medicament.addMedicament(newMedicament, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de l\'ajout du médicament');
      } else {
        res.redirect('/medicaments'); // Redirige après l'ajout
      }
    });
  },
  
  getMedicamentById: (req, res) => {
    const medicamentId = req.params.id;

    Medicament.getMedicamentById(medicamentId, (error, medicament) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération du médicament');
      } else {
        res.render('modifierMedicament', { medicament: medicament });
      }
    });
  },
  
  updateMedicament: (req, res) => {
    const medicamentId = req.params.id;
    const { nom, stock, prix } = req.body;
    const updatedMedicament = {
      Medicament_Nom: nom,
      Medicament_Stock: stock,
      Medicament_Prix: prix
    };

    Medicament.updateMedicament(medicamentId, updatedMedicament, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la mise à jour du médicament');
      } else {
        res.redirect('/medicaments'); // Redirige après la mise à jour
      }
    });
  },

  deleteMedicament: (req, res) => {
    const medicamentId = req.params.id;

    Medicament.deleteMedicament(medicamentId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression du médicament');
      } else {
        res.redirect('/medicaments'); // Redirige après la suppression
      }
    });
  }
};

module.exports = medicamentController;
