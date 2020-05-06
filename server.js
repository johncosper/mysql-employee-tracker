const inquirer = require('inquirer');
const orm = require("./db/config/orm");

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
        "Update employee's manager",
        "Exit"
      ]
    }).then(function(answer) {
        switch(answer.action) {
            case "View all employees":
                orm.employeeSearch();
                break;

            case "View all employees by department":
                orm.employeeDepartmentSearch();
                break;
        
            case "View all employees by manager":
                orm.employeeManagerSearch();
                break;

            case "View department's salaries":
                orm.departmentSalarySearch();
                break;
            
            case "Add employee":
                orm.employeeAdd();
                break;

            case "Remove employee":
                orm.employeeRemove();
                break;

            case "Add department":
                orm.departmentAdd();
                break;

            case "Remove department":
                orm.departmentRemove();
                break;

            case "Add role":
                orm.roleAdd();
                break;

            case "Remove role":
                orm.roleRemove();
                break;

            case "Update employee":
                orm.employeeUpdate();
                break;

            case "Update employee's role":
                orm.employeeRoleUpdate();
                break;

            case "Update employee's manager":
                orm.employeeManagerUpdate();
                break; 
        }
    });

}

searchDatabase();