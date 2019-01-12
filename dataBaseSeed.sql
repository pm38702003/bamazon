DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Porsche","Autos", 100002.50, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mercedes","Autos", 120002.50, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Corvette","Autos", 90002.50, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tires","Parts", 202.50, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Batteries","Parts", 202.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV","Electronics", 602.50, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone","Electronics", 502.50, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweaters","Apparel", 32.50, 22);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sneakers","Apparel", 102.50, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts","Apparel", 19.50, 42);
