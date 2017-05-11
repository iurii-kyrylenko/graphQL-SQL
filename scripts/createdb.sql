-- sqlite3 db.sqlite3 < scripts/createdb.sql

DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id INTEGER PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE stories
(
  id INTEGER PRIMARY KEY,
  text TEXT,
  author INTEGER,
  FOREIGN KEY(author) REFERENCES users(id)
);

INSERT INTO users('name')
VALUES
('user-001'),
('user-002'),
('user-003'),
('user-004'),
('user-005'),
('user-006'),
('user-007'),
('user-008'),
('user-009'),
('user-010'),
('user-011'),
('user-012'),
('user-013'),
('user-014'),
('user-015'),
('user-016'),
('user-017'),
('user-018'),
('user-019'),
('user-020'),
('user-021'),
('user-022'),
('user-023'),
('user-024'),
('user-025'),
('user-026'),
('user-027'),
('user-028'),
('user-029'),
('user-030'),
('user-031'),
('user-032');

INSERT INTO stories ('text', 'author')
VALUES
('story-001', 23),
('story-002', 7),
('story-003', 14),
('story-004', 32),
('story-005', 6),
('story-006', 24),
('story-007', 25),
('story-008', 12),
('story-009', 8),
('story-010', 8),
('story-011', 27),
('story-012', 28),
('story-013', 19),
('story-014', 20),
('story-015', 9),
('story-016', 24),
('story-017', 16),
('story-018', 24),
('story-019', 5),
('story-020', 9),
('story-021', 1),
('story-022', 14),
('story-023', 23),
('story-024', 13),
('story-025', 13),
('story-026', 8),
('story-027', 16),
('story-028', 23),
('story-029', 19),
('story-030', 26),
('story-031', 5),
('story-032', 10);
