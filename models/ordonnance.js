const db = require('../db/db');

const Ordonnance = {
  getAllOrdonnances: (callback) => {
    const query = `
      SELECT Ordonnance_Id, Medecin.Medecin_Nom AS MedecinNom, Patient.Patient_Nom AS PatientNom, 
             Maladie.Maladie_Nom AS MaladieNom, DATE_FORMAT(Ordonnance.Ordonnance_Date, '%d-%m-%Y') AS FormattedDate
      FROM Ordonnance
      INNER JOIN Medecin ON Ordonnance.Ordonnance_IdMedecin = Medecin.Medecin_Id
      INNER JOIN Patient ON Ordonnance.Ordonnance_IdPatient = Patient.Patient_Id
      INNER JOIN Maladie ON Ordonnance.Ordonnance_IdMaladie = Maladie.Maladie_Id;
    `;
    db.query(query, callback);
  },

   addOrdonnance: (newOrdonnance, callback) => {
    db.query('INSERT INTO Ordonnance SET ?', newOrdonnance, callback);
  },

  updateOrdonnance: (id, updatedOrdonnance, callback) => {
    db.query('UPDATE Ordonnance SET ? WHERE Ordonnance_Id = ?', [updatedOrdonnance, id], callback);
  },

  getOrdonnanceById: (id, callback) => {
    db.query('SELECT * FROM Ordonnance WHERE Ordonnance_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  },

  deleteOrdonnance: (ordonnanceId, callback) => {
    db.query('DELETE FROM Ordonnance WHERE Ordonnance_Id = ?', [ordonnanceId], callback);
  }
};

module.exports = Ordonnance;