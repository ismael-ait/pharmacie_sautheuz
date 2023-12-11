const db = require('../db/db');

const Pharmacien = {
  getAllPharmaciens: (callback) => {
    db.query('SELECT * FROM Pharmacien', callback);
  },

  addPharmacien: (newPharmacien, callback) => {
    db.query('INSERT INTO Pharmacien SET ?', newPharmacien, callback);
  },
  updatePharmacien: (id, updatePharmacien, callback) => {
    db.query('UPDATE Pharmacien SET ? WHERE Pharmacien_Id = ?', [updatePharmacien, id], callback);
  },
  getPharmacienById: (id, callback) => {
    db.query('SELECT * FROM Pharmacien WHERE Pharmacien_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
      
    });
  },
  deletePharmacien: (pharmacienId, callback) => {
    db.query('DELETE FROM Pharmacien WHERE Pharmacien_Id = ?', [pharmacienId], callback);
  }
  
};

module.exports = Pharmacien;
