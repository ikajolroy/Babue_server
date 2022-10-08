const SubcategoryModel = require("../models/subCategoryModel");
const fs = require("fs")


exports.addSubcategory= async (req, res) => {

    if (req.files.length<2){
        if (req.files[0]){
            const frontImage =req.files&&req.protocol + '://' + req.get('host') + "/" + req.files[0].destination+"/"+req.files[0].filename
            const frontSplit = frontImage&&"assets/subcategory/"+frontImage.split('/').pop();
            fs.unlinkSync(frontSplit)
        }
        if (req.files[1]){
            const backImage =req.files&&req.protocol + '://' + req.get('host') + "/" + req.files[1].destination+"/"+req.files[1].filename
            const backSplit = backImage&&"assets/subcategory/"+backImage.split('/').pop();
            fs.unlinkSync(backSplit)
        }
        return res.status(404).send({ message: "Image not valid please check type/size/length !"})
    }

    const frontImage =req.files&&req.protocol + '://' + req.get('host') + "/" + req.files[0].destination+"/"+req.files[0].filename
    const backImage =req.files&&req.protocol + '://' + req.get('host') + "/" + req.files[1].destination+"/"+req.files[1].filename

    const frontSplit = frontImage&&"assets/subcategory/"+frontImage.split('/').pop();
    const backSplit = backImage&&"assets/subcategory/"+backImage.split('/').pop();

    try {
        const {category, name} = req.body;
        if ( !category|| !name){
            fs.unlinkSync(frontSplit)
            fs.unlinkSync(backSplit)
            return res.status(400).json({message: 'Please provide valid information !'});
        }

        await SubcategoryModel.create({category, name, frontImage, backImage, createdBy:req.admin._id});
        res.status(200).json({message: 'Successfully created !'})
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.editSubcategory= async (req, res) => {
    if (req.files.length<2)
        return res.status(404).send({ message: "Image not valid please check type/size/length !"})

    const frontImage =req.files&&req.protocol + '://' + req.get('host') + "/" + req.files[0].destination+"/"+req.files[0].filename
    const backImage =req.files&&req.protocol + '://' + req.get('host') + "/" + req.files[1].destination+"/"+req.files[1].filename

    const frontSplit = frontImage&&"assets/subcategory/"+frontImage.split('/').pop();
    const backSplit = backImage&&"assets/subcategory/"+backImage.split('/').pop();

    try {
        //Already exists guard
        const findCat = await SubcategoryModel.findById(req.params.id);
        if (!findCat){
            fs.unlinkSync(frontSplit)
            fs.unlinkSync(backSplit)
            return res.status(404).json({ message: 'Category not found !' });
        }


        await SubcategoryModel.findByIdAndUpdate(req.params.id, {
            $set:{...req.body, frontImage,backImage}
        })

        if(frontImage&&backImage){
            const splitFront = "assets/subcategory/"+findCat.frontImage.split('/').pop();
            const splitBack = "assets/subcategory/"+findCat.backImage.split('/').pop();
            fs.unlinkSync(splitFront)
            fs.unlinkSync(splitBack)
        }
        return res.status(200).json({ message: 'Updated Successfully !' });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
}

exports.deleteSubcategory= async (req, res) => {
    try {
        const categoryFind = await SubcategoryModel.findById(req.params.id);
        if (!categoryFind) {
            return  res.status(404).json({ message: 'Category not found !' });
        }
        const splitFront = "assets/subcategory/"+categoryFind.frontImage.split('/').pop();
        const splitBack = "assets/subcategory/"+categoryFind.backImage.split('/').pop();

        await  SubcategoryModel.findByIdAndDelete(req.params.id)
        fs.unlinkSync(splitFront)
        fs.unlinkSync(splitBack)
        res.status(200).json({ message: 'Deleted successfully !'});
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
}

exports.getSubcategory= async (req, res) => {
    try {
        const category = await SubcategoryModel.find({})
        res.status(200).send(category);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

