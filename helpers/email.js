const nodeMailer = require('nodemailer')

exports.sendEmail =async (email,subject,message)=>{
    const transport = nodeMailer.createTransport(({
        service:"gmail",
        auth:{
            user:process.env.SERVICE_EMAIL,
            pass:process.env.EMAIL_PASS
        }
    }))
    const mailOptions = {
        from:{name: process.env.BRAND_NAME,address:process.env.SERVICE_EMAIL},
        to:email,
        subject:subject,
        html:message
    }
   transport.sendMail(mailOptions,(err, result)=>{
        if(err) {
            return {message:err.message}
        }else {
            return {message:result}
        }
    })
}
