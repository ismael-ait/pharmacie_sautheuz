const db = require('../db/db');

const Medecin = {
  getAllMedecins: (callback) => {
    db.query('SELECT * FROM Medecin', callback);
  }
};

module.exports = Medecin;
