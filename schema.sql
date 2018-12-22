-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS uprootd;
-- Creates the "blogger" database --
CREATE DATABASE uprootd;

USE uprootd;

CREATE TABLE kavas(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    last_login DATETIME,
    status ENUM('active', 'inactive') DEFAULT 'active',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)

);

CREATE TABLE reviews(
    id INT AUTO_INCREMENT NOT NULL,
    userId INT NOT NULL,
    kavaId INT NOT NULL,
    rating INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (kavaId) REFERENCES kavas(id)
);

INSERT INTO kavas (name, description, country)
VALUES ("Borogu", "Some cray root", "Vanuatu");

INSERT INTO kavas (name, description, country)
VALUES ("Pouni Ono", "Some other cray root", "Tonga");

INSERT INTO kavas (name, description, country)
VALUES ("Vula Waka", "Some primo root", "Fiji");

INSERT INTO kavas (name, description, country)
VALUES ("Mahakea", "Some other primo root", "Hawaii");

INSERT INTO users (username, name, password, location)
VALUES ("tom", "Tom From MySpace", "password", "The Internet");

INSERT INTO users (username, name, password, location)
VALUES ("cribeiro", "Charles", "Kava", "Ireland");

INSERT INTO users (username, name, password, location)
VALUES ("bdot", "Bob", "test", "Japan");

INSERT INTO reviews (rating, userId, kavaId)
VALUES (4,1,1);

INSERT INTO reviews (rating, userId, kavaId)
VALUES (5,2,2);

INSERT INTO reviews (rating, userId, kavaId)
VALUES (5,1,2);

INSERT INTO reviews (rating, userId, kavaId)
VALUES (3,3,2);

INSERT INTO reviews (rating, userId, kavaId)
VALUES (5,1,3);

INSERT INTO reviews (rating, userId, kavaId)
VALUES (5,2,3);

INSERT INTO reviews (rating, userId, kavaId)
VALUES (5,3,3);