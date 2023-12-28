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
  },

  getMedicamentStockById: (medId, callback) => {
    db.query('SELECT Medicament_Stock FROM Medicament WHERE Medicament_Id = ?', medId, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        if (results.length === 0) {
          callback("Médicament non trouvé", null);
        } else {
          callback(null, results[0].Medicament_Stock);
        }
      }
    });
  }
};

module.exports = Medicament;
