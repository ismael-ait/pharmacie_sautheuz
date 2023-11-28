const Medecin = require('../models/medecin');

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

  addMedecinForm: (req, res) => {
    res.render('ajouterMedecin'); // Créez une vue pour ajouter un médecin
  },

  addMedecin: (req, res) => {
    const { nom, prenom, numeroTelephone } = req.body;
    const newMedecin = {
      Medecin_Nom: nom,
      Medecin_Prenom: prenom,
      Medecin_NumeroTelephone: numeroTelephone
    };

    Medecin.addMedecin(newMedecin, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de l\'ajout du médecin');
      } else {
        res.redirect('/medecins'); // Redirige après l'ajout
      }
    });
  }
};

module.exports = medecinController;
