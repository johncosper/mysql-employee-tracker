const inquirer = require('inquirer');
const connection = require("./db/config/connection");

const searchDatabase = function() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View department's salaries",
        "Add employee",
        "Remove employee",
        "Add department",
        "Remove department",
        "Add role",
        "Remove role",
        "Update employee's role",
        "Exit"
      ]
    }).then(function(answer) {
        switch(answer.action) {
            case "View all employees":
                employeeSearch();
                break;

            case "View all employees by department":
                employeeDepartmentSearch();
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

            case "Update employee's role":
                updateEmployeeRoles();
                break;
            
            case "Exit":
                finish();
                break;
        }
    });

};

searchDatabase();

function employeeSearch() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
                            FROM employee 
                                JOIN role ON employee.role_id = role.id AND role.salary 
                                    JOIN department ON role.department_id = department.id`, (err, res) => {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                console.table(`ID: ${res[i].id} | name: ${res[i].first_name} ${res[i].last_name} | posistion: ${res[i].title} | department: ${res[i].name} | salary: ${res[i].salary} | manager: ${res[i].manager_id}`);
            }
            searchDatabase();
        });
};
    
function employeeDepartmentSearch() {
    connection.query(`SELECT department.name FROM department`, (err, res) => {
        if (err) {
            throw err;
        } else {
            let dep = [];
            res.forEach((data) => {
                dep.push(data.name);
            })
                inquirer
                .prompt({
                    name: "department",
                    type: "list",
                    message: "Which department would you like to view?",
                    choices: dep
                }).then((answer) => {
                    connection.query(`SELECT employee.first_name, employee.last_name, department.name
                                        FROM employee
                                            JOIN role ON employee.role_id = role.id
                                                JOIN department ON role.department_id = department.id
                                                    WHERE department.name = "${answer.department}"`, (err, res) => {
                        if (err) throw err;
                        for (i = 0; i < res.length; i++) {
                            console.log(`name: ${res[i].first_name} ${res[i].last_name} | department: ${res[i].name}`);
                        }
                    });
                    searchDatabase();
                });
        };
    });
};
    
function departmentSalarySearch() {
    connection.query(`SELECT department.name FROM department`, (err, res) => {
        if (err) {
            throw err;
        } else {
            let dep = [];
            res.forEach((data) => {
                dep.push(data.name);
            })
                inquirer
                .prompt({
                    name: "department",
                    type: "list",
                    message: "Which department would you like to view?",
                    choices: dep
                }).then((answer) => {
                    connection.query(`SELECT employee.first_name, employee.last_name, role.salary, department.name
                                        FROM employee
                                            JOIN role ON employee.role_id = role.id
                                                JOIN department ON role.department_id = department.id
                                                    WHERE department.name = "${answer.department}"`, (err, res) => {
                        if (err) throw err;
                        for (i = 0; i < res.length; i++) {
                            console.table(`name: ${res[i].first_name} ${res[i].last_name} | salary: ${res[i].salary} | department: ${res[i].name}`);
                        }
                    });
                    searchDatabase();
                });
        };
    });
};
    
function employeeAdd() {
    connection.query(`SELECT * FROM role `, (err, res) => {
        if (err) {
            throw err;
        } else {
                inquirer
                .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "roleName",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: function () {
                        let roleChoices = [];
                        res.forEach((data) => {
                            roleChoices.push(data.title);
                        })
                        return roleChoices;
                    }
                }
                ]).then((answer) => {
                    console.log(answer.roleName);
                    const role = answer.roleName;
                    connection.query(`SELECT * FROM role`, (err, res) => {
                        if (err) throw err;
                        let filteredRole = res.filter((res) => {
                            return res.title == role;
                        })
                        let roleId = filteredRole[0].id
                        console.log(roleId);
                        connection.query(`SELECT * FROM employee`, (err, res) => {
                            inquirer
                            .prompt([
                                {
                                    name: "manager",
                                    type: "list",
                                    message: "Who is their manager?",
                                    choices: function() {
                                        managerArr = [];
                                        res.forEach((res) => {
                                            managerArr.push(res.last_name);
                                        })
                                        return managerArr;
                                    }
                                }
                            ]).then((managerAnswer) => {
                                const manager = managerAnswer.manager;
                                connection.query(`SELECT * FROM employee`, (err, res) => {
                                    if (err) throw err;
                                    let filteredManager = res.filter((res) => {
                                        return res.last_name = manager;
                                    })
                                    let managerId = filteredManager[0].id;
                                    console.log(managerId);
                                    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}", "${answer.lastName}", ${roleId}, ${managerId})`, (err, res) => {
                                        if (err) throw err;
                                        console.log(` You have added ${answer.firstName} ${answer.lastName} as an employee!`)
                                    })
                                })
                                searchDatabase();
                            })
                        })
                    })
                });
        }
    });
};
    
