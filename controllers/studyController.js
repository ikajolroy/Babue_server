const SubcategoryModel = require('../models/subCategoryModel');
const StudyModel = require('../models/studyModel');
const fs = require("fs");

exports.addStudy = async (req, res) => {
    if (!req.files) return res.status(404).send({message: "Invalid your information !"});


    const image = req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
    const audio = req.files.audio && req.protocol + '://' + req.get('host') + "/" + req.files.audio[0].destination + "/" + req.files.audio[0].filename;
    const images = req.files.images && req.files.images.map(item => {
        return req.protocol + '://' + req.get('host') + "/" + item.destination + "/" + item.filename;
    });
    //delete location
    const imageSplit = image && "assets/study/" + image.split('/').pop();
    const audioSplit = audio && "assets/study/" + audio.split('/').pop();
    const imagesSplit = req.files.images && req.files.images.map(item => {
        return item.destination + "/" + item.filename;
    });



    try {
        const {name, subcategory} = req.body;
        const poem = req.body.poem && req.body.poem.split(',')

        if (!subcategory || !name) {
            if (images) {
                imagesSplit.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }
            if (image) {
                fs.unlinkSync(imageSplit)
            }
            if (audio) {
                fs.unlinkSync(audioSplit)
            }
            return res.status(404).send({message: "Please add subcategory and name !"})
        }

        // console.log(imagesSplit)

        const findSubcategory = await SubcategoryModel.findById(subcategory)

        if (!findSubcategory) {
            if (images) {
                imagesSplit.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }
            if (image) {
                fs.unlinkSync(imageSplit)
            }
            if (audio) {
                fs.unlinkSync(audioSplit)
            }
            return res.status(404).send({message: "Subcategory not found !"})
        }
        if (findSubcategory.layout === "poem") {
            if (!poem) {
                if (images) {
                    imagesSplit.forEach(path => {
                        try {
                            fs.unlinkSync(path)
                            //file removed
                        } catch (err) {
                            res.status(404).send({message: "Delete failed loaded images !"})
                        }
                    });
                }
                if (image) {
                    fs.unlinkSync(imageSplit)
                }
                if (audio) {
                    fs.unlinkSync(audioSplit)
                }
                return res.status(404).send({message: "Please add the poem !"})
            }
            await StudyModel.create({audio, name, subcategory, poem})
            if (images) {
                imagesSplit.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !"})
                    }
                });
            }
            if (image) {
                fs.unlinkSync(imageSplit)
            }
        } else {
            if (poem) {
                if (images) {
                    imagesSplit.forEach(path => {
                        try {
                            fs.unlinkSync(path)
                            //file removed
                        } catch (err) {
                            res.status(404).send({message: "Delete failed loaded images !'"})
                        }
                    });
                }
                if (image) {
                    fs.unlinkSync(imageSplit)
                }
                if (audio) {
                    fs.unlinkSync(audioSplit)
                }
                return res.status(404).send({message: "Poem not this layout !"})
            }
            await StudyModel.create({...req.body, audio, image, images})
        }
        res.send({message: "Successfully added !"})

    } catch (error) {
        res.status(404).send({message: error});
    }
}

