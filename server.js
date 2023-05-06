const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the Fast-Staff database!`)
);

// // Query database
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(err);
//   console.log(results);
// });

// // Query database
// let deletedRow = 2;

// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// // Query database
// db.query('SELECT * FROM favorite_books', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
