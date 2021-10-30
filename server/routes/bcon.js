/*
Name: Peyman Moshfegh
ID: 301151808
Date: 10/29/2021
*/

let express = require('express');
let router = express.Router();

let passport = require('passport');

// Connect to bcon controller
let bconController = require('../controllers/bcon');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Bcon List page - READ operation. */
router.get('/', bconController.displayBconList);

/* GET Route for displaying the Add page - CREATE operation. */
router.get('/add', requireAuth, bconController.displayAddPage);

/* POST Route for processing the Add page - CREATE operation. */
router.post('/add', requireAuth, bconController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE operation. */
router.get('/edit/:id', requireAuth, bconController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE operation. */
router.post('/edit/:id', requireAuth, bconController.processEditPage);

/* GET Route to perform Deletion - DELETE operation. */
router.get('/delete/:id', requireAuth, bconController.performDelete);

module.exports = router;