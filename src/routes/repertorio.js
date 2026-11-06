var express = require("express");
var router = express.Router();

var repertorioController = require("../controllers/repertorioController");

router.get("/:idUsuario", function (req, res) {
    repertorioController.buscarRepertorioPorUsuario(req, res);
});

module.exports = router;
