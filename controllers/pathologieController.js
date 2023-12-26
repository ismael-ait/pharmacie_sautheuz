const Pathologie = require('../models/pathologie');
const validationUtils = require('./validationUtils');

const pathologieController = {
  getAllPathologies: (req, res) => {
    Pathologie.getAllPathologies((error, pathologies) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des pathologies');
      } else {
        res.render('pathologies', { pathologies });
      }
    });
  },

  getPathologieById: (req, res) => {
    const pathologieId = req.params.id;

    Pathologie.getPathologieById(pathologieId, (error, pathologie) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération de la pathologie');
      } else {
        res.render('modifierPathologie', { pathologie });
      }
    });
  },

  addPathologie: (req, res) => {
    const { nom } = req.body;
    const newPathologie = {
      Maladie_Nom: nom
    };
    let errors = [];

    // Validation du nom de la pathologie en utilisant la fonction validateName existante
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom de la pathologie saisi est invalide.');
    }

    if (errors.length > 0) {
      // En cas d'erreurs, renvoyer vers la vue avec les erreurs et la liste des pathologies
      Pathologie.getAllPathologies((error, pathologies) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération des pathologies');
        } else {
          res.render('pathologies', { pathologies, errors });
        }
      });
    } else {
      Pathologie.addPathologie(newPathologie, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de l\'ajout de la pathologie');
        } else {
          res.redirect('/pathologies'); // Redirection après l'ajout
        }
      });
    }
  },

  updatePathologie: (req, res) => {
    const pathologieId = req.params.id;
    const { nom } = req.body;
    const updatedPathologie = {
      Maladie_Nom: nom
    };
    let errors = [];
  
    // Validation du nom de la pathologie en utilisant la fonction validateName existante
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom de la pathologie saisi est invalide.');
    }
  
    if (errors.length > 0) {
      // En cas d'erreurs, renvoyer vers la vue avec les erreurs et la pathologie à modifier
      Pathologie.getPathologieById(pathologieId, (error, pathologie) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération de la pathologie');
        } else {
          res.render('modifierPathologie', { pathologie, errors });
        }
      });
    } else {
      Pathologie.updatePathologie(pathologieId, updatedPathologie, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de la mise à jour de la pathologie');
        } else {
          res.redirect('/pathologies'); // Redirection après la mise à jour
        }
      });
    }
  },

  deletePathologie: (req, res) => {
    const pathologieId = req.params.id;

    Pathologie.deletePathologie(pathologieId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression de la pathologie');
      } else {
        res.redirect('/pathologies'); // Redirection après la suppression
      }
    });
  }
};

module.exports = pathologieController;
