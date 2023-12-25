const Ordonnance = require('../models/ordonnance');
const Patient = require('../models/patient');
const Medecin = require('../models/medecin');
const Pathologie = require('../models/pathologie');

let patientsListe = [];
let medecinsListe = [];
let pathologiesListe = [];

const ordonnanceController = {
  getAllOrdonnances: (req, res) => {
    Ordonnance.getAllOrdonnances((errorOrdonnance, ordonnances) => {
      if (errorOrdonnance) {
        res.status(500).send('Erreur lors de la récupération des ordonnances');
      } else {
        Patient.getAllPatients((errorPatients, patients) => {
          if (errorPatients) {
            res.status(500).send('Erreur lors de la récupération des patients');
          } else {
            Medecin.getAllMedecins((errorMedecins, medecins) => {
              if (errorMedecins) {
                res.status(500).send('Erreur lors de la récupération des médecins');
              } else {
                Pathologie.getAllPathologies((errorPathologies, pathologies) => {
                  if (errorPathologies) {
                    res.status(500).send('Erreur lors de la récupération des pathologies');
                  } else {
                    patientsListe = patients;
                    medecinsListe = medecins;
                    pathologiesListe = pathologies;
                    res.render('ordonnances', { ordonnances: ordonnances, patients: patientsListe, medecins: medecinsListe, pathologies: pathologiesListe });
                  }
                });
              }
            });
          }
        });
      }
    });
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
    const medecins = medecinsListe;
    const patients = patientsListe;
    const pathologies = pathologiesListe
    Ordonnance.getOrdonnanceById(ordonnanceId, (error, ordonnance) => {
      if (error) {
        res.status(500).send('Erreur lors de la récupération de l\'ordonnance');
      } else {
        res.render('modifierOrdonnance', { ordonnance: ordonnance,
          patients: patients,
          medecins: medecins,
          pathologies: pathologies});
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
