/**
 * Loaded dependencies namely:
 * Express 
 * Router 
 */

const express = require("express");
const router = express.Router();


/**
 * Middleware created on router
 * About page is rendered on response object
 */

router.get("/", (req, res) => {
    res.render("about");
});


/**
 * The router module is exported
 */
module.exports = router;