CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE restaurantes ( 
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL,
    cep VARCHAR(8) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado CHAR(2) NOT NULL
);

CREATE TABLE votacao (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) NOT NULL,
    restaurante_id INT REFERENCES restaurantes(id) NOT NULL,
    data_voto DATE NOT NULL DEFAULT CURRENT_DATE
);



