const express = require("express");
const app = express();
const data = require("./data.json");
const { projects } = data;
const path = require("path");

//console.log(projects);
//console.log(projects[0].image_urls[0]);

//View engine setup to pug
app.set("view engine", "pug");

//Static middleware to use files in the public folder
app.use("/static", express.static("public"));

//Routes imported from respective route files
const mainRoute = require("./routes");
const aboutRoute = require("./routes/about");
const projectRoute = require("./routes/project");

//Use the routes within the app.js file
app.use(mainRoute);
app.use("/about", aboutRoute);
app.use("/project", projectRoute);


/**
* Handle error when page is not found
* Create a new error using error constructor method
* Se the error status to 404 and render the not-found-page
*/
app.use((req, res, next) => {
    const err = new Error("Oops! The Page you requested cannot be found");
    err.status = 404;
    res.render("page-not-found", { error: err });
    console.log(err.message);
    console.log(err.status);
});

/**
 * Global error handler handles any error on the server
 * Error middleware on the app to check if the error occurred due to page not found or other reasons
 * If error is due to incorrect page, render page-not-found view
 * Else create a new error and pass the status and message property on err object
 * render the error template
 */

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

/**
 * Server started on port 3000 and logged to console with a loading message
*/
app.listen(3000, () => {
    console.log("Running on localhost 3000 ");
});

