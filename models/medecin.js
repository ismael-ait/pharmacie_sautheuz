const db = require('../db/db');

const Medecin = {
  getAllMedecins: (callback) => {
    db.query('SELECT * FROM Medecin', callback);
  },

  addMedecin: (newMedecin, callback) => {
    db.query('INSERT INTO Medecin SET ?', newMedecin, callback);
  },
  updateMedecin: (id, updatedMedecin, callback) => {
    db.query('UPDATE Medecin SET ? WHERE Medecin_Id = ?', [updatedMedecin, id], callback);
  },
  getMedecinById: (id, callback) => {
    db.query('SELECT * FROM Medecin WHERE Medecin_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  }
};

module.exports = Medecin;
