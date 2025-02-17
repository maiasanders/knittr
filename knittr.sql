BEGIN TRANSACTION;

DROP TABLE IF EXISTS pattern_categories, categories, step_by_size_yarn, projects, sizes, yarn_types, steps, images, notes, patterns, users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL
);

CREATE TABLE patterns (
    pattern_id SERIAL PRIMARY KEY,
    author INTEGER NOT NULL FOREIGN KEY REFERENCES users(user_id),
    pattern_name VARCHAR(200) NOT NULL,
    desc VARCHAR(1000),
    public BOOLEAN DEFAULT FALSE
);

CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL FOREIGN KEY REFERENCES projects(project_id),
    note_body VARCHAR(1000)
);

CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    image_link VARCHAR(500) NOT NULL,
    pattern_id INTEGER NOT NULL FOREIGN KEY REFERENCES patterns(pattern_id),
    submitted_by INTEGER NOT NULL FOREIGN KEY REFERENCES users(user_id),
    desc VARCHAR(100)
);

CREATE TABLE steps (
    step_id SERIAL PRIMARY KEY,
    pattern_id INTEGER NOT NULL FOREIGN KEY REFERENCES patterns(pattern_id),
    yarn_id INTEGER FOREIGN KEY REFERENCES yarn_types(yarn_id),
    size_id INTEGER FOREIGN KEY REFERENCES sizes(size_id),
    title VARCHAR(100),
    order INTEGER NOT NULL,
    rows TEXT[]
);

CREATE TABLE yarn_types (
    yarn_id SERIAL PRIMARY KEY,
    yarn_name VARCHAR(100)
);

CREATE TABLE sizes (
    size_id SERIAL PRIMARY KEY,
    size_name VARCHAR(100),
    age_category VARCHAR(100)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    maker_id INTEGER NOT NULL FOREIGN KEY REFERENCES users(user_id),
    pattern_id INTEGER NOT NULL FOREIGN KEY REFERENCES patterns(pattern_id),
    yarns_used VARCHAR(300),
    current_row INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE step_by_size_yarn (
    step_id INTEGER NOT NULL FOREIGN KEY REFERENCES steps(step_id),
    yarn_id INTEGER FOREIGN KEY REFERENCES yarn_types(yarn_id),
    size_id INTEGER FOREIGN KEY REFERENCES sizes(size_id),
    rows VARCHAR(100),
    repeats INTEGER,
    desc VARCHAR(300),
    PRIMARY KEY(step_id, yarn_id, size_id)
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    cat_name VARCHAR(200)
);

CREATE TABLE pattern_categories (
    pattern_id INTEGER NOT NULL FOREIGN KEY REFERENCES patterns(pattern_id),
    category_id INTEGER NOT NULL FOREIGN KEY REFERENCES categories(category_id),
    PRIMARY KEY (pattern_id, category_id)
);

CREATE TABLE user_patterns (
    user_id INTEGER NOT NULL FOREIGN KEY REFERENCES users(user_id),
    pattern_id INTEGER NOT NULL FOREIGN KEY REFERENCES patterns(pattern_id),
    PRIMARY KEY(user_id, pattern_id)
)

COMMIT;
