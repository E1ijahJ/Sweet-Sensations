-- 1. Purpose: Get all chocolate items from the menu
SELECT * FROM Menu
WHERE Category = 'Chocolate';


-- 2. Purpose: Find all menu items under $4.00
SELECT * FROM Menu
WHERE Price < 4.00
ORDER BY Price ASC;


-- 3. Purpose: Get reviews written by a customer named 'John Doe'
SELECT * FROM Reviews
WHERE Customer_Name = 'John Doe';


-- 4. Purpose: Find all contact messages with the subject 'Feedback'
SELECT * FROM Contact
WHERE Subject = 'Feedback';


-- 5. Purpose: Find the number of reviews per customer
SELECT Customer_Name, COUNT(*) AS review_count
FROM Reviews
GROUP BY Customer_Name
ORDER BY review_count DESC;


-- Purpose: Join reviews with customer contact info to see who wrote what
SELECT 
    r.Review_id,
    r.Customer_Name,
    r.Review,
    c.Email,
    c.Phone_Number
FROM Reviews r
JOIN Contact c ON r.Customer_id = c.Customer_id
ORDER BY r.Review_id;