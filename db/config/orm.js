const inquirer = require("inquirer");
const connection = require("./connection");

const orm = {
employeeSearch: function() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
	                    FROM employee 
		                    JOIN role ON employee.role_id = role.id AND role.salary 
			                    JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.table(`ID: ${res[i].id} | name: ${res[i].first_name} ${res[i].last_name} | posistion: ${res[i].title} | department: ${res[i].name} | salary: ${res[i].salary} | manager: ${res[i].manager_id}`);
        }
    });
},

employeeDepartmentSearch: function() {
    inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "Which department would you like to view?",
    }).then((answer) => {
        connection.query(`SELECT employee.first_name, employee.last_name, department.name
                            FROM employee
                                JOIN role ON employee.role_id = role.id
                                    JOIN department ON role.department_id = department.id
                                        WHERE department.name = "${answer.department}"`, (err, res) => {
            if (err) throw err;
            for ( i = 0; i < res.length; i++) {
                console.table(`name: ${res[i].first_name} ${res[i].last_name} | department: ${res[i].name}`);
            }
        });
    });
},

employeeManagerSearch: function() {

},

departmentSalarySearch: function() {

},

employeeAdd: function() {
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
},

employeeRemove: function() {

},

departmentAdd: function() {
    inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    }).then()
},

departmentRemove: function() {

},

roleAdd: function() {

},

roleRemove: function() {

},

employeeUpdate: function() {

},

employeeRoleUpdate: function() {

},

employeeManagerUpdate: function() {

}

}

module.exports = orm;