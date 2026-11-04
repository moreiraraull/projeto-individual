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
    titulo VARCHAR(60),
    artista VARCHAR(60),
    album VARCHAR(60),
    instrumento VARCHAR(45)
);

-- Tabela intermediária Músicas x Usuário
CREATE TABLE repertorio (
	id INT AUTO_INCREMENT,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    fk_musica INT,
    FOREIGN KEY (fk_musica) REFERENCES musica(id),
    PRIMARY KEY  (fk_id, fk_usuario)
);

/*
	CRIAÇÃO USUÁRIO DA API

CREATE USER 'user_insert'@'localhost' IDENTIFIED BY 'urubu100';

GRANT INSERT ON noiseforge.* TO 'user_insert'@'localhost';

GRANT SELECT ON noiseforge.* TO 'user_insert'@'localhost';
*/