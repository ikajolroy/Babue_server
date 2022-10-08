const CategoryModel = require('../models/categoryModel')
const fs = require("fs");


exports.addCategory= async (req, res) => {
    if (!req.file)return res.status(404).send({ message: "Image not valid please check type/size !"})


    try {
        const {title, name} = req.body;
        const cover =req.file&&req.protocol + '://' + req.get('host') + "/" + req.file.destination+"/"+req.file.filename
        const splitDir = cover&&"assets/category/"+cover.split('/').pop();

        if ( !title|| !name){
            fs.unlinkSync(splitDir)
            return res.status(400).json({message: 'Please provide valid information !'});
        }

        await CategoryModel.create({title, name, cover,createdBy:req.admin._id});
        res.status(200).json({message: 'Successfully created !'})
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}



exports.getCategory= async (req, res) => {
    try {
        const category = await CategoryModel.find({})
        res.status(200).send(category);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.deleteCategory= async (req, res) => {
    try {
        const categoryFind = await CategoryModel.findById(req.params.id);
        if (!categoryFind) {
           return  res.status(404).json({ message: 'Category not found !' });
        }

        await CategoryModel.findByIdAndDelete(req.params.id)
        const splitCover = "assets/category/"+categoryFind.cover.split('/').pop();
        fs.unlinkSync(splitCover)

        res.status(200).json({ message: 'Deleted successfully !'});
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
}

exports.editCategory= async (req, res) => {
    if (!req.file)return res.status(404).send({ message: "Image not valid please check type/size !"})


    try {
        const cover =req.file&&req.protocol + '://' + req.get('host') + "/" + req.file.destination+"/"+req.file.filename
        const splitDir = cover&&"assets/category/"+cover.split('/').pop();

        const findCat = await CategoryModel.findById(req.params.id);
        if (!findCat){
            fs.unlinkSync(splitDir)
            return res.status(404).json({ message: 'Category not found !' });
        }

        await CategoryModel.findByIdAndUpdate(req.params.id, {
            $set:{...req.body, cover}
        })
        if(cover){
            const splitCat = "assets/category/"+findCat.cover.split('/').pop();
            fs.unlinkSync(splitCat)
        }
        return res.status(200).json({ message: 'Updated Successfully !' });
    }catch (error){
        res.status(500).json({ message: error.message });
    }
}
