const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('accueil'); // Rendre la vue accueil.ejs
});

module.exports = router;
