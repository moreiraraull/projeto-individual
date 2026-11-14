var database = require("../database/config");

function buscarInstrumentos(idUsuario) {

    var instrucaoSql = `SELECT
                        instrumento,
                        COUNT(fk_musica) AS 'qtd_musicas'
                        FROM repertorio
                        WHERE fk_usuario = ${idUsuario}
                        GROUP BY instrumento;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
                        temperatura,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        FROM medida WHERE fk_aquario = ${idAquario} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarInstrumentos,
    buscarMedidasEmTempoReal
}
