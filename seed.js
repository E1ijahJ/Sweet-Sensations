const connection = require('./db');
//This is all the menu items with the Name, caloires, price,image ,and category all in to a list of menu items
const menuItems = [
    { category: "Vanilla", name: "Topped Vanilla Cupcakes", price: 180, image: "assets/images/toppedvanillacupcake.png", calories: 220 },
    { category: "Vanilla", name: "Vanilla Cupcakes", price: 150, image: "assets/images/vanillacupcake.png", calories: 200 },
    { category: "Vanilla", name: "2 Layered 6 in Vanilla Cake", price: 200, image: "assets/images/2layeredvanillacake.png", calories: 300 },
    { category: "Vanilla", name: "3 Layered 8 in Vanilla Cake", price: 350, image: "assets/images/3layeredvanillacake.png", calories: 600 },
    { category: "Vanilla", name: "Vanilla Sheet Cake", price: 400, image: "assets/images/vanillasheetcake.png", calories: 800 },
    { category: "Vanilla", name: "Vanilla Heart Cake", price: 600, image: "assets/images/vanillaheartcake.png", calories: 1200 },
    { category: "Chocolate", name: "Topped Chocolate Cupcakes", price: 180, image: "assets/images/toppedchocolatecupcake.png", calories: 220 },
    { category: "Chocolate", name: "Chocolate Cupcakes", price: 150, image: "assets/images/chocolatecupcake.png", calories: 200 },
    { category: "Chocolate", name: "2 Layered 6 in Chocolate Cake", price: 200, image: "assets/images/2layeredchocolatecake.png", calories: 300 },
    { category: "Chocolate", name: "3 Layered 8 in Chocolate Cake", price: 350, image: "assets/images/3layeredchocolatecake.png", calories: 600 },
    { category: "Chocolate", name: "Chocolate Sheet Cake", price: 400, image: "assets/images/chocolatesheetcake.png", calories: 800 },
    { category: "Chocolate", name: "Chocolate Heart Cake", price: 600, image: "assets/images/chocolateheartcake.png", calories: 1200 },
    { category: "Fruit", name: "Topped Fruit Cupcakes", price: 180, image: "assets/images/toppedfruitcupcake.png", calories: 220 },
    { category: "Fruit", name: "Fruit Cupcakes", price: 150, image: "assets/images/fruitcupcake.png", calories: 200 },
    { category: "Fruit", name: "2 Layered 6 in Fruit Cake", price: 200, image: "assets/images/2layeredfruitcake.png", calories: 300 },
    { category: "Fruit", name: "3 Layered 8 in Fruit Cake", price: 350, image: "assets/images/3layeredfruitcake.png", calories: 600 },
    { category: "Fruit", name: "Fruit Sheet Cake", price: 400, image: "assets/images/fruitsheetcake.png", calories: 800 },
    { category: "Fruit", name: "Fruit Heart Cake", price: 600, image: "assets/images/fruitheartcake.png", calories: 1200 },
    { category: "Honeybun", name: "Topped Honeybun Cupcakes", price: 180, image: "assets/images/toppedhoneybuncupcake.png", calories: 220 },
    { category: "Honeybun", name: "Honeybun Cupcakes", price: 150, image: "assets/images/honeybuncupcake.png", calories: 200 },
    { category: "Honeybun", name: "2 Layered 6 in Honeybun Cake", price: 200, image: "assets/images/2layeredhoneybuncake.png", calories: 300 },
    { category: "Honeybun", name: "3 Layered 8 in Honeybun Cake", price: 350, image: "assets/images/3layeredhoneybuncake.png", calories: 600 },
    { category: "Honeybun", name: "Honeybun Sheet Cake", price: 400, image: "assets/images/honeybunsheetcake.png", calories: 800 },
    { category: "Honeybun", name: "Honeybun Heart Cake", price: 600, image: "assets/images/honeybunheartcake.png", calories: 1200 },
    { category: "Chocolate", name: "Chocolate Chip Cookies", price: 2000, image: "assets/images/cookies.png", calories: 1200 }
];
const mockContacts = [
    { customer_id: 1, customer_Name: "John Doe", email: "john@example.com", phone_number: "555-1234", subject: "Feedback", message: "Loved the cupcakes!" },
    { customer_id: 2, customer_Name: "Jane Smith", email: "jane@example.com", phone_number: "555-5678", subject: "Order Inquiry", message: "Great honeybun cake!" },
    { customer_id: 3, customer_Name: "Michael Brown", email: "michael@example.com", phone_number: "555-9999", subject: "Support", message: "Had an issue with an order." },
    { customer_id: 4, customer_Name: "Emily White", email: "emily@example.com", phone_number: "555-4321", subject: "Suggestion", message: "Would love a tomato option!" },
    { customer_id: 5, customer_Name: "Daniel Green", email: "daniel@example.com", phone_number: "555-8888", subject: "Question", message: "Do you deliver to my area?" }
];

const mockReviews = [
    { customer_Name: "John Doe", review: "The cupcakes are amazing! Will definitely order again.", customer_id: 1 },
    { customer_Name: "Jane Smith", review: "Absolutely love the honeybun cake! Great customer service too!", customer_id: 2 },
    { customer_Name: "Michael Brown", review: "Delivery was fast and the cake was fresh.", customer_id: 3 },
    { customer_Name: "Emily White", review: "Beautiful packaging and the flavors were spot on.", customer_id: 4 },
    { customer_Name: "Daniel Green", review: "Portions are great — shared a whole heart cake with my fam.", customer_id: 5 }
];
// this funciton insertsions the data using a for loop for every item in the list, connecting to the database in sql.
const insertData = async () => {
    try {
        for (const contact of mockContacts) {
            await connection.promise().query(
                `INSERT INTO Contact (Customer_id, Customer_Name, Email, Phone_Number, Subject, Message) VALUES (?, ?, ?, ?, ?, ?)`,
                [contact.customer_id, contact.customer_Name, contact.email, contact.phone_number, contact.subject, contact.message]
            );
        }
        // Insert menu items into the database
        for (const item of menuItems) {
            await connection.promise().query(`
                INSERT INTO Menu (Category, Name, Price, Calories, Image)
                VALUES (?, ?, ?, ?, ?)
            `, [item.category, item.name, item.price, item.calories, item.image]);
        }

        console.log(" Sample menu data inserted successfully!");
        for (const review of mockReviews) {
            await connection.promise().query(
                `INSERT INTO Reviews (Customer_Name, Review, Customer_id) VALUES (?, ?, ?)`,
                [review.customer_Name, review.review, review.customer_id]
            );
        }
    } catch (error) {
        console.error(" Error inserting data:", error);
    } finally {
        connection.end();
    }
};

// Run the function to insert data
insertData();