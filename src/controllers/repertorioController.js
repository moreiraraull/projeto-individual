var repertorioModel = require("../models/repertorioModel");

function buscarRepertorioPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else {
        repertorioModel.buscarRepertorioPorUsuario(idUsuario)
            .then(function (resultado) {
                // Restaurando a validação de status HTTP do projeto base
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).json([]);
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar o repertório! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    // Variaveis que virão do front-end
    var idUsuario = req.body.idUsuario;
    var idSpotify = req.body.idSpotify; 
    var titulo = req.body.titulo;
    var artista = req.body.artista;
    var urlCapa = req.body.urlCapa;
    var progresso = req.body.progresso;
    var instrumento = req.body.instrumento;
    var album = req.body.album;

    // Validações para ver se está tudo preenchido
    if (instrumento == undefined) {
        res.status(400).send("O instrumento está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else if (idSpotify == undefined) {
        res.status(400).send("O idSpotify está undefined!");
    } else {
        repertorioModel.cadastrar(idUsuario, idSpotify, titulo, artista, urlCapa, progresso, instrumento, album)
            .then((resultado) => {
                res.status(201).json(resultado);
            })
            .catch((erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarRepertorioPorUsuario,
    cadastrar
};