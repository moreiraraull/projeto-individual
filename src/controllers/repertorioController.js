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

function buscarQtdAprender(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario) || idUsuario <= 0 || idUsuario % 1 != 0) {
        res.status(400).send("O idUsuario deve ser um número inteiro positivo!");
    } else {
        repertorioModel.buscarQtdAprender(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao buscar a quantidade para aprender: ", erro.sqlMessage);
                res.status(500).json("Erro ao buscar a quantidade para aprender.");
            });
    }
}

function buscarQtdAprendendo(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario) || idUsuario <= 0 || idUsuario % 1 != 0) {
        res.status(400).send("O idUsuario deve ser um número inteiro positivo!");
    } else {
        repertorioModel.buscarQtdAprendendo(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao buscar a quantidade aprendendo: ", erro.sqlMessage);
                res.status(500).json("Erro ao buscar a quantidade aprendendo.");
            });
    }
}

function buscarQtdDominado(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario) || idUsuario <= 0 || idUsuario % 1 != 0) {
        res.status(400).send("O idUsuario deve ser um número inteiro positivo!");
    } else {
        repertorioModel.buscarQtdDominado(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao buscar a quantidade dominada: ", erro.sqlMessage);
                res.status(500).json("Erro ao buscar a quantidade dominada.");
            });
    }
}

function avancarNivel(req, res) {
    var idRepertorio = Number(req.params.idRepertorio); // vem da URL
    var idUsuario = Number(req.body.idUsuario); // vem do corpo da requisição

    // Validações para ver se os ids são números inteiros positivos
    if (isNaN(idRepertorio) || idRepertorio <= 0 || idRepertorio % 1 != 0) {
        res.status(400).send("O idRepertorio deve ser um número inteiro positivo!");
    } else if (isNaN(idUsuario) || idUsuario <= 0 || idUsuario % 1 != 0) {
        res.status(400).send("O idUsuario deve ser um número inteiro positivo!");
    } else {
        repertorioModel.avancarNivel(idRepertorio, idUsuario)
            .then(function (resultado) {
                // affectedRows = quantas linhas o UPDATE alterou no banco
                // Se for 0, a música já estava no nível 3 ou não pertence a esse usuário
                if (resultado.affectedRows == 0) {
                    res.status(400).send("Música já dominada ou não encontrada!");
                } else {
                    res.status(200).json(resultado);
                }
            })
            .catch(function (erro) {
                console.log("Houve um erro ao avançar o nível: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    buscarRepertorioPorUsuario,
    cadastrar,
    buscarQtdAprender,
    buscarQtdAprendendo,
    buscarQtdDominado,
    avancarNivel
};
