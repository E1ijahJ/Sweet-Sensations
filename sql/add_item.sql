-- Users
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(255)
);

-- Products
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL
);

-- Carts
CREATE TABLE carts (
    id INT PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Cart Items
CREATE TABLE cart_items (
    id INT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
