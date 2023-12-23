const db = require('../db/db');

const Mutuelle = {
  getAllMutuelles: (callback) => {
    db.query('SELECT * FROM Mutuelle', callback);
  },

  addMutuelle: (newMutuelle, callback) => {
    db.query('INSERT INTO Mutuelle SET ?', newMutuelle, callback);
  },

  getMutuelleById: (id, callback) => {
    db.query('SELECT * FROM Mutuelle WHERE Mutuelle_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  },

  updateMutuelle: (id, updatedMutuelle, callback) => {
    db.query('UPDATE Mutuelle SET ? WHERE Mutuelle_Id = ?', [updatedMutuelle, id], callback);
  },

  deleteMutuelle: (mutuelleId, callback) => {
    db.query('DELETE FROM Mutuelle WHERE Mutuelle_Id = ?', [mutuelleId], callback);
  }
};

module.exports = Mutuelle;
