const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;

//console.log(projects);
//console.log(projects[0].image_urls[0]);


app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.locals.projects = data.projects;
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/project/:id", (req, res) => {
    const projectId = req.params.id;
    const projectData = data.projects.find((project) => { project.id === +projectId });

    if (projectData) {
        req.locals.project = projectData;
        res.render("project");
    }
});


app.listen(3000, () => {
    console.log("Running on localhost 3000 ");
});

