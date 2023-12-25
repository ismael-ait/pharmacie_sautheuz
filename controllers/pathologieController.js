const Pathologie = require('../models/pathologie');

const pathologieController = {
  getAllPathologies: (req, res) => {
    Pathologie.getAllPathologies((error, pathologies) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des pathologies');
      } else {
        res.render('pathologies', { pathologies: pathologies });
      }
    });
  },

  getPathologieById: (req, res) => {
    const pathologieId = req.params.id;

    Pathologie.getPathologieById(pathologieId, (error, pathologie) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération de la pathologie');
      } else {
        res.render('modifierPathologie', { pathologie: pathologie });
      }
    });
  },


  addPathologie: (req, res) => {
    const { nom } = req.body;
    const newPathologie = {
      Maladie_Nom: nom
    };

    Pathologie.addPathologie(newPathologie, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de l\'ajout de la pathologie');
      } else {
        res.redirect('/pathologies'); // Redirection après l'ajout
      }
    });
  },

  updatePathologie: (req, res) => {
    const pathologieId = req.params.id;
    const { nom } = req.body;
    const updatedPathologie = {
      Maladie_Nom: nom
    };

    Pathologie.updatePathologie(pathologieId, updatedPathologie, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la mise à jour de la pathologie');
      } else {
        res.redirect('/pathologies'); // Redirection après la mise à jour
      }
    });
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
