INSERT INTO department(id, name)
VALUES  (001, "Executive"),
        (002, "Engineering"),
        (003, "Accounting"),
        (004, "IT"),
        (005, "Customer Service");
       
INSERT INTO role(title, salary, department_id)
VALUES ("Regional Manager", 300000, 001),
       ("Software Engineer", 130000, 002),
       ("Accountant", 80000, 003),
       ("System Administrator", 90000, 004),
       ("Customer Service Associate", 50000, 005);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Scott", 001, 001),
        ("Angela", "Martin", 003, 001);
       