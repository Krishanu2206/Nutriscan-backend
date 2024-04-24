const express= require("express"); 
const { createhistorycontroller, getuserhistorycontroller, deletehistorycontroller, verifycodecontroller} = require("../controllers/historycontroller");
const router = express.Router();
const {requiresignin} = require("../controllers/usercontroller");


//routers
router.post('/createhistory', requiresignin, createhistorycontroller);
router.get('/gethistory', requiresignin, getuserhistorycontroller);
router.delete('/deletehistory/:id', requiresignin, deletehistorycontroller);
router.post('/verify', requiresignin, verifycodecontroller);

//export 
module.exports = router;