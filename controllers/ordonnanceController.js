const Ordonnance = require('../models/ordonnance');
const Patient = require('../models/patient');
const Medecin = require('../models/medecin');
const Pathologie = require('../models/pathologie');
const Posologie = require('../models/posologie');
const Medicaments = require('../models/medicament');

let patientsListe = [];
let medecinsListe = [];
let pathologiesListe = [];
let medicamentsListe = [];

const ordonnanceController = {
  getAllOrdonnances: (req, res) => {
    Ordonnance.getAllOrdonnances((errorOrdonnance, ordonnances) => {
      if (errorOrdonnance) {
        return res.status(500).send('Erreur lors de la récupération des ordonnances');
      }

      Patient.getAllPatients((errorPatients, patients) => {
        if (errorPatients) {
          return res.status(500).send('Erreur lors de la récupération des patients');
        }

        Medecin.getAllMedecins((errorMedecins, medecins) => {
          if (errorMedecins) {
            return res.status(500).send('Erreur lors de la récupération des médecins');
          }

          Pathologie.getAllPathologies((errorPathologies, pathologies) => {
            if (errorPathologies) {
              return res.status(500).send('Erreur lors de la récupération des pathologies');
            }

            Medicaments.getAllMedicaments((errorMedicaments, medicaments) => {
              if (errorMedicaments) {
                return res.status(500).send('Erreur lors de la récupération des medicaments');
              }

              patientsListe = patients;
              medecinsListe = medecins;
              pathologiesListe = pathologies;
              medicamentsListe = medicaments;

              res.render('ordonnances', {
                ordonnances: ordonnances,
                patients: patientsListe,
                medecins: medecinsListe,
                pathologies: pathologiesListe,
                medicaments: medicamentsListe
              });
            });
          });
        });
      });
    });
  },


  addOrdonnance: (req, res) => {
    const { idMedecin, idPatient, idMaladie, date, idMedicament, duree, quantiteMedicament } = req.body;
 
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
        // Une fois l'ordonnance ajoutée, préparez les données pour la posologie
        const newPosologie = {
          Posologie_IdOrdonnance: result.insertId, // Récupérer l'ID de l'ordonnance ajoutée
          Posologie_IdMedicament: idMedicament,
          Posologie_Duree: duree,
          Posologie_QuantiteMedicament: quantiteMedicament
        };
  
        Posologie.addPosologie(newPosologie, (errorPosologie, resultPosologie) => {
          if (errorPosologie) {
            res.status(500).send('Erreur lors de l\'ajout de la posologie');
          } else {
            res.redirect('/pharmacie/ordonnances'); // Redirige après l'ajout de l'ordonnance et de la posologie
          }
        });
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
        res.redirect('/pharmacie/ordonnances'); // Redirige après la mise à jour
      }
    });
  },

  deleteOrdonnance: (req, res) => {
    const ordonnanceId = req.params.id;

    Ordonnance.deleteOrdonnance(ordonnanceId, (error, result) => {
      if (error) {
        res.status(500).send('Erreur lors de la suppression de l\'ordonnance');
      } else {
        res.redirect('/pharmacie/ordonnances'); // Redirige après la suppression
      }
    });
  }
};

module.exports = ordonnanceController;
