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
 * Middleware to access the home page 
 * Project property is created on req.locals object and assigned to data.project
 * index view is rendered as response to the user
 */
router.get("/", (req, res) => {
    res.locals.projects = data.projects;
    //console.log(res.locals);
    //console.log(data.projects);
    res.render("index");
})

/**
 * The router module is exported
 */

module.exports = router;