//Update Study Successfully Done without files upload
exports.updateStudy = async (req, res) => {


    const image = req.files && req.files.image && req.protocol + '://' + req.get('host') + "/" + req.files.image[0].destination + "/" + req.files.image[0].filename;
    const audio = req.files && req.files.audio && req.protocol + '://' + req.get('host') + "/" + req.files.audio[0].destination + "/" + req.files.audio[0].filename;
    const images = req.files && req.files.images && req.files.images.map(item => {
        return req.protocol + '://' + req.get('host') + "/" + item.destination + "/" + item.filename;
    });
    //delete location
    const imageSplit = image && "assets/study/" + image.split('/').pop();
    const audioSplit = audio && "assets/study/" + audio.split('/').pop();
    const imagesSplit = req.files && req.files.images && req.files.images.map(item => {
        return item.destination + "/" + item.filename;
    });

    try {
        const findStudy = await StudyModel.findById(req.params.id)
        if (!findStudy) {
            if (images) {
                imagesSplit.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }
            if (image) {
                fs.unlinkSync(imageSplit)
            }
            if (audio) {
                fs.unlinkSync(audioSplit)
            }
            return res.status(404).send({message: "Study not found !"})
        }


        //Delete Previous Assets of Study
        const prevImage = findStudy.image && "assets/study/" + findStudy.image.split('/').pop();
        const prevAudio = findStudy.audio && "assets/study/" + findStudy.audio.split('/').pop();
        const prevImages = findStudy.images.length > 0 && findStudy.images.map(item => {
            return "assets/study/" + item.split('/').pop();
        });


        const {name, subcategory, poem} = req.body;

        const findSubcategory = await SubcategoryModel.findById(subcategory);

        if (!findSubcategory) {
            if (images) {
                imagesSplit.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }
            if (image) {
                fs.unlinkSync(imageSplit)
            }
            if (audio) {
                fs.unlinkSync(audioSplit)
            }
            return res.status(404).send({message: "Subcategory not found !"})
        }
        if (findSubcategory.layout === "poem") {
            if (!poem || poem.length < 1) {
                if (images) {
                    imagesSplit.forEach(path => {
                        try {
                            fs.unlinkSync(path)
                            //file removed
                        } catch (err) {
                            res.status(404).send({message: "Delete failed loaded images !'"})
                        }
                    });
                }
                if (image) {
                    fs.unlinkSync(imageSplit)
                }
                if (audio) {
                    fs.unlinkSync(audioSplit)
                }
                return res.status(404).send({message: "Please add the poem !"})
            }
            await StudyModel.findByIdAndUpdate(req.params.id, {
                $set: {audio, name, subcategory, poem, image: "", images: []}
            })
            //Delete assets Out Of Poem Fields
            if (images) {
                imagesSplit.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }

            //Delete Previous Study assets
            if (prevImages) {
                prevImages.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }
            if (image) {
                fs.unlinkSync(imageSplit)
            }
            if (prevImage) {
                fs.unlinkSync(prevImage)
            }
            if (audio && prevAudio) {
                fs.unlinkSync(prevAudio)
            }
        } else {

            if (poem && poem.length > 0) {
                if (images) {
                    imagesSplit.forEach(path => {
                        try {
                            fs.unlinkSync(path)
                            //file removed
                        } catch (err) {
                            res.status(404).send({message: "Delete failed loaded images !'"})
                        }
                    });
                }
                if (image) {
                    fs.unlinkSync(imageSplit)
                }
                if (audio) {
                    fs.unlinkSync(audioSplit)
                }
                return res.status(404).send({message: "Poem not this layout !"})
            }

            await StudyModel.findByIdAndUpdate(req.params.id, {
                $set: {...req.body, audio, image, images}
            })
            //Delete Previous Study assets
            if (audio && prevAudio) {
                fs.unlinkSync(prevAudio)
            }
            if (images && prevImages) {
                prevImages.forEach(path => {
                    try {
                        fs.unlinkSync(path)
                        //file removed
                    } catch (err) {
                        res.status(404).send({message: "Delete failed loaded images !'"})
                    }
                });
            }
            if (image && prevImage) {
                fs.unlinkSync(prevImage)
            }
        }

        res.send({message: "Successfully updated !"})

    } catch (error) {
        res.status(404).send({message: error});
    }
}


//Delete
exports.deleteStudy = async (req, res) => {
    try {
        const findStudy = await StudyModel.findById(req.params.id)
        if (!findStudy) {
            return res.status(404).send({message: "Study not found !"})
        }

        //Delete Previous Assets of Study
        const prevImage = findStudy.image && "assets/study/" + findStudy.image.split('/').pop();
        const prevAudio = findStudy.audio && "assets/study/" + findStudy.audio.split('/').pop();
        const prevImages = findStudy.images.length > 0 && findStudy.images.map(item => {
            return "assets/study/" + item.split('/').pop();
        });
        await StudyModel.findByIdAndDelete(req.params.id)
        if (prevImages) {
            prevImages.forEach(path => {
                try {
                    fs.unlinkSync(path)
                    //file removed
                } catch (err) {
                    res.status(404).send({message: "Delete failed loaded images !'"})
                }
            });
        }
        if (prevImage) {
            fs.unlinkSync(prevImage)
        }
        if (prevAudio) {
            fs.unlinkSync(prevAudio)
        }
        res.status(200).send({message: "Successfully deleted !"})
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Get all Study for Admin
exports.getStudy = async (req, res) => {

    let limit = parseInt(req.body.limit || 20)
    let search = req.body.search || ''

    try {
        const total = await StudyModel.countDocuments();
        if (req.body.subcategory) {
            const subcategory = await StudyModel.find({subcategory: req.body.subcategory})
                .populate({
                    model: SubcategoryModel,
                    path:"subcategory"
                })
                .limit(limit).sort({createdAt: 1})
            return res.status(200).send({
                total,
                study: subcategory
            })
        }

            const study = await StudyModel.find({name: {$regex: new RegExp("^" + search + '.*', 'i')}})
                .populate({
                    model: SubcategoryModel,
                    path: 'subcategory'
                }).limit(limit)
                .sort(search ? null : {createdAt: -1})
           return  res.status(200).send({
                total,
                study
            })

    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

//Get Study for Image Link Copy
exports.getStudyForImage = async (req, res) => {
    try {

        if (req.body.search&&req.body.search.trim()){
            const study = await StudyModel.find({name: {$regex: new RegExp("^" + req.body.search + '.*', 'i')}})
                .limit(20)
            return  res.status(200).send(study)
        }else {
            res.status(404).send({message:"Type study name to search !"})
        }

    }catch (error){
        res.status(404).send({message: error.message});
    }
}


//Get Study For User of Subcategory
exports.getUserStudy = async (req, res) => {
    try {
        const study = await StudyModel.find({subcategory: req.params.subcategory})
            .populate({
                model: SubcategoryModel,
                path: 'subcategory'
            })
            .sort({position: 1})
        res.status(200).send(study)
    } catch (error) {
        res.status(404).send({message: error.message});
    }
}

