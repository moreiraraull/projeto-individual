var database = require("../database/config");

function buscarRepertorioPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT u.nome, 
       r.instrumento, 
       r.progresso,
       m.titulo AS musica,
       m.artista
FROM usuario AS u
JOIN repertorio AS r ON r.fk_usuario = u.id
JOIN musica AS m ON m.id = r.fk_musica
WHERE u.id = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarRepertorioPorUsuario
};