const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Import des routes
const patientRoutes = require('./routes/patientRoutes');
const accueilRoutes = require('./routes/accueilRoutes'); 
const medecinRoutes = require('./routes/medecinRoutes'); 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public/css'));

app.use('/patients', patientRoutes); // Route patients
app.use('/medecins', medecinRoutes); // Route medecins
app.use('/', accueilRoutes); // Route accueil








// Écoute sur le port 5000
app.listen(port, () => console.log(`Écoute sur le port ${port}`));
