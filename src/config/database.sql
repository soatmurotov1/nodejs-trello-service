

CREATE DATABASE node_trello_service;

\c node_trello_service





CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR 
)

SELECT * FROM users;








CREATE TABLE boards(
    id serial PRIMARY KEY,
    title VARCHAR,
    columns VARCHAR
);

SELECT * FROM boards;






CREATE TABLE tasks(
    id serial PRIMARY KEY,
    
)