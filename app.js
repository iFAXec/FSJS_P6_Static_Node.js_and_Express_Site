const express = require("express");
const app = express();
const { data } = require("./data.json");
const { projects } = data;

app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.locals.projects = data.projects;
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
});

// app.get("/projects/:id", (req, res) => {


// });




app.listen(3000, () => {
    console.log("Running on localhost 3000 ");
});

