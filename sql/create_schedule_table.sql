--Create SQL table schedule
--Please note: have tried to use TIMESTAMP data type, but was having issues inserting values; this would be an area to work on for future

DROP TABLE IF EXISTS schedule; 

CREATE TABLE IF NOT EXISTS schedule (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    day INT CHECK (day >= 1 AND day <= 7),
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL
);