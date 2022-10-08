const {guardOfAdmin} = require("../helpers/authGuard");
const SliderUpload = require("../helpers/SliderUpload")
const {addCarousel, getOnCarousel, updateCarousel, deleteCarousel, adminGetOffCarousel} = require("../controllers/carouselController");
module.exports = Router = require('express').Router();

Router.route('/carousel')
    .post(guardOfAdmin,SliderUpload.upload.single("image"),addCarousel)
    .get(getOnCarousel)

Router.route('/carousel/:id')
    .put(guardOfAdmin,SliderUpload.upload.single("image"),updateCarousel)
    .delete(guardOfAdmin,deleteCarousel)

Router.route('/carousel/off')
    .get(adminGetOffCarousel)
