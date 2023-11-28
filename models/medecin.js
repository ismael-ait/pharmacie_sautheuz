const db = require('../db/db');

const Medecin = {
  getAllMedecins: (callback) => {
    db.query('SELECT * FROM Medecin', callback);
  },

  addMedecin: (newMedecin, callback) => {
    db.query('INSERT INTO Medecin SET ?', newMedecin, callback);
  }
};

module.exports = Medecin;
