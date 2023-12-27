const Posologie = require('../models/posologie');

const posologieController = {
  getAllPosologies: (req, res) => {
    Posologie.getAllPosologies((error, posologies) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des posologies');
      } else {
        res.json(posologies);
      }
    });
  },

  addPosologie: (req, res) => {
    const { Posologie_IdOrdonnance, Posologie_IdMedicament, Posologie_Duree, Posologie_QuantiteMedicament } = req.body;
    const newPosologie = {
      Posologie_IdOrdonnance,
      Posologie_IdMedicament,
      Posologie_Duree,
      Posologie_QuantiteMedicament
    };

    Posologie.addPosologie(newPosologie, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de l\'ajout de la posologie');
      } else {
        res.json({ message: 'Posologie ajoutée avec succès', result });
      }
    });
  }

  // ... (d'autres méthodes pour update, getPosologieById, deletePosologie)
};

module.exports = posologieController;
