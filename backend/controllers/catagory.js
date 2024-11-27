const Catagory=require("../models/Catagory")

exports.getAll=async(req,res)=>{
    try {
        const result=await Catagory.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching catagories"})
    }
}

exports.create=async(req,res)=>{

    try {
        const catagory=await Catagory.findOne({name:req.body.name})
        
        if(catagory) return res.status(400).json({"message":"catagory already exists"})

        const newCatagory=new Catagory(req.body)
        await newCatagory.save()
        res.status(201).send('catagory successfuly created..')
}
catch(err){
    console.log(err)
    res.status(500).send("error occured while creating catagory")
}
}




exports.update=async(req,res)=>{
    try {
        const updated=(await Catagory.findByIdAndUpdate(req.params.id)).toObject()
        res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting catagory'})
    }
}

exports.delete=async(req,res)=>{
    try {
        const deletedCatagory = await Catagory.findByIdAndDelete(req.params.id);

        if (!deletedCatagory) return res.status(404).json({ message: 'catagory not found' });

        res.status(200).json({ message: 'successfully deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting deleting' });
    }
}