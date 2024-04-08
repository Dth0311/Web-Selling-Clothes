create database shopclothes_db;
use shopclothes_db;

CREATE TABLE role (
    id int AUTO_INCREMENT,
    name VARCHAR(20),
	primary key(id)
);

CREATE TABLE size (
    id INT AUTO_INCREMENT,
	name VARCHAR(20),
	primary key(id)
);

CREATE TABLE user (
    id int PRIMARY KEY AUTO_INCREMENT,
    first_Name NVARCHAR(255),
    last_Name NVARCHAR(255),
    user_Name NVARCHAR(255) not null,
    email VARCHAR(255) UNIQUE not null,
    password VARCHAR(255) not null,
    country NVARCHAR(255),
    address NVARCHAR(255),
    state NVARCHAR(255),
    phone VARCHAR(255),
    enable BOOLEAN,
    verification_code VARCHAR(64),
    role_id int,
     FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE orders (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    first_name NVARCHAR(255),
    last_name NVARCHAR(255),
    email VARCHAR(255),
    country NVARCHAR(255),
    address NVARCHAR(255),
    state NVARCHAR(255),
    phone VARCHAR(255),
    town NVARCHAR(255),
    post_code BIGINT,
    note NVARCHAR(255),
    total_price long,
	created_At DATETIME default current_timestamp,
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE order_detail (
    id int PRIMARY KEY AUTO_INCREMENT,
    price BIGINT,
    quantity INT,
    sub_total BIGINT,
    order_id INT,
    product_size_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_size_id) REFERENCES product_size(id)
);

CREATE TABLE image (
    id int PRIMARY KEY AUTO_INCREMENT,
    user_id int,
    name NVARCHAR(255),
    size BIGINT,
    type VARCHAR(255),
    data LONGBLOB,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    enable boolean default true
);

CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Description text,
    Price BIGINT,
    Category_id INT,
    FOREIGN KEY (Category_id) REFERENCES category(id)
);

CREATE TABLE product_size (
	id INT PRIMARY KEY AUTO_INCREMENT,
    size_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (size_id) REFERENCES size(id)
);


CREATE TABLE product_image (
	product_id int,
    image_id int,
    primary key(product_id,image_id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (image_id) REFERENCES image(id)
);

CREATE TABLE tag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(255),
    enable boolean default true
);

CREATE TABLE blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title NVARCHAR(255),
    description TEXT,
    content TEXT,
    created_At DATETIME default current_timestamp,
    user_id INT,
    image_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (image_id) REFERENCES image(id)
);

CREATE TABLE blog_tag (
    blog_id INT,
    tag_id INT,
    FOREIGN KEY (blog_id) REFERENCES blog(id),
    FOREIGN KEY (tag_id) REFERENCES tag(id)
);

ALTER TABLE order_detail
ADD COLUMN product_id INT,
ADD FOREIGN KEY (product_id) REFERENCES product(id);

    


