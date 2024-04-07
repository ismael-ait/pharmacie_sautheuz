const Mutuelle = require('../models/mutuelle');
const validationUtils = require('./validationUtils');

const mutuelleController = {
  getAllMutuelles: (req, res) => {
    Mutuelle.getAllMutuelles((err, mutuelles) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.render('mutuelles', { mutuelles });
      }
    });
  },

  addMutuelle: (req, res) => {
    const { nom, taux } = req.body;
    const newMutuelle = { Mutuelle_Nom: nom, Mutuelle_Taux: taux };
    let errors = [];
    let mutuelles = []; // Déclaration d'une variable mutuelles pour la transmission

    // Récupération de la liste des mutuelles même en cas d'erreur
    Mutuelle.getAllMutuelles((err, mutuellesList) => {
      if (mutuellesList) {
        mutuelles = mutuellesList;
      }

      // Validation du nom de la mutuelle en utilisant la fonction validateName existante
      if (!validationUtils.validateName(nom)) {
        errors.push('Le nom de la mutuelle saisi est invalide.');
      }

      if (errors.length > 0) {
        // En cas d'erreurs, renvoyer vers la vue avec les erreurs et la liste des mutuelles
        res.render('mutuelles', { mutuelles, errors });
      } else {
        Mutuelle.addMutuelle(newMutuelle, (err) => {
          if (err) {
            res.status(500).send('Erreur lors de l\'ajout de la mutuelle');
          } else {
            res.redirect('/pharmacie/mutuelles');
          }
        });
      }
    });
  },


  getMutuelleById: (req, res) => {
    const mutuelleId = req.params.id;

    Mutuelle.getMutuelleById(mutuelleId, (err, mutuelle) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.render('modifierMutuelle', { mutuelle });
      }
    });
  },

  updateMutuelle: (req, res) => {
    const mutuelleId = req.params.id;
    const { nom, taux } = req.body;
    const updatedMutuelle = { Mutuelle_Nom: nom, Mutuelle_Taux: taux };
    let errors = [];
    let mutuelle = {}; // Déclaration d'une variable mutuelle pour la transmission

    // Récupération de la mutuelle à modifier
    Mutuelle.getMutuelleById(mutuelleId, (err, retrievedMutuelle) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        mutuelle = retrievedMutuelle;

        // Validation du nom de la mutuelle en utilisant la fonction validateName existante
        if (!validationUtils.validateName(nom)) {
          errors.push('Le nom de la mutuelle saisi est invalide.');
        }

        if (errors.length > 0) {
          // En cas d'erreurs, renvoyer vers la vue avec les erreurs et la mutuelle à modifier
          res.render('modifierMutuelle', { mutuelle, errors });
        } else {
          Mutuelle.updateMutuelle(mutuelleId, updatedMutuelle, (err) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.redirect('/pharmacie/mutuelles');
            }
          });
        }
      }
    });
  },
  deleteMutuelle: (req, res) => {
    const mutuelleId = req.params.id;

    Mutuelle.deleteMutuelle(mutuelleId, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.redirect('/pharmacie/mutuelles');
      }
    });
  }
};

module.exports = mutuelleController;
