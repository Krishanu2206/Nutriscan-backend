const Post = require("../models/postmodel");
const History = require("../models/historymodel");

const createpostcontroller = async(req, res)=>{
    try {
        const {title, description} =req.body;
        if(!title || !description){
            return res.status(500).send({
                success : false,
                message : "provide all fields"
            })
        }

        const existinghistory = await History.findOne({productname : title});
        if(!existinghistory){
            return res.status(500).send({
                success : false,
                message : "You can only review on the products in your history."
            })
        }

        const newpost = new Post({
            title : title,
            description : description,
            author : req.auth._id // gets the whoel id of the current user and using this and populate we can find any detail of the user
        });
        await newpost.save();

        return res.status(200).send({
            success : true,
            message : "REVIEW CREATED SUCCESSFULLY",
            newpost
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in creating post",
            Error : error
        })
    }
};

const getallpostscontroller = async(req, res) => {
    try {
        const allposts = await Post.find({}).populate('author', '_id name').sort({createdAt: -1});
        return res.status(200).send({
            success : true,
            message : "Displaying all posts",
            allposts : allposts
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Unable to get all posts",
            error : error
        });
    }
};

const getuserpostcontroller = async(req, res) =>{
    try {
        const userposts = await Post.find({author : req.auth._id}).sort({createdAt : -1});
        return res.status(200).send({
            success : true,
            message : "User posts",
            userposts : userposts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in use Post API",
            error : error
        })
    }
}


const deletepostcontroller = async(req, res) =>{
    try {
        const id= req.params.id;
        const post = await Post.findById(id).populate('author', '_id');
        if(post.author._id != req.auth._id){
            return res.status(500).send({
                success : false,
                message : "No such post or requirements not met for deletion"
            })
        }
        const deletedpost= await Post.findByIdAndDelete(id);
        return res.status(200).send({
            success : true,
            message : "Post deleted successfully",
            deletedpost : deletedpost
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error in deleting Posts",
            error : error
        })
    }
}
module.exports = {createpostcontroller, getallpostscontroller, getuserpostcontroller, deletepostcontroller};
