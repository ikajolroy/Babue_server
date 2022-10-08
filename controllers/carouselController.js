const CarouselModel = require("../models/carouselModel")
const fs = require("fs");

//Add Carousel
exports.addCarousel = async (req, res) => {
    const {position,description, active}  = req.body;
    if (!req.file )return res.status(404).send({ message: "Image not valid please check type/size !"})

    const image =req.file&&req.protocol + '://' + req.get('host') + "/" + req.file.destination+"/"+req.file.filename
    const splitDir = image&&"assets/slider/"+image.split('/').pop();
    try {

        if(!position){
            //data create failed to delete image
            fs.unlinkSync(splitDir)
            return res.status(404).send({ message:"Please provide valid information !"});
        }
        const findPosition  = await  CarouselModel.find({position})
        if (findPosition.length>0){
            //data create failed to delete image
            fs.unlinkSync(splitDir)
            return res.status(404).send({ message:"Position already exists !"})
        }

        await CarouselModel.create({image,position,description, active})
      return  res.status(200).send({ message:"Carousel added successfully !"})
    }catch (error) {
        res.status(404).send({ message: error.message})
    }
}



//Delete  carousel
exports.deleteCarousel = async (req, res) => {
    try {
        const findCarousel= await CarouselModel.findOne({_id:req.params.id})

        if(!findCarousel) return res.status(404).send({ message:"Carousel not found !"});
        await CarouselModel.findByIdAndDelete(req.params.id)

        const splitPrev = "assets/slider/"+findCarousel.image.split('/').pop();
        fs.unlinkSync(splitPrev)

       return  res.status(200).send({ message:"Carousel removed successfully!"})
    }catch (error) {
        res.status(404).send({ message: error.message})
    }
}



//Update carousel
exports.updateCarousel = async (req, res) => {
    if (!req.file )return res.status(404).send({ message: "Image not valid please check type/size !"})

    const image =req.file&&req.protocol + '://' + req.get('host') + "/" + req.file.destination+"/"+req.file.filename
    const splitDir = image&&"assets/slider/"+image.split('/').pop();

    try {
        const findCarousel = await CarouselModel.findOne({_id: req.params.id})
        if(!findCarousel){
            //data create failed to delete image
            fs.unlinkSync(splitDir)
            return res.status(404).send({ message:"Carousel not found !"})
        }
        await CarouselModel.findByIdAndUpdate(req.params.id, {
            $set: {...req.body, image}
        })

        if(image){
            const splitPrev = "assets/slider/"+findCarousel.image.split('/').pop();
            fs.unlinkSync(splitPrev)
        }
        return  res.status(200).send({ message:"Carousel updated successfully!"})
    }catch (error) {
        res.status(404).send({ message: error.message})
    }
}



//User and Admin Get active carousel
exports.getOnCarousel = async (req, res) => {
    try {
        const carousel= await CarouselModel.find({active:true}).sort({position:1})
        res.status(200).send(carousel)
    }catch (error) {
        res.status(404).send({ message: error.message})
    }
}
//Admin Get deactivate carousel
exports.adminGetOffCarousel = async (req, res) => {
    try {
        const carousel= await CarouselModel.find({active:false}).sort({position:1})
        res.status(200).send(carousel)
    }catch (error) {
        res.status(404).send({ message: error.message})
    }
}
