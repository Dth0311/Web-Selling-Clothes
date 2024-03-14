create database shopclothes_db;
use shopclothes_db;

CREATE TABLE role (
    id int AUTO_INCREMENT,
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
    verification_code VARCHAR(64)
);

CREATE TABLE user_role (
    user_id int,
    role_id int,
    primary key(user_id,role_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
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
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE order_detail (
    id int PRIMARY KEY AUTO_INCREMENT,
    price BIGINT,
    quantity INT,
    sub_total BIGINT,
    order_id int,
    FOREIGN KEY (order_id) REFERENCES orders(id)
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
    name NVARCHAR(255),
    enable boolean
);

CREATE TABLE product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    Description VARCHAR(255),
    Price BIGINT,
    Quantity INT,
    Category_id INT,
    FOREIGN KEY (Category_id) REFERENCES category(id)
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
    enable BIT(1)
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

ALTER TABLE category
MODIFY COLUMN enable boolean DEFAULT true;

ALTER TABLE tag
MODIFY COLUMN enable boolean DEFAULT false;

ALTER TABLE orders
ADD COLUMN total_price Long;

ALTER TABLE order_detail
ADD COLUMN product_id INT,
ADD FOREIGN KEY (product_id) REFERENCES product(id);

