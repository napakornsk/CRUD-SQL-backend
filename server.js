const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const PORT = 8081;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: ``,
  database: `employeesystem`,
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, result) => {
    if (err) return res.json("Error");
    return res.json(result);
  });
});

app.post("/create", (req, res) => {
  const newEmployee = {
    name: req.body.name,
    age: req.body.age,
    country: req.body.country,
    position: req.body.position,
    wage: req.body.wage,
  };
  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
    [
      newEmployee.name,
      newEmployee.age,
      newEmployee.country,
      newEmployee.position,
      newEmployee.wage,
    ],
    (err, result) => {
      if (err) console.error(err);
      else res.status(201).send("Values inserted");
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) console.error(err);
      else res.send(result);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/testjoin", (req, res) => {
  const sql =
    "SELECT S.sale_amount, S.sale_date, S.branch_id, B.branch_name, B.location FROM sales S LEFT JOIN branch B ON S.branch_id = B.branch_id;";
  db.query(sql, (err, result) => {
    if (err) res.send("Something error");
    else res.status(201).json(result);
  });
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
