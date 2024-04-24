const express = require('express');
const { registerusercontroller, loginusercontroller } = require('../controllers/usercontroller');

//router object
const router = express.Router();

//router
router.post("/register", registerusercontroller);
router.post("/login", loginusercontroller);

//export
module.exports = router ;
