var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/graficosController");

router.get("/instrumentos/:idUsuario", function (req, res) {
    medidaController.buscarInstrumentos(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;