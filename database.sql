CREATE DATABASE task_database;
--\c into database

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255),
    task_date VARCHAR(255)
);