CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  name VARCHAR(45) NOT NULL,
  password VARCHAR(20) NOT NULL,
  contact VARCHAR(45)
);

CREATE TABLE channels (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  sub_num INT NOT NULL DEFAULT 0,
  video_cnt INT DEFAULT 0,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Youtube.users(id)
);

INSERT INTO users (email, name, password, contact)
VALUES ('kim@mail.com', 'kimchi', '1111', '010-1234-5678');

INSERT INTO users (email, name, password, contact)
VALUES ('park@mail.com', 'parkchi', '1111', '010-1234-5679');

INSERT INTO channels (name, sub_num, video_cnt, user_id)
VALUES ('park', 1, 5, 1);

ALTER TABLE users
ADD COLUMN created_at TIMESTAMP;