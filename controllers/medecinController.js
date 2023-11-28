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
    const updatedMedecin = {
      Medecin_Nom: nom,
      Medecin_Prenom: prenom,
      Medecin_NumeroTelephone: numeroTelephone
    };

    Medecin.updateMedecin(medecinId, updatedMedecin, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la mise à jour du médecin');
      } else {
        res.redirect('/medecins'); // Redirige après la mise à jour
      }
    });
  }
};
  


module.exports = medecinController;
