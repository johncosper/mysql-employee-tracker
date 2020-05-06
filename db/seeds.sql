INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO role (title, salary, department_id) VALUES ("Lead Lawyer", 140000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Head Accountant", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Engineer", 120000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 90000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 70000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 110000, 1);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Bruce", "Wayne", "1");
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Clark", "Kent", "2");
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Tony", "Stark", "3");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lex", "Luther", "4", "3");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Barry", "Allen", "5", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Luke", "Cage", "6", "1");