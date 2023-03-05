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

const mainRoute = require("./routes");
const aboutRoute = require("./routes/about");
const projectRoute = require("./routes/project");

app.use(mainRoute);
app.use("/about", aboutRoute);
app.use("/project", projectRoute);

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

