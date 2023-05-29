const inquirer = require('inquirer');
const mysql = require("mysql2");

 async function inputScript() {
  return inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "What would you like to do? (use arrow keys)",
        choices:[
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit"
        ],
    },
    {
      type: "input",
      name: "lastName",
      message: "Enter the employee's last name:",
      when: function (answers) {
        return answers.options === " Add Employee";
      },
    },
    {
      type: "input",
      name: "role",
      message: "Enter the employee's role ID:",
      when: function (answers) {
        return answers.options === " Add Employee";
      },
    },
    {
      type: "input",
      name: "department",
      message: "Enter the employee's department ID:",
      when: function (answers) {
        return answers.options === " Add Employee";
      },
    },
      {
        type: "input",
        name: "departmentName",
        message: "Enter a new department name:",
        when: (answers) => answers.options === "Add Department",
      },
      {
        type: "input",
        name: "roleTitle",
        message: "Add a new role title:",
        when: (answers) => answers.options === "Add Role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter a salary:",
        when: (answers) => answers.options === "Add Role",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "Add Department ID for this role:",
        when: (answers) => answers.options === "Add Role",
      },
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
        when: function (answers) {
          return answers.options === " Add Employee";
        },
      },
      {
        type: "input",
        name: "manager",
        message: "Enter the employee's manager ID:",
        when: function (answers) {
          return answers.options === " Add Employee";
        },
      }
    ])
}

module.exports = inputScript;