import nodemailer from 'nodemailer'

const sendEmail = async(email,subject,message)=>{
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        secure : true,
        port : process.env.SMTP_PORT,
        auth : {
            user : process.env.SMTP_USERNAME,
            pass : process.env.SMTP_PASSWORD
        }
    })
    try{
        await transporter.sendMail({
            from : process.env.SMTP_USERNAME,
            to : email,
            subject : subject,
            html : message
        })
    }
    catch(err){
        console.log(err)
    }
}

export default sendEmail




