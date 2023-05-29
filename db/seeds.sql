INSERT INTO departments(id, department_name)
VALUES  (1, "Management"),
        (2, "Sales"),
        (3, "Accounting"),
        (4, "Administrative");
       
INSERT INTO roles(title, salary, department_id)
VALUES  ("Regional Manager", 100000, 1),
        ("Distric Manager", 150000, 1),
        ("Sales Associate", 70000, 2),
        ("Accountant", 80000, 3),
        ("Quality Assurance", 80000, 4),
        ("Secretary", 50000, 4);
   ;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Scott", 001, 002),
        ("Jan", "Levinson", 002, 000),
        ("Jim", "Halpert", 003, 001),
        ("Dwight", "Schrute", 003, 001),
        ("Oscar", "Martinez", 004, 001),
        ("Angela", "Martin", 004, 008),
        ("Pam", "Beesly", 006, 001),
        ("Meredith", "Palmer", 005, 001),
        ("Creed", "Bratton", 005, 001);
       