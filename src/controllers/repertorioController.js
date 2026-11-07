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
    // Variáveis que virão do front-end (fetch)
    var instrumento = req.body.instrumentoServer;
    var idUsuario = req.body.idUsuarioServer;
    var idMusica = req.body.idMusicaServer; 
    var progresso = req.body.progressoServer;

    // Validações de regra de negócio
    if (instrumento == undefined) {
        res.status(400).send("O instrumento está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("O idUsuario está undefined!");
    } else if (idMusica == undefined) {
        res.status(400).send("O idMusica está undefined!");
    } else {
        // Chamando o model passando os parâmetros corretos da sua tabela
        repertorioModel.cadastrar(instrumento, idUsuario, idMusica, progresso)
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