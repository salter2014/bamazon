CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(500) NOT NULL,
	department_name VARCHAR(500) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(3) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Odyssey", "Books", 5.00, 3), ("Romeo and Juliet", "Books", 7.50, 3), ("Tarzan", "DVD", 11.25, 3), ("Alexa", "Electronics", 35.32, 4), ("Play Doh", "Toys", 2.50, 2), ("Spatula", "Cooking", 7.85, 4), ("Matress", "Furniture", 849.65, 3), ("Lamp", "Furniture", 17.62, 3), ("iPhone", "Electronics", 599.99, 2), ("Android", "Electronics", 199.99, 5);