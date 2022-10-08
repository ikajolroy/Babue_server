const analysisModel  =require('../models/AnalysisModel')
const userModels  =require('../models/userModels')
const categoryModel  =require('../models/categoryModel')

exports.getOrCreateAnalysis= async (req, res) => {
    try {
        const {category} = req.body
        const analysis = await  analysisModel.findOne({ category, user:req.user._id})

        if(!analysis){
             await analysisModel.create({category, user:req.user._id})
            const newAn = await  analysisModel.findOne({ category, user:req.user._id}).populate({
                path:"user",
                model:userModels,
                select:"name image email"
            }).populate({
                path:"category",
                model:categoryModel,
                select:"title name image createdAt updatedAt"
            })
           return  res.status(200).send(newAn)
        }else {
            const OkanA = await  analysisModel.findOne({ category, user:req.user._id}).populate({
                path:"user",
                model:userModels,
                select:" name image  email"
            }).populate({
                path:"category",
                model:categoryModel,
                select:"title name image createdAt updatedAt"
            })
            res.status(200).send(OkanA)
        }

    }catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Update Analysis
exports.updateAnalysis = async (req, res) => {
    try {
        await analysisModel.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        res.status(200).send({message: 'Analysis updated successfully !'})
    }catch (error) {
        res.status(404).send({message: error.message});
    }
}
