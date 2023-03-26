DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  zipcode INT
);