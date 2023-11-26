const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Import des routes
const patientRoutes = require('./routes/patientRoutes');
const accueilRoutes = require('./routes/accueilRoutes'); // Import de la route pour la page d'accueil
const medecinRoutes = require('./routes/medecinRoutes'); // Import de la route pour les médecins

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public/css'));

// Routes pour les patients
app.use('/patients', patientRoutes);
app.use('/medecins', medecinRoutes);

// Utilisation de la route pour la page d'accueil
app.use('/', accueilRoutes); // Utilisation de la route pour la page d'accueil



// Écoute sur le port 5000
app.listen(port, () => console.log(`Écoute sur le port ${port}`));