function employeeRemove() {
        connection.query(`SELECT employee.last_name FROM employee`, (err, res) => {
            if (err) {
                throw err;
            } else {
                let emp = [];
                res.forEach((data) => {
                    emp.push(data.last_name);
                })
                    inquirer
                    .prompt({
                        name: "employee",
                        type: "list",
                        message: "Which employee would you like to remove?",
                        choices: emp
                    }).then((answer) => {
                        connection.query(`DELETE FROM employee WHERE employee.last_name = "${answer.employee}"`, (err, res) => {
                            if (err) throw err;
                            console.log(`Removed ${answer.employee} from employee list!`);
                        });
                        searchDatabase();
                    });
            };
        });
};
    
function departmentAdd() {
        inquirer
        .prompt({
          name: "department",
          type: "input",
          message: "What department would you like to add?"
        }).then((answer) => {
            connection.query(`INSERT INTO department (name) VALUES ("${answer.department}")`, (err, res) => {
                if (err) throw err;
                console.log(`Added ${answer.department} department to departments list!`);
            });
            searchDatabase();
        });
};
    
function departmentRemove() {
    connection.query(`SELECT department.name FROM department`, (err, res) => {
        if (err) {
            throw err;
        } else {
            let dep = [];
            res.forEach((data) => {
                dep.push(data.name);
            })
                inquirer
                .prompt({
                    name: "department",
                    type: "list",
                    message: "Which department would you like to remove?",
                    choices: dep
                }).then((answer) => {
                    connection.query(`DELETE FROM department WHERE name = "${answer.department}"`, (err, res) => {
                        if (err) throw err;
                        console.log(`Removed ${answer.department} department from departments list!`);
                    });
                    searchDatabase();
                });
        };
    });
};
    
async function roleAdd() {
    connection.query(`SELECT department.name, department.id FROM department`, (err, res) => {
        if (err) {
            throw err;
        } else {
                inquirer
                .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What role would you like to add?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the salary for this role?"
                },
                {
                    name: "department",
                    type: "list",
                    message: "What department  does this role belong to?",
                    choices: function () {
                        let depChoices = [];
                        res.forEach((data) => {
                            depChoices.push(data.name);
                        })
                        return depChoices;
                    }
                }
                ]).then((answer) => {
                    console.log(answer.department);
                    const dep = answer.department;
                    connection.query(`SELECT * FROM department`, (err, res) => {
                        if (err) throw err;
                        let filteredDep = res.filter((res) => {
                            return res.name == dep
                        })
                        let depId = filteredDep[0].id
                        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.title}", ${answer.salary}, ${depId})`, (err, res) => {
                            if (err) throw err;
                            console.log(`You have added ${answer.title} role to roles list!`)
                        })
                    })
                    searchDatabase();
                });
        }
    });
};
    
function roleRemove() {
    connection.query(`SELECT role.title FROM role`, (err, res) => {
        if (err) {
            throw err;
        } else {
            let role = [];
            res.forEach((data) => {
                role.push(data.title);
            })
                inquirer
                .prompt({
                    name: "role",
                    type: "list",
                    message: "Which role would you like to remove?",
                    choices: role
                }).then((answer) => {
                    connection.query(`DELETE FROM role WHERE title = "${answer.role}"`, (err, res) => {
                        if (err) throw err;
                        console.log(`Removed ${answer.title} role from roles list!`);
                    });
                    searchDatabase();
                });
        };
    });
};
    
function updateEmployeeRoles() {
    connection.query('SELECT * FROM employee', function(err, result) {
      if (err) throw (err);
    inquirer
      .prompt([
        {
            name: "employeeName",
            type: "list",
            message: "Which employee's role is changing?",
            choices: function() {
            empArr = [];
                result.forEach(result => {
                    empArr.push(result.last_name);
                })
                return empArr;
            }
        }
    ]) .then((answer) => {
    console.log(answer);
    const name = answer.employeeName;
    connection.query("SELECT * FROM role", (err, res) => {
      inquirer
      .prompt ([
        {
          name: "role",
          type: "list",
          message: "What is their new role?",
          choices: function() {
            rolesArr = [];
            res.forEach(res => {
              rolesArr.push(res.title)
            })
            return rolesArr;
          }
        }
      ]).then((rolesAnswer) => {
        const role = rolesAnswer.role;
        console.log(rolesAnswer.role);
      connection.query('SELECT * FROM role WHERE title = ?', [role], function(err, res) {
      if (err) throw (err);
        let roleId = res[0].id;
        connection.query(`UPDATE employee SET role_id ${roleId} WHERE ${name}`, (err, res) => {
            if (err) throw err;
            console.log(`You have updated ${name}'s role to ${role}.`)
        }) 
      });
      searchDatabase();
      });
      });
    });
  });
  }

  function finish() {
    return;
  }