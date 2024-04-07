const Medecin = require('../models/medecin');
const validationUtils = require('./validationUtils'); // Chemin vers votre fichier de fonctions de validation

const medecinController = {
  getAllMedecins: (req, res) => {
    Medecin.getAllMedecins((error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des médecins');
      } else {
        res.render('medecins', { medecins: results });
      }
    });
  },


  addMedecin: (req, res) => {
    const { nom, prenom, numeroTelephone } = req.body;
    let errors = [];

    // Validation du numéro de téléphone
    if (!validationUtils.validatePhoneNumber(numeroTelephone)) {
      errors.push('Le numéro de téléphone doit contenir 10 chiffres et commencer par 06 ou 07.');
    }

    // Validation du nom
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    // Validation du prénom
    if (!validationUtils.validateName(prenom)) {
      errors.push('Le prénom saisi est invalide.');
    }

    if (errors.length > 0) {
      Medecin.getAllMedecins((error, results) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération des médecins');
        } else {
          res.render('medecins', {
            medecins: results,
            errors: errors // Afficher les erreurs dans le template
          });
        }
      });
    } else {
      // Suite du code pour l'ajout du médecin si la validation est réussie
      const newMedecin = {
        Medecin_Nom: nom,
        Medecin_Prenom: prenom,
        Medecin_NumeroTelephone: numeroTelephone
      };

      Medecin.addMedecin(newMedecin, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de l\'ajout du médecin');
        } else {
          res.redirect('/pharmacie/medecins'); // Redirige après l'ajout
        }
      });
    }
  },
  
  getMedecinById: (req, res) => {
    const medecinId = req.params.id;

    Medecin.getMedecinById(medecinId, (error, medecin) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération du médecin');
      } else {
        res.render('modifierMedecin', { medecin: medecin });
      }
    });
  },
  updateMedecin: (req, res) => {
    const medecinId = req.params.id;
    const { nom, prenom, numeroTelephone } = req.body;
    let errors = [];

    // Validation du numéro de téléphone
    if (!validationUtils.validatePhoneNumber(numeroTelephone)) {
      errors.push('Le numéro de téléphone doit contenir 10 chiffres et commencer par 06 ou 07.');
    }

    // Validation du nom
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    // Validation du prénom
    if (!validationUtils.validateName(prenom)) {
      errors.push('Le prénom saisi est invalide.');
    }

    if (errors.length > 0) {
      Medecin.getMedecinById(medecinId, (error, medecin) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération du médecin');
        } else {
          res.render('modifierMedecin', {
            medecin: medecin,
            errors: errors // Afficher les erreurs dans le template
          });
        }
      });
    } else {
      const updatedMedecin = {
        Medecin_Nom: nom,
        Medecin_Prenom: prenom,
        Medecin_NumeroTelephone: numeroTelephone
      };

      Medecin.updateMedecin(medecinId, updatedMedecin, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de la mise à jour du médecin');
        } else {
          res.redirect('/pharmacie/medecins'); // Redirige après la mise à jour
        }
      });
    }
  },

  deleteMedecin: (req, res) => {
    const medecinId = req.params.id;

    Medecin.deleteMedecin(medecinId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression du médecin');
      } else {
        res.redirect('/pharmacie/medecins'); // Redirige après la suppression
      }
    });
  }
};
  


module.exports = medecinController;
