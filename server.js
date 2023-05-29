const inquirer = require('inquirer');
// const inquirerScript = require("./inquirer_script.js");
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'password!',
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);

// // Get all departments
// app.get('/api/departments', (req, res) => {
//   const sql = `SELECT id, department_name AS department FROM departments`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Get all roles
// app.get('/api/roles', (req, res) => {
//   const sql = `SELECT id, title, salary, department_id FROM roles`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Get all employees
// app.get('/api/employees', (req, res) => {
//   const sql = `SELECT id, first_name, last_name, role_id FROM employees`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Add a department
// app.post('/api/new-department', ({ body }, res) => {
//   const sql = `INSERT INTO departments (department_name)
//     VALUES (?)`;
//   const params = [body.department_name];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'Department succesfully added.',
//       data: body
//     });
//   });
// });

// // Add a role
// app.post('/api/new-role', ({ body }, res) => {
//   const sql = `INSERT INTO roles (title, salary, department_id)
//     VALUES (?)`;
//   const params = [req.body.title, req.body.salary, req.body.department_id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'Role succesfully added.',
//       data: body
//     });
//   });
// });

// // Add an employee
// app.post('/api/new-employee', ({ body }, res) => {
//   const sql = `INSERT INTO employee (first_name, last_name, manager)
//     VALUES (?)`;
//   const params = [req.body.first_name, req.body.last_name, req.body.manager_id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'Employee successfully added.',
//       data: body
//     });
//   });
// });

// // Update employee's role
// app.put('/api/employees/:id', (req, res) => {
//   const sql = `UPDATE employees SET role_id = ?  WHERE id = ?`;
//   const params = [req.body.role_id, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Employee not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function userInput() {
       inquirer.prompt([
        {
          type: "list",
          name: "options",
          message: "What would you like to do? (use arrow keys)",
          choices:[
                  "View All Employees",
                  "Add an Employee",
                  "Update an Employee Role",
                  "View All Roles",
                  "Add a Role",
                  "View All Departments",
                  "Add a Department",
                  "Exit"
                  ],
        },
      ]).then(function(answers) {
          switch (answers.options) {
            case "View All Employees":
                viewAllEmployees();
            break;

            case "View All Departments":
                viewAllDepts();
            break;

            case "View All Roles":
                viewAllRoles();
            break;

            case "Add Department":
                addDept();
            break;

            case "Add Role":
                addRole();
            break;

            case "Add Employee":
                addEmployee();
            break;

            case "Update Employee Role":
                updateEmployeeRole();
            break;

            case "Exit":
                console.log ("Goodbye!");
                db.end();
            break;
            }
      })
    };

      function viewAllEmployees() {
        db.query(
          "SELECT e.id AS Employee_ID, e.first_name AS First_Name, e.last_name AS Last_Name, r.title AS Title, r.salary AS Salary, d.department_name AS Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id LEFT JOIN employees m ON m.id = e.manager_id;",
        
        function(err, res) {
          if (err) throw err
          console.log("----EMPLOYEES----");
          console.table(res)
          userInput();
       })
      };

      function viewAllDepts() {
        db.query(
          "SELECT id AS Department_ID, department_name AS Department_Name FROM departments;",
          function(err, res) {
            if (err) throw err;
            console.log("----DEPARTMENTS----");
            console.table(res);
            userInput();
          }
        );
      };
      function viewAllRoles() {
        db.query(
          "SELECT r.id AS Role_ID, r.title AS Role_Title, d.department_name AS Department, r.salary AS Salary FROM roles r INNER JOIN departments d ON d.id = r.department_id;",
          function(err, res) {
            if (err) throw err;
            console.log("----ROLES----");
            console.table(res);
            userInput();
          }
        );
      };
      function addDept() {
        prompt.get(["department_name"], function(err, result) {
          if (err) throw err;
    
          // Get the department name from user input
          const departmentName = result.department_name;
      
          // Insert the new department into the departments table
          db.query(
            "INSERT INTO departments (department_name) VALUES (?)",
            [departmentName],
            function(err, res) {
              if (err) throw err;
              console.log(`Department "${departmentName}" added successfully!`);
              userInput();
            }
          );
        });
      }
      

      userInput();