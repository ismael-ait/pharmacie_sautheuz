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

  

  validatePhoneNumber: (phoneNumber) => {
    // Vérifier si le numéro a exactement 10 chiffres et commence par 06 ou 07
    const phoneNumberRegex = /^(06|07)\d{8}$/; // Regex pour vérifier le format du numéro de téléphone

    return phoneNumberRegex.test(phoneNumber);
  },

  addMedecin: (req, res) => {
    const { nom, prenom, numeroTelephone } = req.body;

    // Validation du numéro de téléphone
    if (!medecinController.validatePhoneNumber(numeroTelephone)) {
      Medecin.getAllMedecins((error, results) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération des médecins');
        } else {
          res.render('medecins', {
            medecins: results,
            error: 'Le numéro de téléphone doit contenir 10 chiffres et commencer par 06 ou 07.'
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
          res.redirect('/medecins'); // Redirige après l'ajout
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
  },

  deleteMedecin: (req, res) => {
    const medecinId = req.params.id;

    Medecin.deleteMedecin(medecinId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression du médecin');
      } else {
        res.redirect('/medecins'); // Redirige après la suppression
      }
    });
  }
};
  


module.exports = medecinController;
