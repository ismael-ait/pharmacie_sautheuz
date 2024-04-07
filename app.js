const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./db/db');

// Import des routes
const patientRoutes = require('./routes/patientRoutes');
const accueilRoutes = require('./routes/accueilRoutes'); 
const medecinRoutes = require('./routes/medecinRoutes'); 
const pharmacienRoutes = require('./routes/pharmacienRoutes');
const medicamentRoutes = require('./routes/medicamentRoutes'); // Import du routeur des médicaments
const ordonnanceRoutes = require('./routes/ordonnanceRoutes'); // Import du routeur des médicaments
const pathologieRoutes = require('./routes/pathologieRoutes');
const mutuelleRoutes = require('./routes/mutuelleRoutes');
const posologieRoutes= require('./routes/posologieRoutes');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/pharmacie/patients', patientRoutes); // Route patients
app.use('/pharmacie/medecins', medecinRoutes); // Route medecins
app.use('/pharmacie/pharmaciens', pharmacienRoutes); // Route medecins
app.use('/pharmacie/medicaments', medicamentRoutes); // Utilisation du routeur des médicaments
app.use('/pharmacie/ordonnances', ordonnanceRoutes); // Utilisation du routeur des médicaments
app.use('/pharmacie/pathologies', pathologieRoutes);
app.use('/pharmacie/mutuelles', mutuelleRoutes);
app.use('/pharmacie/posologies', posologieRoutes);


app.use('/pharmacie', accueilRoutes); // Route accueil
app.use('/portfolio', express.static('/var/www/portfolio'));

// Vérification de la connexion à la base de données au démarrage de l'application
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données réussie !');
        connection.release(); // Libération de la connexion
    }
});


// Écoute sur le port 5000
app.listen(port, () => console.log(`Écoute sur le port ${port}`));
