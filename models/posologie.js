const db = require('../db/db');

const Posologie = {
  getAllPosologies: (callback) => {
    db.query('SELECT * FROM Posologie', callback);
  },
  
  addPosologie: (newPosologie, callback) => {
    db.query('INSERT INTO Posologie SET ?', newPosologie, callback);
  },
  
  getPosologieById: (id, callback) => {
    db.query('SELECT * FROM Posologie WHERE Posologie_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  },
  
  updatePosologie: (id, updatedPosologie, callback) => {
    db.query('UPDATE Posologie SET ? WHERE Posologie_Id = ?', [updatedPosologie, id], callback);
  },
  
  deletePosologie: (posologieId, callback) => {
    db.query('DELETE FROM Posologie WHERE Posologie_Id = ?', [posologieId], callback);
  },
  getSumQuantityByMedicamentId: (medId, callback) => {
    db.query('SELECT SUM(Posologie_QuantiteMedicament) AS Somme_Quantite_Demandee FROM Posologie WHERE Posologie_IdMedicament = ?', medId, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0].Somme_Quantite_Demandee);
      }
    });
  },
};

module.exports = Posologie;
