-- Active: 1759193815934@@127.0.0.1@5432@node_trello_service@public


CREATE DATABASE node_trello_service;

\c node_trello_service;


CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR 
);
SELECT * FROM tasks;

CREATE TABLE boards(
    id serial PRIMARY KEY,
    title VARCHAR NOT NULL,
    columns VARCHAR 
);



CREATE TABLE columns(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);



CREATE TABLE tasks(
    id serial PRIMARY KEY,
    title VARCHAR not NULL,
    orderr SMALLINT NOT NULL,
    description TEXT,
    userId INT REFERENCES users(id) on delete CASCADE,
    boardId INT REFERENCES boards(id) on delete CASCADE,
    columnId INT REFERENCES columns(id) on delete CASCADE
);








