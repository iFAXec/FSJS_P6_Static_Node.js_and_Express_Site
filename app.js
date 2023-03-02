const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;

//console.log(projects);
//console.log(projects[0].image_urls[0]);


app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.locals.projects = data.projects;
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/project/:id", (req, res) => {
    const projectId = req.params.id;
    const projectData = data.projects.find(project => { project.id === +projectId });
    if (projectData) {
        res.render("project", { projectData });
    }

});



app.use((req, res, next) => {
    const err = new Error("Oops! The Page doesn't exists")
    err.status = 404;
    next(err);
});


app.use((err, req, res, next) => {
    res.locals.error = err;
    err.status = 500;
    err.message = "There is a problem, please try again later"
});


app.listen(3000, () => {
    console.log("Running on localhost 3000 ");
});

