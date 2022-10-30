const CheckExamModel = require("../models/ExamCheckModel")
const fs = require("fs");

//Add Check examination
exports.addCorrectExamination = async (req, res) => {
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
        console.log(error)
        res.status(404).send({message: error.message});
    }
}

//Update Check Examination
exports.updateCorrectExamination = async (req, res) => {
    try {
        const {name, option1, option2, option3, option4,subcategory,level} = req.body;
        const image = req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
        //File Location
        let imageLocation = image && "assets/exam/"+image.split('/').pop()
        const findCheckExam = await CheckExamModel.findById(req.params.id)
        if (!findCheckExam) {
            fs.unlinkSync(imageLocation)
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
exports.getFromAdminCorrectExamination = async (req, res) => {
    try {
        const all = await CheckExamModel.find({}).sort({createdAt: -1})
        res.status(200).send(all);
    }catch (error) {
        res.status(404).send({message: error.message});
    }
}
