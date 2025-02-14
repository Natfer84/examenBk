#DROP DATABASE superNat;
CREATE DATABASE superNat;

USE superNat;

CREATE TABLE customers (
	id INT AUTO_INCREMENT,
    dni CHAR(9) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    surnames VARCHAR(100),
    card_number VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);
	
    INSERT INTO customers VALUES(null, "22222222B","José", "Ramirez", 3155);
    INSERT INTO customers VALUES(null, "33333333C","Rafael", "Hernández",4555);
    INSERT INTO customers VALUES(null, "44444444D","Ana", "Rodríguez", 6998);
--INSERT INTO `customers` (`id`,`dni`,`name`,`surnames`,`card_number`) VALUES (DEFAULT,?,?,?,?);


CREATE TABLE products (
	id INT AUTO_INCREMENT,
    bar_code VARCHAR(20),
    `name` VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(id)
);
DELETE FROM products WHERE id= 7;

INSERT INTO products VALUES (null, "2810045BC", "zumosol", 2.75);
INSERT INTO products VALUES (null, "2810045TR", "pansol", 1);
INSERT INTO products VALUES (null, "2810045KK", "carnesol", 7);
INSERT INTO products VALUES (null, "2810045PP", "pescadosol", 9.55);
INSERT INTO products VALUES (null, "2810045LL", "frutasol", 5);
--INSERT INTO `products` (`id`,`bar_code`,`name`,`price`) VALUES (DEFAULT,?,?,?);

#DROP TABLE buys;
CREATE TABLE buys (
    id INT AUTO_INCREMENT,
    id_customer INT,
    id_product INT,
    quantity INT,  
    PRIMARY KEY(id),
    FOREIGN KEY (id_customer) REFERENCES customers(id),
    FOREIGN KEY (id_product) REFERENCES products(id)
);

INSERT INTO buys (id_customer, id_product, quantity) VALUES(1, 1, 2); 
INSERT INTO buys (id_customer, id_product, quantity) VALUES(2, 3, 1); 
INSERT INTO buys (id_customer, id_product, quantity) VALUES(3, 5, 3); 

SELECT name FROM products WHERE id = 2;
SELECT p.name FROM buys b JOIN products p ON b.id_product = p.id WHERE b.id_customer = 2;


