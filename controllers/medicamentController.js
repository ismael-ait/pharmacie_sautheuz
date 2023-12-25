const Medicament = require('../models/medicament');
const validationUtils = require('./validationUtils'); // Chemin vers votre fichier de fonctions de validation

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
    let errors = [];

    // Validation du nom du médicament
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    // Autres validations ici si nécessaire...

    if (errors.length > 0) {
      // Gestion des erreurs - rediriger vers la vue des médicaments avec les erreurs
      Medicament.getAllMedicaments((error, results) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération des médicaments');
        } else {
          res.render('medicaments', {
            medicaments: results,
            errors: errors // Envoyer le tableau d'erreurs à la vue
          });
        }
      });
    } else {
      // Ajout du médicament si la validation est réussie
      const newMedicament = {
        Medicament_Nom: nom,
        Medicament_Stock: stock,
        Medicament_Prix: prix
      };

      Medicament.addMedicament(newMedicament, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de l\'ajout du médicament');
        } else {
          res.redirect('/medicaments'); // Rediriger après l'ajout
        }
      });
    }
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
