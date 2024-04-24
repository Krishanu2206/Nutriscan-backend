const History = require("../models/historymodel");
const Verification = require("../models/codeverificationmodel");

const createhistorycontroller= async(req, res) => {
    try {
        const {brands, productname, nutriments, imageurl, code} = req.body;

        const existinghistory = await History.find({productname : productname, author : req.auth._id}); 
        if(existinghistory.length > 0){
            return res.status(400).send({
                success : false,
                message : "You have already scanned this product before"
            })
        };

        const newhistorypost = new History({
            brands : brands,
            productname : productname,
            nutriments: nutriments,
            imageurl : imageurl,
            code : code,
            author : req.auth._id,
        });

        await newhistorypost.save();
        console.log(newhistorypost);
        return res.status(200).send({
            success : true,
            message : "Added to history successfully",
            newhistory : newhistorypost
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success : false,
            message : "Error in adding to history",
            error : error
        });
    }
};

const getuserhistorycontroller = async(req, res) => {
    try {
        const userhistory = await History.find({author : req.auth._id}).sort({createdAt: -1});
        return res.status(200).send({
            success : true,
            message : "History fetched successfully",
            userhistory : userhistory
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in fetching history",
            error : error
        })

    }
};

const deletehistorycontroller = async(req, res) => {
    try {
        const id= req.params.id;
        const history = await History.findById(id).populate('author', '_id');
        if(history.author._id != req.auth._id){
            return res.status(500).send({
                success : false,
                message : "No such history or requirements not met for deletion"
            })
        }
        const code = history.code;
        const deletedhistory= await History.findByIdAndDelete(id);
        const deletedcode = await Verification.deleteOne({code : code, author : req.auth._id}); 
        return res.status(200).send({
            success : true,
            message : "History deleted successfully",
            deletedhistory : deletedhistory
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in deleting history",
            error:error
        })
    }

};

const verifycodecontroller = async(req, res) => {
    try{
    const {code} = req.body;

    const existingcode = await Verification.find({code : code, author : req.auth._id});
    if(existingcode.length > 0){
        return res.status(400).send({
            success : false,
            message : "You have scanned the same code multiple times",
            code : existingcode
        })
    };

    const newcode = new Verification({
        code : code,
        author : req.auth._id
    });

    await newcode.save();
    return res.status(200).send({
        success : true,
        message : "Saved for later verification"
    });

    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success : false,
            message : "Error ocurred",
            error: err
        })
    }
};

module.exports = {
    createhistorycontroller, getuserhistorycontroller, deletehistorycontroller, verifycodecontroller
}
