var express = require("express");
var router = express.Router();

var repertorioController = require("../controllers/repertorioController");

router.get("/kpis/para-aprender/:idUsuario", function (req, res) {
    repertorioController.buscarQtdAprender(req, res);
});

router.get("/kpis/aprendendo/:idUsuario", function (req, res) {
    repertorioController.buscarQtdAprendendo(req, res);
});

router.get("/kpis/dominado/:idUsuario", function (req, res) {
    repertorioController.buscarQtdDominado(req, res);
});

router.get("/:idUsuario", function (req, res) {
    repertorioController.buscarRepertorioPorUsuario(req, res);
});

// Para cadastrar uma música nova no repertorio do usuario
router.post("/cadastrar", function (req, res) {
  repertorioController.cadastrar(req, res);
})

module.exports = router;
