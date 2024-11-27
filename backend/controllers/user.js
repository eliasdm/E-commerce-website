const { UserModel }=require("../models/user")


exports.getAllUser=async(req,res)=>{
    try {
        const result = await UserModel.find().select('-password').lean();
        res.status(200).json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error grtting users...'})
    }
}

exports.getUser=async(req,res)=>{
    try {

        console.log("reguest.....",req.user._id)
        const user = await UserModel.findById(req.user._id).select('-password').lean();
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details"
        })
        console.log("user",user)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}

exports.updateUser=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=(await UserModel.findByIdAndUpdate(id,req.body,{new:true})).toObject()
        delete updated.password
        res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting your details, please try again later'})
    }
}

exports.deleteUser=async(req,res)=>{
    try {
        const { id } = req.params; 
        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting user, please try again later' });
    }
}