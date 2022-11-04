const ExamCorrectAnsModel = require("../models/ExamCorrectAnsModel")
const fs = require("fs");
const CheckExamModel = require("../models/ExamCheckModel")
const SubcategoryModel = require("../models/subCategoryModel")

//Add Check examination
exports.addCorrectExamination = async (req, res) => {
    try {
        const {name, option,subcategory,level} = req.body;
        const image = req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
        //File Location
        let imageLocation = image && "assets/exam/"+image.split('/').pop()
        if (!image || !option || !name||!subcategory) {
            if (image) {
                fs.unlinkSync(imageLocation)
            }
            return res.status(404).send({message: 'Please provide a valid information !'})
        }
        await ExamCorrectAnsModel.create({name, option, subcategory, level, image})
        return res.status(200).send({message: 'Successfully created !'})

    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Update Check Examination
exports.updateCorrectExamination = async (req, res) => {
    try {
        const {name, option, subcategory,level} = req.body;
        const image = req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
        //File Location
        let imageLocation = image && "assets/exam/"+image.split('/').pop()
        const findCheckExam = await ExamCorrectAnsModel.findById(req.params.id)
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

        await ExamCorrectAnsModel.findByIdAndUpdate(req.params.id,{
            $set: {name, option, image,subcategory,level}
        })
        return res.status(200).send({message: 'Successfully Updated !'})

    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Get All from Admin
exports.getFromAdminCorrectExamination = async (req, res) => {
    let limit = req.body.limit||20
    let level = req.body.level
    let subcategory = req.body.subcategory
    try {

        const totalCheck = await ExamCorrectAnsModel.countDocuments();
        const totalCorrect = await CheckExamModel.countDocuments();
        let total = totalCheck+totalCorrect
        if (subcategory&&level){
            const findBySubLevelCorrect =await ExamCorrectAnsModel.find({subcategory,level})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit)
            const findBySubcategoryCheck = CheckExamModel.find({subcategory,level})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit)
            const adjustAll = findBySubLevelCorrect.concat(findBySubcategoryCheck).sort({createdAt: -1})
            res.status(200).send({total,examination: adjustAll});
        }
        if (subcategory){
            const findBySubcategoryCorrect =await ExamCorrectAnsModel.find({subcategory})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit)
            const findBySubcategoryCheck = CheckExamModel.find({subcategory})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit)
            const adjustAll = findBySubcategoryCorrect.concat(findBySubcategoryCheck).sort({createdAt: -1})
            res.status(200).send({total,examination: adjustAll});
        }
        if (level){
            const findByLevelCorrect =await ExamCorrectAnsModel.find({level})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit)
            const findBySubcategoryCheck = CheckExamModel.find({level})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit)
            const adjustAll = findByLevelCorrect.concat(findBySubcategoryCheck).sort({createdAt: -1})
            res.status(200).send({total,examination: adjustAll});
        }

        const search = req.body.search|| ''
        const correctAnsExam = await ExamCorrectAnsModel.find({name: {$regex: new RegExp("^" + search + '.*', 'i')}})
            .populate({
                model: SubcategoryModel,
                path:"subcategory"
            })
            .limit(limit)
        const checkExam = await CheckExamModel.find({name: {$regex: new RegExp("^" + search + '.*', 'i')}})
            .populate({
                model: SubcategoryModel,
                path:"subcategory"
            })
            .limit(limit)
        let allExams = [...correctAnsExam,...checkExam]

        res.status(200).send({total, examination:allExams});

    }catch (error) {
        res.status(404).send({message: error.message});
    }
}
