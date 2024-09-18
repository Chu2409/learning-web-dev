CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
);

-- One to One --
CREATE TABLE contact_details (
  id INTEGER REFERENCES students(id) UNIQUE,
  tel TEXT,
  address TEXT
);

-- Data --
INSERT INTO student (first_name, last_name)
VALUES ('Angela', 'Yu');
INSERT INTO contact_detail (id, tel, address)
VALUES (1, '+123456789', '123 App Brewery Road');

-- Join --
SELECT * 
FROM students
JOIN contact_detail
ON students.id = contact_detail.id


-- Many to One --
CREATE TABLE homework_submissions (
  id SERIAL PRIMARY KEY,
  mark INTEGER,
  student_id INTEGER REFERENCES students(id)
);

-- Data --
INSERT INTO homework_submissions (mark, student_id)
VALUES (98, 1), (87, 1), (88, 1)

-- Join --
SELECT *
FROM students
JOIN homework_submissions
ON students.id = student_id

SELECT student.id, first_name, last_name, mark
FROM student
JOIN homework_submission
ON student.id = student_id

-- Many to Many --
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(45)
);

CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  class_id INTEGER REFERENCES classes(id),
  PRIMARY KEY (student_id, class_id)
);

-- Data --
INSERT INTO students (first_name, last_name)
VALUES ('Jack', 'Bauer');

INSERT INTO classes (title)
VALUES ('English Literature'), ('Maths'), ('Physics');

INSERT INTO enrollments (student_id, class_id ) VALUES (1, 1), (1, 2);
INSERT INTO enrollments (student_id ,class_id) VALUES (2, 2), (2, 3);

-- Join --
SELECT *
FROM enrollments
JOIN students ON students.id = enrollments.student_id
JOIN classes ON classes.id = enrollments.class_id;

SELECT students.id AS id, first_name, last_name, title
FROM enrollments 
JOIN students ON students.id = enrollments.student_id
JOIN classes ON classes.id = enrollments.class_id;

-- ALIAS --
SELECT s.id AS id, first_name, last_name, title
FROM enrollments AS e
JOIN students AS s ON s.id = e.student_id
JOIN classes AS c ON c.id = e.class_id;


SELECT s.id AS id, first_name, last_name, title
FROM enrollments e
JOIN students s ON s.id = e.student_id
JOIN classes c ON c.id = e.class_id;


-- EXERCISE SOLUTION AND SETUP --

DROP TABLE IF EXISTS visited_countries, users;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
user_id INTEGER REFERENCES users(id)
);

INSERT INTO users (name, color)
VALUES ('Angela', 'teal'), ('Jack', 'powderblue');

INSERT INTO visited_countries (country_code, user_id)
VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2 );

SELECT *
FROM visited_countries
JOIN users
ON users.id = user_id;