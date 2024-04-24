const jwtoken = require('jsonwebtoken');
const User = require('../models/usermodel')
const {hashfunction, decryptfunction} = require("../helpers/authhelper");
const { expressjwt: jwt } = require("express-jwt");

//middleware
const requiresignin = jwt({
    secret : process.env.JWT_TOKEN,
    algorithms : ["HS256"]
});

const registerusercontroller = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        //validation
        if(!name){return res.status(400).send({
            success : false,
            message : "Name is required"
        })};
        if(!email){return res.status(400).send({
            success : false,
            message : "Email is required"
        })};
        if(!password || password.length < 6){return res.status(400).send({
            success : false,
            message : "Password is required"
        })};

        //existing user
        const existinguser = await User.findOne({email : email});
        if(existinguser){
            return res.status(400).send({
                success : false,
                message : "User already registered with this email"
            })
        };
        
        const hashpassword = await hashfunction(password);
        console.log(hashpassword);

        const user1 = new User({
            name : name,
            email : email,
            password : hashpassword
        });
        await user1.save();

        return res.status(200).send({
            success : true,
            message : "Registration successful, please login"
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success : false,
            message : "Internal Server Error"
        })
    }
};


//LOGIN
const loginusercontroller = async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password){
            return res.status(400).send({
                success : false,
                message : "Enter password and email"
            })
        }
        const registereduser = await User.findOne({email : email});
        if(!registereduser){
            return res.status(400).send({
                success : false,
                message : "Please enter valid and correct emailID"
            });
        }

        const hashpassword = registereduser.password;

        if(await decryptfunction(password, hashpassword) == false){
            return res.status(400).send({
                success : false,
                message : "Enter correct password"
            });
        };
        
        //JWT token
        const token = await jwtoken.sign({_id : registereduser._id}, process.env.JWT_TOKEN, {expiresIn:'7d'});

        return res.status(200).send({
            success : true,
            message : "Login successful",
            token : token,
            user : registereduser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Internal Server Error"
        })
    }
}
module.exports = {requiresignin, registerusercontroller, loginusercontroller};