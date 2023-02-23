const express = require("express");
const router = express.Router();
const app = express();

const data = require("data.json");

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.listen(3000, "app is loading...");

