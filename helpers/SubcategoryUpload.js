
const multer = require('multer');
const fs = require("fs");
const path = require('path');

module.exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = 'assets/subcategory'
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, "assets/subcategory")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },

    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.split('/')[0]==="image"){
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
    ,
    limits: 1024 * 1024 * 2
})
