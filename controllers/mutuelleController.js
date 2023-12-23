const Mutuelle = require('../models/mutuelle');

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

  addMutuelleForm: (req, res) => {
    res.render('ajouterMutuelle');
  },

  addMutuelle: (req, res) => {
    const { nom, taux } = req.body;
    const newMutuelle = { Mutuelle_Nom: nom, Mutuelle_Taux: taux };

    Mutuelle.addMutuelle(newMutuelle, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.redirect('/mutuelles');
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

    Mutuelle.updateMutuelle(mutuelleId, updatedMutuelle, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.redirect('/mutuelles');
      }
    });
  },

  deleteMutuelle: (req, res) => {
    const mutuelleId = req.params.id;

    Mutuelle.deleteMutuelle(mutuelleId, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.redirect('/mutuelles');
      }
    });
  }
};

module.exports = mutuelleController;
