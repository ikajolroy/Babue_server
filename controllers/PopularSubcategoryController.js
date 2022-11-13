const PopularSubcategoryModel = require('../models/PopularSubcategoryModel')
const SubCategoryModel = require('../models/subCategoryModel')


exports.addPopular = async (req, res) => {
    try {
        const {subcategory} = req.body
        if (!subcategory) return res.status(404).send({message: "Invalid input data !"})
        const findCat  = await PopularSubcategoryModel.findOne({subcategory: subcategory})
        if (findCat) return res.status(404).send({message: "Already added to popular !"})

        await PopularSubcategoryModel.create({subcategory})
        res.status(200).send({message: "Success added to popular !"})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

//Update
exports.removePopular = async (req, res) => {
    try {
        const findCat = await PopularSubcategoryModel.findOne({_id: req.params.id})
        if (!findCat) return res.status(404).send({message: "Subcategory not found !"})

        await PopularSubcategoryModel.findByIdAndDelete(req.params.id)
        res.status(200).send({message: "Remove success !"})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

//Get
exports.getUserPopular = async (req, res) => {
    try {
        const findCat = await PopularSubcategoryModel.find({}).populate({
            model:SubCategoryModel,
            path:"subcategory"
        })
        res.status(200).send(findCat)
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}
//get from admin
exports.getFromAdminPopular = async (req, res) => {
    try {
        const total = await PopularSubcategoryModel.countDocuments();
        const findCat = await PopularSubcategoryModel.find({}).populate({
            model:SubCategoryModel,
            path:"subcategory"
        }).sort({createdAt:-1})
        res.status(200).send({popular: findCat, total})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}
