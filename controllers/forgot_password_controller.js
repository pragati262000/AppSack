const crypto = require('crypto');
const User = require("../models/user");
const Reset = require("../models/reset_password");
const forgotPassMailer = require('../mailers/forgot_password_mailer');

//reset password for forgotten password
module.exports.resetPassReq = function(req,res){
    return res.render('change_password/forgot_password',{
        title:"Codeial | Forgotten Password"
    });   
}

module.exports.update_pass = async function(req,res){  
    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            let reset = await Reset.create({
                user:user._id,
                accessToken:crypto.randomBytes(20).toString('hex'),
                isValid:true
            });
            
            reset = await reset.populate('user', 'email').execPopulate();
            forgotPassMailer.newPassEmail(reset);
            req.flash('success','Reset link has been send to your email, Check your email!');
            return res.redirect('back');
        }
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return;
    }
}

module.exports.recover = async function(req,res){
    try{
        let token = await Reset.findOne({accessToken:req.params.accessToken});
        if(token.isValid == true){
            return res.render('change_password/password_change',{
            title:"Codeial | Change Password",
            reset:token
            });
        }
        else{
            req.flash('error','Your token has been expired!');
            return res.redirect('/');
        } 
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}

module.exports.set = async function(req,res){
    try{
        let token = await Reset.findOneAndUpdate({accessToken:req.params.accessToken},{$set:{isValid:false}},{new: true });
        if(req.body.password == req.body.confirm_password){
            let user = await User.findByIdAndUpdate(token.user,{$set:{password:req.body.password}},{new: true });
            req.flash('success','Password changed successfully');
            return res.redirect('/users/sign_in');
        }
        req.flash('error','Passwords did not match');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }    
}
