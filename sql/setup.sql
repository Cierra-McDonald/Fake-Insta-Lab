DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments;

CREATE TABLE users (
    github_username TEXT NOT NULL PRIMARY KEY,
    github_photo_url TEXT NOT NULL
);

CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users(github_username),
    photo_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    tags TEXT[]
);

CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_by TEXT NOT NULL REFERENCES users(github_username),
    post TEXT NOT NULL REFERENCES posts(username),
    comment VARCHAR(280) NOT NULL
)