CREATE DATABASE noiseforge;

USE noiseforge;

-- Tabela usuário

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

-- Tabela música
CREATE TABLE musica (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_spotify VARCHAR(100) UNIQUE, -- Cada ID de música do spotify é unico
    titulo VARCHAR(100),
    artista VARCHAR(100),
    album VARCHAR(100),
    capa_url VARCHAR(255) -- Salvar a URL da capa
);

-- Tabela intermediária Músicas x Usuário
CREATE TABLE repertorio (
	id INT AUTO_INCREMENT,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    fk_musica INT,
    FOREIGN KEY (fk_musica) REFERENCES musica(id),
    PRIMARY KEY  (id, fk_usuario),
    instrumento VARCHAR(45),
    progresso TINYINT DEFAULT 1,
    CONSTRAINT chkProgresso CHECK(progresso IN (1, 2, 3)),
    data_inserido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

/*
	CRIAÇÃO USUÁRIO DA API

CREATE USER 'user_insert'@'localhost' IDENTIFIED BY 'urubu100';

GRANT INSERT ON noiseforge.* TO 'user_insert'@'localhost';

GRANT SELECT ON noiseforge.* TO 'user_insert'@'localhost';

GRANT UPDATE ON noiseforge.* TO 'user_insert'@'localhost';

GRANT DELETE ON noiseforge.* TO 'user_insert'@'localhost';
*/

SELECT * FROM usuario;

-- DROP DATABASE noiseforge;

SELECT * FROM musica;


-- Mostrar o repertório do nome, instrumento e música
SELECT nome,
r.instrumento,
m.titulo AS musica
FROM usuario
JOIN repertorio as r
ON r.fk_usuario = usuario.id
JOIN musica AS m
ON m.id = r.fk_musica;

-- SELECT DO MODEL DE CARDS
CREATE VIEW vw_repertorio_usuario AS
SELECT 
r.fk_usuario, -- Ver o id do usuário
m.titulo,
m.artista,
m.album,
m.capa_url,
r.instrumento,
r.progresso,
r.id
FROM repertorio as r
JOIN musica AS m
ON m.id = r.fk_musica;

-- TESTANDO A VIEW (que está no model)
SELECT *
FROM vw_repertorio_usuario
WHERE fk_usuario = 1;

-- SELECTS DAS KPIs
-- PARA APRENDER
SELECT 
COUNT(progresso) AS 'qtd_aprender'
FROM repertorio
WHERE progresso = 1 AND
fk_usuario = 1;

-- APRENDENDO
SELECT 
COUNT(progresso) AS 'qtd_aprendendo'
FROM repertorio
WHERE progresso = 2 AND
fk_usuario = 1;

-- DOMINADO
SELECT 
COUNT(progresso) AS 'qtd_dominado'
FROM repertorio
WHERE progresso = 3 AND
fk_usuario = 1;

-- SELECT QUANTIDADE DE MÚSICAS POR INSTRUMENTO
SELECT
instrumento,
COUNT(fk_musica) AS 'qtd_musicas'
FROM repertorio
WHERE fk_usuario = 1
GROUP BY instrumento;

-- SELECT TEMPO PARA APRENDER AS MÚSICAS
SELECT fk_musica,
data_inserido,
data_atualizacao,
TIMESTAMPDIFF(HOUR, data_atualizacao, data_inserido) AS tempo_aprender
FROM repertorio
WHERE fk_usuario = 1
AND data_inserido <> data_atualizacao; -- Músicas que não acabaram de ser inseridas