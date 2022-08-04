
//BD Phone number validator
exports.validPhone = (phone) => {
    return phone.match(
        /^(?:\+88|88)?(01[3-9]\d{8})$/
    )
}


// Check UTF-8 Language Name
exports.checkAlphabet = (username) => {
    return username.match(
        /^[a-zA-Z]+$/
    )
}