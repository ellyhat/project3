DROP TABLE IF EXISTS schedule; 

CREATE TABLE IF NOT EXISTS schedule (
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    day INT CHECK (day >= 1 AND day <= 7),
    start_time TIMESTAMP NOT NULL, 
    end_time TIMESTAMP NOT NULL 
);