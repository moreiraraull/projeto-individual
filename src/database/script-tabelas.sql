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
    progresso TINYINT,
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

INSERT INTO musica (titulo, artista, album) VALUES
('Scream of the Butterfly', 'Acid Bath', 'When the Kite String Pops');

SELECT * FROM musica;

INSERT INTO repertorio (fk_usuario, fk_musica, instrumento) VALUES
(1, 1, 'Baixo');

SELECT nome,
r.instrumento,
m.titulo AS musica
FROM usuario
JOIN repertorio as r
ON r.fk_usuario = usuario.id
JOIN musica AS m
ON m.id = r.fk_musica;