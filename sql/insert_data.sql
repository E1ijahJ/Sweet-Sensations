-- Just for testing to ensure the sql files are inserting data and to remove any duplicate data as well

DELETE FROM Order_Items;
DELETE FROM Orders;
DELETE FROM Reviews;
DELETE FROM Contact;
DELETE FROM Menu;


-- Insert sample data into Menu
INSERT INTO Menu (Category, Name, Price, Calories, Image) VALUES
('Vanilla', 'Topped Vanilla Cupcakes', 1.80, 220, 'assets/images/toppedvanillacupcake.png'),
('Vanilla', 'Vanilla Cupcakes', 1.50, 200, 'assets/images/vanillacupcake.png'),
('Vanilla', '2 Layered 6 in Vanilla Cake', 2.00, 300, 'assets/images/2layeredvanillacake.png'),
('Vanilla', '3 Layered 8 in Vanilla Cake', 3.50, 600, 'assets/images/3layeredvanillacake.png'),
('Vanilla', 'Vanilla Sheet Cake', 4.00, 800, 'assets/images/vanillasheetcake.png'),
('Vanilla', 'Vanilla Heart Cake', 6.00, 1200, 'assets/images/vanillaheartcake.png'),
('Chocolate', 'Topped Chocolate Cupcakes', 1.80, 220, 'assets/images/toppedchocolatecupcake.png'),
('Chocolate', 'Chocolate Cupcakes', 1.50, 200, 'assets/images/chocolatecupcake.png'),
('Chocolate', '2 Layered 6 in Chocolate Cake', 2.00, 300, 'assets/images/2layeredchocolatecake.png'),
('Chocolate', '3 Layered 8 in Chocolate Cake', 3.50, 600, 'assets/images/3layeredchocolatecake.png'),
('Chocolate', 'Chocolate Sheet Cake', 4.00, 800, 'assets/images/chocolatesheetcake.png'),
('Chocolate', 'Chocolate Heart Cake', 6.00, 1200, 'assets/images/chocolateheartcake.png'),
('Fruit', 'Topped Fruit Cupcakes', 1.80, 220, 'assets/images/toppedfruitcupcake.png'),
('Fruit', 'Fruit Cupcakes', 1.50, 200, 'assets/images/fruitcupcake.png'),
('Fruit', '2 Layered 6 in Fruit Cake', 2.00, 300, 'assets/images/2layeredfruitcake.png'),
('Fruit', '3 Layered 8 in Fruit Cake', 3.50, 600, 'assets/images/3layeredfruitcake.png'),
('Fruit', 'Fruit Sheet Cake', 4.00, 800, 'assets/images/fruitsheetcake.png'),
('Fruit', 'Fruit Heart Cake', 6.00, 1200, 'assets/images/fruitheartcake.png'),
('Honeybun', 'Topped Honeybun Cupcakes', 1.80, 220, 'assets/images/toppedhoneybuncupcake.png'),
('Honeybun', 'Honeybun Cupcakes', 1.50, 200, 'assets/images/honeybuncupcake.png'),
('Honeybun', '2 Layered 6 in Honeybun Cake', 2.00, 300, 'assets/images/2layeredhoneybuncake.png'),
('Honeybun', '3 Layered 8 in Honeybun Cake', 3.50, 600, 'assets/images/3layeredhoneybuncake.png'),
('Honeybun', 'Honeybun Sheet Cake', 4.00, 800, 'assets/images/honeybunsheetcake.png'),
('Honeybun', 'Honeybun Heart Cake', 6.00, 1200, 'assets/images/honeybunheartcake.png'),
('Chocolate', 'Chocolate Chip Cookies', 20.00, 1200, 'assets/images/cookies.png');



-- Insert sample data into Contact
INSERT INTO Contact (Customer_id, Customer_Name, Email, Phone_Number, Subject, Message) VALUES
(1, 'John Doe', 'john@example.com', '555-1234', 'Feedback', 'Loved the cupcakes!'),
(2, 'Jane Smith', 'jane@example.com', '555-5678', 'Order Inquiry', 'Great honeybun cake!'),
(3, 'Michael Brown', 'michael@example.com', '555-9999', 'Support', 'Had an issue with an order.'),
(4, 'Emily White', 'emily@example.com', '555-4321', 'Suggestion', 'Would love a lemon option!'),
(5, 'Daniel Green', 'daniel@example.com', '555-8888', 'Question', 'Do you deliver to my area?');



-- Insert sample data into Reviews
INSERT INTO Reviews (Customer_Name, Review, Customer_id) VALUES
('John Doe', 'The cupcakes are amazing! Will definitely order again.', 1),
('Jane Smith', 'Absolutely love the honeybun cake! Great customer service too!', 2),
('Michael Brown', 'Delivery was fast and the cake was fresh.', 3),
('Emily White', 'Beautiful packaging and the flavors were spot on.', 4),
('Daniel Green', 'Portions are great — shared a whole heart cake with my fam.', 5);