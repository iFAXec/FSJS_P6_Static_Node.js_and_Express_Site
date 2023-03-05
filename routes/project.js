const express = require("express");
const router = express.Router();
const data = require("../data.json");

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

module.exports = router;
