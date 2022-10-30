
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const uniqid = require('uniqid');


module.exports=ExamImageUpload=function(req, res, next) {

    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const dir = 'assets/exam'
                if (!fs.existsSync(dir)){

                    fs.mkdirSync(dir, { recursive: true });
                }
                cb(null, "assets/exam")
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname+"-"+uniqid()+path.extname(file.originalname));
            }
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.split('/')[0]==="image" ||file.mimetype.split('/')[0]==="audio") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        },limits: {
            fileSize: 1024*1024*5
        },
    })
        .fields([{name: "image"}]);

    upload(req, res, (err) => {
        if(err&&err.code==="LIMIT_FILE_SIZE")return res.status(404).send({ message: "File size too large !" });
        if (err) return res.status(404).send({ message: "Image upload failed !"})
        next();
    });
}

