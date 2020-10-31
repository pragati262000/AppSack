const nodeMailer = require('../config/nodemailer');

exports.newPassEmail = (resetPass) => {
    console.log('******///////',resetPass);
    console.log(resetPass.accessToken);
    //var text = "http://localhost:8000/forgotPass/recover/"+resetPass.accessToken;
    // let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
     nodeMailer.transporter.sendMail({
         from:'thor@gmail.com',
         to:resetPass.user.email,
         subject: "Change Password",
         html:'<p>Click <a href="http://localhost:8000/forgotPass/recover/' + resetPass.accessToken + '">here</a> to reset your password</p>'
     },(err,info) => {
         if(err){
             console.log('Error in sending mail',err);
             return;
         }
         console.log('Message sent', info);
         return;
     });
 }