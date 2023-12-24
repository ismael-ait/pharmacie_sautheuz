const Patient = require('../models/patient');

const patientController = {
  getAllPatients: (req, res) => {
    Patient.getAllPatients((error, patients) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération des patients');
      } else {
        // Formater la date de naissance pour chaque patient DIRECTEMENT avant de l'afficher
        patients.forEach(patient => {
          patient.Patient_DateNaissance = formatDate(patient.Patient_DateNaissance);
        });

        res.render('patients', { patients: patients }); // Rendre la vue avec les patients formatés
      }
    });
  },

  addPatientForm: (req, res) => {
    res.render('ajouterPatient'); // Créez une vue pour ajouter un patient
  },

  addPatient: (req, res) => {
    const { nom, prenom, dateNaissance, numeroSecurite, numeroTelephone, idMutuelle } = req.body;
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
  },

  getPatientById: (req, res) => {
    const patientId = req.params.id;

    Patient.getPatientById(patientId, (error, patient) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération du patient');
      } else {
        // Formater la date de naissance avant de l'afficher
        patient.Patient_DateNaissance = formatDate(patient.Patient_DateNaissance);

        res.render('modifierPatient', { patient: patient });
      }
    });
  },

  updatePatient: (req, res) => {
    const patientId = req.params.id;
    const { nom, prenom, dateNaissance, numeroSecurite, numeroTelephone, idMutuelle } = req.body;
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
