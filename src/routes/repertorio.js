var express = require("express");
var router = express.Router();

var repertorioController = require("../controllers/repertorioController");

router.get("/:idUsuario", function (req, res) {
    repertorioController.buscarRepertorioPorUsuario(req, res);
});

// Para cadastrar uma música nova no repertorio do usuario
router.post("/cadastrar", function (req, res) {
  repertorioController.cadastrar(req, res);
})

module.exports = router;