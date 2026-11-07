var express = require("express");
var router = express.Router();

var repertorioController = require("../controllers/repertorioController");

router.get("/:idUsuario", function (req, res) {
    repertorioController.buscarRepertorioPorUsuario(req, res);
});

// Para cadastrar uma música nova no repertorio do usuario (alterar depois) para permitir a inserção
// router.post("/cadastrar", function (req, res) {
//   repertiruiController.cadastrar(req, res);
// })

module.exports = router;