-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
  username TEXT NOT NULL PRIMARY KEY,
  photo_url TEXT NOT NULL
);

INSERT INTO github_users (username, photo_url)
VALUES ('fake_github_user', 'https://www.placecage.com/gif/300/300');

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT REFERENCES github_users(username),
  text VARCHAR(255) NOT NULL
);

INSERT INTO posts (username, text)
VALUES ('fake_github_user', 'my first fake post. hooray!')