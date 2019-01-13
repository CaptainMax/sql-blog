CREATE TABLE blogSchema(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255), 
    image VARCHAR(255),
    body VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);