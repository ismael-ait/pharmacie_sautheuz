const db = require('../db/db');

const Patient = {
  getAllPatients: (callback) => {
    db.query('SELECT * FROM Patient', callback);
  },

  addPatient: (newPatient, callback) => {
    db.query('INSERT INTO Patient SET ?', newPatient, callback);
  },

  getPatientById: (id, callback) => {
    db.query('SELECT * FROM Patient WHERE Patient_Id = ?', id, (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results[0]); // Renvoie le premier résultat trouvé
      }
    });
  },

  updatePatient: (id, updatedPatient, callback) => {
    db.query('UPDATE Patient SET ? WHERE Patient_Id = ?', [updatedPatient, id], callback);
  },

  deletePatient: (patientId, callback) => {
    db.query('DELETE FROM Patient WHERE Patient_Id = ?', [patientId], callback);
  }
};

module.exports = Patient;
