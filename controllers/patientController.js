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
  }
};


// Pour le formatage, créer un objet Date à partir du paramètre dateString fourni à la fonction
// La date complète est reconstituée à partir des éléments date day month year.

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); 
  
  // padStart est une fonction qui permet de formater les mois à 1 chiffre en mois à 2 chiffres
  // le paramètre 2 formate la chaîne à 2 caractères et le '0' indique qu'il faut rajouter un 0 devant 
  // le chiffre si la chaîne ne fait pas 2 caractères ( 5 ---> 05)  

  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // le +1 est là car javascript compte les mois à partir de 0
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

module.exports = patientController;
