
const path = require('path');
const fs = require('fs');
const multer = require('multer');

module.exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = 'assets/slider'
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, "assets/slider")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },

    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            return cb(null,true);
        } else {
            cb(null, false)
        }
    }
    ,
    limits: 1024 * 1024 * 2
})
