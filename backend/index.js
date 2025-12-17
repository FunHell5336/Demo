const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

function connectDB() {
  const db = mysql.createConnection({
    host: "mysql",      // TÊN SERVICE
    user: "root",
    password: "",       // KHÔNG PASSWORD
    database: "appdb"
  });

  db.connect(err => {
    if (err) {
      console.log("MySQL not ready, retrying in 5s...");
      setTimeout(connectDB, 5000);
    } else {
      console.log("MySQL connected");
      app.locals.db = db;
    }
  });
}

connectDB();

/* TEST API */
app.get("/users", (req, res) => {
  const db = app.locals.db;
  if (!db) return res.status(500).json({ error: "DB not ready" });

  db.query("SELECT 1 AS ok", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
