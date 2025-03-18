const mysql = require('mysql2');
//This is what allows our website to connect ot the database that we have created, currently it is using my locla information but we will change this soon since thats kind of crazy
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'V00686927',
  database: 'Sweet_Sensations_db'
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log(' Connected to MySQL database');
});

module.exports =connection;