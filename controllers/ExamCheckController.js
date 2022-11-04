const CheckExamModel = require("../models/ExamCheckModel")
const fs = require("fs");
const SubcategoryModel = require("../models/subCategoryModel");

//Add Check examination
exports.addCheckExamination = async (req, res) => {
    try {
        const {name, option1, option2, option3, option4,subcategory,level} = req.body;
        const image = req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
        //File Location
        let imageLocation = image && "assets/exam/"+image.split('/').pop()
        if (!image || !option1 || !option2 || !option3 || !name||!subcategory) {
            if (image) {
                fs.unlinkSync(imageLocation)
            }
            return res.status(404).send({message: 'Please provide a valid information !'})
        }
        await CheckExamModel.create({name, option1, option2, option3, option4, subcategory, level, image})
        return res.status(200).send({message: 'Successfully created !'})

    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Update Check Examination
exports.updateCheckExamination = async (req, res) => {
    try {
        const {name, option1, option2, option3, option4,subcategory,level} = req.body;
        const image = req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
        //File Location
        let imageLocation = image && "assets/exam/"+image.split('/').pop()
        const findCheckExam = await CheckExamModel.findById(req.params.id)
        if (!findCheckExam) {
            if (image){
                fs.unlinkSync(imageLocation)
            }
            return res.status(404).send({message: 'Data not found !'})
        }
        //imageLocation
        const oldImageLocation = "assets/exam/" + findCheckExam.image.split('/').pop();
        if (image){
            fs.unlinkSync(oldImageLocation)
        }

        await CheckExamModel.findByIdAndUpdate(req.params.id,{
            $set: {name, option1, option2, option3, option4, image,subcategory,level}
        })
        return res.status(200).send({message: 'Successfully Updated !'})

    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Get All from Admin
exports.getFromAdminCheckExamination = async (req, res) => {
    const name = req.body.name||''
    const subcategory = req.body.subcategory
    const limit  = req.body.limit ||20
    const level = req.body.level ||""
    try {

        const total = await CheckExamModel.countDocuments();
        if(req.body.subcategory){
            const checkExam =await CheckExamModel.find({subcategory})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .sort({createdAt: +1}).limit(limit)
            return res.status(200).send(checkExam, total);
        }
        if(req.body.level){
            const checkExam =await CheckExamModel.find({level})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .sort({createdAt: +1}).limit(limit)
            return res.status(200).send(
                checkExam,
                total
            )
        }


        const checkExam = await CheckExamModel.find({name: {$regex: new RegExp("^" + name + '.*', 'i')}})
            .populate({
                model: SubcategoryModel,
                path: 'subcategory'
            }).limit(limit)
            .sort(name ? null : {createdAt: -1})
        return  res.status(200).send({
            total,
            checkExam
        })
    }catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Get MCQ by student level
exports.getMCQByStudentLevel = async (req, res) => {
    try {
        const findRandomly  =await  CheckExamModel.aggregate([{ $match: { level:req.user.level } }, { $sample: { size: 5 } } ]).limit(10)
        res.status(200).send(findRandomly);
    }catch (error) {
        res.status(404).send({message: error.message});
    }
}
