const db = require('../db/db');

const Pathologie = {
  getAllPathologies: (callback) => {
    db.query('SELECT * FROM Maladie', callback);
  },

  getPathologieById: (id, callback) => {
    db.query('SELECT * FROM Maladie WHERE Maladie_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  },

  addPathologie: (newPathologie, callback) => {
    db.query('INSERT INTO Maladie SET ?', newPathologie, callback);
  },

  updatePathologie: (id, updatedPathologie, callback) => {
    db.query('UPDATE Maladie SET ? WHERE Maladie_Id = ?', [updatedPathologie, id], callback);
  },

  deletePathologie: (pathologieId, callback) => {
    db.query('DELETE FROM Maladie WHERE Maladie_Id = ?', [pathologieId], callback);
  }
};

module.exports = Pathologie;
