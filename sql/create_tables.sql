-- Drop tables in reverse foreign key order to avoid constraint errors this is for testing to make sure tables are created
DROP TABLE IF EXISTS Order_Items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Contact;
DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS Cart; 

-- Create Menu table
CREATE TABLE Menu (
    itemid INT AUTO_INCREMENT PRIMARY KEY,
    Category VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Calories INT,
    Image VARCHAR(255)
);

-- Create Contact table
CREATE TABLE Contact (
    Customer_id INT PRIMARY KEY,
    Customer_Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone_Number VARCHAR(20),
    Subject VARCHAR(100),
    Message TEXT
);

-- Create Reviews table
CREATE TABLE Reviews (
    Review_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_Name VARCHAR(100),
    Review TEXT,
    Customer_id INT,
    FOREIGN KEY (Customer_id) REFERENCES Contact(Customer_id) ON DELETE CASCADE
);

-- Create Orders table
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    Total DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Contact(Customer_id) ON DELETE CASCADE
);

-- Create Order_Items table
CREATE TABLE Order_Items (
    Order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    OrderID INT, 
    itemid INT,
    Quantity INT,
    Subtotal DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (itemid) REFERENCES Menu(itemid) ON DELETE CASCADE
);

-- Create Cart table
CREATE TABLE Cart (
    Cart_id INT PRIMARY KEY,
    product_id INT,
    quantity INT,
    FOREIGN KEY (product_id) REFERENCES Products(ProductID)
);


