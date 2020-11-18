const express = require("express");
const app = express();
const pool = require("./db");
var bodyparser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.json());

//routes//

app.use("/user", express.static(__dirname + "/user"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendfile("user/index.html");
});
//get tasks
app.get("/task/view", async (req, res) => {
  try {
    const allTask = await pool.query("SELECT * FROM task");
    res.json(allTask.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/task/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await pool.query("SELECT * FROM task WHERE task_id = $3", [
      id,
    ]);
    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//new task
app.post("/task", async (req, res) => {
  try {
    const { task_name } = req.body;
    const { task_date } = req.body;
    const newTask = await pool.query(
      "INSERT INTO task(task_name,task_date) VALUES($1,$2) RETURNING *",
      [task_name, task_date]
    );
    res.json(newTask);
  } catch (err) {
    console.log(err.message);
  }
});
//update task
app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task_name } = req.body;
    const { task_date } = req.body;

    const updateTask = await pool.query(
      "UPDATE task SET task_name =$1,task_date=$2 WHERE task_id =$3",
      [task_name, task_date, id]
    );
    res.json("Task was updated");
  } catch (err) {
    console.log(err.message);
  }
});
//delete task
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTask = await pool.query("DELETE FROM task WHERE task_id = $1", [
      id,
    ]);
    res.json("Task was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log("Listening on port at ${port}");
});
