const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 8087;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "72724Sarah",
    database: "smarthome"
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MySQL Smarthome database!");
});
global.db = db;

app.use(bodyParser.urlencoded({extended: true}));

require("./routes/main")(app);

app.set("views", __dirname+ "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.listen(port, () => console.log(`SmartHome is currently listening on port ${port}!`));
app.use(express.static(__dirname+ "/public"));