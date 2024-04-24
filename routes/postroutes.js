const express= require("express"); 
const { createpostcontroller, getallpostscontroller, getuserpostcontroller, deletepostcontroller } = require("../controllers/postcontroller");
const router = express.Router();
const {requiresignin} = require("../controllers/usercontroller");


//routers
router.post('/createpost', requiresignin, createpostcontroller);
router.get('/getallposts', getallpostscontroller)
router.get('/getuserpost', requiresignin, getuserpostcontroller)
router.delete('/deletepost/:id', requiresignin, deletepostcontroller);

//export 
module.exports = router;