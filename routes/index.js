// THis is default of routes folder, anytime a thing is redirected to routes wo is hi file mei redirect hoga


const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller'); 
console.log("Router Loaded");

router.get('/',homeController.home);             // for anything '/', homeController.home ko use krenge
router.use('/users',require('./users')) ;         // for '/users' , ye use hoga and iska controller will be incharge


// For any further routes,
// router.use('/routeName',require('./routerFile));

module.exports = router;