const SubcategoryModel = require("../models/subCategoryModel");
const CategoryModel = require("../models/categoryModel");
const fs = require("fs")


//Create Subcategory admin only
exports.addSubcategory = async (req, res) => {
    const frontImage = req.files.front && req.protocol + '://' + req.get('host') + "/" + req.files.front[0].destination + "/" + req.files.front[0].filename
    const backImage = req.files.back && req.protocol + '://' + req.get('host') + "/" + req.files.back[0].destination + "/" + req.files.back[0].filename
    const frontSplit = frontImage && "assets/subcategory/" + frontImage.split('/').pop();
    const backSplit = backImage && "assets/subcategory/" + backImage.split('/').pop();

    try {
        const {category, membership, name, layout, position} = req.body;
        if (!category || !name || !position) {
            fs.unlinkSync(frontSplit)
            fs.unlinkSync(backSplit)
            return res.status(400).json({message: 'Please provide valid information !'});
        }

        await SubcategoryModel.create({
            category,
            membership,
            name,
            layout,
            position,
            frontImage,
            backImage,
            createdBy: req.admin._id
        });
        return res.status(200).json({message: 'Successfully created !'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


//Update subcategory admin only
exports.editSubcategory = async (req, res) => {
    const frontImage = req.files.front && req.protocol + '://' + req.get('host') + "/" + req.files.front[0].destination + "/" + req.files.front[0].filename
    const backImage = req.files.back && req.protocol + '://' + req.get('host') + "/" + req.files.back[0].destination + "/" + req.files.back[0].filename
    const frontSplit = frontImage && "assets/subcategory/" + frontImage.split('/').pop();
    const backSplit = backImage && "assets/subcategory/" + backImage.split('/').pop();

    try {
        //Already exists guard
        const findCat = await SubcategoryModel.findById(req.params.id);
        if (!findCat) {
            if (frontImage) {
                fs.unlinkSync(frontSplit)
            }
            if (backImage) {
                fs.unlinkSync(backSplit)
            }
            return res.status(404).json({message: 'Subcategory not found !'});
        }

        await SubcategoryModel.findByIdAndUpdate(req.params.id, {
            $set: {...req.body, frontImage, backImage}
        })

        if (frontImage){
            const splitFront = "assets/subcategory/" + findCat.frontImage.split('/').pop();
            fs.unlinkSync(splitFront)
        }
        if (backImage) {
            const splitBack = "assets/subcategory/" + findCat.backImage.split('/').pop();
            fs.unlinkSync(splitBack)
        }
        return res.status(200).json({message: 'Updated Successfully !'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Delete Subcategory admin Only
exports.deleteSubcategory = async (req, res) => {
    try {
        const categoryFind = await SubcategoryModel.findById(req.params.id);
        if (!categoryFind) {
            return res.status(404).json({message: 'Category not found !'});
        }
        const splitFront = "assets/subcategory/" + categoryFind.frontImage.split('/').pop();
        const splitBack = "assets/subcategory/" + categoryFind.backImage.split('/').pop();

        await SubcategoryModel.findByIdAndDelete(req.params.id)
        fs.unlinkSync(splitFront)
        fs.unlinkSync(splitBack)
        res.status(200).json({message: 'Deleted successfully !'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Get All Subcategory Admin
exports.getSubcategory = async (req, res) => {
    try {
        const category = await SubcategoryModel.find({})
        res.status(200).send(category);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


//Get Subcategory Child of category User Only
exports.getSubcategoryInUser = async (req, res) => {
    try {
        const category = await SubcategoryModel.find({category: req.params.id}).populate({
            model: CategoryModel,
            path: "category",
        }).sort({position: 1})
        res.status(200).send(category);
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}


exports.getSubCategoryFromId = async (req, res) => {
    try {
        const findCat = await SubcategoryModel.findById(req.params.subcategory);
        res.status(200).send(findCat);
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}
