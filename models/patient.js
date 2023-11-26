const db = require('../db/db');

const Patient = {
  getAllPatients: (callback) => {
    db.query('SELECT * FROM Patient', callback);
  }
};

module.exports = Patient;
