BEGIN TRANSACTION;

DROP TABLE IF EXISTS user_patterns, pattern_categories, categories, notes, steps, projects, "rows", pattern_variants, steps, sizes, yarn_types, images, patterns, users CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL
);

CREATE TABLE patterns (
    pattern_id SERIAL PRIMARY KEY,
    author INTEGER NOT NULL REFERENCES users(user_id),
    pattern_name VARCHAR(200) NOT NULL,
    "desc" VARCHAR(1000),
    public BOOLEAN DEFAULT FALSE
);


CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    image_link VARCHAR(500) NOT NULL,
    pattern_id INTEGER NOT NULL REFERENCES patterns(pattern_id),
    submitted_by INTEGER NOT NULL REFERENCES users(user_id),
    "desc" VARCHAR(100)
);

ALTER TABLE patterns
    ADD COLUMN default_image INTEGER REFERENCES images(image_id);

CREATE TABLE yarn_types (
    yarn_id SERIAL PRIMARY KEY,
    yarn_name VARCHAR(100)
);

CREATE TABLE sizes (
    size_id SERIAL PRIMARY KEY,
    size_name VARCHAR(100) NOT NULL,
    age_category VARCHAR(100) DEFAULT 'n/a'
);

CREATE TABLE pattern_variants (
    variant_id SERIAL PRIMARY KEY,
    pattern_id INTEGER NOT NULL REFERENCES patterns(pattern_id),
    yarn_id INTEGER NOT NULL REFERENCES yarn_types(yarn_id),
    size_id INTEGER NOT NULL REFERENCES sizes(size_id),
    CONSTRAINT uq_pattern_yarn_size UNIQUE (pattern_id, yarn_id, size_id)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    maker_id INTEGER NOT NULL REFERENCES users(user_id),
    variant_id INTEGER NOT NULL REFERENCES pattern_variants,
    yarns_used VARCHAR(300),
    current_row INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    template_project BOOLEAN
);

CREATE TABLE steps (
    step_id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES pattern_variants(variant_id)
    title VARCHAR(100),
    step_num INTEGER NOT NULL
);

CREATE TABLE "rows" (
    row_id SERIAL PRIMARY KEY,
    step_id INTEGER NOT NULL REFERENCES steps(step_id),
    directions VARCHAR(1000) NOT NULL,
    row_num INTEGER NOT NULL
);


CREATE TABLE notes (
    note_id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(project_id),
    note_body VARCHAR(1000)
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    cat_name VARCHAR(200)
);

CREATE TABLE pattern_categories (
    pattern_id INTEGER NOT NULL REFERENCES patterns(pattern_id),
    category_id INTEGER NOT NULL REFERENCES categories(category_id),
    PRIMARY KEY (pattern_id, category_id)
);

CREATE TABLE user_patterns (
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    pattern_id INTEGER NOT NULL REFERENCES patterns(pattern_id),
    PRIMARY KEY(user_id, pattern_id)
);

COMMIT;
