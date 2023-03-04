const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;
const path = require("path");

//console.log(projects);
//console.log(projects[0].image_urls[0]);


app.set("view engine", "pug");

//const imagePath = path.join(images, 'public');
//app.use(express.static(imagePath));

app.use("/static", express.static("public"));


app.get("/", (req, res) => {
    res.locals.projects = projects;
    //console.log(res.locals);
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
});


//Matching the project number in the url with the project number in the json file
app.get("/project/:id", (req, res, next) => {
    const projectId = req.params.id;
    const projectData = data.projects.find(project => project.id === projectId);
    //console.log(projectData);
    //console.log(projectId);
    //console.log(project.id);

    if (projectData) {
        res.render("project", { projectData });
    } else {
        const err = new Error();
        err.message = "Page Not Found"
        err.status = 404;
        res.status(err.status);
        next(err);
    }
});

//Handle error when page is not found
app.use((req, res, next) => {
    const err = new Error("Oops! The Page you requested cannot be found");
    err.status = 404;
    res.render("page-not-found", { error: err });
    console.log(err.message);
    console.log(err.status);
});

//Handle global error that occurs on the server
app.use((err, req, res, next) => {

    if (err.status === 404) {
        res.render("page-not-found", { error: err });
    } else {
        const err = new Error();
        err.message = err.message || `There is a problem, please try again later`;
        err.status = err.status || 500;
        res.render("error", { error: err });
        console.log(err.message);
        console.log(err.status);
    }
});


app.listen(3000, () => {
    console.log("Running on localhost 3000 ");
});

