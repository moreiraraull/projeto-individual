var express = require("express");
var router = express.Router();
var spotifyController = require("../controllers/spotifyController");

// Rota para realizar as pesquisas
router.post("/pesquisar", function (req, res) {
    spotifyController.pesquisarMusica(req, res);
});

module.exports = router;