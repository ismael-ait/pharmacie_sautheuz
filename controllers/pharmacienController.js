const Pharmacien = require('../models/pharmacien');
const validationUtils = require('./validationUtils'); 

const pharmacienController = {
  getAllPharmaciens: (req, res) => {
    Pharmacien.getAllPharmaciens((error, results) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des pharmaciens');
      } else {
        res.render('pharmaciens', { pharmaciens: results });
      }
    });
  },

  addPharmacien: (req, res) => {
    const { nom, prenom, nomUtilisateur, motDePasse } = req.body;
   
    let errors = [];

    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    if (!validationUtils.validateName(prenom)) {
      errors.push('Le prénom saisi est invalide.');
    }

    if (errors.length > 0) {

      Pharmacien.getAllPharmaciens((error, results) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération des pharmaciens');
        } else {
          res.render('pharmaciens', {
            pharmaciens: results,
            errors: errors // 
          });
        }
      });
    } else {
      const newPharmacien = {
        Pharmacien_Nom: nom,
        Pharmacien_Prenom: prenom,
        Pharmacien_NomUtilisateur: nomUtilisateur,
        Pharmacien_MotDePasse: motDePasse
      };
  
      Pharmacien.addPharmacien(newPharmacien, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de l\'ajout du pharmacien');
        } else {
          res.redirect('/pharmacie/pharmaciens'); // Redirige après l'ajout
        }
      });
    }
  },
  
  getPharmacienById: (req, res) => {
    const pharmacienId = req.params.id;

    Pharmacien.getPharmacienById(pharmacienId, (error, pharmacien) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération du pharmacien');
      } else {
        res.render('modifierPharmacien', { pharmacien: pharmacien });
      }
    });
  },
  updatePharmacien: (req, res) => {
    const pharmacienId = req.params.id;
    const { nom, prenom, nomUtilisateur, motDePasse } = req.body;
    let errors = [];

    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    if (!validationUtils.validateName(prenom)) {
      errors.push('Le prénom saisi est invalide.');
    }

    if (errors.length > 0) {
      Pharmacien.getPharmacienById(pharmacienId, (error, pharmacien) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération du pharmacien');
        } else {
          res.render('modifierPharmacien', {
            pharmacien: pharmacien,
            errors: errors // Afficher les erreurs dans le template
          });
        }
      });
    } else {
      const updatedPharmacien = {
        Pharmacien_Nom: nom,
        Pharmacien_Prenom: prenom,
        Pharmacien_NomUtilisateur: nomUtilisateur,
        Pharmacien_MotDePasse: motDePasse
      };

      Pharmacien.updatePharmacien(pharmacienId, updatedPharmacien, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de la mise à jour du pharmacien');
        } else {
          res.redirect('/pharmacie/pharmaciens'); // Redirige après la mise à jour
        }
      });
    }
  },


  deletePharmacien: (req, res) => {
    const pharmacienId = req.params.id;

    Pharmacien.deletePharmacien(pharmacienId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression du pharmacien');
      } else {
        res.redirect('/pharmacie/pharmaciens'); // Redirige après la suppression
      }
    });
  }
};
  


module.exports = pharmacienController;
