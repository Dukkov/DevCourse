CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  job VARCHAR(100),
  birth DATE
);

INSERT INTO users (name, job, birth) VALUES ("gongu", "actor", "800123");

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO posts (title, content) 
VALUES ("title1", "content1");

ALTER TABLE posts
ADD COLUMN updated_at DATETIME 
DEFAULT NOW()
ON UPDATE NOW();

ALTER TABLE posts
ADD COLUMN user_id INT;

ALTER TABLE posts 
ADD FOREIGN KEY(user_id)
REFERENCES users(id);