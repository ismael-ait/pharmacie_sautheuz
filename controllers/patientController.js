const Patient = require('../models/patient');
const Mutuelle = require('../models/mutuelle');
const validationUtils = require('./validationUtils'); 
let mutuellesList = []; // Variable pour stocker la liste des mutuelles

const patientController = {
  getAllPatients: (req, res) => {
    Patient.getAllPatients((error, patients) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des patients');
      } else {
        Mutuelle.getAllMutuelles((error, mutuelles) => {
          if (error) {
            res.status(500).send('Erreur lors de la récupération des mutuelles');
          } else {
            mutuellesList = mutuelles; // Mettre à jour la liste des mutuelles
            // Formater la date de naissance pour chaque patient DIRECTEMENT avant de l'afficher
            patients.forEach(patient => {
              patient.Patient_DateNaissance = formatDate(patient.Patient_DateNaissance);
            });

            res.render('patients', { patients: patients, mutuelles: mutuelles });
            // Rendre la vue avec les patients formatés et la liste des mutuelles
          }
        });
      }
    });
  },

  addPatient: (req, res) => {
    const { nom, prenom, dateNaissance, numeroSecurite, numeroTelephone, idMutuelle } = req.body;
    let errors = [];

    // Validation du nom
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    // Validation du prénom
    if (!validationUtils.validateName(prenom)) {
      errors.push('Le prénom saisi est invalide.');
    }

    // Validation du numéro de téléphone
    if (!validationUtils.validatePhoneNumber(numeroTelephone)) {
      errors.push('Le numéro de téléphone doit contenir 10 chiffres et commencer par 06 ou 07.');
    }

    // Validation du numéro de sécurité sociale
    if (!validationUtils.validateSocialSecurityNumber(numeroSecurite)) {
      errors.push('Le numéro de sécurité sociale doit contenir exactement 13 chiffres.');
    }
    const mutuelles = mutuellesList;

    if (errors.length > 0) {
      Patient.getAllPatients((error, results) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération des patients');
        } else {
          // Formater la date de naissance uniquement pour les patients lorsqu'il y a des erreurs
          results.forEach(patient => {
            patient.Patient_DateNaissance = formatDate(patient.Patient_DateNaissance);
          });

          res.render('patients', {
            patients: results, mutuelles: mutuelles,
            errors: errors // Affichage des erreurs
          });
        }
      });
    } else {
      const newPatient = {
        Patient_Nom: nom,
        Patient_Prenom: prenom,
        Patient_DateNaissance: dateNaissance,
        Patient_NumeroSecurite: numeroSecurite,
        Patient_NumeroTelephone: numeroTelephone,
        Patient_IdMutuelle: idMutuelle
      };
    
      Patient.addPatient(newPatient, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de l\'ajout du patient');
        } else {
          res.redirect('/patients'); // Redirige après l'ajout
        }
      });
    }
  },


  getPatientById: (req, res) => {
    const patientId = req.params.id;
    const mutuelles = mutuellesList;


    Patient.getPatientById(patientId, (error, patient) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération du patient');
      } else {
        // Formater la date de naissance avant de l'afficher
        patient.Patient_DateNaissance = formatDate(patient.Patient_DateNaissance);

        res.render('modifierPatient', { patient: patient, mutuelles: mutuelles
        });
      }
    });
  },

  updatePatient: (req, res) => {
    const patientId = req.params.id;
    const { nom, prenom, dateNaissance, numeroSecurite, numeroTelephone, idMutuelle } = req.body;
    let errors = [];
    const mutuelles = mutuellesList;



    // Validation du nom
    if (!validationUtils.validateName(nom)) {
      errors.push('Le nom saisi est invalide.');
    }

    // Validation du prénom
    if (!validationUtils.validateName(prenom)) {
      errors.push('Le prénom saisi est invalide.');
    }

    // Validation du numéro de téléphone
    if (!validationUtils.validatePhoneNumber(numeroTelephone)) {
      errors.push('Le numéro de téléphone doit contenir 10 chiffres et commencer par 06 ou 07.');
    }

    // Validation du numéro de sécurité sociale
    if (!validationUtils.validateSocialSecurityNumber(numeroSecurite)) {
      errors.push('Le numéro de sécurité sociale doit contenir exactement 13 chiffres.');
    }

    if (errors.length > 0) {
      Patient.getPatientById(patientId, (error, patient) => {
        if (error) {
          res.status(500).send('Erreur lors de la récupération du patient');
        } else {
          // Formater la date de naissance avant de l'afficher
          patient.Patient_DateNaissance = formatDate(patient.Patient_DateNaissance);

          res.render('modifierPatient', {
            patient: patient,
            mutuelles: mutuelles,
            errors: errors // Affichage des erreurs
          });
        }
      });
    } else {
      const updatedPatient = {
        Patient_Nom: nom,
        Patient_Prenom: prenom,
        Patient_DateNaissance: dateNaissance,
        Patient_NumeroSecurite: numeroSecurite,
        Patient_NumeroTelephone: numeroTelephone,
        Patient_IdMutuelle: idMutuelle
      };

      Patient.updatePatient(patientId, updatedPatient, (error, result) => {
        if (error) {
          res.status(500).send('Erreur lors de la mise à jour du patient');
        } else {
          res.redirect('/patients'); // Redirige après la mise à jour
        }
      });
    }
  },

  deletePatient: (req, res) => {
    const patientId = req.params.id;

    Patient.deletePatient(patientId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression du patient');
      } else {
        res.redirect('/patients'); // Redirige après la suppression
      }
    });
  }

  
};



function formatDate(dateString) {
  const date = new Date(dateString);
  const isoDate = date.toISOString().split('T')[0]; // Format AAAA-MM-JJ
  return isoDate;
}

module.exports = patientController;
