const db = require('../db/db');

const Medicament = {
  getAllMedicaments: (callback) => {
    db.query('SELECT * FROM Medicament', callback);
  },

  addMedicament: (newMedicament, callback) => {
    db.query('INSERT INTO Medicament SET ?', newMedicament, callback);
  },

  updateMedicament: (id, updatedMedicament, callback) => {
    db.query('UPDATE Medicament SET ? WHERE Medicament_Id = ?', [updatedMedicament, id], callback);
  },

  getMedicamentById: (id, callback) => {
    db.query('SELECT * FROM Medicament WHERE Medicament_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  },

  deleteMedicament: (medicamentId, callback) => {
    db.query('DELETE FROM Medicament WHERE Medicament_Id = ?', [medicamentId], callback);
  }
};

module.exports = Medicament;
