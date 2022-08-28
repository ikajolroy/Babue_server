

exports.getUserData = (req, res) => {
    const { password, _id, __v, ...other } = req.user._doc;
    return res.status(200).send(other)
}