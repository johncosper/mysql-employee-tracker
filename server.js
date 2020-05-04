
const inquirer = require("inquirer");
const connection = require("./db/config/connection.js");

function searchDatabase() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "View department's salaries",
        "Add employee",
        "Remove employee",
        "Add department",
        "Remove department",
        "Add role",
        "Remove role",
        "Update employee",
        "Update employee's role",
        "Update employee's manager"
      ]
    }).then(function(answer) {
        switch(answer.action) {
            case "View all employees":
                employeeSearch();
                break;

            case "View all employees by department":
                employeeDepartmentSearch();
                break;
        
            case "View all employees by manager":
                employeeManagerSearch();
                break;

            case "View department's salaries":
                departmentSalarySearch();
                break;
            
            case "Add employee":
                employeeAdd();
                break;

            case "Remove employee":
                employeeRemove();
                break;

            case "Add department":
                departmentAdd();
                break;

            case "Remove department":
                departmentRemove();
                break;

            case "Add role":
                roleAdd();
                break;

            case "Remove role":
                roleRemove();
                break;

            case "Update employee":
                employeeUpdate();
                break;

            case "Update employee's role":
                employeeRoleUpdate();
                break;

            case "Update employee's manager":
                employeeManagerUpdate();
                break; 
        }
    });
}

function employeeSearch() {
    connection.query("SELECT e1.first_name, e1.last_name, role.title, department.name, role.salary, e2.first_name FROM employee e1 JOIN role ON e1.role_id = role.id AND role.salary JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id = e1.manager_id", (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log(res);
            // console.log(`ID: ${res[i].id} | name: ${res[i].first_name} ${res[i].last_name} | posistion: ${res[i].role.title} | department: ${res[i].department.title} | salary: ${res[i].role.salary} | manager: ${res[i].e2.first_name}`);
        }
    })
};

function employeeDepartmentSearch() {
    inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to view?",
      choices: []
    })
};

function employeeManagerSearch() {

};

function departmentSalarySearch() {

};

function employeeAdd() {
    inquirer
    .prompt([
        {
            name: "firstname",
            type: "input",
            message: "Employee's first name"
        },
        {
            name: "lastname",
            type: "input",
            message: "Employee's last name"
        },
        {
            name: "role",
            type: "list",
            message: "Employee's role",
            choices: []
        },
        {
            name: "manager",
            type: "list",
            message: "Employee's manager",
            choices: []
        },
    ])
};

function employeeRemove() {

};

function departmentAdd() {

};

function departmentRemove() {

};

function roleAdd() {

};

function roleRemove() {

};

function employeeUpdate() {

};

function employeeRoleUpdate() {

};

function employeeManagerUpdate() {

};

searchDatabase();