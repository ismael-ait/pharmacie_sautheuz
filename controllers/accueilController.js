const Posologie = require('../models/posologie');
const Medicament = require('../models/medicament');

const accueilController = {
    getAllMedicaments: (req, res) => {
        Medicament.getAllMedicaments((error, results) => {
            if (error) {
                res.status(500).send('Erreur lors de la récupération des médicaments');
            } else {
                res.render('accueil', { medicaments: results });
            }
        });
    },
    getPosologies: (req, res) => {
        Posologie.getAllPosologies((error, posologies) => {
            if (error) {
                res.status(500).send('Erreur lors de la récupération des posologies');
            } else {
                res.render('accueil', { posologies }); // Rendre la page accueil avec les données de posologies
            }
        });
    },

    getDiagram: (req, res) => {
        const medId = req.query.medId;
    
        // Récupération du stock du médicament depuis la table Medicament
        Medicament.getMedicamentStockById(medId, (error, stock) => {
            if (error) {
                res.status(500).json({ error: 'Erreur lors de la récupération du stock du médicament' });
            } else {
                // Récupération de la somme des Posologie_QuantiteMedicament pour ce médicament
                Posologie.getSumQuantityByMedicamentId(medId, (error, sumQuantity) => {
                    if (error) {
                        res.status(500).json({ error: 'Erreur lors de la récupération de la somme des quantités demandées' });
                    } else {
                        res.json({ stock, sumQuantity });
                    }
                });
            }
        });
    }
    
};

module.exports = accueilController;
