/**
 * Loaded dependencies namely:
 * Express 
 * Router
 * data json file
 */

const express = require("express");
const router = express.Router();
const data = require("../data.json");

/**
 * Middleware to handle dynamic path of the project based on index number typed in the url
 * The variable to access the dynamic number is passed using ":id" 
 * projectId variable access and stores
 * projectData variable checks if the number in the url matches with the index number mentioned in the json file and returns a boolean value 
 * If the condition is true - the router renders project template with data from projectData variable passed as an object
 * Else a new error is created
 * Status and message is set up on the err object 
 * Status property is set on response object.
 * next is initiated passing the err object * 
 */

//Matching the project number in the url with the project number in the json file
router.get("/:id", (req, res, next) => {
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

/**
 * The router module is exported
 */
module.exports = router;
