const inquirer = require('inquirer');
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

function userInput() {
       inquirer.prompt([
        {
          type: "list",
          name: "options",
          message: "What would you like to do? (use arrow keys)",
          choices:[
                  "View All Employees",
                  "Add an Employee",
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

            case "Add a Department":
                addDept();
            break;

            case "Add a Role":
                addRole();
            break;

            case "Add an Employee":
                addEmployee();
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
        inquirer.prompt([
            {
              type: "input",
              name: "department_name",
              message: "Enter the name of the new department:",
            },
          ])
          .then(function (answers) {
            // Get the department name from user input
            const departmentName = answers.department_name;
      
            // Insert the new department into the departments table
            db.query(
              "INSERT INTO departments (department_name) VALUES (?)",
              [departmentName],
              function (err, res) {
                if (err) throw err;
                console.log(` "${departmentName}" department added successfully!`);
                userInput();
              }
            );
          });
      }

      async function addRole() {

        const departmentChoices = await getDepartmentChoices(); // Fetch department choices

        inquirer.prompt([
            {
              type: "input",
              name: "title",
              message: "Enter the title of the new role:",
            },
            {
              type: "number",
              name: "salary",
              message: "Enter the salary for the new role:",
            },
            {
              type: "list",
              name: "department_id",
              message: "Select the department for the new role:",
              choices: getDepartmentChoices, // fetch department choices
            },
          ])
          .then (function (answers) {
            // Get the role data from user input
            const { title, salary, department_id } = answers;
      
            // Insert the new role into the roles table
            db.query(
              "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
              [title, salary, department_id],
              function (err, res) {
                if (err) throw err;
                console.log(`Role "${title}" added successfully!`);
                userInput();
              }
            );
          });
      }
      
// Helper function to fetch department choices for inquirer prompt
function getDepartmentChoices() {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, department_name FROM departments", (err, res) => {
      if (err) {
        reject(err);
      } else {
        const choices = res.map((department) => ({
          name: department.department_name,
          value: department.id,
        }));
        resolve(choices);
      }
    });
  });
}

async function addEmployee() {
  const managerChoices = await getManagerChoices();
  const roleChoices = await getRoleChoices(); 

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name:",
      },
      {
        type: "list",
        name: "role_id",
        message: "Select the role for the employee:",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Select the manager for the employee:",
        choices: managerChoices,
      },
    ])
    .then(function (answers) {
      // Get the employee data from user input
      const { first_name, last_name, role_id, manager_id } = answers;

      // Insert the new employee into the employees table
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [first_name, last_name, role_id, manager_id],
        function (err, res) {
          if (err) throw err;
          console.log(`Employee "${first_name} ${last_name}" added successfully!`);
          userInput();
        }
      );
    });
}
      //  function to fetch role choices for addEmployee prompt
function getRoleChoices() {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, title FROM roles", (err, res) => {
      if (err) {
        reject(err);
      } else {
        const choices = res.map((role) => ({
          name: role.title,
          value: role.id,
        }));
        resolve(choices);
      }
    });
  });
}

//  function to fetch manager choices for addEmployee prompt
function getManagerChoices() {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM employees", (err, res) => {
      if (err) {
        reject(err);
      } else {
        const choices = res.map((manager) => ({
          name: manager.manager_name,
          value: manager.id,
        }));
        resolve(choices);
      }
    });
  });
}

      userInput();