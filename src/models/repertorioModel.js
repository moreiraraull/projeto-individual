var database = require("../database/config");

function buscarRepertorioPorUsuario(idUsuario) {
    var instrucaoSql = `SELECT *
FROM vw_repertorio_usuario
WHERE fk_usuario = ${idUsuario};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idUsuario, idSpotify, titulo, artista, urlCapa, progresso, instrumento, album) {
    // verifica se a música já existe baseada no id do Spotify, para não cadastrar músicas repetidas
    var sqlSelect = `SELECT id FROM musica WHERE id_spotify = '${idSpotify}';`;
    console.log("Executando a instrução SQL: \n" + sqlSelect);

    return database.executar(sqlSelect).then(function(resultadoSelect) {
        
        // Se a música já existir no banco (length > 0)
        if (resultadoSelect.length > 0) {
            var idMusicaExistente = resultadoSelect[0].id;
            
            // Fazemos apenas o insert no repertório vinculando o ID existente
            var sqlInsertRepertorio = `
                INSERT INTO repertorio (fk_usuario, fk_musica, instrumento, progresso) 
                VALUES (${idUsuario}, ${idMusicaExistente}, '${instrumento}', ${progresso});
            `;
            console.log("Música encontrada. Inserindo no repertório: \n" + sqlInsertRepertorio);
            return database.executar(sqlInsertRepertorio);
            
        } else {
            // Se a música NÃO existir, ela é cadastrada
            var sqlInsertMusica = `
                INSERT INTO musica (id_spotify, titulo, artista, capa_url, album) 
                VALUES ('${idSpotify}', '${titulo}', '${artista}', '${urlCapa}', '${album}');
            `;
            console.log("Música nova. Inserindo na tabela musica: \n" + sqlInsertMusica);
            
            // Encadeamos outro .then() para pegar o ID gerado pelo banco após o insert da música
            return database.executar(sqlInsertMusica).then(function(resultadoInsertMusica) {
                
                // O 'insertId' captura automaticamente o ID (Auto Increment) recém-criado
                var novoIdMusica = resultadoInsertMusica.insertId; 
                
                var sqlInsertRepertorio = `
                    INSERT INTO repertorio (fk_usuario, fk_musica, instrumento, progresso) 
                    VALUES (${idUsuario}, ${novoIdMusica}, '${instrumento}', ${progresso});
                `;
                console.log("Música cadastrada. Inserindo no repertório: \n" + sqlInsertRepertorio);
                return database.executar(sqlInsertRepertorio);
            });
        }
    });
}

module.exports = {
    buscarRepertorioPorUsuario,
    cadastrar
};