const Ordonnance = require('../models/ordonnance');

const ordonnanceController = {
  getAllOrdonnances: (req, res) => {
    Ordonnance.getAllOrdonnances((error, ordonnances) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des ordonnances');
      } else {
        res.render('ordonnances', { ordonnances: ordonnances });
      }
    });
  },

  addOrdonnanceForm: (req, res) => {
    res.render('ajouterOrdonnance'); // Créez une vue pour ajouter une ordonnance
  },

  addOrdonnance: (req, res) => {
    const { idMedecin, idPatient, idMaladie, date } = req.body;
    const newOrdonnance = {
      Ordonnance_IdMedecin: idMedecin,
      Ordonnance_IdPatient: idPatient,
      Ordonnance_IdMaladie: idMaladie,
      Ordonnance_Date: date
    };

    Ordonnance.addOrdonnance(newOrdonnance, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de l\'ajout de l\'ordonnance');
      } else {
        res.redirect('/ordonnances'); // Redirige après l'ajout
      }
    });
  },

  getOrdonnanceById: (req, res) => {
    const ordonnanceId = req.params.id;

    Ordonnance.getOrdonnanceById(ordonnanceId, (error, ordonnance) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération de l\'ordonnance');
      } else {
        res.render('modifierOrdonnance', { ordonnance: ordonnance });
      }
    });
  },

  updateOrdonnance: (req, res) => {
    const ordonnanceId = req.params.id;
    const { idMedecin, idPatient, idMaladie, date } = req.body;
    const updatedOrdonnance = {
      Ordonnance_IdMedecin: idMedecin,
      Ordonnance_IdPatient: idPatient,
      Ordonnance_IdMaladie: idMaladie,
      Ordonnance_Date: date
    };

    Ordonnance.updateOrdonnance(ordonnanceId, updatedOrdonnance, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la mise à jour de l\'ordonnance');
      } else {
        res.redirect('/ordonnances'); // Redirige après la mise à jour
      }
    });
  },

  deleteOrdonnance: (req, res) => {
    const ordonnanceId = req.params.id;

    Ordonnance.deleteOrdonnance(ordonnanceId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression de l\'ordonnance');
      } else {
        res.redirect('/ordonnances'); // Redirige après la suppression
      }
    });
  }
};

module.exports = ordonnanceController;
