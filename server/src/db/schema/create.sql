DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS washrooms CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE washrooms (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  date DATE,
  rating VARCHAR(255) NOT NULL,
  comment VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  washroom_id INTEGER REFERENCES washrooms(id) ON DELETE CASCADE
);