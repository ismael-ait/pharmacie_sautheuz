const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
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

app.use('/patients', patientRoutes); // Route patients
app.use('/medecins', medecinRoutes); // Route medecins
app.use('/pharmaciens', pharmacienRoutes); // Route medecins
app.use('/medicaments', medicamentRoutes); // Utilisation du routeur des médicaments
app.use('/ordonnances', ordonnanceRoutes); // Utilisation du routeur des médicaments
app.use('/pathologies', pathologieRoutes);
app.use('/mutuelles', mutuelleRoutes);
app.use('/posologies', posologieRoutes);


app.use('/', accueilRoutes); // Route accueil


// Écoute sur le port 5000
app.listen(port, () => console.log(`Écoute sur le port ${port}`));
