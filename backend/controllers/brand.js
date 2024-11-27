const Brand=require("../models/Brand")

exports.getAll=async(req,res)=>{
    try {
        const result=await Brand.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching brands"})
    }
}

exports.create=async(req,res)=>{

    try {
        const brand=await Brand.findOne({name:req.body.name})
        
        if(brand) return res.status(400).json({"message":"Brand already exists"})

        const newBrand=new Brand(req.body)
        await newBrand.save()
        res.status(201).send('Brand successfuly created..')
}
catch(err){
    console.log(err)
    res.status(500).send("error occured while creating Brand")
}
}




exports.update=async(req,res)=>{
    try {
        const updated=(await Brand.findByIdAndUpdate(req.params.id)).toObject()
        res.status(200).json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting Brand'})
    }
}

exports.delete=async(req,res)=>{
    try {
        const deletedBrand = await Brand.findByIdAndDelete(req.params.id);

        if (!deletedBrand) return res.status(404).json({ message: 'Brand not found' });

        res.status(200).json({ message: 'successfully deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error occured while deleting' });
    }
}